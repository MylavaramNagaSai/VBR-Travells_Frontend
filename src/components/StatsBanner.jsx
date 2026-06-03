import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { db } from "../firebase"; 
import { ref, onValue, set, push, get, increment, update, remove, serverTimestamp } from "firebase/database";
import { Activity, Users, Globe } from "lucide-react";

let hasCountedThisSession = false;

function AnimatedNumber({ value }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function LiveStats() {
  const [stats, setStats] = useState({ live: 0, today: 0, total: 0 });

  useEffect(() => {
    const liveViewersRef = ref(db, "live_viewers");
    const statsRef = ref(db, "site_stats");

    // ==========================================
    // 1. BULLETPROOF HEARTBEAT SYSTEM (Live Viewers)
    // ==========================================
    
    // Create a unique ID for this specific browser session
    const mySessionRef = push(liveViewersRef);
    let heartbeatInterval;

    const startHeartbeat = async () => {
      // 1. Initial Ping
      await set(mySessionRef, serverTimestamp());

      // 2. Ping the server every 10 seconds to say "I'm still here!"
      heartbeatInterval = setInterval(() => {
        set(mySessionRef, serverTimestamp());
      }, 10000);
    };

    startHeartbeat();

    // 3. Listen to all viewers and filter out the dead ones
    const unsubscribeLive = onValue(liveViewersRef, (snap) => {
      const allUsers = snap.val();
      if (!allUsers) {
        setStats((prev) => ({ ...prev, live: 0 }));
        return;
      }

      const now = Date.now();
      let activeCount = 0;
      const cutoffTime = now - 20000; // 20 seconds. If no ping in 20s, they are dead.

      // Check everyone's last heartbeat
      Object.entries(allUsers).forEach(([key, timestamp]) => {
        // If the timestamp is valid and newer than 20 seconds ago, count them.
        if (typeof timestamp === 'number' && timestamp > cutoffTime) {
          activeCount++;
        } else {
          // Optional Cleanup: Delete dead ghost sessions from the database
          if (typeof timestamp === 'number' && timestamp <= cutoffTime) {
              remove(ref(db, `live_viewers/${key}`));
          }
        }
      });

      // Ensure we always show at least 1 viewer (the person looking at it)
      setStats((prev) => ({ ...prev, live: Math.max(1, activeCount) }));
    });


    // ==========================================
    // 2. DAILY & TOTAL VISITORS LOGIC
    // ==========================================
    const handleVisitStats = async () => {
      if (hasCountedThisSession) return;
      hasCountedThisSession = true;

      const todayDate = new Date().toISOString().split('T')[0];

      if (localStorage.getItem("vbr_last_visit") === todayDate) return;
      localStorage.setItem("vbr_last_visit", todayDate);

      const snapshot = await get(statsRef);
      const data = snapshot.val() || { today_visitors: 0, total_visitors: 0, last_reset: todayDate };

      let newTodayCount = data.today_visitors;

      if (data.last_reset !== todayDate) {
        newTodayCount = 1; 
        await update(statsRef, {
          today_visitors: newTodayCount,
          total_visitors: increment(1),
          last_reset: todayDate
        });
      } else {
        await update(statsRef, {
          today_visitors: increment(1),
          total_visitors: increment(1)
        });
      }
    };

    handleVisitStats();

    const unsubscribeStats = onValue(statsRef, (snap) => {
      const data = snap.val();
      if (data) {
        setStats((prev) => ({
          ...prev,
          today: data.today_visitors || 0,
          total: data.total_visitors || 0
        }));
      }
    });

    // ==========================================
    // 3. CLEANUP PHASE
    // ==========================================
    return () => {
      clearInterval(heartbeatInterval); // Stop sending heartbeats
      unsubscribeLive(); // Stop listening
      unsubscribeStats();
      remove(mySessionRef); // Immediately delete this session on unmount
    };
  }, []);

  const statItems = [
    { label: "Live Viewers", value: stats.live, iconColor: "text-emerald-500", icon: Activity },
    { label: "Today's Visitors", value: stats.today, iconColor: "text-blue-600", icon: Users },
    { label: "Total Visitors", value: stats.total, iconColor: "text-blue-600", icon: Globe },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-8 relative z-10">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {statItems.map((stat, i) => (
          <div key={i} className="p-4 sm:p-5 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors text-center h-full">
            <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.iconColor} mb-2`} />
            <div className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              {stat.label === "Total Visitors" && stat.value > 1000 ? (
                <><AnimatedNumber value={Math.floor(stat.value / 1000)} />K+</>
              ) : (
                <AnimatedNumber value={stat.value} />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}