import { useState, useEffect } from "react";
import { ref as dbRef, onValue, update } from "firebase/database";
import { db } from "../firebase";
import { MapPin, Link as LinkIcon, Activity, Trash2, AlertCircle, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTracking() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [trackingLink, setTrackingLink] = useState("");

  // 1. AUTO-FETCH FLEET DATA
  useEffect(() => {
    const fleetRef = dbRef(db, "fleet");
    const unsubscribe = onValue(fleetRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fleetArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setVehicles(fleetArray);
      } else {
        setVehicles([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. ASSIGN TRACKING LINK
  const handleAssignTracking = async (e) => {
    e.preventDefault();
    if (!selectedVehicleId || !trackingLink.trim()) {
      setError("Please select a vehicle and provide a tracking link.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await update(dbRef(db, `fleet/${selectedVehicleId}`), {
        trackingUrl: trackingLink,
        liveTracking: true
      });

      setSelectedVehicleId("");
      setTrackingLink("");
    } catch (err) {
      setError("Failed to assign tracking link.");
    } finally {
      setLoading(false);
    }
  };

  // 3. REMOVE TRACKING LINK
  const handleRemoveTracking = async (vehicle) => {
    if (window.confirm(`Stop tracking for ${vehicle.name}?`)) {
      try {
        await update(dbRef(db, `fleet/${vehicle.id}`), {
          trackingUrl: null,
          liveTracking: false
        });
      } catch (err) {
        console.error("Failed to remove tracking:", err);
      }
    }
  };

  // Filter only vehicles that currently have a tracking URL assigned
  const activeTrackers = vehicles.filter(v => v.trackingUrl);

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Activity size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Live Vehicle Status</h2>
          <p className="text-slate-500 font-medium text-sm">Assign tracking links and monitor your fleet in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: ASSIGNMENT FORM */}
        <div className="xl:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-24">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
            <LinkIcon size={18} className="text-blue-600" /> Assign Tracker
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" /> {error}
            </div>
          )}

          <form onSubmit={handleAssignTracking} className="space-y-4">
            
            {/* Auto-Fetched Vehicle Dropdown */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Select Vehicle</label>
              <select 
                value={selectedVehicleId} 
                onChange={e => setSelectedVehicleId(e.target.value)} 
                className="w-full mt-1 p-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">-- Choose a vehicle --</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.numberPlate || 'No Plate'})
                  </option>
                ))}
              </select>
            </div>

            {/* Tracking Link Input */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Live Map / Tracking URL</label>
              <input 
                type="url" 
                required 
                value={trackingLink} 
                onChange={e => setTrackingLink(e.target.value)} 
                placeholder="https://maps.google.com/..." 
                className="w-full mt-1 p-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
              />
              <p className="text-[10px] text-slate-400 font-bold mt-1.5 leading-tight">Note: Ensure the link provided is an "embeddable" URL from your GPS provider for it to display inside the page.</p>
            </div>

            <button 
              type="submit" 
              disabled={loading || !selectedVehicleId || !trackingLink} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? "Assigning..." : <><Navigation size={18} /> Start Tracking</>}
            </button>
          </form>
        </div>

        {/* RIGHT: MASSIVE LIVE MAPS AREA */}
        <div className="xl:col-span-2">
          {/* CHANGED: Removed the 2-column grid. Now it's a single, full-width column layout */}
          <div className="flex flex-col gap-8">
            <AnimatePresence>
              {activeTrackers.map(vehicle => (
                <motion.div 
                  key={vehicle.id} 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95, y: -20 }} 
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 flex flex-col relative group"
                >
                  {/* Remove Button (Hover) */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleRemoveTracking(vehicle)} 
                      className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl shadow-lg backdrop-blur-md transition-transform hover:scale-105"
                      title="Stop Tracking"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Vehicle Info Header */}
                  <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-slate-900 text-white">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <MapPin size={20} className="text-blue-400" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-black text-lg tracking-wide truncate">{vehicle.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{vehicle.numberPlate || 'Active Live Status'}</p>
                      </div>
                    </div>
                  </div>

                  {/* CHANGED: The Live Map iframe is now huge (h-[500px] on mobile, h-[600px] on desktop) */}
                  <div className="w-full h-[500px] md:h-[600px] bg-slate-100 relative">
                    <iframe 
                      src={vehicle.trackingUrl}
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Tracking map for ${vehicle.name}`}
                    ></iframe>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {activeTrackers.length === 0 && (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <Navigation size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-slate-800 font-black text-xl tracking-tight">No Active Trackers</h3>
                <p className="text-slate-500 font-medium text-sm mt-2 max-w-sm mx-auto">Assign a tracking link to a vehicle using the form to open the live command center view.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}