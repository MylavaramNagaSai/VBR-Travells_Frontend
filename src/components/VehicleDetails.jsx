import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Snowflake, CheckCircle2, MapPin, Play, Image as ImageIcon, Check, Phone, ArrowLeft } from "lucide-react";
import { fleetData } from "../data/fleetData"; // Import your central data

export default function VehicleDetails() {
  const { slug } = useParams(); // Reads the URL (e.g., /fleet/innova-crysta)
  const [activeMedia, setActiveMedia] = useState(0);

  // Find the exact vehicle matching the URL
  const vehicle = fleetData.find(v => v.slug === slug);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!vehicle) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Vehicle Not Found</h1>
        <p className="text-slate-500 mb-8">The vehicle you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Return to Fleet</Link>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/919866128901?text=Hello,%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(vehicle.name)}.%20Can%20you%20share%20availability?`;

  return (
    <div className="w-full pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to All Vehicles
        </Link>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT COLUMN: Media Gallery */}
          <div className="w-full lg:w-3/5 bg-slate-900 flex flex-col relative h-[50vh] lg:h-auto min-h-[400px]">
            {/* Main Viewer */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
              <AnimatePresence mode="wait">
                {activeMedia < vehicle.gallery.length ? (
                  <motion.img 
                    key={`img-${activeMedia}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={vehicle.gallery[activeMedia].src} 
                    alt="Vehicle Interior" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <motion.div 
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${vehicle.videoId}?autoplay=1&mute=1`}
                      title="Vehicle Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnail Strip */}
            <div className="h-24 md:h-28 bg-slate-950 flex gap-3 p-3 overflow-x-auto shrink-0 [&::-webkit-scrollbar]:hidden">
              {vehicle.gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={`relative shrink-0 w-24 md:w-32 h-full rounded-xl overflow-hidden border-2 transition-all ${activeMedia === idx ? "border-blue-500 scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img src={img.src} className="w-full h-full object-cover" alt="Thumb" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <ImageIcon size={16} className="text-white drop-shadow-md" />
                  </div>
                </button>
              ))}
              <button 
                onClick={() => setActiveMedia(vehicle.gallery.length)}
                className={`relative shrink-0 w-24 md:w-32 h-full bg-slate-800 rounded-xl overflow-hidden border-2 flex items-center justify-center transition-all ${activeMedia === vehicle.gallery.length ? "border-red-500 scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}
              >
                <Play size={24} className="text-red-500 fill-red-500" />
                <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white bg-black/50 px-1 rounded">VIDEO</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Specs */}
          <div className="w-full lg:w-2/5 flex flex-col bg-white">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-8 flex-grow">
              
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                    {vehicle.type}
                  </span>
                  <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                    <MapPin size={12} /> Live Tracking
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                    <CheckCircle2 size={12} /> Verified Condition
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
                  {vehicle.name}
                </h1>
                <p className="text-slate-500 font-medium text-sm lg:text-base leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-5 flex flex-col gap-1">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Rate Per KM</span>
                  <span className="text-2xl lg:text-3xl font-black text-blue-600">{vehicle.perKm}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-5 flex flex-col gap-1">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Rate Per Day</span>
                  <span className="text-2xl lg:text-3xl font-black text-slate-900">{vehicle.perDay}</span>
                </div>
              </div>

              {/* Amenities List */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  Comfort & Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Users size={12} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{vehicle.seats}</span>
                  </div>
                  {vehicle.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-emerald-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Bottom Action */}
            <div className="p-6 md:p-8 bg-white border-t border-slate-100 mt-auto shrink-0">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5C] text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-[#25D366]/20 hover:-translate-y-1"
              >
                <Phone size={24} className="fill-white" />
                Book via WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}