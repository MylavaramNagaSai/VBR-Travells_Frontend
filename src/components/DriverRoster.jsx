import { useState, useRef, useEffect } from "react";
import { ShieldCheck, UserCheck, HeartHandshake, CarFront, FileBadge, Languages, MessageCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

// --- Helpers & Static Data ---
const safetyProtocols = [
  {
    icon: ShieldCheck,
    title: "Zero Tolerance Policy",
    desc: "Every driver passes mandatory breathalyzer and smoking tests before being dispatched for any trip.",
    color: "text-emerald-600",
    bg: "bg-emerald-100"
  },
  {
    icon: UserCheck,
    title: "Professional Attire",
    desc: "Our chauffeurs are strictly dedicated to wearing official company uniforms along with verified ID cards.",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    icon: HeartHandshake,
    title: "Experienced & Safe",
    desc: "We only hire highly experienced drivers trained specifically in defensive, careful, and smooth driving.",
    color: "text-amber-600",
    bg: "bg-amber-100"
  }
];

const getInitials = (name) => {
  if (!name) return "DR";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].substring(0, 2).toUpperCase();
};

const getWhatsAppLink = (driver) => {
  const phone = "919866128901";
  const message = `Hello VBR Travels,\n\nI am interested in booking this driver:\n\n*Name:* ${driver.name}\n*Experience:* ${driver.experience}\n*License:* ${driver.license}\n*Languages:* ${driver.languages}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

// --- UPDATED CIRCULAR DRIVER CARD COMPONENT ---
const DriverCard = ({ driver }) => {
  return (
    <div className="w-56 md:w-64 bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center p-6 shrink-0 relative group transition-transform duration-300 hover:-translate-y-1">
      
      {/* Pro Badge */}
      <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 z-10 border border-blue-100 shadow-sm">
        <ShieldCheck size={12} /> Pro
      </div>

      {/* Circular Image Container */}
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-md shadow-slate-200 mb-5 relative z-10 bg-slate-100 shrink-0 group-hover:scale-105 transition-transform duration-300">
        {driver.imageUrl ? (
          <img
            src={driver.imageUrl}
            alt={driver.name}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
            <span className="text-white text-3xl font-black tracking-widest opacity-50">
              {getInitials(driver.name)}
            </span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col items-center text-center w-full mb-6 flex-1">
        <h3 className="text-lg md:text-xl font-black text-slate-800 mb-4 truncate w-full">
          {driver.name}
        </h3>

        {/* Info Pills */}
        <div className="flex flex-col gap-2 w-full text-left">
          <div className="flex items-center gap-2.5 text-slate-600 text-xs font-medium bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <CarFront size={14} className="text-emerald-500 shrink-0" />
            <span className="truncate">Exp: {driver.experience}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600 text-xs font-medium bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <FileBadge size={14} className="text-purple-500 shrink-0" />
            <span className="truncate">{driver.license}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600 text-xs font-medium bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <Languages size={14} className="text-amber-500 shrink-0" />
            <span className="truncate">{driver.languages}</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <a
        href={getWhatsAppLink(driver)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5C] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-[#25D366]/20 active:scale-95 mt-auto"
      >
        <MessageCircle size={18} /> Book Driver
      </a>
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

  const paddedItems = [...items];
  while (paddedItems.length > 0 && paddedItems.length < 15) {
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
  }, [isHovered, slideDirection, paddedItems.length]);

  useEffect(() => {
    if (slideDirection === "right" && halfRef.current) {
      x.current = -halfRef.current.offsetWidth;
    }
  }, [slideDirection, paddedItems.length]);

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

  if (paddedItems.length === 0) return null;

  return (
    <div 
      className="w-full overflow-hidden py-4 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleDragEnd}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onMouseDown={(e) => handleDragStart(e.pageX)}
      onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
      onMouseMove={(e) => {
        if (isDragging.current) e.preventDefault();
        handleDragMove(e.pageX);
      }}
      onTouchMove={(e) => handleDragMove(e.touches[0].pageX)}
    >
      <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="flex w-max cursor-grab pb-4 pt-2">
        <div ref={halfRef} className="flex gap-4 md:gap-6 pr-4 md:pr-6">
          {paddedItems.map((driver, idx) => (
            <DriverCard key={`half1-${driver.id}-${idx}`} driver={driver} />
          ))}
        </div>
        <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
          {paddedItems.map((driver, idx) => (
            <DriverCard key={`half2-${driver.id}-${idx}`} driver={driver} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Layout ---
export default function DriverRoster() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // FETCH LIVE DATA FROM FIREBASE
  useEffect(() => {
    const driversRef = ref(db, "drivers");
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const driversArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Alphabetical sort by name
        driversArray.sort((a, b) => a.name.localeCompare(b.name));
        setDrivers(driversArray);
      } else {
        setDrivers([]);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full py-32 flex justify-center items-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 bg-slate-50 overflow-hidden relative">
      
      <div className="text-center px-6 lg:px-12 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Professional Chauffeurs</h2>
        <p className="text-slate-500 font-medium mt-4 max-w-2xl mx-auto text-lg">
          Your safety and comfort are our highest priorities. All our drivers are background verified and carry valid commercial licenses.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-slate-200/50 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyProtocols.map((protocol, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${protocol.bg} flex items-center justify-center mb-4`}>
                  <protocol.icon size={28} className={protocol.color} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{protocol.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{protocol.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 mb-12 relative z-20">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search drivers by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {drivers.length === 0 ? (
        <div className="text-center py-12">
          <UserCheck size={48} className="mx-auto text-slate-300 mb-4 opacity-50" />
          <p className="text-slate-500 font-bold">Driver roster is currently being updated.</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 md:gap-4 min-h-[420px]">
          {searchQuery.trim() !== "" ? (
            <>
              {filteredDrivers.length === 0 ? (
                <p className="text-center text-slate-500 font-medium mt-6">No drivers found matching "{searchQuery}"</p>
              ) : (
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-6 py-4">
                  {filteredDrivers.map(driver => (
                    <DriverCard key={driver.id} driver={driver} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <AutoDraggableRow items={filteredDrivers} slideDirection="left" />
          )}
        </div>
      )}

    </div>
  );
}