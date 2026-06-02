import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Clock } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function ThisWeeksInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Time formatter: converts timestamp to "Wednesday, 6:30 AM"
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const insightsRef = ref(db, "insights");
    const unsubscribe = onValue(insightsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const now = Date.now();
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

        // Convert to array, filter out posts older than 7 days, and sort newest first
        const formattedData = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(item => (now - item.timestamp) <= oneWeekInMs)
          .sort((a, b) => b.timestamp - a.timestamp);

        setInsights(formattedData);
      } else {
        setInsights([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-24 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-slate-400">
        <Camera size={48} className="mb-4 opacity-20" />
        <p className="font-bold">No insights from the road this week.</p>
        <p className="text-sm">Check back soon for new captures from our drivers!</p>
      </div>
    );
  }

  // Find the featured post (prioritize flagged ones, otherwise grab the newest)
  const featured = insights.find(img => img.isFeatured) || insights[0];
  // The rest of the regular posts
  const regular = insights.filter(img => img.id !== featured.id);

  return (
    <div className="w-full py-12 md:py-20 px-4 sm:px-6 max-w-[1400px] mx-auto overflow-hidden">
      
      {/* Title Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <Camera size={20} className="text-white md:w-6 md:h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              This Week's Insights
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-lg">
            Real moments and beautiful sceneries captured straight from the dashboards of our professional chauffeurs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        
        {/* Featured Large Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="lg:col-span-8 relative h-80 sm:h-[400px] lg:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 group"
        >
          <img 
            src={featured.imageUrl} 
            alt={featured.location}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-transparent" />

          {/* Featured Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-5 md:p-10">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-blue-600 text-white text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
                Shot of the Week
              </span>
              <div className="flex items-center gap-1.5 text-slate-200 text-xs md:text-sm font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg">
                <MapPin size={14} /> {featured.location}
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-200 text-xs md:text-sm font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg">
                <Clock size={14} /> {formatTime(featured.timestamp)}
              </div>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 leading-snug drop-shadow-md line-clamp-3 md:line-clamp-none">
              "{featured.caption}"
            </p>
            <div className="flex items-center gap-1.5 md:gap-2 text-slate-300 font-medium text-xs md:text-base">
              <Camera size={14} className="text-slate-400 md:w-4 md:h-4" />
              Captured by <span className="text-white font-bold">{featured.driver}</span>
            </div>
          </div>
        </motion.div>

        {/* Regular Images Scroll */}
        {regular.length > 0 && (
          <div className="lg:col-span-4 flex overflow-x-auto lg:overflow-visible lg:flex-col gap-4 md:gap-6 pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none [&::-webkit-scrollbar]:hidden w-full">
            {regular.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative shrink-0 snap-center lg:snap-align-none w-[280px] sm:w-[320px] lg:w-full flex-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 group cursor-pointer h-56 sm:h-64 lg:h-auto lg:min-h-[180px]"
              >
                <img 
                  src={insight.imageUrl} 
                  alt={insight.location}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-1.5 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-1.5 drop-shadow-sm">
                    <MapPin size={12} className="md:w-3.5 md:h-3.5" /> {insight.location}
                  </div>
                  <p className="text-white font-bold text-sm md:text-base line-clamp-2 leading-snug mb-3">
                    "{insight.caption}"
                  </p>
                  <div className="text-slate-400 text-[11px] md:text-xs font-medium flex justify-between items-center mt-auto">
                    <span>By <span className="text-slate-200">{insight.driver}</span></span>
                    <span>{formatTime(insight.timestamp)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}