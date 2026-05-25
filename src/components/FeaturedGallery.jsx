import { useState } from "react";
import { motion } from "framer-motion";

// The fleet data
const fleet = [
  { id: 1, name: "Premium Sedans", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Luxury SUVs", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Tempo Travellers", image: "https://images.unsplash.com/photo-1516934161286-665e8aebcc29?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Volvo AC Sleepers", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Mini Buses", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop" },
];

export default function FeaturedGallery() {
  const [isHovered, setIsHovered] = useState(false);

  // We triple the array to guarantee a seamless infinite loop without empty space
  const displayFleet = [...fleet, ...fleet, ...fleet];

  return (
    <div className="w-full py-8 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* The scrolling container */}
      <div 
        className="relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          // Animate from 0% to roughly -33% (one full set of images) to create the loop
          animate={{ x: isHovered ? "0%" : ["0%", "-33.33%"] }}
          transition={{ 
            duration: 25, // Speed of the auto-scroll. Higher = slower.
            ease: "linear", 
            repeat: Infinity,
            // If hovered, it pauses. If not hovered, it moves smoothly.
          }}
          className="flex gap-6 w-max pl-4"
        >
          {displayFleet.map((vehicle, index) => (
            <motion.div 
              key={`${vehicle.id}-${index}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-[300px] md:w-[400px] h-[250px] md:h-[300px] rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 shrink-0 border border-white/50 bg-slate-900 cursor-pointer"
            >
              {/* Vehicle Image */}
              <img 
                src={vehicle.image} 
                alt={vehicle.name}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              
              {/* Dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none" />

              {/* Vehicle Name */}
              <div className="absolute bottom-0 left-0 p-6 w-full pointer-events-none text-center">
                <h3 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">
                  {vehicle.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </div>
  );
}