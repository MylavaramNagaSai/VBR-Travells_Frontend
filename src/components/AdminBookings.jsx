import { useState, useEffect } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import { db } from "../firebase";
import { Briefcase, CheckCircle, Clock, XCircle, Plus, Trash2, Phone, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [newBooking, setNewBooking] = useState({
    customerName: "",
    phone: "",
    destination: "",
    vehicle: "", // Set to empty string for manual entry
    date: "",
  });

  // 1. READ: Listen to Firebase for Bookings
  useEffect(() => {
    const bookingsRef = ref(db, "bookings");
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        // Sort by newest added first
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setBookings(formattedData);
      } else {
        setBookings([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. CREATE: Add a manual booking (Phone booking)
  const handleAddBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bookingsRef = ref(db, "bookings");
      await push(bookingsRef, {
        ...newBooking,
        status: "Pending", // Default status
        timestamp: Date.now()
      });
      setShowForm(false);
      // Reset form on success
      setNewBooking({ customerName: "", phone: "", destination: "", vehicle: "", date: "" });
    } catch (error) {
      console.error("Error adding booking:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. UPDATE: Change Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const bookingRef = ref(db, `bookings/${id}`);
      await update(bookingRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 4. DELETE: Remove Booking
  const handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this booking?")) {
      try {
        const bookingRef = ref(db, `bookings/${id}`);
        await remove(bookingRef);
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  // Helper for Status Badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed": return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-black uppercase tracking-wider rounded-lg border border-green-200"><CheckCircle size={14} /> Confirmed</span>;
      case "Completed": return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-wider rounded-lg border border-blue-200"><Briefcase size={14} /> Completed</span>;
      case "Cancelled": return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider rounded-lg border border-red-200"><XCircle size={14} /> Cancelled</span>;
      default: return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider rounded-lg border border-amber-200"><Clock size={14} /> Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Briefcase className="text-blue-600" />
          Active Bookings
        </h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
        >
          {showForm ? <><XCircle size={16} /> Cancel</> : <><Plus size={16} /> Log Manual Booking</>}
        </button>
      </div>

      {/* NEW BOOKING FORM (Expandable) */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddBooking} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Customer Name</label>
                <input type="text" required value={newBooking.customerName} onChange={e => setNewBooking({...newBooking, customerName: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="e.g., John Doe" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                <input type="tel" required value={newBooking.phone} onChange={e => setNewBooking({...newBooking, phone: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Destination / Package</label>
                <input type="text" required value={newBooking.destination} onChange={e => setNewBooking({...newBooking, destination: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="e.g., Srisailam 2-Day Package" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Travel Date</label>
                <input type="date" required value={newBooking.date} onChange={e => setNewBooking({...newBooking, date: e.target.value})} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Vehicle Type</label>
                {/* Changed from select to input */}
                <input 
                  type="text" 
                  required 
                  value={newBooking.vehicle} 
                  onChange={e => setNewBooking({...newBooking, vehicle: e.target.value})} 
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  placeholder="e.g., Toyota Innova Crysta / Custom Vehicle" 
                />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-black transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50">
                  {loading ? "Saving..." : "Save Booking"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOKINGS LIST */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-2xl">
            <Briefcase size={40} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-bold">No bookings found in the database.</p>
            <p className="text-slate-400 text-sm mt-1">Log a manual booking to see it here.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div 
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center"
            >
              {/* Info Section */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-black text-lg text-slate-900">{booking.customerName}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-1 font-medium">
                    <Phone size={14} className="text-slate-400" /> {booking.phone}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                    <MapPin size={14} className="text-blue-500" /> {booking.destination}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
                    <Calendar size={14} className="text-slate-400" /> {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="inline-block px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-600 mt-1">
                    {booking.vehicle}
                  </div>
                </div>
              </div>

              {/* Status & Action Controls */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-end w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                {getStatusBadge(booking.status)}
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select 
                    value={booking.status} 
                    onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2 py-1.5 outline-none hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Confirmed">Set Confirmed</option>
                    <option value="Completed">Set Completed</option>
                    <option value="Cancelled">Set Cancelled</option>
                  </select>
                  
                  <button 
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title="Delete Booking"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}