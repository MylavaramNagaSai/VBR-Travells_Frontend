import { motion } from "framer-motion";
import { Wrench, ArrowLeft, Clock, Car } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center"
      >
        {/* Animated Icon Cluster */}
        <div className="relative w-24 h-24 mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200"
          >
            <Wrench size={32} className="text-slate-400" />
          </motion.div>
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-2 -right-2 bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
          >
            <Clock size={20} className="text-white" />
          </motion.div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          Under Development
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed mb-8">
          We are currently building this section to serve you better with premium travel experiences. Please check back soon!
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3.5 px-6 rounded-xl transition-colors border border-slate-200"
          >
            <Car size={18} className="text-blue-600" />
            Return to Homepage
          </button>
        </div>
      </motion.div>

      {/* VBR Branding */}
      <div className="mt-12 flex items-center gap-2 opacity-50">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-xs">VB</span>
        </div>
        <span className="font-extrabold text-slate-900">VBR Travels</span>
      </div>
    </div>
  );
}