import { motion } from "framer-motion";
import { Camera, MapPin, Clock } from "lucide-react";

// Simulated live feed of images taken by your drivers
const insights = [
  {
    id: 1,
    driver: "Suresh Kumar",
    location: "Munnar Tea Estates",
    caption: "Early morning mist clearing up just as we entered the hills. A magical drive for our guests today!",
    image: "https://images.unsplash.com/photo-1585508889271-200ca23ee214?q=80&w=1200&auto=format&fit=crop",
    isFeatured: true,
    time: "Today, 6:30 AM"
  },
  {
    id: 2,
    driver: "Raju Venkat",
    location: "East Coast Highway",
    caption: "Perfect weather cruising along the coastline with the AC Volvo.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop",
    isFeatured: false,
    time: "Today, 10:15 AM"
  },
  {
    id: 3,
    driver: "Ramesh Reddy",
    location: "Srisailam Ghats",
    caption: "Dense forest canopy views from the Innova dashboard.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
    isFeatured: false,
    time: "Yesterday, 4:45 PM"
  },
  {
    id: 4,
    driver: "Karthik Sharma",
    location: "Ooty Hairpin Bends",
    caption: "Navigating the famous 36 hairpin bends smoothly.",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=800&auto=format&fit=crop",
    isFeatured: false,
    time: "Yesterday, 2:20 PM"
  }
];

export default function TodaysInsight() {
  const featured = insights.find(img => img.isFeatured);
  const regular = insights.filter(img => !img.isFeatured);

  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto">
      
      {/* Title Section */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Today's Insights</h2>
          </div>
          <p className="text-slate-500 font-medium max-w-2xl text-lg mt-3">
            Real moments and beautiful sceneries captured straight from the dashboards of our professional chauffeurs.
          </p>
        </div>
      </div>

      {/* Bento Box Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Featured Large Image (Spans 8 columns on large screens) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="lg:col-span-8 relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 group"
        >
          <img 
            src={featured.image} 
            alt={featured.location}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Heavy gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

          {/* Featured Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                Shot of the Day
              </span>
              <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                <MapPin size={16} /> {featured.location}
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                <Clock size={16} /> {featured.time}
              </div>
            </div>
            
            <p className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug drop-shadow-md">
              "{featured.caption}"
            </p>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Camera size={18} className="text-slate-400" />
              Captured by <span className="text-white font-bold">{featured.driver}</span>
            </div>
          </div>
        </motion.div>

        {/* Sidebar for Recent Shots (Spans 4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {regular.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative flex-1 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 group cursor-pointer min-h-[180px]"
            >
              <img 
                src={insight.image} 
                alt={insight.location}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-5">
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wide mb-1">
                  <MapPin size={14} /> {insight.location}
                </div>
                <p className="text-white font-medium text-sm line-clamp-2 leading-relaxed mb-2">
                  "{insight.caption}"
                </p>
                <div className="text-slate-400 text-xs flex justify-between items-center">
                  <span>By {insight.driver}</span>
                  <span>{insight.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}