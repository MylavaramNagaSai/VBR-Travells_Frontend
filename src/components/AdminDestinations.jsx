import { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { MapPin, UploadCloud, Trash2, Image as ImageIcon, AlertCircle, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultStates = [
  "Andhra Pradesh", "Kerala", "Karnataka", "Telangana", 
  "Tamil Nadu", "Madhya Pradesh", "Odisha"
];

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  // Form State
  const [placeName, setPlaceName] = useState("");
  const [selectedState, setSelectedState] = useState(defaultStates[0]);
  const [customState, setCustomState] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // READ: Fetch destinations from Firebase
  useEffect(() => {
    const destRef = dbRef(db, "destinations");
    const unsubscribe = onValue(destRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setDestinations(formattedData);
      } else {
        setDestinations([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image must be smaller than 5MB");
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setUploadError("");
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const finalState = selectedState === "Other" ? customState.trim() : selectedState;

    if (!selectedFile || !placeName.trim() || !finalState) {
      setUploadError("Please provide an image, destination name, and state.");
      return;
    }

    setLoading(true);
    setUploadError("");

    try {
      const fileName = `destinations/${Date.now()}_${selectedFile.name}`;
      const imageStorageRef = storageRef(storage, fileName);
      const snapshot = await uploadBytes(imageStorageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await push(dbRef(db, "destinations"), {
        name: placeName,
        state: finalState,
        imageUrl: downloadURL,
        storagePath: fileName,
        timestamp: Date.now()
      });

      // Reset form
      setPlaceName("");
      setCustomState("");
      setSelectedState(defaultStates[0]);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Failed to upload destination.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (place) => {
    if (window.confirm(`Delete "${place.name}" from destinations?`)) {
      try {
        await remove(dbRef(db, `destinations/${place.id}`));
        if (place.storagePath) {
          const imageStorageRef = storageRef(storage, place.storagePath);
          await deleteObject(imageStorageRef);
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Map size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Destination Manager</h2>
          <p className="text-slate-500 font-medium text-sm">Upload places to update the trending destinations section.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* UPLOAD FORM */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <UploadCloud size={18} className="text-blue-600" /> Add Destination
            </h3>

            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                {uploadError}
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Location Image</label>
                <div className={`border-2 border-dashed rounded-xl overflow-hidden relative transition-colors ${previewUrl ? 'border-blue-500 bg-slate-900' : 'border-slate-300 hover:border-slate-400 bg-white'}`} style={{ height: '180px' }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-90" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <ImageIcon size={32} className="text-slate-300 mb-2" />
                      <p className="text-xs font-bold text-slate-600">Click to browse image</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Place Name</label>
                <input type="text" required value={placeName} onChange={(e) => setPlaceName(e.target.value)} placeholder="e.g., Ooty, Munnar" className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">State</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 mb-2">
                  {defaultStates.map(state => <option key={state} value={state}>{state}</option>)}
                  <option value="Other">Add New State...</option>
                </select>
                
                {selectedState === "Other" && (
                  <input type="text" required value={customState} onChange={(e) => setCustomState(e.target.value)} placeholder="Enter new state name" className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                )}
              </div>

              <button type="submit" disabled={loading || !selectedFile || !placeName.trim()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50">
                {loading ? "Uploading..." : "Save Destination"}
              </button>
            </form>
          </div>
        </div>

        {/* LIVE DATABASE VIEW */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Live Database ({destinations.length})
            </h3>
          </div>

          {destinations.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-2xl">
              <MapPin size={48} className="mx-auto text-slate-300 mb-4 opacity-50" />
              <p className="text-slate-500 font-bold">No destinations added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence>
                {destinations.map((place) => (
                  <motion.div key={place.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md flex flex-col">
                    <div className="w-full h-32 bg-slate-100 relative overflow-hidden">
                      <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => handleDelete(place)} className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="p-3 border-t border-slate-100">
                      <h4 className="text-[13px] font-bold text-slate-800 line-clamp-1">{place.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">{place.state}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}