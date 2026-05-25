import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, Route, Navigation, ArrowRight } from "lucide-react";

export default function TripCalculator() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [waypoints, setWaypoints] = useState([""]); // Start with one empty waypoint
  const [isCalculating, setIsCalculating] = useState(false);
  const [tripData, setTripData] = useState(null);

  // Add a new destination input (Limit to 10 to keep it clean)
  const addWaypoint = () => {
    if (waypoints.length < 10) {
      setWaypoints([...waypoints, ""]);
    }
  };

  // Remove a specific destination
  const removeWaypoint = (index) => {
    const newWaypoints = [...waypoints];
    newWaypoints.splice(index, 1);
    setWaypoints(newWaypoints);
  };

  // Update a specific destination's text
  const updateWaypoint = (index, value) => {
    const newWaypoints = [...waypoints];
    newWaypoints[index] = value;
    setWaypoints(newWaypoints);
  };

  // The Google Maps Calculation Engine
  const calculateTotalDistance = () => {
    setIsCalculating(true);

    // ⚠️ NOTE: To make this work live, you need a Google Maps API Key.
    // For now, this simulates the API response so you can see the UI working beautifully.
    // In production, you will pass 'origin', 'destination', and 'waypoints' to new google.maps.DirectionsService()
    
    setTimeout(() => {
      // Simulated Google Maps Response
      setTripData({
        totalDistance: "845 km",
        totalDuration: "14 hrs 30 mins",
        routeSummary: `${origin || "Start"} to ${destination || "End"} via ${waypoints.filter(w => w !== "").length} stops.`
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="w-full py-16 px-4 max-w-4xl mx-auto">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Smart Trip Planner</h2>
        <p className="text-slate-500 font-medium mt-2 max-w-xl mx-auto">
          Enter your starting point, all the destinations you want to visit, and your final stop. We will calculate the entire route instantly.
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-2xl border border-white shadow-xl shadow-slate-200/50 rounded-3xl p-6 md:p-10">
        
        <div className="flex flex-col gap-4">
          {/* Starting Point */}
          <div className="flex items-center gap-4 bg-white/80 rounded-xl p-4 border border-slate-200 shadow-sm focus-within:border-blue-500 transition-colors">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Navigation size={16} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Starting Point</span>
              <input 
                type="text" 
                placeholder="Where does the trip begin?" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-900 font-semibold placeholder-slate-400"
              />
            </div>
          </div>

          {/* Dynamic Waypoints (The 10 Places) */}
          <div className="pl-4 ml-4 border-l-2 border-dashed border-slate-300 py-2 flex flex-col gap-3">
            <AnimatePresence>
              {waypoints.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-center gap-3 bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 shadow-sm"
                >
                  <MapPin size={18} className="text-slate-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder={`Destination ${index + 1}`} 
                    value={point}
                    onChange={(e) => updateWaypoint(index, e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-slate-700 font-medium placeholder-slate-400 text-sm"
                  />
                  {waypoints.length > 1 && (
                    <button 
                      onClick={() => removeWaypoint(index)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {waypoints.length < 10 && (
              <button 
                onClick={addWaypoint}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 w-fit mt-2 py-2 px-3 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus size={16} /> Add another destination
              </button>
            )}
          </div>

          {/* Ending Point */}
          <div className="flex items-center gap-4 bg-white/80 rounded-xl p-4 border border-slate-200 shadow-sm focus-within:border-purple-500 transition-colors">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Final Stop</span>
              <input 
                type="text" 
                placeholder="Where does the trip end?" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-900 font-semibold placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Calculate Button & Results */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200">
          
          <div className="flex-1 w-full">
            <AnimatePresence>
              {tripData && !isCalculating && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800 rounded-xl p-5 shadow-lg shadow-slate-300"
                >
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Trip Estimate</span>
                  <div className="flex items-end gap-4 mt-2">
                    <div className="text-3xl font-black text-white">{tripData.totalDistance}</div>
                    <div className="text-lg font-medium text-slate-300 mb-1 flex items-center gap-1">
                      <Route size={18} /> {tripData.totalDuration}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 mt-2 font-medium">{tripData.routeSummary}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={calculateTotalDistance}
            disabled={isCalculating}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
              isCalculating 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/30 hover:scale-[1.02]"
            }`}
          >
            {isCalculating ? "Calculating Route..." : "Calculate Distance"} 
            {!isCalculating && <ArrowRight size={18} />}
          </button>
        </div>

      </div>
    </div>
  );
}