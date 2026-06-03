import { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { Landmark, Plus, Trash2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPilgrimages() {
  const [pilgrimages, setPilgrimages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Constants matching the frontend categories
  const categories = ["Andhra Pradesh", "Telangana", "Tamil Nadu", "Kerala", "Karnataka", "Maharashtra", "Odisha"];

  // 1. FETCH DATA
  useEffect(() => {
    const pilgrimagesRef = dbRef(db, "pilgrimages");
    const unsubscribe = onValue(pilgrimagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setPilgrimages(formattedData);
      } else {
        setPilgrimages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. FILE SELECTION (Removed 200KB Limit)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadError("");
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 3. UPLOAD & SAVE
  const handleAddPilgrimage = async (e) => {
    e.preventDefault();
    if (!selectedFile || !name.trim()) {
      setUploadError("Please provide an image and a temple name.");
      return;
    }

    setLoading(true);
    setUploadError("");

    try {
      const fileName = `pilgrimages/${Date.now()}_${selectedFile.name}`;
      const imageStorageRef = storageRef(storage, fileName);
      const snapshot = await uploadBytes(imageStorageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await push(dbRef(db, "pilgrimages"), {
        name,
        state,
        image: downloadURL,
        storagePath: fileName,
        timestamp: Date.now()
      });

      // Reset
      setName("");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadError("Failed to save pilgrimage.");
    } finally {
      setLoading(false);
    }
  };

  // 4. DELETE
  const handleDelete = async (temple) => {
    if (window.confirm(`Delete ${temple.name}?`)) {
      try {
        await remove(dbRef(db, `pilgrimages/${temple.id}`));
        if (temple.storagePath) {
          await deleteObject(storageRef(storage, temple.storagePath));
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <Landmark size={24} className="text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Pilgrimage Manager</h2>
          <p className="text-slate-500 font-medium text-sm">Upload temples to update the Divine Pilgrimages section.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ADD TEMPLE FORM */}
        <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-24">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Plus size={18} className="text-orange-600" /> Add Temple
          </h3>

          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" /> {uploadError}
            </div>
          )}

          <form onSubmit={handleAddPilgrimage} className="space-y-4">
            
            <div className={`border-2 border-dashed rounded-xl overflow-hidden relative transition-colors ${previewUrl ? 'border-orange-500 bg-slate-900' : 'border-slate-300 hover:border-slate-400 bg-white'}`} style={{ height: '180px' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-90" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <ImageIcon size={32} className="text-slate-300 mb-2" />
                  <p className="text-xs font-bold text-slate-600">Upload Temple Image</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Temple Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Tirumala Venkateswara" className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">State Category</label>
              <select value={state} onChange={e => setState(e.target.value)} className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-orange-500">
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading || !selectedFile} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 mt-2">
              {loading ? "Saving..." : "Save Temple"}
            </button>
          </form>
        </div>

        {/* DATABASE GRID */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <AnimatePresence>
              {pilgrimages.map(temple => (
                <motion.div key={temple.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group">
                  
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(temple)} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-lg"><Trash2 size={14} /></button>
                  </div>

                  <div className="h-32 bg-slate-100 relative">
                    <img src={temple.image} alt={temple.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-3">
                    <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{temple.name}</h4>
                    <p className="text-[10px] font-bold text-orange-600 uppercase mt-1">{temple.state}</p>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
            {pilgrimages.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                <Landmark size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400 font-bold">No temples uploaded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}