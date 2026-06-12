import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { db } from "../firebase"; 
import { ref, onValue, set, push, get, update, remove, onDisconnect } from "firebase/database";
import { Activity, Users, Globe } from "lucide-react";

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
    // 1. LIVE VIEWERS (Self-Cleaning Version)
    // ==========================================
    const mySessionRef = push(liveViewersRef);
    
    // Automatically delete this session from Firebase if the user closes the tab
    onDisconnect(mySessionRef).remove(); 

    const startHeartbeat = () => {
      set(mySessionRef, Date.now());
      return setInterval(() => {
        set(mySessionRef, Date.now());
      }, 10000);
    };

    const heartbeatInterval = startHeartbeat();

    const unsubscribeLive = onValue(liveViewersRef, (snap) => {
      const allUsers = snap.val();
      if (!allUsers) {
        setStats((prev) => ({ ...prev, live: 1 })); 
        return;
      }

      const now = Date.now();
      let activeCount = 0;
      const cutoffTime = now - 90000; 

      Object.values(allUsers).forEach((timestamp) => {
        if (typeof timestamp === 'number' && timestamp > cutoffTime) {
          activeCount++;
        }
      });

      setStats((prev) => ({ ...prev, live: Math.max(1, activeCount) }));
    });

    // ==========================================
    // 2. DAILY & TOTAL VISITORS (Self-Healing Version)
    // ==========================================
    const handleVisitStats = async () => {
      const now = new Date();
      const todayDate = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0');
      
      const alreadyVisitedToday = localStorage.getItem("vbr_last_visit") === todayDate;

      try {
        const snapshot = await get(statsRef);
        const data = snapshot.val();

        // SCENARIO 1: Database folder is completely missing
        if (!data) {
          localStorage.setItem("vbr_last_visit", todayDate);
          await set(statsRef, {
            today_visitors: 1,
            total_visitors: 1,
            last_reset: todayDate
          });
          return;
        }

        // SCENARIO 2: It is a new day
        if (data.last_reset !== todayDate) {
          localStorage.setItem("vbr_last_visit", todayDate);
          await update(statsRef, {
            today_visitors: 1,
            total_visitors: (data.total_visitors || 0) + 1,
            last_reset: todayDate
          });
          return;
        }

        // SCENARIO 3: Same day, but brand new visitor
        if (!alreadyVisitedToday) {
          localStorage.setItem("vbr_last_visit", todayDate);
          await update(statsRef, {
            today_visitors: (data.today_visitors || 0) + 1,
            total_visitors: (data.total_visitors || 0) + 1
          });
        }
      } catch (error) {
        console.error("Firebase stats error:", error);
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
      clearInterval(heartbeatInterval); 
      unsubscribeLive(); 
      unsubscribeStats();
      remove(mySessionRef); 
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