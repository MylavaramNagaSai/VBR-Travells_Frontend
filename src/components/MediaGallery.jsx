import { motion } from "framer-motion";
import { Camera, Tv, PlayCircle } from "lucide-react";

// Simulated Data - Replace with your actual image/video paths
const capturedMoments = [
  { id: 1, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop" },
  { id: 2, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop" },
  { id: 3, image: "https://images.unsplash.com/photo-1516934161286-665e8aebcc29?q=80&w=600&auto=format&fit=crop" },
  { id: 4, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop" },
  { id: 5, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" }
];

const travelsTv = [
  { id: 1, image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop", duration: "03:45" },
  { id: 2, image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=800&auto=format&fit=crop", duration: "01:20" },
  { id: 3, image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=800&auto=format&fit=crop", duration: "05:12" },
  { id: 4, image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=800&auto=format&fit=crop", duration: "02:30" }
];

export default function MediaGallery() {
  return (
    <div className="w-full py-12 bg-slate-50/50 overflow-hidden">
      
      {/* ALIGNMENT FIX: Exact same max-w container as Social Sections */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col gap-16">
        
        {/* =========================================
            SECTION 1: CAPTURED MOMENTS (SMALLER)
        ============================================= */}
        <div>
          {/* Header */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex items-center gap-3 mb-6 w-fit">
            <Camera size={24} className="text-blue-600" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Captured Moments</h2>
          </div>

          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-8 md:w-12 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />
            <div className="absolute top-0 right-0 w-8 md:w-12 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />

            <div className="flex overflow-x-auto lg:overflow-visible gap-4 md:gap-5 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {capturedMoments.map((moment, index) => (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  // REDUCED SIZE: Compact aspect ratio, flex-1 to fit them cleanly on desktop
                  className="relative w-[220px] md:w-[260px] lg:w-full lg:flex-1 shrink-0 snap-start rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 group aspect-[4/3]"
                >
                  <img
                    src={moment.image}
                    alt="Captured Moment"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle dark overlay on hover to make it feel interactive */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>


        {/* =========================================
            SECTION 2: VBR TRAVELS TV (LARGER)
        ============================================= */}
        <div>
          {/* Header */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex items-center gap-3 mb-6 w-fit">
            <Tv size={24} className="text-red-600" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">VBR Travels TV</h2>
          </div>

          <div className="relative w-full">
            {/* We keep the edge gradients on desktop here because these cards are huge and will scroll! */}
            <div className="absolute top-0 left-0 w-8 md:w-16 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 md:w-16 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-x-auto gap-5 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {travelsTv.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  // INCREASED SIZE: Cinematic aspect-video, very wide on desktop
                  className="relative w-[300px] md:w-[420px] lg:w-[480px] shrink-0 snap-start rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 group aspect-video cursor-pointer"
                >
                  <img
                    src={video.image}
                    alt="VBR TV Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Heavy gradient so the play button stands out */}
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 drop-shadow-xl transition-opacity" />
                    </motion.div>
                  </div>

                  {/* Video Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-lg">
                    {video.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}