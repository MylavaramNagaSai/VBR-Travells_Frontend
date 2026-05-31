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
          animation: hero-scroll 90s linear infinite;
        }
        .animate-hero-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full relative">
        <div className="animate-hero-scroll gap-3 md:gap-4 px-4">
          
          {doubledGallery.map((vehicle, index) => (
            <div 
              key={`${vehicle.name}-${index}`} 
              // THE FIX: Made the cards narrow (w-40) and tall (h-56) to match portrait photos perfectly!
              className="relative w-40 sm:w-48 md:w-64 h-56 sm:h-64 md:h-72 rounded-2xl md:rounded-[2rem] overflow-hidden shrink-0 group shadow-md shadow-slate-200/50 border border-slate-100 bg-white flex flex-col"
            >
              {/* Top Section: Image Area - Removed padding, allowed to go edge-to-edge */}
              <div className="w-full flex-1 bg-slate-100 relative overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  // Because the card is now shaped like a portrait photo, object-cover won't chop off the sides!
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              {/* Bottom Section: Text Bar - Made slightly taller to fit 2 lines if needed */}
              <div className="w-full h-12 py-1 px-2 bg-white border-t border-slate-100 flex items-center justify-center shrink-0">
                <h3 className="text-slate-800 font-bold text-[11px] sm:text-xs md:text-sm text-center line-clamp-2 leading-tight">
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