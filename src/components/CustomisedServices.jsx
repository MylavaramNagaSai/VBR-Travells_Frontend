import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Globe, 
  PartyPopper, 
  Crown, 
  MapPinned, 
  ShieldCheck,
  PhoneCall, 
  ArrowRight, 
  Map, 
  Camera, 
  CarFront, 
  Bus, 
  BusFront 
} from "lucide-react";

export default function CustomisedServices() {
  const benefits = [
    { icon: <Globe size={28} />, title: "All-India Permits", desc: "Our vehicles come pre-cleared with All-India tourist permits. Say goodbye to long waits and extra taxes at state borders." },
    { icon: <PartyPopper size={28} />, title: "Mega Event Logistics", desc: "Expert fleet coordination for massive destination weddings, political rallies, and corporate offsites." },
    { icon: <Crown size={28} />, title: "VIP & Celebrity Transport", desc: "Discreet, high-security luxury transport with tinted windows, plush interiors, and highly trained professional chauffeurs." },
    { icon: <ShieldCheck size={28} />, title: "Total Flexibility", desc: "Need a last-minute route change? Want to extend the trip? Your itinerary is completely flexible and customizable on the go." },
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
          Boundless Journeys. <span className="text-fuchsia-600">Bespoke Experiences.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          From cross-country expeditions to massive destination weddings. With our All-India Permits and premium fleet, your itinerary is limited only by your imagination.
        </motion.p>
      </div>

      {/* CUSTOM ANIMATED BESPOKE SCENES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. WEDDINGS & EVENTS SCENE (Fuchsia Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-fuchsia-100/50 to-fuchsia-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Celebration Icons */}
              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-6 left-6 text-fuchsia-300"><PartyPopper size={64} fill="currentColor" /></motion.div>
              <motion.div animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-10 right-8 text-fuchsia-200"><PartyPopper size={48} fill="currentColor" /></motion.div>

              {/* Bouncing Luxury SUV */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-fuchsia-600 drop-shadow-2xl">
                <CarFront size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-fuchsia-600 z-30 shadow-sm">Weddings & Events</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Baraat & Guest Transport</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Flawless coordination for weddings, ensuring your VIP guests arrive together, on time, and in style.</p>
          </motion.div>

          {/* 2. PAN-INDIA SCENE (Purple Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-purple-100/50 to-purple-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Maps */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute top-4 left-0 text-purple-200"><Map size={80} /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 4 }} className="absolute top-12 left-0 text-purple-100"><MapPinned size={50} /></motion.div>

              {/* Cruising Tempo */}
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-purple-600 drop-shadow-2xl">
                <Bus size={96} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-purple-600 z-30 shadow-sm">Cross-Border</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">All-India Road Trips</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Seamlessly cross state lines for extended tours. Our All-India permit means zero delays at checkposts.</p>
          </motion.div>

          {/* 3. VIP & FILM SCENE (Gold Theme) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center transition-transform duration-300"
          >
            <div className="w-full h-56 bg-gradient-to-b from-amber-100/50 to-amber-50 rounded-2xl mb-6 overflow-hidden relative flex flex-col items-center justify-end pb-8 border border-slate-100">
              
              {/* Parallax Cameras/VIP Icons */}
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-6 left-0 text-amber-300"><Camera size={70} fill="currentColor" /></motion.div>
              <motion.div animate={{ x: [300, -150] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 6 }} className="absolute top-12 left-0 text-amber-200"><Crown size={45} fill="currentColor" /></motion.div>

              {/* Cruising Luxury Coach */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="z-10 text-amber-500 drop-shadow-2xl">
                <BusFront size={110} strokeWidth={1.5} />
              </motion.div>

              <AnimatedRoad />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-amber-600 z-30 shadow-sm">Film & VIP</div>
            </div>
            <h3 className="text-xl font-black text-slate-800">Film Shoots & VIPs</h3>
            <p className="text-slate-500 font-medium text-sm mt-2 text-center">Reliable, heavy-duty transport for film crew equipment, vanity vans, and high-profile celebrity security.</p>
          </motion.div>

        </div>
      </div>

      {/* CUSTOM SERVICES VALUE PROPOSITION GRID */}
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
              <div className="w-14 h-14 bg-fuchsia-50 text-fuchsia-600 rounded-2xl flex items-center justify-center mb-6">
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Have a unique requirement?</h2>
            <p className="text-slate-400 font-medium text-lg mb-10 max-w-xl mx-auto">
              Whether it's a 10-bus convoy for a wedding or a specialized itinerary spanning multiple states, we have the fleet and the permits to make it happen.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://wa.me/919866128901?text=Hi,%20I%20have%20a%20unique%20customized%20travel%20requirement.%20Can%20we%20discuss?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg shadow-fuchsia-600/30 hover:scale-105"
              >
                <PhoneCall size={20} /> Discuss Your Event
              </a>
              <Link 
                to="/fleet"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all backdrop-blur-sm"
              >
                Explore Fleet Options <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}