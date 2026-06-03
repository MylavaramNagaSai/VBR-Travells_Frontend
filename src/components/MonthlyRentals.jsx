import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, ShieldCheck, Wrench, PhoneCall, ArrowRight, UserCheck, CarFront, Bus, BusFront, Cloud } from "lucide-react";

export default function MonthlyRentals() {
  const benefits = [
    { icon: <CalendarDays size={28} />, title: "Flexible Tenure", desc: "Rent for a month, a quarter, or a year. We scale with your timeline." },
    { icon: <Wrench size={28} />, title: "Zero Maintenance", desc: "All servicing, repairs, and paperwork are completely handled by us." },
    { icon: <UserCheck size={28} />, title: "Professional Drivers", desc: "Includes verified, experienced, and uniformed chauffeurs for your safety." },
    { icon: <ShieldCheck size={28} />, title: "Fully Insured", desc: "Comprehensive commercial insurance and all-India permits included." },
  ];

  // Helper component to render the seamless scrolling road
  const AnimatedRoad = () => (
    <div className="absolute bottom-0 left-0 w-full h-8 bg-slate-800 flex items-center overflow-hidden z-20">
      {/* Moves exactly -112px to create a perfectly seamless infinite loop */}
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
          Premium <span className="text-blue-600">Monthly Rentals</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto"
        >
          Hassle-free, long-term mobility solutions for families, executives, and VIPs. Enjoy the luxury of owning a premium vehicle without the liabilities.
        </motion.p>
      </div>

      {/* CUSTOM ANIMATED VEHICLES SHOWCASE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. ANIMATED SUV SCENE */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-blue-100/50 to-blue-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Clouds */}
              <motion.div animate={{ x: [-100, 300] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-6 left-0 text-blue-200"><Cloud size={48} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [-100, 300] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute top-2 left-0 text-white/80"><Cloud size={32} fill="currentColor" /></motion.div>

              {/* Bouncing Car */}
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-blue-600 drop-shadow-2xl">
                <CarFront size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-blue-600 z-30 shadow-sm">SUVs</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Innova Crysta / Carens</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Perfect for executive travel and family long-term use.</p>
          </motion.div>

          {/* 2. ANIMATED TEMPO TRAVELLER SCENE */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-emerald-100/50 to-emerald-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Clouds */}
              <motion.div animate={{ x: [-100, 300] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute top-4 left-0 text-emerald-200"><Cloud size={56} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [-100, 300] }} transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute top-8 left-0 text-white/80"><Cloud size={24} fill="currentColor" /></motion.div>

              {/* Bouncing Van (Side Profile) */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-emerald-600 drop-shadow-2xl">
                <Bus size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-emerald-600 z-30 shadow-sm">Travellers</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Force Urbania / Traveller</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Ideal for crew movements and large family commitments.</p>
          </motion.div>

          {/* 3. ANIMATED LUXURY BUS SCENE */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-red-100/50 to-red-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Clouds */}
              <motion.div animate={{ x: [-100, 300] }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="absolute top-3 left-0 text-red-200"><Cloud size={40} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [-100, 300] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 8 }} className="absolute top-10 left-0 text-white/80"><Cloud size={32} fill="currentColor" /></motion.div>

              {/* Heavy Bouncing Bus Front */}
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-red-600 drop-shadow-2xl">
                <BusFront size={110} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-red-600 z-30 shadow-sm">Coaches</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Luxury Buses (22-41 Str)</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Dedicated transport for staff, students, or massive events.</p>
          </motion.div>

        </div>
      </div>

      {/* WHY CHOOSE US GRID */}
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
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to book long-term?</h2>
            <p className="text-slate-400 font-medium text-lg mb-10 max-w-xl mx-auto">
              Get customized pricing based on your specific vehicle choice, expected monthly mileage, and tenure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://wa.me/919866128901?text=Hi,%20I%20am%20looking%20for%20a%20price%20quotation%20for%20a%20Monthly%20Rental."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
              >
                <PhoneCall size={20} /> Get Price Quotation
              </a>
              <Link 
                to="/fleet"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all backdrop-blur-sm"
              >
                Explore Fleet <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}