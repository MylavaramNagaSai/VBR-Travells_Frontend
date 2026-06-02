import { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { Camera, UploadCloud, Trash2, Image as ImageIcon, AlertCircle, MapPin, User, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  // Form State
  const [driverName, setDriverName] = useState("");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // READ: Fetch all insights from Firebase
  useEffect(() => {
    const insightsRef = dbRef(db, "insights");
    const unsubscribe = onValue(insightsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        // Sort newest first
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setInsights(formattedData);
      } else {
        setInsights([]);
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

    if (!selectedFile || !driverName.trim() || !location.trim() || !caption.trim()) {
      setUploadError("Please fill out all fields and select an image.");
      return;
    }

    setLoading(true);
    setUploadError("");

    try {
      const fileName = `insights/${Date.now()}_${selectedFile.name}`;
      const imageStorageRef = storageRef(storage, fileName);
      const snapshot = await uploadBytes(imageStorageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await push(dbRef(db, "insights"), {
        driver: driverName,
        location: location,
        caption: caption,
        isFeatured: isFeatured,
        imageUrl: downloadURL,
        storagePath: fileName,
        timestamp: Date.now() // We will use this to enforce the 1-week rule on the frontend!
      });

      // Reset form
      setDriverName("");
      setLocation("");
      setCaption("");
      setIsFeatured(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Failed to upload insight.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (insight) => {
    if (window.confirm(`Delete insight from ${insight.driver}?`)) {
      try {
        await remove(dbRef(db, `insights/${insight.id}`));
        if (insight.storagePath) {
          const imageStorageRef = storageRef(storage, insight.storagePath);
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
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
          <Camera size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Today's Insights Manager</h2>
          <p className="text-slate-500 font-medium text-sm">Upload driver captures. Only posts from the last 7 days show on the public site.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* UPLOAD FORM */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <UploadCloud size={18} className="text-blue-600" /> New Capture
            </h3>

            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                {uploadError}
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <div className={`border-2 border-dashed rounded-xl overflow-hidden relative transition-colors ${previewUrl ? 'border-blue-500 bg-slate-900' : 'border-slate-300 hover:border-slate-400 bg-white'}`} style={{ height: '160px' }}>
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

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1"><User size={12}/> Driver Name</label>
                  <input type="text" required value={driverName} onChange={(e) => setDriverName(e.target.value)} placeholder="e.g., Suresh Kumar" className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1"><MapPin size={12}/> Location</label>
                  <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Munnar" className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Caption / Story</label>
                <textarea required value={caption} onChange={(e) => setCaption(e.target.value)} rows="3" placeholder="Describe the moment..." className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
              </div>

              <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm font-bold text-slate-700 flex items-center gap-1"><Star size={16} className={isFeatured ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}/> Feature as "Shot of the Week"</span>
              </label>

              <button type="submit" disabled={loading || !selectedFile} className="w-full bg-slate-900 hover:bg-black text-white font-black py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50 mt-2">
                {loading ? "Uploading..." : "Publish Insight"}
              </button>
            </form>
          </div>
        </div>

        {/* LIVE DATABASE VIEW */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Live Feed Archive ({insights.length})
            </h3>
          </div>

          {insights.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-2xl">
              <Camera size={48} className="mx-auto text-slate-300 mb-4 opacity-50" />
              <p className="text-slate-500 font-bold">No insights uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {insights.map((insight) => {
                  // Calculate if it's older than 7 days
                  const isOld = (Date.now() - insight.timestamp) > 7 * 24 * 60 * 60 * 1000;

                  return (
                    <motion.div key={insight.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                      <div className="w-full h-40 bg-slate-100 relative overflow-hidden">
                        <img src={insight.imageUrl} alt={insight.location} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOld ? 'grayscale opacity-60' : ''}`} />
                        
                        <div className="absolute top-2 left-2 flex gap-2">
                          {insight.isFeatured && <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-1 rounded shadow-sm">FEATURED</span>}
                          {isOld && <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">EXPIRED (&gt;7 DAYS)</span>}
                        </div>

                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={() => handleDelete(insight)} className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg"><Trash2 size={16} /></button>
                        </div>
                      </div>
                      <div className="p-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500 font-bold mb-1 flex items-center justify-between">
                          <span>{insight.location}</span>
                          <span>{new Date(insight.timestamp).toLocaleDateString()}</span>
                        </p>
                        <h4 className="text-[13px] font-medium text-slate-800 line-clamp-2 italic">"{insight.caption}"</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-3 flex items-center gap-1"><User size={12}/> {insight.driver}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}