import { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { Users, Plus, Phone, Trash2, Image as ImageIcon, AlertCircle, Award, FileText, Globe, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [license, setLicense] = useState("");
  const [languages, setLanguages] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // FETCH DRIVERS
  useEffect(() => {
    const driversRef = dbRef(db, "drivers");
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setDrivers(formattedData);
      } else {
        setDrivers([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // HANDLE FILE SELECTION (Removed 200KB Limit)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadError("");
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // UPLOAD & SAVE
  const handleAddDriver = async (e) => {
    e.preventDefault();
    if (!selectedFile || !name.trim() || !phone.trim() || !license.trim()) {
      setUploadError("Please fill all required fields and upload an image.");
      return;
    }

    setLoading(true);
    setUploadError("");

    try {
      const fileName = `drivers/${Date.now()}_${selectedFile.name}`;
      const imageStorageRef = storageRef(storage, fileName);
      const snapshot = await uploadBytes(imageStorageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await push(dbRef(db, "drivers"), {
        name,
        phone,
        experience,
        license,
        languages,
        imageUrl: downloadURL,
        storagePath: fileName,
        timestamp: Date.now()
      });

      // Reset Form
      setName(""); setPhone(""); setExperience(""); setLicense(""); setLanguages("");
      setSelectedFile(null); setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadError("Failed to add driver.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (driver) => {
    if (window.confirm(`Remove ${driver.name} from the roster?`)) {
      try {
        await remove(dbRef(db, `drivers/${driver.id}`));
        if (driver.storagePath) {
          await deleteObject(storageRef(storage, driver.storagePath));
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <Users size={24} className="text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Driver Roster</h2>
          <p className="text-slate-500 font-medium text-sm">Manage driver details, licenses, and profile images.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ADD DRIVER FORM */}
        <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-24">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
            <UploadCloud size={18} className="text-green-600" /> Add New Driver
          </h3>

          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" /> {uploadError}
            </div>
          )}

          <form onSubmit={handleAddDriver} className="space-y-4">
            
            {/* Image Upload */}
            <div>
              <div className={`border-2 border-dashed rounded-xl overflow-hidden relative transition-colors ${previewUrl ? 'border-green-500 bg-slate-900' : 'border-slate-300 hover:border-slate-400 bg-white'}`} style={{ height: '140px' }}>
                <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-90" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <ImageIcon size={32} className="text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-600">Upload Driver Photo</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Full Name w/ Initial</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Suresh Kumar V." className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Phone Number</label>
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">License No.</label>
                  <input type="text" required value={license} onChange={e => setLicense(e.target.value)} placeholder="AP..." className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-green-500 uppercase" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Experience</label>
                  <input type="text" required value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g., 5 Years" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Known Languages</label>
                <input type="text" required value={languages} onChange={e => setLanguages(e.target.value)} placeholder="Telugu, English, Hindi..." className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            <button type="submit" disabled={loading || !selectedFile} className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 mt-2">
              {loading ? "Saving Driver..." : "Save to Roster"}
            </button>
          </form>
        </div>

        {/* DRIVER GRID */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {drivers.map(driver => (
                <motion.div key={driver.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col relative group">
                  
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(driver)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"><Trash2 size={14} /></button>
                  </div>

                  <div className="flex p-4 gap-4 items-center border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-green-100">
                      <img src={driver.imageUrl} alt={driver.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-lg leading-tight">{driver.name}</h4>
                      <p className="text-sm text-slate-500 font-bold flex items-center gap-1 mt-1"><Phone size={12}/> {driver.phone}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 grid grid-cols-2 gap-3 flex-1 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5 flex items-center gap-1"><FileText size={10}/> License</p>
                      <p className="font-bold text-slate-700">{driver.license}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Award size={10}/> Experience</p>
                      <p className="font-bold text-slate-700">{driver.experience}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5 flex items-center gap-1"><Globe size={10}/> Languages</p>
                      <p className="font-bold text-slate-700">{driver.languages}</p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
            {drivers.length === 0 && (
              <div className="col-span-2 py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                <Users size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400 font-bold">No drivers added yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}