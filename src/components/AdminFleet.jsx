import { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, push, set, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { Bus, Plus, Trash2, Edit, Image as ImageIcon, Video, AlertCircle, UploadCloud, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminFleet() {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [editingVehicleId, setEditingVehicleId] = useState(null); // Tracks if we are editing

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState("LUXURY BUS"); 
  const [numberPlate, setNumberPlate] = useState("");
  const [seats, setSeats] = useState("");
  const [beds, setBeds] = useState("0");
  const [ac, setAc] = useState(true);
  const [perKm, setPerKm] = useState("");
  const [perDay, setPerDay] = useState("");
  const [waitingCharge, setWaitingCharge] = useState("");
  const [liveTracking, setLiveTracking] = useState(true);

  // File State
  const [mainImage, setMainImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [interiorImages, setInteriorImages] = useState([]);

  // Refs
  const mainImageRef = useRef(null);
  const videoRef = useRef(null);
  const interiorRef = useRef(null);

  // FETCH FLEET
  useEffect(() => {
    const fleetDbRef = dbRef(db, "fleet");
    const unsubscribe = onValue(fleetDbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setFleet(formattedData);
      } else {
        setFleet([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // FILE HANDLERS
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadError("");
      setMainImage(file);
    }
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (file) setVideo(file); 
  };

  const handleInteriorImages = (e) => {
    const files = Array.from(e.target.files);
    setUploadError("");
    setInteriorImages(files);
  };

  // EDIT PRE-FILL
  const handleEdit = (vehicle) => {
    setEditingVehicleId(vehicle.id);
    setName(vehicle.name);
    setType(vehicle.type);
    setNumberPlate(vehicle.numberPlate);
    setSeats(vehicle.seats);
    setBeds(vehicle.beds || "0");
    setAc(vehicle.ac);
    setPerKm(vehicle.perKm);
    setPerDay(vehicle.perDay);
    setWaitingCharge(vehicle.waitingCharge || "");
    setLiveTracking(vehicle.liveTracking);

    // Prompt user to re-upload files
    setUploadError("Editing mode: Please re-select the Main Image (and any other media) before saving.");
    setMainImage(null);
    setVideo(null);
    setInteriorImages([]);
    
    // Clear file inputs visually
    if (mainImageRef.current) mainImageRef.current.value = "";
    if (videoRef.current) videoRef.current.value = "";
    if (interiorRef.current) interiorRef.current.value = "";
    
    // Scroll to form smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingVehicleId(null);
    setName(""); setNumberPlate(""); setSeats(""); setBeds("0"); setPerKm(""); setPerDay(""); setWaitingCharge("");
    setMainImage(null); setVideo(null); setInteriorImages([]);
    setUploadError("");
    if (mainImageRef.current) mainImageRef.current.value = "";
    if (videoRef.current) videoRef.current.value = "";
    if (interiorRef.current) interiorRef.current.value = "";
  };

  // UPLOAD & SAVE (Handles both New and Edits)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Even when editing, we require re-uploading the image to ensure data integrity
    if (!mainImage || !name.trim() || !numberPlate.trim()) {
      setUploadError("Main Image, Name, and Number Plate are required.");
      return;
    }

    setLoading(true);
    setUploadError("");

    try {
      const timestamp = Date.now();
      
      // 1. Upload Main Image
      const mainImageName = `fleet/${timestamp}_main_${mainImage.name}`;
      const mainSnap = await uploadBytes(storageRef(storage, mainImageName), mainImage);
      const mainUrl = await getDownloadURL(mainSnap.ref);

      // 2. Upload Video (if exists)
      let videoUrl = null;
      let videoPath = null;
      if (video) {
        videoPath = `fleet/${timestamp}_video_${video.name}`;
        const videoSnap = await uploadBytes(storageRef(storage, videoPath), video);
        videoUrl = await getDownloadURL(videoSnap.ref);
      }

      // 3. Upload Interior Images
      const interiorData = [];
      for (let i = 0; i < interiorImages.length; i++) {
        const file = interiorImages[i];
        const path = `fleet/${timestamp}_interior_${i}_${file.name}`;
        const snap = await uploadBytes(storageRef(storage, path), file);
        const url = await getDownloadURL(snap.ref);
        interiorData.push({ url, path });
      }

      const vehicleData = {
        name,
        type,
        numberPlate,
        seats,
        beds,
        ac,
        perKm,
        perDay,
        waitingCharge,
        liveTracking,
        image: mainUrl,
        mainImagePath: mainImageName,
        videoUrl,
        videoPath,
        interiorImages: interiorData,
        timestamp
      };

      if (editingVehicleId) {
        // Find the old vehicle data to delete its old files first to save space
        const oldVehicle = fleet.find(v => v.id === editingVehicleId);
        if (oldVehicle) {
          if (oldVehicle.mainImagePath) await deleteObject(storageRef(storage, oldVehicle.mainImagePath)).catch(() => {});
          if (oldVehicle.videoPath) await deleteObject(storageRef(storage, oldVehicle.videoPath)).catch(() => {});
          if (oldVehicle.interiorImages) {
            for (let img of oldVehicle.interiorImages) {
              await deleteObject(storageRef(storage, img.path)).catch(() => {});
            }
          }
        }
        
        // Update the existing database entry
        await set(dbRef(db, `fleet/${editingVehicleId}`), vehicleData);
      } else {
        // Create a new database entry
        await push(dbRef(db, "fleet"), vehicleData);
      }

      resetForm();

    } catch (error) {
      console.error(error);
      setUploadError("Failed to save vehicle. Check your connection and permissions.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (vehicle) => {
    if (window.confirm(`Delete ${vehicle.name}? This will remove all associated images and videos.`)) {
      try {
        await remove(dbRef(db, `fleet/${vehicle.id}`));
        
        // Cleanup Storage
        if (vehicle.mainImagePath) await deleteObject(storageRef(storage, vehicle.mainImagePath));
        if (vehicle.videoPath) await deleteObject(storageRef(storage, vehicle.videoPath));
        if (vehicle.interiorImages) {
          for (let img of vehicle.interiorImages) {
            await deleteObject(storageRef(storage, img.path));
          }
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Bus size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Fleet Management</h2>
          <p className="text-slate-500 font-medium text-sm">Upload vehicles, videos, interiors, and pricing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* ADD/EDIT VEHICLE FORM */}
        <div className="xl:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <UploadCloud size={18} className="text-blue-600" /> 
              {editingVehicleId ? "Edit Vehicle" : "Add New Vehicle"}
            </h3>
            {editingVehicleId && (
              <button onClick={resetForm} className="text-xs text-slate-500 hover:text-slate-800 font-bold underline">
                Cancel Edit
              </button>
            )}
          </div>

          {uploadError && (
            <div className={`mb-4 p-3 border text-xs font-bold rounded-lg flex items-start gap-2 ${uploadError.includes("Editing mode") ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-red-50 border-red-200 text-red-600"}`}>
              <AlertCircle size={14} className="shrink-0 mt-0.5" /> {uploadError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Basic Info */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Vehicle Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Volvo Model Bus A/C" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Category Tag</label>
                  <select value={type} onChange={e => setType(e.target.value)} className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none">
                    <option value="LUXURY BUS">Luxury Bus</option>
                    <option value="LARGE BUS">Large Bus</option>
                    <option value="MINI BUS">Mini Bus</option>
                    <option value="PREMIUM VAN">Premium Van</option>
                    <option value="TEMPO TRAVELLER">Tempo Traveller</option>
                    <option value="LUXURY SUV">Luxury SUV</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Number Plate</label>
                  <input type="text" required value={numberPlate} onChange={e => setNumberPlate(e.target.value)} placeholder="AP39..." className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none uppercase focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-white border border-slate-200 rounded-xl">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Seats</label>
                <input type="text" required value={seats} onChange={e => setSeats(e.target.value)} placeholder="e.g., 39" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Beds</label>
                <input type="text" value={beds} onChange={e => setBeds(e.target.value)} placeholder="0" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">A/C</label>
                <select value={ac} onChange={e => setAc(e.target.value === "true")} className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Price Per KM</label>
                <input type="text" required value={perKm} onChange={e => setPerKm(e.target.value)} placeholder="e.g., ₹75" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm font-bold text-blue-700 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Price Per Day</label>
                <input type="text" required value={perDay} onChange={e => setPerDay(e.target.value)} placeholder="e.g., ₹9,000" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm font-bold outline-none" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Waiting Charge / Hr</label>
                <input type="text" value={waitingCharge} onChange={e => setWaitingCharge(e.target.value)} placeholder="e.g., ₹500" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none" />
              </div>
            </div>

            {/* Toggles */}
            <label className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl cursor-pointer">
              <input type="checkbox" checked={liveTracking} onChange={e => setLiveTracking(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded" />
              <span className="text-sm font-bold text-emerald-800">Enable Live Tracking Badge</span>
            </label>

            {/* Media Uploads */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><ImageIcon size={12}/> Main Image (Required)</label>
                <input type="file" accept="image/*" required ref={mainImageRef} onChange={handleMainImage} className="w-full mt-1 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><ImageIcon size={12}/> Interior Images</label>
                <input type="file" accept="image/*" multiple ref={interiorRef} onChange={handleInteriorImages} className="w-full mt-1 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {interiorImages.length > 0 && <p className="text-[10px] text-green-600 font-bold mt-1">{interiorImages.length} images selected</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Video size={12}/> Walkaround Video (Optional)</label>
                <input type="file" accept="video/*" ref={videoRef} onChange={handleVideo} className="w-full mt-1 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full text-white font-black py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 mt-4 ${editingVehicleId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-black'}`}>
              {loading ? "Saving to Cloud..." : (editingVehicleId ? "Update Vehicle" : "Publish Vehicle")}
            </button>
          </form>
        </div>

        {/* FLEET GRID */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {fleet.map(vehicle => (
                <motion.div key={vehicle.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col relative group ${editingVehicleId === vehicle.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'}`}>
                  
                  <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(vehicle)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-lg" title="Edit Vehicle"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(vehicle)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg" title="Delete Vehicle"><Trash2 size={16} /></button>
                  </div>

                  <div className="h-40 bg-slate-100 relative">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{vehicle.type}</span>
                    <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">{vehicle.numberPlate}</span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-black text-slate-800 text-sm mb-2">{vehicle.name}</h4>
                    <div className="flex gap-2 mb-3">
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">{vehicle.seats} Seats</span>
                      {vehicle.ac && <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">A/C</span>}
                      {vehicle.liveTracking && <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded border border-emerald-100"><CheckCircle2 size={10} className="inline mr-1"/>Live</span>}
                    </div>
                    
                    <div className="mt-auto grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Per KM</p>
                        <p className="font-black text-blue-600">{vehicle.perKm}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Per Day</p>
                        <p className="font-bold text-slate-700">{vehicle.perDay}</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
            {fleet.length === 0 && (
              <div className="col-span-2 py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                <Bus size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400 font-bold">No vehicles in fleet yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}