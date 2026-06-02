import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { db } from "../firebase"; 
import { ref, onValue, onDisconnect, set, push, get, increment, update } from "firebase/database";
import { Activity, Users, Globe, Map, MapPin, Navigation } from "lucide-react"; // Added MapPin & Navigation

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
  // Added "trips" to the state (defaulting to 12500 until Firebase loads it)
  const [stats, setStats] = useState({ live: 0, today: 0, total: 0, trips: 12500 });
  const [recentRoutes, setRecentRoutes] = useState([]);

  useEffect(() => {
    const connectedRef = ref(db, ".info/connected");
    const liveViewersRef = ref(db, "live_viewers");
    const statsRef = ref(db, "site_stats");
    
    // --- 1. NEW: LISTEN TO TOTAL TRIPS COUNTER ---
    const totalTripsRef = ref(db, "site_stats/total_trips");
    const unsubscribeTrips = onValue(totalTripsRef, (snap) => {
      if (snap.exists()) {
        setStats((prev) => ({ ...prev, trips: snap.val() }));
      }
    });

    // --- 2. NEW: LISTEN TO RECENT ROUTES ---
    const routesRef = ref(db, "trips");
    const unsubscribeRoutes = onValue(routesRef, (snap) => {
      const data = snap.val();
      if (data) {
        // Convert to array and sort newest first
        const formatted = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
        setRecentRoutes(formatted);
      } else {
        setRecentRoutes([]);
      }
    });

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

    return () => {
      unsubscribeConnected();
      unsubscribeLive();
      unsubscribeStats();
      unsubscribeTrips();
      unsubscribeRoutes();
      set(myConnectionRef, null); 
    };
  }, []);

  const statItems = [
    { label: "Live Viewers", value: stats.live, iconColor: "text-emerald-500", icon: Activity },
    { label: "Today's Visitors", value: stats.today, iconColor: "text-blue-600", icon: Users },
    { label: "Total Visitors", value: stats.total, iconColor: "text-blue-600", icon: Globe },
    { label: "Trips Planned", value: stats.trips, iconColor: "text-blue-600", icon: Map }, // <--- NOW DYNAMIC
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-12 md:mb-16 relative z-10">
      
      {/* THE 2x2 STATS GRID */}
      <div className="bg-slate-100 rounded-2xl md:rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden grid grid-cols-2 md:grid-cols-4 gap-px">
        {statItems.map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 md:py-10 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors text-center h-full">
            <stat.icon className={`w-5 h-5 md:w-7 md:h-7 ${stat.iconColor} mb-2 md:mb-4`} />
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-1 md:mb-2">
              {stat.label === "Trips Planned" ? (
                <><AnimatedNumber value={stat.value} />+</>
              ) : stat.label === "Total Visitors" && stat.value > 1000 ? (
                <><AnimatedNumber value={Math.floor(stat.value / 1000)} />K+</>
              ) : (
                <AnimatedNumber value={stat.value} />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest line-clamp-1 md:line-clamp-none">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* NEW: RECENT ROUTES TICKER */}
      {recentRoutes.length > 0 && (
        <div className="mt-4 md:mt-6 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-3 sm:p-4 flex items-center overflow-hidden shadow-sm">
          <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 text-blue-600 font-black text-[10px] sm:text-xs uppercase tracking-widest border-r border-slate-200 pr-3 sm:pr-4 z-10 bg-white">
            <MapPin size={14} /> <span className="hidden sm:inline">Recent</span> Routes
          </div>
          
          <div className="flex-1 overflow-hidden relative flex items-center h-full ml-3 sm:ml-4" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <motion.div 
              key={recentRoutes.length} // Forces re-render of animation when new route is added
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
              className="flex gap-8 pl-4 whitespace-nowrap"
            >
              {/* Duplicated for seamless scrolling */}
              {[...recentRoutes, ...recentRoutes, ...recentRoutes].map((route, i) => (
                <span key={i} className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  {route.from} <Navigation size={12} className="rotate-90 text-slate-400" /> {route.to}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      )}

    </div>
  );
}