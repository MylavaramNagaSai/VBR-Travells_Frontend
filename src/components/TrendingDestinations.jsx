import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

const DestinationCard = ({ place }) => {
  return (
    <div className="relative w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 bg-white group shrink-0 cursor-pointer">
      <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" loading="lazy" draggable="false" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-3 w-full flex flex-col gap-0.5 text-white pointer-events-none">
        <div className="flex items-start gap-1">
          <MapPin size={12} className="text-blue-400 shrink-0 mt-0.5" />
          <h3 className="text-[12px] md:text-[14px] font-bold tracking-tight drop-shadow-md leading-tight line-clamp-2">{place.name}</h3>
        </div>
        <p className="text-[9px] md:text-[10px] text-slate-300 font-medium pl-4 tracking-wider uppercase">{place.state}</p>
      </div>
    </div>
  );
};

const AutoDraggableRow = ({ items, slideDirection = "left" }) => {
  const trackRef = useRef(null);
  const halfRef = useRef(null);
  const x = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Failsafe to prevent empty rendering errors
  if (!items || items.length === 0) return null;

  const paddedItems = [...items];
  while (paddedItems.length < 15) {
    paddedItems.push(...items);
  }

  useEffect(() => {
    let animationFrameId;
    const speed = 0.5;

    const animate = () => {
      if (!isHovered && !isDragging.current && halfRef.current && trackRef.current) {
        const halfWidth = halfRef.current.offsetWidth;
        if (slideDirection === "left") {
          x.current -= speed;
          if (x.current <= -halfWidth) x.current += halfWidth;
        } else {
          x.current += speed;
          if (x.current >= 0) x.current -= halfWidth;
        }
        trackRef.current.style.transform = `translateX(${x.current}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, slideDirection]);

  useEffect(() => {
    if (slideDirection === "right" && halfRef.current) {
      x.current = -halfRef.current.offsetWidth;
    }
  }, [slideDirection]);

  const handleDragStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX - x.current;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    setIsHovered(false);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current || !halfRef.current) return;
    const halfWidth = halfRef.current.offsetWidth;
    let newX = clientX - startX.current;
    while (newX > 0) newX -= halfWidth;
    while (newX <= -halfWidth) newX += halfWidth;
    x.current = newX;
    trackRef.current.style.transform = `translateX(${x.current}px)`;
  };

  return (
    <div 
      className="w-full overflow-hidden py-2"
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleDragEnd} onMouseUp={handleDragEnd} onTouchEnd={handleDragEnd}
      onMouseDown={(e) => handleDragStart(e.pageX)} onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
      onMouseMove={(e) => { if (isDragging.current) e.preventDefault(); handleDragMove(e.pageX); }}
      onTouchMove={(e) => handleDragMove(e.touches[0].pageX)}
    >
      <div ref={trackRef} className="flex w-max cursor-grab">
        <div ref={halfRef} className="flex gap-4 md:gap-5 pr-4 md:pr-5">
          {paddedItems.map((place, idx) => <DestinationCard key={`half1-${idx}`} place={place} />)}
        </div>
        <div className="flex gap-4 md:gap-5 pr-4 md:pr-5">
          {paddedItems.map((place, idx) => <DestinationCard key={`half2-${idx}`} place={place} />)}
        </div>
      </div>
    </div>
  );
};

export default function TrendingDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Read from Firebase
  useEffect(() => {
    const destRef = ref(db, "destinations");
    const unsubscribe = onValue(destRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setDestinations(formattedData);
      } else {
        setDestinations([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
        <MapPin size={48} className="mb-4 opacity-20" />
        <p className="font-bold">Destinations are being updated.</p>
        <p className="text-sm">Check back soon for breathtaking spots!</p>
      </div>
    );
  }

  // Magically extract the unique states from whatever you uploaded in Firebase!
  const availableStates = [...new Set(destinations.map(d => d.state))];
  const dynamicCategories = ["All", ...availableStates];

  const filteredDestinations = activeCategory === "All"
    ? destinations
    : destinations.filter(d => d.state === activeCategory);

  const row1 = filteredDestinations.filter((_, i) => i % 3 === 0);
  const row2 = filteredDestinations.filter((_, i) => i % 3 === 1);
  const row3 = filteredDestinations.filter((_, i) => i % 3 === 2);

  return (
    <div className="w-full py-16 flex flex-col bg-slate-50 my-8 overflow-hidden">
      
      <div className="text-center px-6 lg:px-8 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Trending Destinations</h2>
        <p className="text-slate-500 font-medium mt-4 max-w-xl mx-auto">
          Explore the most breathtaking spots across India. Filter by state to find your next perfect getaway.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 px-4">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all shadow-sm ${
              activeCategory === cat
                ? "bg-slate-900 text-white shadow-lg scale-105"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative w-full flex flex-col gap-2 md:gap-4">
        <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {row1.length > 0 && <AutoDraggableRow items={row1} slideDirection="left" />}
        {row2.length > 0 && <AutoDraggableRow items={row2} slideDirection="right" />}
        {row3.length > 0 && <AutoDraggableRow items={row3} slideDirection="left" />}
      </div>
    </div>
  );
}