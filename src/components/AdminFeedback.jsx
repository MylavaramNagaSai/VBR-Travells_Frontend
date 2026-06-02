import { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { MessageSquare, Plus, Trash2, Image as ImageIcon, Video, AlertCircle, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  
  // Media State
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // 1. FETCH FEEDBACK
  useEffect(() => {
    const feedbackRef = dbRef(db, "feedback");
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setFeedbacks(formattedData);
      } else {
        setFeedbacks([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. IMAGE VALIDATION (200KB)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200 * 1024) {
        setUploadError("Thumbnail image must be less than 200KB.");
        setSelectedImage(null);
        setPreviewUrl(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
        return;
      }
      setUploadError("");
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedVideo(file);
  };

  // 3. UPLOAD & SAVE
  const handleAddFeedback = async (e) => {
    e.preventDefault();
    if (!selectedImage || !name.trim() || !feedbackText.trim()) {
      setUploadError("Please provide a thumbnail image, name, and feedback.");
      return;
    }

    setLoading(true);
    setUploadError("");

    try {
      const timestamp = Date.now();
      
      // Upload Thumbnail Image
      const imageName = `feedback/${timestamp}_thumb_${selectedImage.name}`;
      const imageSnap = await uploadBytes(storageRef(storage, imageName), selectedImage);
      const imageUrl = await getDownloadURL(imageSnap.ref);

      // Upload Video (if provided)
      let videoUrl = null;
      let videoPath = null;
      if (selectedVideo) {
        videoPath = `feedback/${timestamp}_video_${selectedVideo.name}`;
        const videoSnap = await uploadBytes(storageRef(storage, videoPath), selectedVideo);
        videoUrl = await getDownloadURL(videoSnap.ref);
      }

      // Save to Database
      await push(dbRef(db, "feedback"), {
        name,
        destination,
        feedback: feedbackText,
        rating: Number(rating),
        videoThumbnail: imageUrl, 
        imageStoragePath: imageName,
        videoUrl: videoUrl,
        videoStoragePath: videoPath,
        timestamp: timestamp
      });

      // Reset
      setName(""); setDestination(""); setFeedbackText(""); setRating(5);
      setSelectedImage(null); setPreviewUrl(null); setSelectedVideo(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (videoInputRef.current) videoInputRef.current.value = "";
    } catch (error) {
      setUploadError("Failed to save feedback.");
    } finally {
      setLoading(false);
    }
  };

  // 4. DELETE
  const handleDelete = async (item) => {
    if (window.confirm(`Delete review from ${item.name}?`)) {
      try {
        await remove(dbRef(db, `feedback/${item.id}`));
        if (item.imageStoragePath) await deleteObject(storageRef(storage, item.imageStoragePath));
        if (item.videoStoragePath) await deleteObject(storageRef(storage, item.videoStoragePath));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <MessageSquare size={24} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">User Feedback Manager</h2>
          <p className="text-slate-500 font-medium text-sm">Upload customer stories, video testimonials, and reviews.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ADD FEEDBACK FORM */}
        <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-24">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Plus size={18} className="text-blue-600" /> Add Story
          </h3>

          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" /> {uploadError}
            </div>
          )}

          <form onSubmit={handleAddFeedback} className="space-y-4">
            
            <div className={`border-2 border-dashed rounded-xl overflow-hidden relative transition-colors ${previewUrl ? 'border-blue-500 bg-slate-900' : 'border-slate-300 hover:border-slate-400 bg-white'}`} style={{ height: '140px' }}>
              <input type="file" accept="image/*" onChange={handleImageChange} ref={imageInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-90" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <ImageIcon size={32} className="text-slate-300 mb-2" />
                  <p className="text-xs font-bold text-slate-600">Upload Trip Thumbnail</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">MAX SIZE: 200KB</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Video size={12}/> Testimonial Video (Optional)</label>
              <input type="file" accept="video/*" ref={videoInputRef} onChange={handleVideoChange} className="w-full mt-1 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Traveler Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g., The Sharma Family" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Trip Destination</label>
                <input type="text" required value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g., Kerala Backwaters" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                  <span>Star Rating</span>
                  <span className="text-amber-500 flex items-center gap-1">{rating} <Star size={10} className="fill-amber-500" /></span>
                </label>
                <input type="range" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="w-full mt-2 accent-amber-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Customer Feedback</label>
                <textarea required value={feedbackText} onChange={e => setFeedbackText(e.target.value)} placeholder="Enter their review..." rows="4" className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
              </div>
            </div>

            <button type="submit" disabled={loading || !selectedImage} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 mt-2">
              {loading ? "Saving..." : "Publish Feedback"}
            </button>
          </form>
        </div>

        {/* DATABASE GRID */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {feedbacks.map(item => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group flex flex-col">
                  
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(item)} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-lg"><Trash2 size={14} /></button>
                  </div>

                  <div className="h-32 bg-slate-900 relative shrink-0 flex items-center justify-center">
                    <img src={item.videoThumbnail} alt={item.destination} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    {item.videoUrl && <Video size={24} className="text-white relative z-10 opacity-70" />}
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10">{item.destination}</div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 font-medium italic mb-3 line-clamp-3">"{item.feedback}"</p>
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-[10px]">
                        {item.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800 text-xs">{item.name}</span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
            {feedbacks.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                <MessageSquare size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400 font-bold">No feedback uploaded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}