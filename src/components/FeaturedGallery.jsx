import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function FeaturedGallery() {
  const [galleryVehicles, setGalleryVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // READ from Firebase
  useEffect(() => {
    const galleryRef = ref(db, "gallery_vehicles");
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase object to array
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        // Sort newest first
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setGalleryVehicles(formattedData);
      } else {
        setGalleryVehicles([]); // Empty if nothing in database
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Duplicate the array for the seamless infinite scroll effect
  // If there are very few images, we duplicate them more times so the screen isn't empty
  const getDoubledGallery = () => {
    if (galleryVehicles.length === 0) return [];
    if (galleryVehicles.length <= 4) return [...galleryVehicles, ...galleryVehicles, ...galleryVehicles, ...galleryVehicles];
    return [...galleryVehicles, ...galleryVehicles];
  };

  const doubledGallery = getDoubledGallery();

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If the admin hasn't uploaded any images yet, show a fallback message
  if (galleryVehicles.length === 0) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center text-slate-400">
        <p className="font-bold">Gallery is currently being updated.</p>
        <p className="text-sm">Check back soon for new vehicle photos!</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-4 pb-12 overflow-hidden relative">
      
      <style>{`
        @keyframes hero-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-hero-scroll {
          display: flex;
          width: max-content;
          /* Adjust speed based on how many images exist */
          animation: hero-scroll ${galleryVehicles.length > 5 ? '90s' : '40s'} linear infinite;
        }
        .animate-hero-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full relative">
        <div className="animate-hero-scroll gap-3 md:gap-4 px-4">
          
          {doubledGallery.map((vehicle, index) => (
            <div 
              key={`${vehicle.id}-${index}`} 
              className="relative w-40 sm:w-48 md:w-64 h-56 sm:h-64 md:h-72 rounded-2xl md:rounded-[2rem] overflow-hidden shrink-0 group shadow-md shadow-slate-200/50 border border-slate-100 bg-white flex flex-col"
            >
              <div className="w-full flex-1 bg-slate-100 relative overflow-hidden">
                <img 
                  src={vehicle.imageUrl} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              <div className="w-full h-12 py-1 px-2 bg-white border-t border-slate-100 flex items-center justify-center shrink-0">
                <h3 className="text-slate-800 font-bold text-[11px] sm:text-xs md:text-sm text-center line-clamp-2 leading-tight">
                  {vehicle.name}
                </h3>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}