import { useState, useEffect } from "react";
import { ref, onValue, push, remove } from "firebase/database";
import { db } from "../firebase";
import { Send, Trash2, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLiveUpdates() {
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. READ: Listen to Firebase for all live updates
  useEffect(() => {
    const updatesRef = ref(db, "live_updates");
    const unsubscribe = onValue(updatesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase object into an array we can map over
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text,
          timestamp: data[key].timestamp,
        }));
        // Sort newest first
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setUpdates(formattedData);
      } else {
        setUpdates([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. CREATE: Push a new update to Firebase
  const handleAddUpdate = async (e) => {
    e.preventDefault();
    if (!newUpdate.trim()) return;
    
    setLoading(true);
    try {
      const updatesRef = ref(db, "live_updates");
      await push(updatesRef, {
        text: newUpdate,
        timestamp: Date.now()
      });
      setNewUpdate(""); // Clear the input field
    } catch (error) {
      console.error("Error adding update:", error);
      alert("Failed to add update. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE: Remove an update from Firebase
  const handleDeleteUpdate = async (id) => {
    if (window.confirm("Are you sure you want to delete this update?")) {
      try {
        const updateRef = ref(db, `live_updates/${id}`);
        await remove(updateRef);
      } catch (error) {
        console.error("Error deleting update:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
          <Bell size={20} className="text-blue-600" />
          Broadcast New Update
        </h2>
        <form onSubmit={handleAddUpdate} className="flex gap-3">
          <input
            type="text"
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            placeholder="e.g., 🎉 Special Offer: Flat 15% off on Tempo Travellers!"
            className="flex-1 bg-white border border-slate-300 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-3 outline-none"
            maxLength={100}
            required
          />
          <button
            type="submit"
            disabled={loading || !newUpdate.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {loading ? "Sending..." : <><Send size={16} /> Broadcast</>}
          </button>
        </form>
      </div>

      {/* Active Updates List */}
      <div>
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
          Active Live Updates ({updates.length})
        </h3>
        
        {updates.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 border border-slate-100 rounded-2xl">
            <p className="text-slate-500 font-medium">No live updates active. Broadcast one above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300 transition-colors group"
                >
                  <p className="text-slate-700 font-semibold">{update.text}</p>
                  <button
                    onClick={() => handleDeleteUpdate(update.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete update"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}