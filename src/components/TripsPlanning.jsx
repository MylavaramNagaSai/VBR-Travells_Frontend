import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  HeartHandshake, 
  Sparkles, 
  Languages, 
  MapPin, 
  PhoneCall, 
  ArrowRight, 
  Mountain, 
  Palmtree, 
  Sun, 
  Cloud,
  CarFront, 
  Bus, 
  BusFront 
} from "lucide-react";

export default function TripsPlanning() {
  const benefits = [
    { icon: <Sparkles size={28} />, title: "Ultra-Modern Fleet", desc: "Every vehicle in our fleet is strictly less than 5 years old, guaranteeing you a pristine, breakdown-free, and ultra-luxurious ride." },
    { icon: <HeartHandshake size={28} />, title: "The VBR Promise", desc: "Your comfort is our obsession. We guarantee 100% customer satisfaction, delivering a flawless, VIP experience from start to finish." },
    { icon: <Languages size={28} />, title: "Multilingual Chauffeurs", desc: "Communication is never a barrier. Our highly trained drivers fluently speak 3+ languages, serving as your personal guides on the road." },
    { icon: <MapPin size={28} />, title: "Masterfully Crafted Routes", desc: "We don't just drive; we plan. From the best rest stops to hidden scenic viewpoints, we engineer the perfect itinerary for your group." },
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
          We Engineer <span className="text-rose-500">Unforgettable Journeys</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Tell us your dream destination, and we handle the rest. Uncompromising safety, ultimate comfort, and a promise of absolute customer satisfaction.
        </motion.p>
      </div>

      {/* CUSTOM ANIMATED LEISURE SCENES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. HILL STATION SCENE (Rose Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-rose-100/50 to-rose-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Mountains */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute top-6 left-0 text-rose-200"><Mountain size={80} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 8 }} className="absolute top-12 left-0 text-rose-100"><Mountain size={50} fill="currentColor" /></motion.div>

              {/* Bouncing SUV */}
              <motion.div animate={{ y: [0, -3, 0], rotate: [0, -1, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-rose-500 drop-shadow-2xl">
                <CarFront size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-rose-600 z-30 shadow-sm">Family Trips</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Premium SUVs</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Perfectly tailored for intimate family vacations, hill stations, and weekend getaways.</p>
          </motion.div>

          {/* 2. COASTAL/BEACH SCENE (Teal Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-teal-100/50 to-teal-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Palm Trees */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute top-4 left-0 text-teal-200"><Palmtree size={70} /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute top-8 left-0 text-teal-100"><Palmtree size={45} /></motion.div>

              {/* Bouncing Tempo */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-teal-500 drop-shadow-2xl">
                <Bus size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-teal-600 z-30 shadow-sm">Group Tours</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Tempo Travellers</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">The ultimate choice for extended friend groups, coastal tours, and multi-city exploration.</p>
          </motion.div>

          {/* 3. HIGHWAY SUNSET SCENE (Orange Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-orange-100/50 to-orange-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Sun and Clouds */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute top-4 right-8 text-orange-300"><Sun size={60} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute top-10 left-0 text-white/80"><Cloud size={40} fill="currentColor" /></motion.div>

              {/* Cruising Luxury Coach */}
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-orange-500 drop-shadow-2xl">
                <BusFront size={110} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-orange-600 z-30 shadow-sm">Massive Journeys</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Luxury Coaches</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Airline-level comfort for massive wedding parties, pilgrimages, and cross-state vacations.</p>
          </motion.div>

        </div>
      </div>

      {/* TRIP PLANNING VALUE PROPOSITION GRID */}
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
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Let's build your dream trip.</h2>
            <p className="text-slate-400 font-medium text-lg mb-10 max-w-xl mx-auto">
              Share your destinations and dates with us. Our travel experts will craft a fully customized, ultra-comfortable itinerary for your group.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://wa.me/919866128901?text=Hi,%20I%20want%20to%20plan%20a%20custom%20trip.%20Can%20you%20help%20me%20with%20an%20itinerary%20and%20vehicle?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-rose-500 hover:bg-rose-400 text-white font-black text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg shadow-rose-500/30 hover:scale-105"
              >
                <PhoneCall size={20} /> Speak to a Travel Expert
              </a>
              <Link 
                to="/fleet"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all backdrop-blur-sm"
              >
                Select Your Vehicle <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}