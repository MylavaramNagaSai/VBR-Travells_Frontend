import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function FeaturedGallery() {
  const [fleetVehicles, setFleetVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- HYBRID SCROLL REFS ---
  const sliderRef = useRef(null);
  const isInteracting = useRef(false); // Tracks if user is hovering/dragging/touching
  const exactScrollX = useRef(0); // Tracks sub-pixel scroll position
  
  // Dragging state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  // 1. Fetch Data
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

  // 2. The Auto-Scroll Engine
  useEffect(() => {
    if (fleetVehicles.length === 0) return;

    let animationId;
    const speed = 0.5; // Change this number to make it faster or slower!

    const playAutoScroll = () => {
      if (sliderRef.current && !isInteracting.current) {
        exactScrollX.current += speed;
        
        // The magic infinite loop: If we scroll exactly halfway through our duplicated list, snap back to 0
        if (exactScrollX.current >= sliderRef.current.scrollWidth / 2) {
          exactScrollX.current = 0;
        }
        
        sliderRef.current.scrollLeft = exactScrollX.current;
      }
      animationId = requestAnimationFrame(playAutoScroll);
    };

    animationId = requestAnimationFrame(playAutoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [fleetVehicles.length]);

  // 3. Keep Auto-Scroll synced if user manually swipes on mobile/touchpad
  const handleNativeScroll = () => {
    if (sliderRef.current && isInteracting.current) {
      // If the user manually scrolls, update our engine's tracker so it doesn't jump when they let go
      exactScrollX.current = sliderRef.current.scrollLeft;
    }
  };

  // 4. Mouse Drag & Pause Handlers
  const handleMouseEnter = () => { isInteracting.current = true; };
  const handleMouseLeave = () => { 
    isInteracting.current = false; 
    isDragging.current = false; 
  };
  
  const handleTouchStart = () => { isInteracting.current = true; };
  const handleTouchEnd = () => { isInteracting.current = false; };

  const handleMouseDown = (e) => {
    isInteracting.current = true;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isInteracting.current = false; // Resume auto-scroll
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    hasDragged.current = true;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
    exactScrollX.current = sliderRef.current.scrollLeft; // Keep engine in sync
  };

  const preventDragClick = (e) => {
    if (hasDragged.current) e.preventDefault();
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (fleetVehicles.length === 0) return null;

  // Duplicate the array 4 times so the infinite loop has plenty of track to run on
  const infiniteGallery = [...fleetVehicles, ...fleetVehicles, ...fleetVehicles, ...fleetVehicles];

  return (
    <div className="w-full pt-4 pb-12 relative">
      <div 
        ref={sliderRef}
        onScroll={handleNativeScroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex overflow-x-auto gap-4 md:gap-6 px-4 md:px-8 pb-8 scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ 
          WebkitOverflowScrolling: 'touch', 
          msOverflowStyle: 'none',          
          scrollbarWidth: 'none'            
        }}
      >
        {infiniteGallery.map((vehicle, index) => {
          const displayImage = vehicle.image || vehicle.mainImage || vehicle.imageUrl || "/vbr-logo.jpg";
          
          return (
            <Link 
              key={`${vehicle.id}-${index}`} 
              to={`/fleet/${vehicle.id}`} 
              onClick={preventDragClick}
              className="relative w-40 sm:w-48 md:w-64 h-56 sm:h-64 md:h-72 rounded-2xl md:rounded-[2rem] overflow-hidden shrink-0 group shadow-md shadow-slate-200/50 border border-slate-100 bg-white flex flex-col transition-all hover:shadow-xl hover:border-blue-500/30"
              draggable="false"
            >
              <div className="w-full flex-1 bg-slate-100 relative overflow-hidden pointer-events-none">
                <img 
                  src={displayImage} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                  loading="lazy"
                  draggable="false"
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
              
              <div className="w-full h-12 py-1 px-2 bg-white border-t border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-50 transition-colors pointer-events-none">
                <h3 className="text-slate-800 font-bold text-[11px] sm:text-xs md:text-sm text-center line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {vehicle.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}