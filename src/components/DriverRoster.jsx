import { useState, useRef, useEffect } from "react";
import { ShieldCheck, UserCheck, HeartHandshake, CarFront, FileBadge, Languages, MessageCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

// --- Data & Helpers ---

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

const rawDrivers = [
  { id: 1, name: "SK HABEEB BASHA", license: "DLFAP026104462003", experience: "16 Years", languages: "English, Hindi, Telugu, Tamil", image: "./habeebbasha.jpeg" },
  { id: 2, name: "N SREENIVASULU", license: "AP2262017000237", experience: "18 Years", languages: "Hindi, Tamil, Telugu, English", image: "./nsrinivasulu.jpeg" },
  { id: 3, name: "SK SHAHUL HAMEED", license: "1234/DL/1999", experience: "26 Years", languages: "English, Hindi, Telugu, Tamil", image: "./shahulhameed.jpeg" },
  { id: 4, name: "PUJARI KIRAN", license: "556760392638", experience: "15 Years", languages: "English, Telugu, Hindi", image: null },
  { id: 5, name: "A SREENIVASULU", license: "2873/FDL/1993", experience: "28 Years", languages: "Hindi, English, Telugu, Tamil", image: null },
  { id: 6, name: "MASTHANBASHA SK", license: "Verified", experience: "20 Years", languages: "Telugu, Hindi, English", image: null },
  { id: 7, name: "RAVI KUMAR", license: "Verified", experience: "15 Years", languages: "Tamil, English, Hindi, Telugu", image: null },
  { id: 8, name: "SK HUSSAIN BASHA", license: "Verified", experience: "4 Years", languages: "Telugu, Hindi, English", image: "./skhussainbasha.jpeg" },
  { id: 9, name: "CH NARENDRA", license: "DLFAP22614242008", experience: "17 Years", languages: "Hindi, English, Telugu, Tamil", image: null },
  { id: 10, name: "CH NARENDRA", license: "DLFAP22614242008", experience: "17 Years", languages: "Hindi, English, Telugu, Tamil", image: "./chnarendra.jpeg" },
  { id: 11, name: "VINOD KUMAR", license: "Verified", experience: "6 Years", languages: "Hindi, English, Tamil, Telugu", image: "./vinodkumar.jpeg" },
  { id: 12, name: "P MOHANRAJ", license: "AP12620140001175", experience: "15 Years", languages: "Telugu, English, Tamil, Hindi", image: null },
  { id: 13, name: "RAJESH KUMAR", license: "Verified", experience: "7 Years", languages: "English, Hindi, Tamil, Kannada", image: "./rajeshkumar.jpeg" },
  { id: 14, name: "NOOR KHAN", license: "Verified", experience: "12 Years", languages: "Hindi, Telugu, English", image: "./noorkhan.jpeg" },
  { id: 15, name: "SHAIK FAMIL", license: "Verified", experience: "10 Years", languages: "Hindi, English, Telugu", image: "./shaikfamel.jpeg" },
  { id: 16, name: "THAYYUB SHAIK", license: "AP02620150008799", experience: "16 Years", languages: "Hindi, Telugu, Tamil", image: null },
  { id: 17, name: "SAYYED SHAKEEL", license: "Verified", experience: "12 Years", languages: "English, Hindi, Telugu", image: null },
  { id: 18, name: "KARIMULLA SK", license: "Verified", experience: "15 Years", languages: "Hindi, English, Telugu", image: "./shaikkarimulla.jpeg" },
  { id: 19, name: "PATHAN IRFAN", license: "Verified", experience: "5 Years", languages: "Hindi, English, Telugu, Tamil", image: "./pathanirfan.jpeg" },
  { id: 20, name: "FOZIL SHAIK", license: "AP22620130001784", experience: "15 Years", languages: "English, Hindi, Telugu, Tamil, Malayalam, Kannada", image: null }
];

const drivers = rawDrivers.sort((a, b) => a.name.localeCompare(b.name));

const getInitials = (name) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].substring(0, 2).toUpperCase();
};

const getWhatsAppLink = (driver) => {
  const phone = "919866128901";
  const message = `Hello VBR Travels,\n\nI am interested in booking this driver:\n\n*Name:* ${driver.name}\n*Experience:* ${driver.experience}\n*License:* ${driver.license}\n*Languages:* ${driver.languages}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

// --- Components ---

// Redesigned Card: Scaled up to be highly readable without overpowering the page
const DriverCard = ({ driver }) => {
  return (
    <div className="relative w-48 h-72 md:w-64 md:h-[340px] rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 bg-slate-900 group shrink-0 cursor-pointer">
      
      {driver.image ? (
        <img
          src={driver.image}
          alt={driver.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none opacity-80 group-hover:opacity-100"
          loading="lazy"
          draggable="false"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center pointer-events-none">
          <span className="text-white text-5xl md:text-6xl font-black tracking-widest opacity-30">
            {getInitials(driver.name)}
          </span>
        </div>
      )}

      {/* Heavy gradient so the white text is always readable over photos */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent pointer-events-none" />

      {/* Floating Verification Badge */}
      <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-blue-400/30 z-10 shadow-sm">
        <ShieldCheck size={12} /> Pro
      </div>

      {/* Driver Info Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end pointer-events-none">
        
        <h3 className="text-[15px] md:text-[17px] font-black text-white leading-tight mb-2 line-clamp-1 drop-shadow-md">
          {driver.name}
        </h3>

        {/* Info Grid - Scaled up for better readability */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-slate-300 text-[10px] md:text-[11px] font-medium">
            <CarFront size={14} className="text-emerald-400 shrink-0" />
            <span className="truncate">Exp: {driver.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-[10px] md:text-[11px] font-medium">
            <FileBadge size={14} className="text-purple-400 shrink-0" />
            <span className="truncate">{driver.license}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-[10px] md:text-[11px] font-medium">
            <Languages size={14} className="text-amber-400 shrink-0" />
            <span className="truncate">{driver.languages}</span>
          </div>
        </div>

        {/* Action Button: Increased touch target size */}
        <a
          href={getWhatsAppLink(driver)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5C] text-white py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-[#25D366]/20 active:scale-95 pointer-events-auto"
        >
          <MessageCircle size={16} /> Book Driver
        </a>
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

      <div ref={trackRef} className="flex w-max cursor-grab">
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredDrivers.length === 0 && (
          <p className="text-center text-slate-500 font-medium mt-6">No drivers found matching "{searchQuery}"</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-2 md:gap-4 min-h-[360px]">
        {searchQuery.trim() !== "" ? (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-6 py-4">
            {filteredDrivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        ) : (
          <AutoDraggableRow items={filteredDrivers} slideDirection="left" />
        )}
      </div>

    </div>
  );
}