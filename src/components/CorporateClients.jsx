import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

// Updated with the highlighted images from your public folder
const clients = [
  { id: 1, name: "Bunge India Pvt Ltd", logo: "/bunge.png" },
  { id: 2, name: "SBI Cash Remittance", logo: "" }, // No image highlighted for this yet
  { id: 3, name: "MGM Cancer Hospitals", logo: "/mgm.png" },
  { id: 4, name: "3F Industries", logo: "./3findustires.png" }, 
  { id: 5, name: "Intas Pharma", logo: "/intas.png" },
  { id: 6, name: "KPCL", logo: "/kpcl.png" },
  { id: 7, name: "KVK Agriculture", logo: "/kvk.png" },
  { id: 8, name: "Indsol", logo: "/indsol.png" }, 
];

export default function CorporateClients() {
  return (
    <section className="w-full py-16 md:py-24 bg-white border-y border-slate-100 overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-blue-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-widest uppercase mb-4"
          >
            <Building2 size={14} /> Corporate Partners
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Trusted by Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Leaders</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium md:text-lg leading-relaxed"
          >
            Providing safe, punctual, and premium transportation solutions to top corporations, hospitals, and financial institutions.
          </motion.p>
        </div>

        {/* Clients Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              // 1. Entrance Animation
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative w-40 sm:w-48 h-36 sm:h-40 bg-white border border-slate-100 hover:border-blue-200 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-600/10 flex flex-col items-center justify-center p-4 transition-all"
            >
              {/* 2. Continuous Water-Smooth Floating Animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15 // Staggers the animation to create a wave effect
                }}
                className="flex flex-col items-center justify-between w-full h-full gap-3"
              >
                
                {/* Full Color Logo Container */}
                <div className="h-16 sm:h-20 w-full flex items-center justify-center drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    /* Fallback Icon if no logo path is provided yet */
                    <Building2 className="text-slate-200" size={40} />
                  )}
                </div>

                {/* Company Name Below */}
                <div className="text-center w-full">
                  <span className="block font-bold text-slate-800 text-xs sm:text-sm leading-tight">
                    {client.name}
                  </span>
                </div>

              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}