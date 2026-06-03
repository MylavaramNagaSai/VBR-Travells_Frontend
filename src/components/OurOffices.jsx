import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  User, 
  Navigation, 
  Clock, 
  Building
} from "lucide-react";

export default function OurOffices() {
  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm tracking-widest uppercase mb-6"
        >
          <Building size={16} /> Headquarters
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
        >
          Visit <span className="text-blue-600">Our Office</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          We are always ready to welcome you. Drop by our main office in Nellore to discuss your travel plans, inspect our fleet, or speak directly with our management.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: CONTACT DETAILS */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Address Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4 relative z-10">Main Office Address</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-lg relative z-10">
                VBR TRAVELS ROAD, KAVERINAGAR,<br/>
                5th Line, Podalakur Road, Kothur,<br/>
                Current Office Opposite,<br/>
                Nellore - 524004.
              </p>
            </div>

            {/* Contact & Proprietor Info */}
            <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-slate-900/20 text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
              
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <Phone className="text-blue-400" /> Direct Contact
              </h3>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User size={20} className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Proprietor</p>
                    <p className="text-lg font-bold">Sk. Masthanvali (Babu)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Mobile Numbers</p>
                    <p className="text-lg font-bold">+91 98661 28901</p>
                    <p className="text-lg font-bold">+91 90598 48707</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Working Hours</p>
                    <p className="text-lg font-bold">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: INTERACTIVE GOOGLE MAPS */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="w-full h-full min-h-[400px] bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-4 flex flex-col">
              {/* Map Container */}
              <div className="w-full h-full min-h-[350px] bg-slate-100 rounded-[1.5rem] overflow-hidden relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.51414394314116!2d79.9343101740877!3d14.414113976381216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf39f5e75fd59%3A0xebeba1d63805f754!2sVBR%20Tours%20%26%20Travels!5e0!3m2!1sen!2sin!4v1780465131680!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  title="VBR Travels Map Location"
                ></iframe>
                
                {/* Overlay to encourage clicking the direct link */}
                <div className="absolute inset-0 pointer-events-none border-4 border-white/20 rounded-[1.5rem]" />
              </div>
              
              {/* Action Button */}
              <div className="mt-4 flex justify-end">
                <a 
                  href="https://maps.app.goo.gl/uu4gbges6KP76MJSA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-3 transition-all shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                >
                  <Navigation size={20} /> Get Directions on Google Maps
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}