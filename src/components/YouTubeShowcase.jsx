import { motion } from "framer-motion";
import { MonitorPlay, Play, Eye, Calendar } from "lucide-react";

const CHANNEL_URL = "https://www.youtube.com/channel/UCKL0bA9xxMxmlztdtXnmz0w";

const youtubeVideos = [
  {
    id: "mwkqCDe98fs",
    title: "VBR Travels Nellore Fleet Showcase",
    description: "Take a full tour of our extensive fleet in Nellore, featuring our top-condition vehicles ready for your next journey.",
    date: "Apr 13, 2021",
    views: "722 Views"
  },
  {
    id: "EQ2huenSZus",
    title: "Nellore Buses, Tempos, & Cars",
    description: "A quick look at our diverse vehicle options. From luxury SUVs to high-capacity buses, we have everything you need.",
    date: "Oct 9, 2023",
    views: "115 Views"
  },
  {
    id: "HDxdSzrk180",
    title: "VBR Travels - Premium Transport",
    description: "Experience the premium quality and maintenance standards of VBR Travels. Safety and comfort guaranteed.",
    date: "Apr 5, 2021",
    views: "440 Views"
  },
  {
    id: "DtNPHaT5f_g",
    title: "Latest Fleet Additions & Tempos",
    description: "Exploring the newest additions to our tempo and car lineup. Perfect for family trips and corporate bookings.",
    date: "Oct 9, 2023",
    views: "458 Views"
  }
];

export default function YouTubeShowcase() {
  return (
    <div className="w-full py-12 bg-slate-50/50">
      
      {/* ALIGNMENT FIX: Wrap EVERYTHING inside this single max-w container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* 1. COMPACT HEADER */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-8">
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <MonitorPlay size={24} className="text-red-600" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">VBR on YouTube</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Watch our fleet in action. See the quality of our buses, cars, and tempos before you book your trip.
            </p>
          </div>

          <a 
            href={CHANNEL_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-red-600/20 active:scale-95 shrink-0"
          >
            <Play size={16} className="fill-white" />
            Subscribe to Channel
          </a>

        </div>

        {/* 2. SINGLE ROW SCROLLABLE VIDEOS */}
        <div className="relative w-full">
          
          {/* Soft edge fades - Hidden on large screens (lg:hidden) since all 4 fit perfectly */}
          <div className="absolute top-0 left-0 w-8 md:w-12 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />
          <div className="absolute top-0 right-0 w-8 md:w-12 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />

          {/* The Scroll Track */}
          <div className="flex overflow-x-auto lg:overflow-visible gap-5 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            {youtubeVideos.map((video, index) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                // CHANGED HERE: Replaced fixed width with lg:w-full lg:flex-1
                className="relative w-[280px] md:w-[320px] lg:w-full lg:flex-1 shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md shadow-slate-200/50 flex flex-col group"
              >
                {/* iFrame Container: Forced 16:9 Aspect Ratio */}
                <div className="relative w-full pt-[56.25%] bg-slate-900">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video Details */}
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 leading-tight mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4">
                    {video.description}
                  </p>
                  
                  {/* Meta Data Footer */}
                  <div className="mt-auto flex items-center gap-4 text-[10px] md:text-xs text-slate-400 font-bold border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {video.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={12} />
                      {video.views}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}