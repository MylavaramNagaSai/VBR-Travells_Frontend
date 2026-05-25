import { motion } from "framer-motion";
import { Activity, Users, Globe2, Map } from "lucide-react";

// Simulated data 
const stats = [
  {
    id: 1,
    label: "Live Viewers",
    value: "124",
    icon: Activity,
    iconColor: "text-emerald-500", 
    animation: { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }
  },
  {
    id: 2,
    label: "Today's Visitors",
    value: "1,842",
    icon: Users,
    iconColor: "text-blue-600"
  },
  {
    id: 3,
    label: "Total Visitors",
    value: "245K+",
    icon: Globe2,
    iconColor: "text-blue-600"
  },
  {
    id: 4,
    label: "Trips Planned",
    value: "12,500+",
    icon: Map,
    iconColor: "text-blue-600"
  }
];

export default function StatsBanner() {
  return (
    <div className="w-full mt-10 mb-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Premium white glassmorphic card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-200 overflow-hidden">
          
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 md:p-8 flex flex-col items-center text-center group"
              >
                {/* Icon Wrapper */}
                <div className="mb-4">
                  {stat.animation ? (
                    <motion.div
                      animate={stat.animation}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <stat.icon size={32} className={stat.iconColor} />
                    </motion.div>
                  ) : (
                    <stat.icon size={32} className={`${stat.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  )}
                </div>

                {/* Stat Value */}
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  {stat.value}
                </h3>
                
                {/* Stat Label */}
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}