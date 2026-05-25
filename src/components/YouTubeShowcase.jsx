import { motion } from "framer-motion";
// FIX: Replaced 'Youtube' with 'MonitorPlay' to resolve the export error
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
    <div className="w-full py-20 px-4 max-w-7xl mx-auto">
      
      {/* Header Section with Official Channel Link */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            {/* FIX: Using MonitorPlay here */}
            <MonitorPlay size={32} className="text-red-600" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">VBR on YouTube</h2>
          </div>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            Watch our fleet in action. See the quality of our buses, cars, and tempos before you book your trip.
          </p>
        </div>
        
        <a 
          href={CHANNEL_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-1"
        >
          <Play size={20} className="fill-white" />
          Subscribe to Channel
        </a>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {youtubeVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col group"
          >
            {/* YouTube Iframe Embed */}
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

            {/* Video Details & Description */}
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                {video.title}
              </h3>
              
              <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-1">
                {video.description}
              </p>
              
              <div className="flex items-center gap-6 pt-4 border-t border-slate-100 text-sm font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {video.date}
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  {video.views}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}