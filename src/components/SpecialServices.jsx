import { motion } from "framer-motion";
import { Briefcase, CalendarCheck, MapPin, PlaneTakeoff, Sparkles } from "lucide-react";

// The 5 Special Services with custom animation physics
const services = [
  {
    id: 1,
    title: "Corporate Tie-ups",
    description: "Dedicated travel desks, daily employee transportation, and premium executive fleets tailored for IT parks.",
    Icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    shadow: "shadow-blue-200",
    animation: { y: [0, -6, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 2,
    title: "Monthly Rentals",
    description: "Flexible, cost-effective monthly rental plans for cars and tempos with dedicated drivers.",
    Icon: CalendarCheck,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    shadow: "shadow-purple-200",
    animation: { rotate: [0, 8, -8, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 3,
    title: "Live Tracking",
    description: "Share live trip links with family. All vehicles are equipped with real-time GPS tracking for safety.",
    Icon: MapPin,
    color: "text-red-500",
    bgColor: "bg-red-100",
    shadow: "shadow-red-200",
    animation: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 4,
    title: "Airport Transfers",
    description: "Punctual airport pickups. We track your flight status so your chauffeur is ready when you land.",
    Icon: PlaneTakeoff,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    shadow: "shadow-teal-200",
    animation: { x: [0, 6, 0], y: [0, -6, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 5,
    title: "Wedding & Events",
    description: "Luxury fleets and large-capacity buses to transport your guests seamlessly on your special day.",
    Icon: Sparkles,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    shadow: "shadow-amber-200",
    animation: { scale: [1, 1.08, 1], rotate: [0, 8, 0] },
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
];

export default function SpecialServices() {
  return (
    <div className="w-full py-16 px-4 max-w-[1400px] mx-auto">
      
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">VBR Premium Services</h2>
        <p className="text-slate-500 font-medium mt-3 max-w-2xl mx-auto text-base md:text-lg">
          Beyond standard bookings, we offer specialized travel solutions designed for ultimate reliability, safety, and comfort.
        </p>
      </div>

      {/* CHANGED: Using a 5-column CSS Grid on large screens instead of Flex Wrap */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-6">
        {services.map((service, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={service.id}
            whileHover={{ y: -6, scale: 1.02 }}
            // Removed max-w to let the grid dictate the width. Adjusted padding for a tighter fit.
            className="relative w-full bg-white rounded-3xl p-5 xl:p-6 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center group"
          >
            {/* Scaled down icon slightly to fit 5 across gracefully */}
            <div className={`w-14 h-14 xl:w-16 xl:h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-5 shadow-md ${service.shadow} transition-colors`}>
              <motion.div
                animate={service.animation}
                transition={service.transition}
              >
                <service.Icon size={28} className={service.color} />
              </motion.div>
            </div>

            {/* Typography tuned for 5 columns */}
            <h3 className="text-lg xl:text-xl font-bold text-slate-900 mb-2 tracking-tight leading-tight">
              {service.title}
            </h3>
            <p className="text-slate-500 font-medium text-xs xl:text-[13px] leading-relaxed">
              {service.description}
            </p>
            
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 rounded-t-full bg-current ${service.color} transition-all duration-300 group-hover:w-1/3`} />
          </motion.div>
        ))}
      </div>

    </div>
  );
}