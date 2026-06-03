import { motion } from "framer-motion";
import { 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldAlert,
  Headset,
  ArrowRight
} from "lucide-react";

export default function Helpline() {
  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm tracking-widest uppercase mb-6"
        >
          <Clock size={16} /> Available 24/7
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
        >
          VBR <span className="text-blue-600">Support Center</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Whether you need an urgent booking, on-road assistance, or a corporate quotation, our dedicated dispatch and support team is standing by to help you immediately.
        </motion.p>
      </div>

      {/* CONTACT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. DIRECT CALL SECTION */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors" />
            
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <PhoneCall size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 relative z-10">Direct Voice Support</h3>
            <p className="text-slate-500 font-medium mb-8 relative z-10">
              Speak directly with our management and dispatch team for immediate assistance.
            </p>
            
            <div className="flex flex-col gap-3 w-full mt-auto relative z-10">
              <a 
                href="tel:+919866128901" 
                className="w-full bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-bold py-4 px-6 rounded-xl flex items-center justify-between border border-slate-100 transition-colors"
              >
                <span>+91 98661 28901</span>
                <ArrowRight size={18} className="text-slate-400" />
              </a>
              <a 
                href="tel:+919059848707" 
                className="w-full bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-bold py-4 px-6 rounded-xl flex items-center justify-between border border-slate-100 transition-colors"
              >
                <span>+91 90598 48707</span>
                <ArrowRight size={18} className="text-slate-400" />
              </a>
            </div>
          </motion.div>

          {/* 2. WHATSAPP SECTION */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900 rounded-[2rem] p-8 shadow-xl shadow-slate-900/20 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/30 transition-colors" />
            
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 relative z-10">WhatsApp Chat</h3>
            <p className="text-slate-400 font-medium mb-8 relative z-10">
              Prefer texting? Send us your itinerary or vehicle requirements for a rapid quotation.
            </p>
            
            <div className="w-full mt-auto relative z-10">
              <a 
                href="https://wa.me/919866128901" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* 3. EMAIL SECTION */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors" />
            
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Mail size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 relative z-10">Email Inquiries</h3>
            <p className="text-slate-500 font-medium mb-8 relative z-10">
              Best for corporate RFPs, vendor registrations, or sharing detailed tour documents.
            </p>
            
            <div className="flex flex-col gap-3 w-full mt-auto relative z-10">
              <a 
                href="mailto:contact@vbrtourstravels.com" 
                className="w-full bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 font-bold py-4 px-4 rounded-xl flex items-center justify-between border border-slate-100 transition-colors text-[13px] sm:text-sm"
              >
                <span className="truncate">contact@vbrtourstravels.com</span>
                <ArrowRight size={18} className="text-slate-400 shrink-0 ml-2" />
              </a>
              <a 
                href="mailto:masthanvali@vbrtourstravels.com" 
                className="w-full bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 font-bold py-4 px-4 rounded-xl flex items-center justify-between border border-slate-100 transition-colors text-[13px] sm:text-sm"
              >
                <span className="truncate">masthanvali@vbrtourstravels.com</span>
                <span className="bg-slate-800 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-md ml-2 shrink-0">Admin</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* EMERGENCY BANNER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black text-amber-900">On-Road Emergency?</h4>
              <p className="text-amber-700 font-medium text-sm mt-1">
                If you are currently on a trip with our vehicle and require immediate technical or logistical assistance, please call the proprietor directly.
              </p>
            </div>
          </div>
          <a 
            href="tel:+919866128901"
            className="bg-amber-500 hover:bg-amber-600 text-white font-black py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shrink-0 whitespace-nowrap shadow-sm"
          >
            <Headset size={18} /> Priority Dial
          </a>
        </div>
      </div>

    </div>
  );
}