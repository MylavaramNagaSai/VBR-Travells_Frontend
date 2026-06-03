import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  ShieldCheck, 
  Map, 
  Users, 
  PhoneCall, 
  ArrowRight, 
  Building, 
  Factory, 
  Bus, 
  BusFront, 
  Landmark,
  BookOpen
} from "lucide-react";

export default function StudentIndustrialVisits() {
  const benefits = [
    { icon: <ShieldCheck size={28} />, title: "Highest Safety Standards", desc: "Speed-governed vehicles, verified drivers, and live GPS tracking for peace of mind." },
    { icon: <Users size={28} />, title: "Massive Fleet Capacity", desc: "Need to move 50 or 500 students? We have the fleet to handle any batch size seamlessly." },
    { icon: <Map size={28} />, title: "Custom Itineraries", desc: "Multi-stop routes including campuses, factory gates, hotels, and heritage sites." },
    { icon: <GraduationCap size={28} />, title: "Budget-Friendly", desc: "Special discounted pricing structures specifically designed for educational institutions." },
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
          Educational & <span className="text-amber-500">Industrial Visits</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto"
        >
          Safe, reliable, and coordinated group transportation for schools, colleges, and universities exploring the industries of tomorrow.
        </motion.p>
      </div>

      {/* CUSTOM ANIMATED EDUCATIONAL SCENES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. CAMPUS TO CITY SCENE (Sky Blue Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-sky-100/50 to-sky-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Campus */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute top-6 left-0 text-sky-200"><Building size={70} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute top-12 left-0 text-sky-100"><BookOpen size={40} fill="currentColor" /></motion.div>

              {/* Bouncing Mini Bus */}
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-sky-600 drop-shadow-2xl">
                <Bus size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-sky-600 z-30 shadow-sm">Local Trips</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Mini Buses (22-29 Str)</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Perfect for small class batches, local museum visits, and intra-city exhibitions.</p>
          </motion.div>

          {/* 2. FACTORY VISIT SCENE (Amber Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-amber-100/50 to-amber-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Factory */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-4 left-0 text-amber-200"><Factory size={80} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 4 }} className="absolute top-10 left-0 text-amber-100"><Building size={50} fill="currentColor" /></motion.div>

              {/* Heavy Bouncing Coach Front */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-amber-500 drop-shadow-2xl">
                <BusFront size={110} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-amber-600 z-30 shadow-sm">Industrial IVs</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Large Coaches (41 Str)</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Ideal for full-batch engineering or management industrial tours to tech parks & plants.</p>
          </motion.div>

          {/* 3. STUDY TOUR SCENE (Violet Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-violet-100/50 to-violet-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Heritage */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} className="absolute top-6 left-0 text-violet-200"><Landmark size={70} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 7 }} className="absolute top-12 left-0 text-violet-100"><Map size={40} fill="currentColor" /></motion.div>

              {/* Cruising Luxury Coach */}
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-violet-600 drop-shadow-2xl">
                <BusFront size={110} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-violet-600 z-30 shadow-sm">Study Tours</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Luxury Volvo & AC Buses</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Maximum comfort for long-distance multi-day educational excursions and historical trips.</p>
          </motion.div>

        </div>
      </div>

      {/* EDUCATIONAL VALUE PROPOSITION GRID */}
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
              <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-2">{benefit.title}</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Planning an IV or Tour?</h2>
            <p className="text-slate-400 font-medium text-lg mb-10 max-w-xl mx-auto">
              Get specialized group pricing for your college or school. Let us handle the logistics while you focus on the learning.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://wa.me/919866128901?text=Hi,%20I%20am%20looking%20to%20organize%20an%20Industrial%20Visit/Study%20Tour.%20Can%20we%20discuss%20transportation?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg shadow-amber-500/30 hover:scale-105"
              >
                <PhoneCall size={20} /> Request Institutional Quote
              </a>
              <Link 
                to="/fleet"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all backdrop-blur-sm"
              >
                View Bus Capacities <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}