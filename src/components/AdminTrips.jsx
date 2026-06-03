import { useState, useEffect } from "react";
import { ref as dbRef, onValue, push, remove, set } from "firebase/database";
import { db } from "../firebase";
import { Plus, MapPin, Calendar, Car, User, Phone, AlertCircle, Trash2, Edit, Map, AlertTriangle } from "lucide-react";

export default function AdminTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  
  // Track if we are editing an existing trip
  const [editingTripId, setEditingTripId] = useState(null);

  // Updated state: using 'vehicleName' and 'driverName' for manual text input
  const [formData, setFormData] = useState({
    vehicleName: "", driverName: "", startDate: "", endDate: "",
    startPoint: "", endPoint: "", customerName: "", customerPhone: "",
    totalRent: "", advance: ""
  });

  // 1. FETCH ALL DATA FROM FIREBASE
  useEffect(() => {
    const unsubscribeTrips = onValue(dbRef(db, "trips"), (snapshot) => {
      const data = snapshot.val();
      setTrips(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })).sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) : []);
      setLoading(false);
    });

    return () => unsubscribeTrips();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Update Firebase Master Counter whenever trips length changes
  useEffect(() => {
    if (!loading) {
      set(dbRef(db, "site_stats/total_trips"), trips.length);
    }
  }, [trips.length, loading]);

  // 2. CONFLICT CHECKING (Updated for manual text inputs)
  const checkConflicts = () => {
    const newStart = new Date(formData.startDate).setHours(0, 0, 0, 0);
    const newEnd = new Date(formData.endDate).setHours(23, 59, 59, 999);

    if (newStart > newEnd) return "Return date cannot be before the starting date.";

    for (let trip of trips) {
      // Skip conflict checking against itself if we are editing
      if (editingTripId && trip.id === editingTripId) continue;

      const existingStart = new Date(trip.startDate).setHours(0, 0, 0, 0);
      const existingEnd = new Date(trip.endDate).setHours(23, 59, 59, 999);
      
      const isOverlapping = (newStart <= existingEnd) && (newEnd >= existingStart);

      if (isOverlapping) {
        // Check if the typed vehicle name matches an already booked vehicle in this timeframe
        if (trip.vehicleName && trip.vehicleName.toLowerCase() === formData.vehicleName.toLowerCase().trim()) {
          return `Vehicle Conflict: "${trip.vehicleName}" is already booked during these dates.`;
        }
        // Check if the typed driver name matches an already assigned driver in this timeframe
        if (trip.driverName && trip.driverName.toLowerCase() === formData.driverName.toLowerCase().trim()) {
          return `Driver Conflict: "${trip.driverName}" is already assigned to a trip during these dates.`;
        }
      }
    }
    return null;
  };

  // 3. SUBMIT OR UPDATE TRIP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.vehicleName.trim() || !formData.driverName.trim()) {
      setFormError("You must manually enter a Vehicle name and a Driver name.");
      return;
    }

    const conflict = checkConflicts();
    if (conflict) {
      setFormError(conflict);
      return;
    }

    try {
      const balance = Number(formData.totalRent) - Number(formData.advance);
      
      // Clean up the text inputs before saving
      const finalData = {
        ...formData,
        vehicleName: formData.vehicleName.trim(),
        driverName: formData.driverName.trim(),
        balance: balance,
        timestamp: Date.now()
      };

      if (editingTripId) {
        // UPDATE Existing Trip
        await set(dbRef(db, `trips/${editingTripId}`), finalData);
      } else {
        // CREATE New Trip
        await push(dbRef(db, "trips"), finalData);
      }
      
      closeModal();
    } catch (error) { 
      setFormError("Failed to save trip. Check your connection."); 
    }
  };

  // 4. OPEN EDIT MODAL
  const handleEdit = (trip) => {
    setEditingTripId(trip.id);
    setFormData({
      vehicleName: trip.vehicleName || "",
      driverName: trip.driverName || "",
      startDate: trip.startDate || "",
      endDate: trip.endDate || "",
      startPoint: trip.startPoint || "",
      endPoint: trip.endPoint || "",
      customerName: trip.customerName || "",
      customerPhone: trip.customerPhone || "",
      totalRent: trip.totalRent || "",
      advance: trip.advance || ""
    });
    setIsModalOpen(true);
  };

  // Helper to cleanly close modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTripId(null);
    setFormData({
      vehicleName: "", driverName: "", 
      startDate: "", endDate: "", startPoint: "", endPoint: "", 
      customerName: "", customerPhone: "", totalRent: "", advance: ""
    });
    setFormError("");
  };

  // 5. DELETE SINGLE TRIP
  const handleDelete = async (tripId) => {
    if (window.confirm("Delete this trip record?")) {
      await remove(dbRef(db, `trips/${tripId}`));
    }
  };

  // 6. CLEAR ALL TRIPS
  const handleClearAll = async () => {
    if (window.confirm("WARNING: Are you sure you want to delete ALL trip data? This cannot be undone.")) {
      await remove(dbRef(db, "trips"));
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-bold animate-pulse">Loading Tracker Data...</div>;

  return (
    <div className="w-full flex flex-col h-[calc(100vh-120px)] space-y-6">
      
      {/* 1. MASTER TRIP COUNTER SECTION (Automated based on trips.length) */}
      <div className="bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl shrink-0">
        <div>
          <h2 className="text-white font-black text-xl flex items-center gap-2 mb-1">
            <Map className="text-blue-500" /> Master Trip Counter
          </h2>
          <p className="text-slate-400 text-sm font-medium">This number goes live on your public homepage stats and updates automatically based on rows below.</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 p-2 px-6 rounded-xl w-full sm:w-auto">
          <span className="text-white font-black text-3xl tracking-tight text-center w-full">{trips.length.toLocaleString()}</span>
        </div>
      </div>

      {/* 2. TRACKER HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 px-2">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Trip Dispatch Tracker</h2>
          <p className="text-slate-500 font-medium text-sm">Combined data from Fleet, Driver Roster, and Bookings.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleClearAll}
            disabled={trips.length === 0}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <AlertTriangle size={18} /> Clear Data
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <Plus size={18} /> New Trip Entry
          </button>
        </div>
      </div>

      {/* 3. SPREADSHEET TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Car size={14} className="inline mr-1"/> Vehicle</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Calendar size={14} className="inline mr-1"/> Dates</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest"><MapPin size={14} className="inline mr-1"/> Route</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest"><User size={14} className="inline mr-1"/> Driver</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Phone size={14} className="inline mr-1"/> Customer</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Finance</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-slate-400 font-medium">
                    No active trips. Click "New Trip Entry" to add one.
                  </td>
                </tr>
              ) : (
                trips.map(trip => {
                  const isBalanceZero = Number(trip.balance) <= 0;

                  return (
                    <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                      
                      {/* Vehicle */}
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-800 text-sm max-w-[150px] truncate">{trip.vehicleName || "Unknown Vehicle"}</p>
                      </td>
                      
                      {/* Dates */}
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-800 text-[11px] whitespace-nowrap text-green-600">S: {trip.startDate}</p>
                        <p className="font-bold text-slate-800 text-[11px] whitespace-nowrap text-red-600">E: {trip.endDate}</p>
                      </td>

                      {/* Route */}
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-800 text-sm truncate max-w-[120px]">{trip.startPoint}</p>
                        <p className="text-xs text-slate-500 font-medium truncate max-w-[120px]">To: {trip.endPoint}</p>
                      </td>

                      {/* Driver */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 shadow-sm">
                            <User className="w-full h-full p-1.5 text-slate-400" />
                          </div>
                          <div>
                            <span className="block font-bold text-slate-800 text-sm whitespace-nowrap">{trip.driverName || "Unknown Driver"}</span>
                          </div>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-800 text-sm whitespace-nowrap">{trip.customerName || "N/A"}</p>
                        <p className="text-xs text-slate-500 font-medium whitespace-nowrap">{trip.customerPhone || "N/A"}</p>
                      </td>

                      {/* Finance */}
                      <td className="px-4 py-3 text-right">
                        <p className="text-[11px] text-slate-500 font-bold">Total: ₹{Number(trip.totalRent || 0).toLocaleString()}</p>
                        <p className="text-[11px] text-green-600 font-bold mb-1">Adv: ₹{Number(trip.advance || 0).toLocaleString()}</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${isBalanceZero ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          BAL: ₹{Number(trip.balance || 0).toLocaleString()}
                        </span>
                      </td>

                      {/* EDIT AND DELETE BUTTONS */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(trip)} 
                            className="bg-white border border-slate-200 p-2 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 rounded-lg transition-all shadow-sm"
                            title="Edit Trip"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(trip.id)} 
                            className="bg-white border border-slate-200 p-2 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-lg transition-all shadow-sm"
                            title="Delete Trip"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. NEW/EDIT TRIP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-black text-slate-800">
                {editingTripId ? "Edit Trip" : "Add New Trip"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 font-bold">Close</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {formError && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-bold text-sm flex items-start gap-2">
                  <AlertCircle size={18} className="shrink-0" />
                  {formError}
                </div>
              )}

              <form id="tripForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Manual Vehicle & Driver Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Vehicle Entry (Manual)</label>
                    <input 
                      type="text" 
                      required 
                      name="vehicleName" 
                      value={formData.vehicleName} 
                      onChange={handleInputChange} 
                      placeholder="e.g., SML EXCUTIVE COCH 39 SEATER" 
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Driver Name (Manual)</label>
                    <input 
                      type="text" 
                      required 
                      name="driverName" 
                      value={formData.driverName} 
                      onChange={handleInputChange} 
                      placeholder="e.g., SK HABEEB BASHA" 
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium" 
                    />
                  </div>
                </div>

                {/* Dates & Routing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Start Date</label>
                    <input type="date" required name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Return Date</label>
                    <input type="date" required name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Starting Point</label>
                    <input type="text" required name="startPoint" value={formData.startPoint} onChange={handleInputChange} placeholder="e.g., Chennai" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ending Point</label>
                    <input type="text" required name="endPoint" value={formData.endPoint} onChange={handleInputChange} placeholder="e.g., Munnar" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Finance & Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Customer Name</label>
                    <input type="text" required name="customerName" value={formData.customerName} onChange={handleInputChange} placeholder="e.g., Rajesh Kumar" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Customer Phone</label>
                    <input type="tel" required name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Total Rent (₹)</label>
                    <input type="number" required name="totalRent" value={formData.totalRent} onChange={handleInputChange} placeholder="e.g., 25000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Advance Received (₹)</label>
                    <input type="number" required name="advance" value={formData.advance} onChange={handleInputChange} placeholder="e.g., 5000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-green-600" />
                  </div>
                </div>

                {/* Live Auto-Calculation Preview */}
                <div className="bg-slate-900 rounded-xl p-4 flex justify-between items-center mt-6">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Pending Balance</span>
                  <span className={`text-xl font-black ${Number(formData.totalRent) - Number(formData.advance) <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ₹{Number(formData.totalRent || 0) - Number(formData.advance || 0)}
                  </span>
                </div>

              </form>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
              <button form="tripForm" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl shadow-lg transition-all">
                {editingTripId ? "Update Trip" : "Lock Booking & Save"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}