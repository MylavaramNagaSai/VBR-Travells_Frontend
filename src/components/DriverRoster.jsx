import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, HeartHandshake, Languages, FileBadge, CarFront, MessageCircle } from "lucide-react";

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
// NOTE: I set 'image: null' for some drivers so you can see the Initials Fallback in action!
const drivers = [
  { id: 1, name: "SK HABEEB BASHA", license: "DLFAP026104462003", experience: "10+ Years", image: null },
  { id: 2, name: "N SREENIVASULU", license: "AP2262017000237", experience: "8 Years", image: null },
  { id: 3, name: "SK GOUSE BASHA", license: "Verified", experience: "7 Years", image: null },
  { id: 4, name: "SK SHAHUL HAMEED", license: "1234/DL/1999", experience: "25+ Years", image: "./shahulhameed.jpeg" },
  { id: 5, name: "PUJARI KIRAN", license: "556760392638", experience: "5 Years", image: null },
  { id: 6, name: "A SREENIVASULU", license: "2873/FDL/1993", experience: "30+ Years", image: null },
  { id: 7, name: "RAJENDRA PRASAD G", license: "DLFAP026195522006", experience: "12 Years", image: null },
  { id: 8, name: "RAFI SHAIK", license: "AP0260160002387", experience: "9 Years", image: null },
  { id: 9, name: "MAHABOOB MOGHAL", license: "1909/DL/2002", experience: "22 Years", image: null },
  { id: 10, name: "V RAVIKIRAN SUDHEER", license: "2906/FDL/1990", experience: "35 Years", image: null },
  { id: 11, name: "SHEIK SADHIK BASHA", license: "Verified", experience: "8 Years", image: null },
  { id: 12, name: "P SREEDHAR", license: "AP02620120031426", experience: "14 Years", image: null },
  { id: 13, name: "CH NARENDRA", license: "DLFAP22614242008", experience: "11 Years", image: null },
  { id: 14, name: "MOHAMOD BABA", license: "AP02620200035096", experience: "6 Years", image: null },
  { id: 15, name: "N HEMANTH", license: "DLRAP02620190037171", experience: "7 Years", image: null },
  { id: 16, name: "P MOHANRAJ", license: "AP12620140001175", experience: "10 Years", image: null },
  { id: 17, name: "VENKATESWARLU V", license: "AP02619930000860", experience: "30+ Years", image: null },
  { id: 18, name: "D SREENIVASULU", license: "922/DL/2002", experience: "22 Years", image: null },
  { id: 19, name: "HARI KUMAR M", license: "DLRAP02620200018205", experience: "5 Years", image: null },
  { id: 20, name: "THAYYUB SHAIK", license: "AP02620150008799", experience: "9 Years", image: null },
  { id: 21, name: "SHAIK SHAKEEL", license: "DLFAP2266642009", experience: "12 Years", image: null },
  { id: 22, name: "KARIMULLA SK", license: "Verified", experience: "8 Years", image: null },
  { id: 23, name: "M SURESH", license: "55/DL/2000", experience: "24 Years", image: null },
  { id: 24, name: "FOZIL SHAIK", license: "AP22620130001784", experience: "11 Years", image: null },
  { id: 25, name: "MASTHAN DAMMARLA", license: "DLFAP026151012008", experience: "13 Years", image: null }
].map(d => ({ 
  ...d, 
  languages: "Telugu, Hindi" 
}));

// Helper function to extract the first letters of the first two names
const getInitials = (name) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

// Helper function to generate the pre-filled WhatsApp link
const getWhatsAppLink = (driver) => {
  const phone = "919866128901";
  const message = `Hello VBR Travels,\n\nI am interested in booking or inquiring about this driver:\n\n*Name:* ${driver.name}\n*Experience:* ${driver.experience}\n*License:* ${driver.license}\n*Languages:* ${driver.languages}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

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
              className="min-w-[340px] bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow flex flex-col items-center text-center"
            >
              {/* Profile Image OR Initials Fallback */}
              <div className="relative mb-5">
                {driver.image ? (
                  <img 
                    src={driver.image} 
                    alt={driver.name} 
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-slate-100"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border-4 border-white shadow-md bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white text-3xl font-black tracking-widest">
                    {getInitials(driver.name)}
                  </div>
                )}
                
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-white flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={12} /> Pro
                </div>
              </div>

              {/* Driver Details Stacked */}
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight line-clamp-1">{driver.name}</h3>

              <div className="w-full flex flex-col gap-2.5 mb-6">
                
                {/* Experience */}
                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Experience</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                    <CarFront size={16} className="text-emerald-500" />
                    {driver.experience}
                  </div>
                </div>

                {/* License Number */}
                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">License</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                    <FileBadge size={16} className="text-purple-500" />
                    <span className="truncate max-w-[120px]">{driver.license}</span>
                  </div>
                </div>
                
                {/* Languages */}
                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Languages</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                    <Languages size={16} className="text-amber-500" />
                    {driver.languages}
                  </div>
                </div>

              </div>

              {/* WhatsApp Contact Button */}
              <a 
                href={getWhatsAppLink(driver)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5C] text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-[#25D366]/20 active:scale-95"
              >
                <MessageCircle size={18} />
                Contact Driver
              </a>

            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}