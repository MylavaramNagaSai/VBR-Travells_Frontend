import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Briefcase, PlayCircle } from "lucide-react";

// Mixed data including both images and "video" entries
const fullFleet = [
  { id: 1, type: "Car", name: "Toyota Etios", capacity: "4 Seats", luggage: "2 Bags", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop", isVideo: false },
  { id: 2, type: "Car", name: "Maruti Dzire", capacity: "4 Seats", luggage: "2 Bags", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop", isVideo: false },
  { id: 3, type: "SUV", name: "Innova Crysta", capacity: "7 Seats", luggage: "4 Bags", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop", isVideo: true },
  { id: 4, type: "SUV", name: "Toyota Rumion", capacity: "7 Seats", luggage: "3 Bags", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop", isVideo: false },
  { id: 5, type: "Tempo", name: "12 Seater Tempo", capacity: "12 Seats", luggage: "6 Bags", image: "https://images.unsplash.com/photo-1516934161286-665e8aebcc29?q=80&w=800&auto=format&fit=crop", isVideo: false },
  { id: 6, type: "Tempo", name: "17 Seater Tempo", capacity: "17 Seats", luggage: "8 Bags", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop", isVideo: true },
  { id: 7, type: "Tempo", name: "26 Seater Tempo", capacity: "26 Seats", luggage: "12 Bags", image: "https://images.unsplash.com/photo-1544431872-595fc5f5bbd2?q=80&w=800&auto=format&fit=crop", isVideo: false },
  { id: 8, type: "Bus", name: "40 Seater Mini Bus", capacity: "40 Seats", luggage: "20 Bags", image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=800&auto=format&fit=crop", isVideo: false },
  { id: 9, type: "Bus", name: "Volvo AC Sleeper", capacity: "36 Berths", luggage: "Large Holds", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", isVideo: true },
  { id: 10, type: "Bus", name: "Luxury Coach", capacity: "50 Seats", luggage: "Large Holds", image: "https://images.unsplash.com/photo-1558234850-89196b052062?q=80&w=800&auto=format&fit=crop", isVideo: false },
];

export default function FleetShowcase() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic based on the search input
  const filteredFleet = fullFleet.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.capacity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full py-16 px-4 max-w-7xl mx-auto">
      
      {/* Title & Search Bar Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Complete Fleet</h2>
          <p className="text-slate-500 font-medium mt-2 max-w-md">
            From hatchbacks to luxury Volvo buses, explore the vehicles that will take you there.
          </p>
        </div>

        {/* The Search Bar */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, type, or seats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Grid Layout containing vehicles */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredFleet.length > 0 ? (
            filteredFleet.map((vehicle) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                key={vehicle.id}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col"
              >
                {/* Media Section (Image or Video Thumbnail) */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Play Button Overlay for Videos */}
                  {vehicle.isVideo && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px] transition-all group-hover:bg-black/40 cursor-pointer">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                        <PlayCircle size={32} className="text-white fill-white/20" />
                      </div>
                    </div>
                  )}

                  {/* Vehicle Type Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wide">
                    {vehicle.type}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{vehicle.name}</h3>
                  
                  <div className="flex items-center gap-6 text-slate-600 font-medium">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Users size={18} className="text-blue-500" />
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Briefcase size={18} className="text-purple-500" />
                      <span>{vehicle.luggage}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            /* Empty State if search finds nothing */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No vehicles found</h3>
              <p className="text-slate-500 mt-2">We couldn't find anything matching "{searchTerm}". Try another search.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}