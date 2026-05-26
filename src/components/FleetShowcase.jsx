import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Snowflake, ChevronRight, CheckCircle2, Search, Eye } from "lucide-react";

// Real data extracted from ALL 3 VBR Travels WhatsApp Catalog screenshots (22 Items Total)
const realFleetData = [
  { id: 1, name: "SML Executive Coach 39 Seater A/C", type: "Large Bus", seats: "39 Seater", ac: true, perKm: "₹75", perDay: "₹9,500", image: "/sml39seater.png" },
  { id: 2, name: "New SML Executive 22 Seater Coach A/C", type: "Mini Bus", seats: "22 Seater", ac: true, perKm: "₹55", perDay: "₹9,500", image: "/sml22seater.png" },
  { id: 3, name: "Urbania White 2025 12+Bed", type: "Premium Van", seats: "17 Seater", ac: true, perKm: "₹40", perDay: "₹6,500", image: "/urbainiawhite2025.png" },
  { id: 4, name: "Force Traveler 13+Bed Seater A/C", type: "Tempo Traveller", seats: "13+Bed", ac: true, perKm: "₹34", perDay: "₹3,500", image: "/force13bedseater.png" },
  { id: 5, name: "Force Traveler A/C 18 Seater New", type: "Tempo Traveller", seats: "18 Seater Pushback", ac: true, perKm: "₹37", perDay: "On Request", image: "/force18seater.png" },
  { id: 6, name: "Volvo Model Bus A/C", type: "Luxury Bus", seats: "29 Seater", ac: true, perKm: "₹75", perDay: "₹9,000", image: "/29seaterbus.png" },
  { id: 7, name: "Bus 41 Seater Non-A/C Pushback", type: "Large Bus", seats: "41 Seater", ac: false, perKm: "₹80", perDay: "₹13,000", image: "/busnonac41seater.png" },
  { id: 8, name: "41 Seater A/C New Big Bus", type: "Large Bus", seats: "41 Seater", ac: true, perKm: "₹85", perDay: "₹15,000", image: "/41seateracbus.png" },
  { id: 9, name: "Force Urbania 2025 Model A/C New", type: "Premium Van", seats: "17 Seater", ac: true, perKm: "₹40", perDay: "₹6,500", image: "/forceurbanianew2025.png" },
  { id: 10, name: "Force Traveler 27 Seater A/C (Dicky Type)", type: "Tempo Traveller", seats: "27 Seater", ac: true, perKm: "₹45", perDay: "On Request", image: "/force27seater.png" },
  { id: 11, name: "Innova Crista New 2024", type: "Luxury SUV", seats: "7 Seater", ac: true, perKm: "On Request", perDay: "₹2,500", image: "/innovacrysta2024.png" },
  { id: 12, name: "Force Traveler A/C 13 Maxicab", type: "Tempo Traveller", seats: "13 Seater (10+Bed)", ac: true, perKm: "On Request", perDay: "₹3,500", image: "/forcetraveler13maxicab.png" },
  { id: 13, name: "Innova Crista", type: "Luxury SUV", seats: "7 Seater", ac: true, perKm: "₹23", perDay: "₹2,500", image: "/innovacrysta.png" },
  { id: 14, name: "Mahindra Xylo 8 Seater A/C", type: "SUV", seats: "8 Seater", ac: true, perKm: "₹20", perDay: "On Request", image: "/mahindraxylo.png" },
  { id: 15, name: "Toyota Rumion", type: "MUV", seats: "7 Seater", ac: true, perKm: "₹18", perDay: "On Request", image: "/toyotarumion.png" },
  { id: 16, name: "Kia Carens", type: "Premium MUV", seats: "7 Seater", ac: true, perKm: "₹20", perDay: "₹2,800", image: "/kiacarens.png" },
  { id: 17, name: "Force Traveler New 2024", type: "Tempo Traveller", seats: "13 Seater", ac: true, perKm: "On Request", perDay: "₹3,500", image: "/forcetravellernew2024.png" },
  { id: 18, name: "Force Traveler A/C", type: "Tempo Traveller", seats: "26+1 Seater", ac: true, perKm: "₹45", perDay: "On Request", image: "/forcetravellerac.png" },
  { id: 19, name: "Toyota Innova Crysta 7+1", type: "Premium SUV", seats: "7+1 Seater", ac: true, perKm: "₹22", perDay: "₹2,200", image: "/innovacrysta71.png" },
  { id: 20, name: "10+Bed A/C Pushback", type: "Tempo Traveller", seats: "10+Bed", ac: true, perKm: "On Request", perDay: "₹3,000", image: "/10bedacpushback.png" },
  { id: 21, name: "Bus Non-A/C 41 Seater", type: "Large Bus", seats: "41 Seater", ac: false, perKm: "₹75", perDay: "₹8,000", image: "/41seater.png" },
  { id: 22, name: "A/C 27 Seater Force Traveler", type: "Tempo Traveller", seats: "27 Seater", ac: true, perKm: "₹45", perDay: "₹5,000", image: "/ac27seaterforce.png" }
];

export default function FleetShowcase() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFleet = realFleetData.filter((vehicle) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      vehicle.name.toLowerCase().includes(searchLower) ||
      vehicle.type.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full py-16 bg-slate-50 relative">
      <div className="w-full px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm mb-4 shadow-sm">
            <CheckCircle2 size={16} /> Our Verified Fleet
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Ride.
          </h2>
          <p className="text-slate-500 font-medium mt-4 max-w-2xl text-lg mx-auto">
            From luxury SUVs for family trips to high-capacity Volvo buses for corporate events, our vehicles are priced transparently and maintained perfectly.
          </p>

          {/* Premium Search Bar */}
          <div className="relative w-full max-w-md mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by vehicle name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all"
            />
          </div>
        </div>

        {/* EXPANDED GRID LAYOUT */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFleet.length > 0 ? (
              filteredFleet.map((vehicle) => (
                <motion.div
                  layout
                  key={vehicle.id}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    layout: { type: "spring", stiffness: 250, damping: 25, mass: 0.8 }
                  }}
                  className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Vehicle Image */}
                  <div className="relative w-full h-48 bg-slate-200 overflow-hidden shrink-0">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-black text-slate-800 shadow-sm uppercase tracking-wider">
                      {vehicle.type}
                    </div>
                  </div>

                  {/* Vehicle Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 h-14">
                      {vehicle.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-md">
                        <Users size={14} className="text-blue-500" /> {vehicle.seats}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-md">
                        <Snowflake size={14} className={vehicle.ac ? "text-blue-500" : "text-slate-400"} /> 
                        {vehicle.ac ? "A/C" : "Non-A/C"}
                      </div>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 mb-5 mt-auto">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Rate Per KM</span>
                        <span className="font-black text-base text-blue-700">{vehicle.perKm}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 border-t border-blue-100">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Rate Per Day</span>
                        <span className="font-bold text-sm text-slate-800">{vehicle.perDay}</span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-col gap-2.5 w-full">
                      {/* CHANGED: Points directly to /coming-soon */}
                      <a 
                        href="/coming-soon"
                        className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
                      >
                        <Eye size={16} />
                        View Interior
                      </a>
                      
                      <a 
                        href={`https://wa.me/919876543210?text=Hello,%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(vehicle.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between bg-slate-900 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors group/btn"
                      >
                        Book Now
                        <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>

                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="text-xl font-bold text-slate-500">
                  No vehicles found matching "{searchQuery}"
                </p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}