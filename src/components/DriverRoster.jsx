import { motion } from "framer-motion";
// FIX: Swapped 'SteeringWheel' for 'CarFront'
import { ShieldCheck, UserCheck, HeartHandshake, Languages, FileBadge, CarFront } from "lucide-react";

// The strict safety protocols highlighted at the top
const safetyProtocols = [
  {
    icon: ShieldCheck,
    title: "Zero Tolerance Policy",
    desc: "Every driver passes mandatory breathalyzer (drunk) and smoking tests before being dispatched for any trip.",
    color: "text-emerald-600",
    bg: "bg-emerald-100"
  },
  {
    icon: UserCheck,
    title: "Professional Attire",
    desc: "Our chauffeurs are strictly dedicated to wearing official company uniforms along with verified ID cards.",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    icon: HeartHandshake,
    title: "Experienced & Safe",
    desc: "We only hire highly experienced drivers trained specifically in defensive, careful, and smooth driving.",
    color: "text-amber-600",
    bg: "bg-amber-100"
  }
];

// Driver Roster Data
const drivers = [
  {
    id: 1,
    name: "Raju Venkat",
    image: "h//images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    experience: "12 Years",
    license: "Valid Commercial (HMV/LMV)",
    languages: "Telugu, Hindi, English"
  },
  {
    id: 2,
    name: "Suresh Kumar",
    image: "ttps://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    experience: "8 Years",
    license: "Valid Commercial (LMV)",
    languages: "Telugu, English"
  },
  {
    id: 3,
    name: "Ramesh Reddy",
    image: "ttps://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    experience: "15 Years",
    license: "Valid Commercial (HMV/Bus)",
    languages: "Telugu, Hindi"
  },
  {
    id: 4,
    name: "Karthik Sharma",
    image: "ttps://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    experience: "6 Years",
    license: "Valid Commercial (LMV)",
    languages: "Telugu, Hindi, English"
  }
];

export default function DriverRoster() {
  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Professional Chauffeurs</h2>
        <p className="text-slate-500 font-medium mt-3 max-w-2xl mx-auto text-lg">
          Your safety and comfort are our highest priorities. Travel with peace of mind knowing you are in expert hands.
        </p>
      </div>

      {/* --- SAFETY GUARANTEE BANNER --- */}
      <div className="bg-white rounded-3xl p-6 md:p-10 mb-16 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {safetyProtocols.map((protocol, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl ${protocol.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <protocol.icon size={28} className={protocol.color} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{protocol.title}</h4>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {protocol.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- DRIVER PROFILES GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {drivers.map((driver, index) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col"
          >
            {/* Driver Image */}
            <div className="relative h-56 bg-slate-100">
              <img 
                src={driver.image} 
                alt={driver.name} 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white drop-shadow-md">{driver.name}</h3>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-1 uppercase tracking-wide">
                  <ShieldCheck size={14} /> Background Verified
                </div>
              </div>
            </div>

            {/* Driver Credentials */}
            <div className="p-5 flex flex-col gap-4 bg-slate-50/50 flex-1">
              
              <div className="flex items-start gap-3">
                {/* FIX: Used CarFront here instead */}
                <CarFront size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Experience</span>
                  <span className="text-sm font-bold text-slate-700">{driver.experience} of Safe Driving</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileBadge size={18} className="text-purple-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">License Status</span>
                  <span className="text-sm font-bold text-slate-700">{driver.license}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Languages size={18} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Languages</span>
                  <span className="text-sm font-bold text-slate-700">{driver.languages}</span>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}