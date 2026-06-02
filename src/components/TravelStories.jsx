import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Quote, MapPin, Star, MessageSquare, X } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function TravelStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null); // Tracks the video currently playing

  useEffect(() => {
    const feedbackRef = ref(db, "feedback");
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        arr.sort((a, b) => b.timestamp - a.timestamp);
        setStories(arr);
      } else {
        setStories([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Prevent background scrolling when video is open
  useEffect(() => {
    if (activeVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [activeVideo]);

  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto">
      
      {/* Title & Description Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Travel Stories & Testimonials</h2>
        <p className="text-slate-500 font-medium mt-3 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. Watch and read about the beautiful memories our clients have made while traveling with VBR.
        </p>
      </div>

      {loading ? (
        <div className="w-full py-20 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <MessageSquare size={48} className="mx-auto text-slate-300 mb-4 opacity-50" />
          <p className="text-slate-500 font-bold">New travel stories are being updated. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col"
            >
              {/* Video Thumbnail Section */}
              <div 
                className={`relative h-56 bg-slate-900 overflow-hidden shrink-0 ${story.videoUrl ? 'cursor-pointer' : ''}`}
                onClick={() => story.videoUrl && setActiveVideo(story.videoUrl)}
              >
                <img 
                  src={story.videoThumbnail} 
                  alt={`${story.destination} trip`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                
                {/* Play Button Overlay (Only shows if a video was uploaded!) */}
                {story.videoUrl && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all group-hover:bg-black/30">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                      <PlayCircle size={32} className="text-white fill-white/20" />
                    </div>
                  </div>
                )}

                {/* Destination Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wide">
                  <MapPin size={14} className="text-blue-600" />
                  {story.destination}
                </div>
              </div>

              {/* Written Feedback Section */}
              <div className="p-8 flex flex-col flex-1 relative">
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote size={40} className="text-slate-900" />
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-slate-600 font-medium italic leading-relaxed mb-6 flex-1">
                  "{story.feedback}"
                </p>

                {/* Traveler Name */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-700 font-bold text-lg border border-white shadow-sm shrink-0">
                    {story.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{story.name}</h4>
                    <span className="text-xs font-medium text-slate-500">Verified Traveler</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}

      {/* CINEMATIC VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setActiveVideo(null)}
            >
              <X size={32} />
            </button>

            {/* Video Player */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the video itself
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