import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Snowflake, ChevronRight, CheckCircle2, Search, Eye, MapPin } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function FleetShowcase() {
  const [fleet, setFleet] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH LIVE FLEET DATA
  useEffect(() => {
    const fleetRef = ref(db, "fleet");
    const unsubscribe = onValue(fleetRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fleetArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Sort newest first
        fleetArray.sort((a, b) => b.timestamp - a.timestamp);
        setFleet(fleetArray);
      } else {
        setFleet([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredFleet = fleet.filter((vehicle) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      vehicle.name.toLowerCase().includes(searchLower) ||
      vehicle.type.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full py-16 md:py-20 lg:py-24 bg-slate-50 relative">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-12">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm mb-4 shadow-sm">
            <CheckCircle2 size={16} /> Our Verified Fleet
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Ride.
          </h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">
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

        {/* LOADING STATE */}
        {loading ? (
          <div className="w-full py-32 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          /* 6-COLUMN FLUID GRID */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">
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
                    className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Vehicle Image */}
                    <div className="relative w-full h-44 xl:h-48 bg-slate-200 overflow-hidden shrink-0">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-black text-slate-800 shadow-sm uppercase tracking-wider">
                        {vehicle.type}
                      </div>
                    </div>

                    {/* Vehicle Content - Fluid Text Sizing (text-sm xl:text-base) */}
                    <div className="p-4 xl:p-5 flex flex-col flex-1">
                      <h3 className="text-sm xl:text-base font-bold text-slate-900 mb-3 line-clamp-2 h-10 xl:h-12 leading-tight">
                        {vehicle.name}
                      </h3>

                      <div className="flex flex-col gap-2 mb-4 xl:mb-5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <div className="flex items-center gap-1 text-[10px] xl:text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                            <Users size={12} className="text-blue-500" /> 
                            {vehicle.seats} {vehicle.beds !== "0" && vehicle.beds ? `+ ${vehicle.beds} Bed` : 'Seater'}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] xl:text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                            <Snowflake size={12} className={vehicle.ac ? "text-blue-500" : "text-slate-400"} /> 
                            {vehicle.ac ? "A/C" : "Non-A/C"}
                          </div>
                        </div>
                        
                        {/* Live Tracking Badge */}
                        {vehicle.liveTracking && (
                          <div className="flex items-center justify-center gap-1.5 text-[10px] xl:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1.5 rounded-lg mb-1 shadow-sm w-full">
                            <MapPin size={12} className="text-emerald-500 shrink-0" />
                            <span className="truncate">Live Tracking</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 mb-4 mt-auto">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Per KM</span>
                          <span className="font-black text-sm xl:text-base text-blue-700">{vehicle.perKm}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5 border-t border-blue-100/60">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Per Day</span>
                          <span className="font-bold text-xs xl:text-sm text-slate-800">{vehicle.perDay}</span>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex flex-col gap-2 w-full">
                        <Link 
                          to={`/fleet/${vehicle.id}`}
                          className="w-full flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 px-3 py-2 rounded-lg font-bold text-xs xl:text-sm transition-colors"
                        >
                          <Eye size={16} />
                          View Interior & Video
                        </Link>
                        
                        <a 
                          href={`https://wa.me/919866128901?text=Hello,%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(vehicle.name)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between bg-slate-900 hover:bg-blue-600 text-white px-3 xl:px-4 py-2.5 rounded-lg font-bold text-xs xl:text-sm transition-colors group/btn"
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
        )}
      </div>
    </div>
  );
}