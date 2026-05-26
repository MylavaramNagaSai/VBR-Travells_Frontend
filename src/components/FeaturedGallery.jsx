import { motion } from "framer-motion";

// The 22 vehicles focusing purely on names and images for the visual gallery
const galleryVehicles = [
  { name: "SML Executive Coach 39 Seater", image: "/sml39seater.png" },
  { name: "New SML Executive 22 Seater", image: "/sml22seater.png" },
  { name: "Urbania White 2025 12+Bed", image: "/urbainiawhite2025.png" },
  { name: "Force Traveler 13+Bed", image: "/force13bedseater.png" },
  { name: "Force Traveler A/C 18 Seater", image: "/force18seater.png" },
  { name: "Volvo Model Bus A/C", image: "/29seaterbus.png" },
  { name: "Bus 41 Seater Non-A/C", image: "/busnonac41seater.png" },
  { name: "41 Seater A/C New Big Bus", image: "/41seateracbus.png" },
  { name: "Force Urbania 2025 A/C", image: "/forceurbanianew2025.png" },
  { name: "Force Traveler 27 Seater", image: "/force27seater.png" },
  { name: "Innova Crista New 2024", image: "/innovacrysta2024.png" },
  { name: "Force Traveler 13 Maxicab", image: "/forcetraveler13maxicab.png" },
  { name: "Innova Crista", image: "/innovacrysta.png" },
  { name: "Mahindra Xylo 8 Seater", image: "/mahindraxylo.png" },
  { name: "Toyota Rumion", image: "/toyotarumion.png" },
  { name: "Kia Carens", image: "/kiacarens.png" },
  { name: "Force Traveler New 2024", image: "/forcetravellernew2024.png" },
  { name: "Force Traveler A/C 26+1", image: "/forcetravellerac.png" },
  { name: "Toyota Innova Crysta 7+1", image: "/innovacrysta71.png" },
  { name: "10+Bed A/C Pushback", image: "/10bedacpushback.png" },
  { name: "Bus Non-A/C 41 Seater", image: "/41seater.png" },
  { name: "A/C 27 Seater Force Traveler", image: "/ac27seaterforce.png" }
];

const doubledGallery = [...galleryVehicles, ...galleryVehicles];

export default function FeaturedGallery() {
  return (
    <div className="w-full pt-4 pb-12 overflow-hidden relative">
      
      <style>{`
        @keyframes hero-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-hero-scroll {
          display: flex;
          width: max-content;
          /* CHANGED: Increased from 45s to 90s to slow down the speed */
          animation: hero-scroll 90s linear infinite;
        }
        .animate-hero-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* CHANGED: Removed the maskImage style that was causing the white edges */}
      <div className="w-full relative">
        <div className="animate-hero-scroll gap-4 px-4">
          
          {doubledGallery.map((vehicle, index) => (
            <div 
              key={`${vehicle.name}-${index}`} 
              className="relative w-64 md:w-72 h-[340px] rounded-[2rem] overflow-hidden shrink-0 group cursor-pointer shadow-lg shadow-slate-200/50 border border-slate-100"
            >
              {/* Background Image */}
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Text Content */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="text-white font-extrabold text-lg leading-snug drop-shadow-md">
                  {vehicle.name}
                </h3>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}