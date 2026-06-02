import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function FeaturedGallery() {
  const [fleetVehicles, setFleetVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fleetRef = ref(db, "fleet"); 
    const unsubscribe = onValue(fleetRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setFleetVehicles(formattedData);
      } else {
        setFleetVehicles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getDoubledGallery = () => {
    if (fleetVehicles.length === 0) return [];
    if (fleetVehicles.length <= 4) return [...fleetVehicles, ...fleetVehicles, ...fleetVehicles, ...fleetVehicles];
    return [...fleetVehicles, ...fleetVehicles];
  };

  const doubledGallery = getDoubledGallery();

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (fleetVehicles.length === 0) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center text-slate-400">
        <p className="font-bold">Our fleet is currently being updated.</p>
        <p className="text-sm">Check back soon for our new vehicles!</p>
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
          animation: hero-scroll ${fleetVehicles.length > 5 ? '90s' : '40s'} linear infinite;
        }
        .animate-hero-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full relative">
        <div className="animate-hero-scroll gap-3 md:gap-4 px-4">
          
          {doubledGallery.map((vehicle, index) => {
            const displayImage = vehicle.image || vehicle.mainImage || vehicle.imageUrl || "/vbr-logo.jpg";
            
            return (
              <Link 
                key={`${vehicle.id}-${index}`} 
                to={`/fleet/${vehicle.id}`} 
                className="relative w-40 sm:w-48 md:w-64 h-56 sm:h-64 md:h-72 rounded-2xl md:rounded-[2rem] overflow-hidden shrink-0 group shadow-md shadow-slate-200/50 border border-slate-100 bg-white flex flex-col cursor-pointer transition-all hover:shadow-xl hover:border-blue-500/30"
              >
                <div className="w-full flex-1 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={displayImage} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  {(vehicle.categoryTag || vehicle.type) && (
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-[8px] md:text-[10px] font-black uppercase tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm">
                      {vehicle.categoryTag || vehicle.type}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-md uppercase tracking-wider scale-90 group-hover:scale-100 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                </div>
                
                <div className="w-full h-12 py-1 px-2 bg-white border-t border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-50 transition-colors">
                  <h3 className="text-slate-800 font-bold text-[11px] sm:text-xs md:text-sm text-center line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {vehicle.name}
                  </h3>
                </div>
              </Link>
            );
          })}
          
        </div>
      </div>
    </div>
  );
}