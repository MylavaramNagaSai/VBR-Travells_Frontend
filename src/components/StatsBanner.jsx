import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { db } from "../firebase"; 
import { ref, onValue, onDisconnect, set, push, get, increment, update } from "firebase/database";
import { Activity, Users, Globe, Map } from "lucide-react";

// 1. THE ABSOLUTE LOCK: Placed OUTSIDE the component so React cannot duplicate it.
let hasCountedThisSession = false;

// Smooth counting animation
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
    const connectedRef = ref(db, ".info/connected");
    const liveViewersRef = ref(db, "live_viewers");
    const statsRef = ref(db, "site_stats");
    
    // --- LIVE VIEWERS LOGIC ---
    const myConnectionRef = push(liveViewersRef);

    const unsubscribeConnected = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        onDisconnect(myConnectionRef).remove();
        set(myConnectionRef, true);
      }
    });

    const unsubscribeLive = onValue(liveViewersRef, (snap) => {
      const activeUsers = snap.val() ? Object.keys(snap.val()).length : 0;
      setStats((prev) => ({ ...prev, live: activeUsers }));
    });

    // --- DAILY & TOTAL VISITORS LOGIC ---
    const handleVisitStats = async () => {
      // 2. Immediate exit if this specific browser tab has already fired the function
      if (hasCountedThisSession) return;
      hasCountedThisSession = true; // Lock the door instantly

      const todayDate = new Date().toISOString().split('T')[0];

      // 3. Prevent returning visitors from counting twice in the same day
      if (localStorage.getItem("vbr_last_visit") === todayDate) return;
      localStorage.setItem("vbr_last_visit", todayDate);

      // Only true, unique, single-fire visits make it this far
      const snapshot = await get(statsRef);
      const data = snapshot.val() || { today_visitors: 0, total_visitors: 0, last_reset: todayDate };

      let newTodayCount = data.today_visitors;

      if (data.last_reset !== todayDate) {
        newTodayCount = 1; // Midnight reset!
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

    // Listen for database changes to update the UI
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

    return () => {
      unsubscribeConnected();
      unsubscribeLive();
      unsubscribeStats();
      set(myConnectionRef, null); 
    };
  }, []); // Empty dependency array ensures this runs strictly on mount

  const statItems = [
    { label: "Live Viewers", value: stats.live, iconColor: "text-emerald-500", icon: Activity },
    { label: "Today's Visitors", value: stats.today, iconColor: "text-blue-600", icon: Users },
    { label: "Total Visitors", value: stats.total, iconColor: "text-blue-600", icon: Globe },
    { label: "Trips Planned", value: 12500, iconColor: "text-blue-600", icon: Map },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 mb-16 relative z-10">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
        {statItems.map((stat, i) => (
          <div key={i} className="flex-1 py-10 px-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <stat.icon size={28} className={`${stat.iconColor} mb-4`} />
            <div className="text-4xl font-black text-slate-900 mb-2">
              {stat.label === "Trips Planned" ? (
                <>{stat.value.toLocaleString()}+</>
              ) : stat.label === "Total Visitors" && stat.value > 1000 ? (
                <><AnimatedNumber value={Math.floor(stat.value / 1000)} />K+</>
              ) : (
                <AnimatedNumber value={stat.value} />
              )}
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}