import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, HeartHandshake, Languages, FileBadge, CarFront, MapPin } from "lucide-react";

// The strict safety protocols
const safetyProtocols = [
  {
    icon: ShieldCheck,
    title: "Zero Tolerance Policy",
    desc: "Every driver passes mandatory breathalyzer and smoking tests before being dispatched for any trip.",
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

// Extracted Driver Roster Data
const drivers = [
  { id: 1, name: "SK HABEEB BASHA", license: "DLFAP026104462003", experience: "10+ Years" },
  { id: 2, name: "N SREENIVASULU", license: "AP2262017000237", experience: "8 Years" },
  { id: 3, name: "SK GOUSE BASHA", license: "Verified", experience: "7 Years" },
  { id: 4, name: "SK SHAHUL HAMEED", license: "1234/DL/1999", experience: "25+ Years" },
  { id: 5, name: "PUJARI KIRAN", license: "556760392638", experience: "5 Years" },
  { id: 6, name: "A SREENIVASULU", license: "2873/FDL/1993", experience: "30+ Years" },
  { id: 7, name: "RAJENDRA PRASAD G", license: "DLFAP026195522006", experience: "12 Years" },
  { id: 8, name: "RAFI SHAIK", license: "AP0260160002387", experience: "9 Years" },
  { id: 9, name: "MAHABOOB MOGHAL", license: "1909/DL/2002", experience: "22 Years" },
  { id: 10, name: "V RAVIKIRAN SUDHEER", license: "2906/FDL/1990", experience: "35 Years" },
  { id: 11, name: "SHEIK SADHIK BASHA", license: "Verified", experience: "8 Years" },
  { id: 12, name: "P SREEDHAR", license: "AP02620120031426", experience: "14 Years" },
  { id: 13, name: "CH NARENDRA", license: "DLFAP22614242008", experience: "11 Years" },
  { id: 14, name: "MOHAMOD BABA", license: "AP02620200035096", experience: "6 Years" },
  { id: 15, name: "N HEMANTH", license: "DLRAP02620190037171", experience: "7 Years" },
  { id: 16, name: "P MOHANRAJ", license: "AP12620140001175", experience: "10 Years" },
  { id: 17, name: "VENKATESWARLU V", license: "AP02619930000860", experience: "30+ Years" },
  { id: 18, name: "D SREENIVASULU", license: "922/DL/2002", experience: "22 Years" },
  { id: 19, name: "HARI KUMAR M", license: "DLRAP02620200018205", experience: "5 Years" },
  { id: 20, name: "THAYYUB SHAIK", license: "AP02620150008799", experience: "9 Years" },
  { id: 21, name: "SHAIK SHAKEEL", license: "DLFAP2266642009", experience: "12 Years" },
  { id: 22, name: "KARIMULLA SK", license: "Verified", experience: "8 Years" },
  { id: 23, name: "M SURESH", license: "55/DL/2000", experience: "24 Years" },
  { id: 24, name: "FOZIL SHAIK", license: "AP22620130001784", experience: "11 Years" },
  { id: 25, name: "MASTHAN DAMMARLA", license: "DLFAP026151012008", experience: "13 Years" }
].map(d => ({ 
  ...d, 
  image: "ttps://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", 
  languages: "Telugu, Hindi" 
}));

export default function DriverRoster() {
  return (
    <div className="w-full py-20 bg-slate-50 overflow-hidden relative">
      
      {/* Header Section */}
      <div className="text-center px-6 lg:px-12 mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Professional Chauffeurs</h2>
        <p className="text-slate-500 font-medium mt-4 max-w-2xl mx-auto text-lg">
          Your safety and comfort are our highest priorities. All our drivers are background verified and carry valid commercial licenses.
        </p>
      </div>

      {/* Safety Guarantee Banner */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-slate-200/50 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyProtocols.map((protocol, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${protocol.bg} flex items-center justify-center mb-4`}>
                  <protocol.icon size={28} className={protocol.color} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{protocol.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{protocol.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* The Auto-Scrolling Marquee Track */}
      <div className="relative flex overflow-hidden group">
        
        {/* Subtle edge fades to make it look smooth */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-8 pr-8 px-6 cursor-grab active:cursor-grabbing"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {/* Double the array for the infinite loop */}
          {[...drivers, ...drivers].map((driver, index) => (
            <div 
              key={index} 
              // INCREASED WIDTH and PADDING HERE
              className="min-w-[360px] bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow flex flex-col items-center text-center"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                {/* INCREASED IMAGE SIZE HERE */}
                <img 
                  src={driver.image} 
                  alt={driver.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  loading="lazy"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-white flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={14} /> Pro
                </div>
              </div>

              {/* INCREASED NAME FONT SIZE */}
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-5 tracking-tight">{driver.name}</h3>

              <div className="w-full flex flex-col gap-3">
                
                {/* INCREASED EXPERIENCE/LOCATION SIZE */}
                <div className="flex items-center justify-between w-full px-4 text-sm bg-slate-50 rounded-xl py-3 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600 font-bold">
                    <CarFront size={16} className="text-emerald-500" />
                    Exp: {driver.experience}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 font-bold">
                    <MapPin size={16} className="text-blue-500" />
                    Local
                  </div>
                </div>

                {/* INCREASED LICENSE TEXT SIZE */}
                <div className="flex items-center gap-2 px-3 py-2">
                  <FileBadge size={16} className="text-purple-500 shrink-0" />
                  <span className="text-xs md:text-sm font-extrabold text-slate-500 uppercase tracking-wider truncate">{driver.license}</span>
                </div>
                
                {/* INCREASED LANGUAGES TEXT SIZE */}
                <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-100">
                  <Languages size={16} className="text-amber-500 shrink-0" />
                  <span className="text-sm font-bold text-slate-600">{driver.languages}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}