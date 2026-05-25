import { motion } from "framer-motion";
import { Briefcase, CalendarCheck, MapPin, PlaneTakeoff, Sparkles } from "lucide-react";

// The 5 Special Services with custom animation physics
const services = [
  {
    id: 1,
    title: "Corporate Tie-ups",
    description: "Dedicated travel desks, daily employee transportation, and premium executive fleets tailored for IT parks and MNCs.",
    Icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    shadow: "shadow-blue-200",
    animation: { y: [0, -12, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 2,
    title: "Monthly Rentals",
    description: "Flexible, cost-effective monthly rental plans for cars and tempos with dedicated drivers for your continuous travel needs.",
    Icon: CalendarCheck,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    shadow: "shadow-purple-200",
    animation: { rotate: [0, 10, -10, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 3,
    title: "Live GPS Tracking",
    description: "Share live trip links with your family. All our vehicles are equipped with real-time GPS tracking for ultimate safety and peace of mind.",
    Icon: MapPin,
    color: "text-red-500",
    bgColor: "bg-red-100",
    shadow: "shadow-red-200",
    animation: { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 4,
    title: "Airport Transfers",
    description: "Punctual airport pickups and drop-offs. We track your flight status in real-time so your chauffeur is always ready when you land.",
    Icon: PlaneTakeoff,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    shadow: "shadow-teal-200",
    animation: { x: [0, 10, 0], y: [0, -10, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  {
    id: 5,
    title: "Wedding & Events",
    description: "Luxury fleets and large-capacity buses to transport your guests seamlessly. Make your special day completely stress-free.",
    Icon: Sparkles,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    shadow: "shadow-amber-200",
    animation: { scale: [1, 1.15, 1], rotate: [0, 15, 0] },
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
];

export default function SpecialServices() {
  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto">
      
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">VBR Premium Services</h2>
        <p className="text-slate-500 font-medium mt-3 max-w-2xl mx-auto text-lg">
          Beyond standard bookings, we offer specialized travel solutions designed for ultimate reliability, safety, and comfort.
        </p>
      </div>

      {/* FIXED: Replaced complex Grid hacks with a robust Flex container */}
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={service.id}
            whileHover={{ y: -8, scale: 1.02 }}
            // Fixed width sizing to ensure they wrap beautifully on all screens
            className="relative w-full max-w-[380px] bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center group"
          >
            {/* Animated Icon Container */}
            <div className={`w-24 h-24 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 shadow-lg ${service.shadow} transition-colors`}>
              <motion.div
                animate={service.animation}
                transition={service.transition}
              >
                <service.Icon size={40} className={service.color} />
              </motion.div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              {service.description}
            </p>
            
            {/* Subtle interactive bottom border */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 rounded-t-full bg-current ${service.color} transition-all duration-300 group-hover:w-1/3`} />
          </motion.div>
        ))}
      </div>

    </div>
  );
}