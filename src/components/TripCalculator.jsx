import { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Navigation, MapPin, Plus, ArrowRight, X, Route, Trash2 } from "lucide-react";

// Load the 'places' library for address autocomplete
const libraries = ["places"];

export default function TripCalculator() {
  // 1. Load Google Maps API using your .env key
  const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries: ["places"],
});

  // 2. State Management
  const [waypoints, setWaypoints] = useState([{ id: 1, value: "" }]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Refs to extract data from the Autocomplete inputs
  const originRef = useRef();
  const destinationRef = useRef();
  const waypointRefs = useRef({});

  // 3. Dynamic Waypoint Handlers
  const addWaypoint = () => {
    if (waypoints.length < 5) {
      setWaypoints([...waypoints, { id: Date.now(), value: "" }]);
    }
  };

  const removeWaypoint = (idToRemove) => {
    setWaypoints(waypoints.filter((wp) => wp.id !== idToRemove));
    delete waypointRefs.current[idToRemove];
  };

  // 4. Calculate Route Logic using REAL Google Maps
  const calculateRoute = async () => {
    if (!originRef.current?.value || !destinationRef.current?.value) {
      setError("Please enter at least a starting point and a final destination.");
      return;
    }

    setLoading(true);
    setError("");
    setDistance(null);
    setDuration(null);

    try {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      
      const formattedWaypoints = waypoints
        .map((wp) => waypointRefs.current[wp.id]?.value)
        .filter((val) => val) 
        .map((val) => ({ location: val, stopover: true }));

      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        waypoints: formattedWaypoints,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      let totalDistance = 0;
      let totalDuration = 0;

      results.routes[0].legs.forEach((leg) => {
        totalDistance += leg.distance.value;
        totalDuration += leg.duration.value;
      });

      setDistance((totalDistance / 1000).toFixed(1) + " km");
      
      const hours = Math.floor(totalDuration / 3600);
      const minutes = Math.floor((totalDuration % 3600) / 60);
      setDuration(`${hours > 0 ? hours + " hrs " : ""}${minutes} mins`);

    } catch (err) {
      console.error(err);
      setError("Could not calculate a route. Please use the Google Autocomplete dropdown to select valid addresses.");
    } finally {
      setLoading(false);
    }
  };

  // 5. Loading State check
  if (!isLoaded) {
    return (
      <div className="w-full py-20 flex justify-center text-slate-400 font-bold">
        Loading Maps Engine...
      </div>
    );
  }

  // 6. The UI
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
            <div className="flex-1 w-full relative">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Starting Point</span>
              <Autocomplete>
                <input 
                  type="text" 
                  ref={originRef}
                  placeholder="Where does the trip begin?" 
                  className="w-full bg-transparent border-none outline-none text-slate-900 font-semibold placeholder-slate-400"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Dynamic Waypoints */}
          <div className="pl-4 ml-4 border-l-2 border-dashed border-slate-300 py-2 flex flex-col gap-3">
            {waypoints.map((wp, index) => (
              <div key={wp.id} className="flex items-center gap-3 bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 shadow-sm relative">
                <MapPin size={18} className="text-slate-400 shrink-0" />
                <div className="flex-1 w-full">
                  <Autocomplete>
                    <input 
                      type="text" 
                      ref={(el) => (waypointRefs.current[wp.id] = el)}
                      placeholder={`Destination ${index + 1}`} 
                      className="w-full bg-transparent border-none outline-none text-slate-700 font-medium placeholder-slate-400 text-sm"
                    />
                  </Autocomplete>
                </div>
                <button 
                  onClick={() => removeWaypoint(wp.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {waypoints.length < 5 && (
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
            <div className="flex-1 w-full relative">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Final Stop</span>
              <Autocomplete>
                <input 
                  type="text" 
                  ref={destinationRef}
                  placeholder="Where does the trip end?" 
                  className="w-full bg-transparent border-none outline-none text-slate-900 font-semibold placeholder-slate-400"
                />
              </Autocomplete>
            </div>
          </div>
        </div>

        {/* Calculate Button & Results */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200">
          
          <div className="flex-1 w-full">
            {error && <p className="text-red-500 text-sm font-bold mb-2">{error}</p>}
            
            {distance && duration && !error && (
              <div className="bg-slate-800 rounded-xl p-5 shadow-lg shadow-slate-300">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Trip Estimate</span>
                <div className="flex items-end gap-4 mt-2">
                  <div className="text-3xl font-black text-white">{distance}</div>
                  <div className="text-lg font-medium text-slate-300 mb-1 flex items-center gap-1">
                    <Route size={18} /> {duration}
                  </div>
                </div>
                <div className="text-sm text-slate-400 mt-2 font-medium">
                  {originRef.current?.value.split(',')[0]} to {destinationRef.current?.value.split(',')[0]} via {waypoints.length} stops.
                </div>
              </div>
            )}
          </div>

          <button
            onClick={calculateRoute}
            disabled={loading}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
              loading 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/30 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Calculating..." : "Calculate Distance"} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>

      </div>
    </div>
  );
}