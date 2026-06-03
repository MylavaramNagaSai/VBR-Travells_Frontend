import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  History, 
  ShieldCheck, 
  Settings, 
  Map, 
  FileCheck, 
  Snowflake, 
  Award,
  UserCheck
} from "lucide-react";

export default function OurHistory() {
  const standards = [
    { icon: <Settings size={28} />, title: "25-Step Verification", desc: "Before any journey begins, every vehicle undergoes a rigorous 25-step mechanical and safety inspection by our expert technicians." },
    { icon: <Award size={28} />, title: "Handcrafted Interiors", desc: "Our vehicles aren't just bought; they are specially designed and handcrafted to deliver maximum customer comfort and a VIP experience." },
    { icon: <ShieldCheck size={28} />, title: "100% Insured & Secure", desc: "Total peace of mind. Every single vehicle and all our professional drivers are comprehensively insured." },
    { icon: <FileCheck size={28} />, title: "Registered & GST Compliant", desc: "A fully registered, transparent travel agency providing legitimate GST invoicing for corporate and individual clients." },
    { icon: <Map size={28} />, title: "All-India Permits", desc: "Travel anywhere without borders. Our entire fleet is pre-authorized with All-India Tourist Permits for seamless interstate journeys." },
    { icon: <Snowflake size={28} />, title: "Fully Air-Conditioned", desc: "Beat the heat. 100% of our modern, up-to-date fleet is equipped with powerful, climate-controlled AC systems." },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm tracking-widest uppercase mb-6"
        >
          <History size={16} /> Established in 1997
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
        >
          Three Decades of <span className="text-blue-600">Excellence</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed"
        >
          From our humble beginnings to becoming a premier travel network, VBR Tours & Travels has been defined by one unwavering promise: unparalleled customer comfort and absolute satisfaction.
        </motion.p>
      </div>

      {/* FOUNDER SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden"
        >
          {/* Decorative background blob */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
          
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-slate-100">
            {/* 
              ADD THE OWNER's IMAGE HERE! 
              Just replace "/images/owner-placeholder.jpg" with the actual path to your image once you upload it to your public folder.
            */}
            <img 
  src="/masthanbabu.png" 
  alt="Shaik Masthanvali (Babu)" 
  className="w-full h-full object-cover"
/>
          </div>

          <div className="flex-1 relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Shaik Masthanvali (Babu)</h2>
            <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-6">Founder & Managing Director</p>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              "When I started this journey in 1997, my goal was simple: treat every passenger like family. Today, we maintain an exclusive fleet of new, highly customized vehicles. We don't just buy buses; we handcraft their interiors to ensure you experience the absolute pinnacle of luxury and comfort on Indian roads."
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-800 font-bold">
              <UserCheck className="text-emerald-500" /> Highly Experienced Chauffeurs
            </div>
          </div>
        </motion.div>
      </div>

      {/* THE VBR STANDARD GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-4">The VBR Standard</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">We leave nothing to chance. Our reputation is built on strict maintenance, legal compliance, and uncompromising safety.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((standard, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                {standard.icon}
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-3">{standard.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{standard.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}