import { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { Camera, Tv, Trash2, Image as ImageIcon, Video, AlertCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMedia() {
  const [activeTab, setActiveTab] = useState("moments");
  const [moments, setMoments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const momentImageRef = useRef(null);
  const tvThumbRef = useRef(null);
  const tvVideoRef = useRef(null);

  // States for files
  const [momentFiles, setMomentFiles] = useState([]); // Now an Array for multiple images
  const [tvThumb, setTvThumb] = useState(null);
  const [tvVideo, setTvVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const momentsRef = dbRef(db, "captured_moments");
    const tvRef = dbRef(db, "vbr_tv");

    const unsubMoments = onValue(momentsRef, (snapshot) => {
      const data = snapshot.val();
      setMoments(data ? Object.keys(data).map(k => ({ id: k, ...data[k] })).sort((a,b) => b.timestamp - a.timestamp) : []);
    });

    const unsubTv = onValue(tvRef, (snapshot) => {
      const data = snapshot.val();
      setVideos(data ? Object.keys(data).map(k => ({ id: k, ...data[k] })).sort((a,b) => b.timestamp - a.timestamp) : []);
    });

    return () => { unsubMoments(); unsubTv(); };
  }, []);

  // Handler for MULTIPLE Moments Images (Max 50)
  const handleMomentsChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 50) {
      setUploadError("You can only select up to 50 images at once.");
      setMomentFiles([]);
      setPreviewUrl(null);
      if (momentImageRef.current) momentImageRef.current.value = "";
      return;
    }

    setUploadError("");
    setMomentFiles(files);
    
    // Preview the first image if multiple are selected
    if (files.length > 0) {
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setPreviewUrl(null);
    }
  };

  // Handler for SINGLE TV Thumbnail
  const handleTvThumbChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadError("");
      setTvThumb(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setTvVideo(file);
  };

  // BATCH UPLOAD logic for Moments
  const handleUploadMoment = async (e) => {
    e.preventDefault();
    if (momentFiles.length === 0) return setUploadError("Please select at least one image.");
    setLoading(true); 
    setUploadError("");

    try {
      // Upload all selected images concurrently
      const uploadPromises = momentFiles.map(async (file, index) => {
        const fileName = `moments/${Date.now()}_${index}_${file.name}`;
        const snap = await uploadBytes(storageRef(storage, fileName), file);
        const url = await getDownloadURL(snap.ref);

        return push(dbRef(db, "captured_moments"), {
          imageUrl: url,
          storagePath: fileName,
          timestamp: Date.now()
        });
      });

      // Wait for all uploads to finish
      await Promise.all(uploadPromises);

      setMomentFiles([]); 
      setPreviewUrl(null);
      if (momentImageRef.current) momentImageRef.current.value = "";
    } catch (error) { 
      setUploadError("Failed to upload some moments."); 
    }
    setLoading(false);
  };

  const handleUploadTv = async (e) => {
    e.preventDefault();
    if (!tvThumb || !tvVideo) return setUploadError("Both Thumbnail and Video are required.");
    setLoading(true); setUploadError("");

    try {
      const ts = Date.now();
      const thumbName = `vbr_tv/${ts}_thumb_${tvThumb.name}`;
      const videoName = `vbr_tv/${ts}_video_${tvVideo.name}`;

      const thumbSnap = await uploadBytes(storageRef(storage, thumbName), tvThumb);
      const thumbUrl = await getDownloadURL(thumbSnap.ref);

      const videoSnap = await uploadBytes(storageRef(storage, videoName), tvVideo);
      const videoUrl = await getDownloadURL(videoSnap.ref);

      await push(dbRef(db, "vbr_tv"), {
        thumbnailUrl: thumbUrl,
        videoUrl: videoUrl,
        thumbStoragePath: thumbName,
        videoStoragePath: videoName,
        timestamp: ts
      });

      setTvThumb(null); setTvVideo(null); setPreviewUrl(null);
      if (tvThumbRef.current) tvThumbRef.current.value = "";
      if (tvVideoRef.current) tvVideoRef.current.value = "";
    } catch (error) { setUploadError("Failed to upload video."); }
    setLoading(false);
  };

  const handleDelete = async (item, type) => {
    if (window.confirm("Delete this media?")) {
      try {
        await remove(dbRef(db, `${type}/${item.id}`));
        if (item.storagePath) await deleteObject(storageRef(storage, item.storagePath));
        if (item.thumbStoragePath) await deleteObject(storageRef(storage, item.thumbStoragePath));
        if (item.videoStoragePath) await deleteObject(storageRef(storage, item.videoStoragePath));
      } catch (error) { console.error("Delete failed"); }
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Tv size={24} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Media Gallery</h2>
            <p className="text-slate-500 font-medium text-sm">Manage Captured Moments & VBR Travels TV</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button onClick={() => {setActiveTab("moments"); setPreviewUrl(null);}} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "moments" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Camera size={16} className="inline mr-1.5 mb-0.5"/> Captured Moments
          </button>
          <button onClick={() => {setActiveTab("tv"); setPreviewUrl(null);}} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "tv" ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Tv size={16} className="inline mr-1.5 mb-0.5"/> VBR Travels TV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-24">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Plus size={18} className={activeTab === 'moments' ? 'text-blue-600' : 'text-red-600'} /> 
            Upload to {activeTab === 'moments' ? 'Moments' : 'VBR TV'}
          </h3>

          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" /> {uploadError}
            </div>
          )}

          {activeTab === "moments" ? (
            <form onSubmit={handleUploadMoment} className="space-y-4">
              <div className={`border-2 border-dashed rounded-xl overflow-hidden relative transition-colors ${previewUrl ? 'border-blue-500 bg-slate-900' : 'border-slate-300 hover:border-slate-400 bg-white'}`} style={{ height: '180px' }}>
                {/* Added 'multiple' tag here */}
                <input type="file" accept="image/*" multiple onChange={handleMomentsChange} ref={momentImageRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img src={previewUrl} className="w-full h-full object-cover opacity-90" />
                    {momentFiles.length > 1 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-black text-2xl">+{momentFiles.length - 1} More</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <ImageIcon size={32} className="text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-600">Select Photos (Max 50)</p>
                    <p className="text-[10px] text-blue-500 font-bold mt-1">HIGH QUALITY ALLOWED</p>
                  </div>
                )}
              </div>
              <button type="submit" disabled={loading || momentFiles.length === 0} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl shadow-lg transition-all disabled:opacity-50">
                {loading ? "Uploading..." : `Publish ${momentFiles.length > 0 ? momentFiles.length : ''} Photos`}
              </button>
            </form>
          ) : (
            <form onSubmit={handleUploadTv} className="space-y-4">
              <div className={`border-2 border-dashed rounded-xl overflow-hidden relative transition-colors ${previewUrl ? 'border-red-500 bg-slate-900' : 'border-slate-300 hover:border-slate-400 bg-white'}`} style={{ height: '140px' }}>
                <input type="file" accept="image/*" onChange={handleTvThumbChange} ref={tvThumbRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover opacity-90" /> : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <ImageIcon size={32} className="text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-600">Video Thumbnail</p>
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Video size={12}/> Video File (.mp4)</label>
                <input type="file" accept="video/*" ref={tvVideoRef} onChange={handleVideoChange} className="w-full mt-1 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
              </div>
              <button type="submit" disabled={loading || !tvThumb || !tvVideo} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 mt-2">
                {loading ? "Uploading Video..." : "Publish Video"}
              </button>
            </form>
          )}
        </div>

        <div className="xl:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <AnimatePresence>
              {(activeTab === "moments" ? moments : videos).map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group">
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(item, activeTab === "moments" ? "captured_moments" : "vbr_tv")} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-lg"><Trash2 size={14} /></button>
                  </div>
                  
                  <div className="h-32 bg-slate-900 relative">
                    <img src={activeTab === "moments" ? item.imageUrl : item.thumbnailUrl} className="w-full h-full object-cover opacity-80" />
                    {activeTab === "tv" && <Video size={20} className="absolute inset-0 m-auto text-white opacity-70" />}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {(activeTab === "moments" ? moments : videos).length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                {activeTab === "moments" ? <Camera size={32} className="mx-auto text-slate-300 mb-2" /> : <Tv size={32} className="mx-auto text-slate-300 mb-2" />}
                <p className="text-slate-400 font-bold">No media uploaded yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}