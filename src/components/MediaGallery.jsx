import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Tv, PlayCircle, X } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function MediaGallery() {
  const [moments, setMoments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  // FETCH LIVE DATA FROM FIREBASE
  useEffect(() => {
    const momentsRef = ref(db, "captured_moments");
    const tvRef = ref(db, "vbr_tv");

    const unsubMoments = onValue(momentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMoments(Object.keys(data).map(k => ({ id: k, ...data[k] })).sort((a,b) => b.timestamp - a.timestamp));
      } else {
        setMoments([]);
      }
    });

    const unsubTv = onValue(tvRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVideos(Object.keys(data).map(k => ({ id: k, ...data[k] })).sort((a,b) => b.timestamp - a.timestamp));
      } else {
        setVideos([]);
      }
    });

    return () => { unsubMoments(); unsubTv(); };
  }, []);

  // Prevent background scrolling when the video modal is open
  useEffect(() => {
    if (activeVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [activeVideo]);

  // Hide the entire section if no media is uploaded yet
  if (moments.length === 0 && videos.length === 0) return null;

  return (
    <div className="w-full py-12 bg-slate-50/50 overflow-hidden relative">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col gap-16">
        
        {/* =========================================
            SECTION 1: CAPTURED MOMENTS (SMALLER & SCROLLABLE)
        ============================================= */}
        {moments.length > 0 && (
          <div>
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex items-center gap-3 mb-6 w-fit">
              <Camera size={24} className="text-blue-600" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Captured Moments</h2>
            </div>

            <div className="relative w-full">
              <div className="absolute top-0 left-0 w-8 md:w-12 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />
              <div className="absolute top-0 right-0 w-8 md:w-12 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />

              {/* Added flex-nowrap to strictly enforce the horizontal scroll line */}
              <div className="flex flex-nowrap overflow-x-auto gap-4 md:gap-5 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {moments.map((moment, index) => (
                  <motion.div
                    key={moment.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    // THE FIX: Locked width to exactly 260px (mobile) and 300px (desktop). Removed flex-1.
                    className="relative w-[260px] md:w-[300px] shrink-0 snap-start rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 group aspect-[4/3]"
                  >
                    <img
                      src={moment.imageUrl}
                      alt="Captured Moment"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            SECTION 2: VBR TRAVELS TV (LARGER)
        ============================================= */}
        {videos.length > 0 && (
          <div>
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex items-center gap-3 mb-6 w-fit">
              <Tv size={24} className="text-red-600" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">VBR Travels TV</h2>
            </div>

            <div className="relative w-full">
              <div className="absolute top-0 left-0 w-8 md:w-16 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 md:w-16 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none" />

              <div className="flex flex-nowrap overflow-x-auto gap-5 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    onClick={() => setActiveVideo(video.videoUrl)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    // TV Cards remain large and cinematic
                    className="relative w-[300px] md:w-[420px] lg:w-[480px] shrink-0 snap-start rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 group aspect-video cursor-pointer"
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt="VBR TV Thumbnail"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 drop-shadow-xl transition-opacity" />
                      </motion.div>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-lg tracking-widest uppercase">
                      Watch Video
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================
          CINEMATIC VIDEO MODAL
      ============================================= */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full z-50"
              onClick={() => setActiveVideo(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20 border border-white/10 relative"
              onClick={(e) => e.stopPropagation()} 
            >
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}