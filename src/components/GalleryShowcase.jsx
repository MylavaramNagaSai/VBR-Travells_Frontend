import { motion } from "framer-motion";
import { Play, Camera } from "lucide-react";
import { galleryData } from "../galleryData"; 

export default function GalleryShowcase() {
  const images = galleryData.filter(item => item.type === "image");
  const videos = galleryData.filter(item => item.type === "video");

  return (
    <div className="w-full py-16 bg-white overflow-hidden">
      
      {/* SECTION 1: PHOTO MARQUEE - SLOWER AND LARGER */}
      <div className="mb-20">
        <h2 className="text-4xl font-black text-slate-900 px-6 lg:px-12 mb-10">Captured Moments</h2>
        <div className="relative flex overflow-hidden">
          <motion.div 
            className="flex gap-8 px-6 lg:px-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 450, repeat: Infinity, ease: "linear" }}
          >
            {[...images, ...images].map((item, index) => (
              // Increased min-width here (was 320/400, now 400/500)
              <div key={index} className="min-w-[400px] lg:min-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: VIDEO MARQUEE - LARGER BOXES */}
      <div>
        <h2 className="text-4xl font-black text-slate-900 px-6 lg:px-12 mb-10">VBR Travels TV</h2>
        <div className="relative flex overflow-hidden">
          <motion.div 
            className="flex gap-8 px-6 lg:px-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 450, repeat: Infinity, ease: "linear" }}
          >
            {[...videos, ...videos].map((item, index) => (
              // Increased min-width significantly here for the "bigger" video feel
              <div key={index} className="min-w-[500px] lg:min-w-[650px] aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/30 bg-black relative group">
                <video 
                  src={item.src} 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}