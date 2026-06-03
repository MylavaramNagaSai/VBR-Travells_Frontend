import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  MapPin, 
  Headset, 
  PhoneCall, 
  ArrowRight, 
  Building2, 
  CarFront, 
  Bus, 
  BusFront, 
  Factory 
} from "lucide-react";

export default function CorporateRentals() {
  const benefits = [
    { icon: <MapPin size={28} />, title: "Live GPS Tracking", desc: "Real-time fleet monitoring and employee tracking for complete peace of mind." },
    { icon: <Briefcase size={28} />, title: "GST & Custom Billing", desc: "Streamlined corporate invoicing, strict SLA compliance, and flexible payment terms." },
    { icon: <Headset size={28} />, title: "Dedicated Support", desc: "A 24/7 dedicated account manager exclusively assigned to your company's logistics." },
    { icon: <Building2 size={28} />, title: "Scalable Operations", desc: "From agile startups to massive MNCs, we instantly scale our fleet to match your workforce size." },
  ];

  // Helper component to render the seamless scrolling road
  const AnimatedRoad = () => (
    <div className="absolute bottom-0 left-0 w-full h-8 bg-slate-800 flex items-center overflow-hidden z-20">
      <motion.div animate={{ x: [0, -112] }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} className="flex gap-4 w-[200%] pl-4">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="h-1 w-10 bg-slate-500/40 rounded-full shrink-0" />
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
        >
          Enterprise <span className="text-indigo-600">Staff Transportation</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto"
        >
          Reliable, safe, and punctual daily commutes for MNCs, private firms, startups, and government organizations across India.
        </motion.p>
      </div>

      {/* CUSTOM ANIMATED CORPORATE VEHICLES SHOWCASE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. ANIMATED EXECUTIVE SCENE (Slate/Silver Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-slate-200/50 to-slate-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Cityscape */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-6 left-0 text-slate-300"><Building2 size={64} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 4 }} className="absolute top-10 left-0 text-slate-200"><Building2 size={48} fill="currentColor" /></motion.div>

              {/* Bouncing Executive Car */}
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-slate-700 drop-shadow-2xl">
                <CarFront size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-slate-700 z-30 shadow-sm">VIP & Execs</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Premium Sedans & SUVs</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Discreet, luxurious transport for board members, VIP guests, and senior management.</p>
          </motion.div>

          {/* 2. ANIMATED TEAM SHUTTLES SCENE (Emerald Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-emerald-100/50 to-emerald-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Tech Park */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute top-4 left-0 text-emerald-200"><Building2 size={80} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 6 }} className="absolute top-12 left-0 text-emerald-100"><Factory size={40} fill="currentColor" /></motion.div>

              {/* Bouncing Shuttle */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-emerald-600 drop-shadow-2xl">
                <Bus size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-emerald-600 z-30 shadow-sm">Team Shuttles</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Tempo Travellers</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Agile 12-26 seaters perfect for startup teams, shift workers, and airport transfers.</p>
          </motion.div>

          {/* 3. ANIMATED MASS TRANSIT SCENE (Indigo Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-indigo-100/50 to-indigo-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Industrial Zone */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute top-6 left-0 text-indigo-200"><Factory size={70} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 3 }} className="absolute top-8 left-0 text-indigo-100"><Building2 size={50} fill="currentColor" /></motion.div>

              {/* Heavy Bouncing Bus Front */}
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-indigo-600 drop-shadow-2xl">
                <BusFront size={110} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-indigo-600 z-30 shadow-sm">Mass Transit</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Corporate Coaches</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Large scale 41-seater deployment for massive workforces, factories, and tech hubs.</p>
          </motion.div>

        </div>
      </div>

      {/* B2B VALUE PROPOSITION GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-2">{benefit.title}</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* B2B CALL TO ACTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Partner with VBR Travels</h2>
            <p className="text-slate-400 font-medium text-lg mb-10 max-w-xl mx-auto">
              Request a detailed corporate proposal, compliance documents, and customized route planning for your organization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://wa.me/919866128901?text=Hi,%20we%20are%20a%20company%20looking%20for%20Corporate%20Staff%20Transportation.%20Can%20we%20get%20a%20proposal?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-600/30 hover:scale-105"
              >
                <PhoneCall size={20} /> Request Corporate Proposal
              </a>
              <Link 
                to="/fleet"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all backdrop-blur-sm"
              >
                View Fleet Capacity <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}