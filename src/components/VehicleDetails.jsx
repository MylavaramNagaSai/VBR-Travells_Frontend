import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { ChevronLeft, Users, Snowflake, MapPin, CheckCircle2, Video as VideoIcon, Image as ImageIcon } from "lucide-react";

export default function VehicleDetail() {
  // THE FIX: This safely grabs the unique ID from the URL whether your router calls it :slug, :id, or anything else.
  const params = useParams();
  const vehicleKey = params.id || params.slug || Object.values(params)[0];

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // This state controls which image/video is showing in the big main viewer
  const [activeMedia, setActiveMedia] = useState(null); 

  useEffect(() => {
    if (!vehicleKey) return;

    const vehicleRef = ref(db, `fleet/${vehicleKey}`);
    const unsubscribe = onValue(vehicleRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setVehicle(data);
        // Set the main image as the default active media when loaded
        setActiveMedia({ type: 'image', url: data.image });
      } else {
        setVehicle(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [vehicleKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-20">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Vehicle Not Found</h1>
        <p className="text-slate-500 mb-8">The vehicle you are looking for does not exist or has been removed.</p>
        <Link to="/fleet" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all">Return to Fleet</Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-[100px] pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Back Button */}
        <Link to="/fleet" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
          <ChevronLeft size={20} /> Back to Fleet
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* LEFT: Media Viewer */}
            <div className="p-6 bg-slate-100/50 flex flex-col gap-4 border-r border-slate-100">
              
              {/* Main Display Area */}
              <div className="w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center">
                {activeMedia?.type === 'video' ? (
                  <video src={activeMedia.url} controls autoPlay className="w-full h-full object-contain" />
                ) : (
                  <img src={activeMedia?.url} alt={vehicle.name} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                
                {/* Main Exterior Image Thumbnail */}
                <button 
                  onClick={() => setActiveMedia({ type: 'image', url: vehicle.image })}
                  className={`relative w-20 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeMedia?.url === vehicle.image ? 'border-blue-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={vehicle.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20"><ImageIcon size={14} className="text-white"/></div>
                </button>

                {/* Video Thumbnail */}
                {vehicle.videoUrl && (
                  <button 
                    onClick={() => setActiveMedia({ type: 'video', url: vehicle.videoUrl })}
                    className={`relative w-20 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all bg-slate-900 ${activeMedia?.url === vehicle.videoUrl ? 'border-blue-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <video src={vehicle.videoUrl} className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center"><VideoIcon size={20} className="text-white"/></div>
                  </button>
                )}

                {/* Interior Images Thumbnails */}
                {vehicle.interiorImages && vehicle.interiorImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveMedia({ type: 'image', url: img.url })}
                    className={`relative w-20 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeMedia?.url === img.url ? 'border-blue-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" />
                  </button>
                ))}

              </div>
            </div>

            {/* RIGHT: Vehicle Details & Pricing */}
            <div className="p-8 lg:p-10 flex flex-col">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-600 font-bold text-xs mb-4 w-fit uppercase tracking-wider">
                {vehicle.type}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">
                {vehicle.name}
              </h1>
              
              <div className="text-sm font-bold text-slate-500 mb-6 bg-slate-50 p-2 rounded-lg inline-block w-fit border border-slate-100">
                Reg: <span className="uppercase text-slate-800">{vehicle.numberPlate}</span>
              </div>

              {/* Specs Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 font-bold text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl shadow-sm">
                  <Users size={18} className="text-blue-600" /> 
                  {vehicle.seats} {vehicle.beds !== "0" && vehicle.beds ? `+ ${vehicle.beds} Bed` : 'Seater'}
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl shadow-sm">
                  <Snowflake size={18} className={vehicle.ac ? "text-blue-600" : "text-slate-400"} /> 
                  {vehicle.ac ? "Air Conditioned" : "Non-A/C"}
                </div>
                {vehicle.liveTracking && (
                  <div className="flex items-center gap-2 font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl shadow-sm">
                    <MapPin size={18} className="text-emerald-500" /> Live Tracking Enabled
                  </div>
                )}
              </div>

              <hr className="border-slate-100 mb-8" />

              {/* Pricing Box */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Transparent Pricing</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-600 text-lg">Per Kilometer</span>
                    <span className="text-2xl font-black text-blue-700">₹{vehicle.perKm}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-blue-100/60">
                    <span className="font-bold text-slate-600 text-lg">Per Day</span>
                    <span className="text-xl font-bold text-slate-800">₹{vehicle.perDay}</span>
                  </div>
                  {vehicle.waitingCharge && (
                    <div className="flex justify-between items-center pt-4 border-t border-blue-100/60">
                      <span className="font-bold text-slate-600 text-sm">Waiting Charge</span>
                      <span className="text-sm font-bold text-slate-500">₹{vehicle.waitingCharge} / hr</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Button */}
              <div className="mt-auto">
                <a 
                  href={`https://wa.me/919866128901?text=Hello,%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.numberPlate}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-slate-900/10 hover:-translate-y-1"
                >
                  <CheckCircle2 size={20} /> Book This Vehicle
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}