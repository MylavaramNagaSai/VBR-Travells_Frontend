import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const temples = [
  // --- SOUTH INDIA ---
  { id: 1, name: "Tirupati Balaji", region: "South India", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Meenakshi Temple", region: "South India", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Srisailam Mallikarjuna", region: "South India", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Ramanathaswamy", region: "South India", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Padmanabhaswamy", region: "South India", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Brihadeeswarar", region: "South India", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 7, name: "Sabarimala", region: "South India", image: "https:/" },
  { id: 8, name: "Guruvayur", region: "South India", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 9, name: "Virupaksha Temple", region: "South India", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 10, name: "Sri Ranganathaswamy", region: "South India", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },

  // --- NORTH INDIA ---
  { id: 11, name: "Kedarnath", region: "North India", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop" },
  { id: 12, name: "Kashi Vishwanath", region: "North India", image: "https://images.unsplash.com/photo-1561361531-99f2a6a97153?q=80&w=600&auto=format&fit=crop" },
  { id: 13, name: "Badrinath", region: "North India", image: "https://images.unsplash.com/photo-1667822557530-58c1fe1df9bf?q=80&w=600&auto=format&fit=crop" },
  { id: 14, name: "Golden Temple", region: "North India", image: "https://images.unsplash.com/photo-1588598126707-dc30d5006b52?q=80&w=600&auto=format&fit=crop" },
  { id: 15, name: "Vaishno Devi", region: "North India", image: "https://images.unsplash.com/photo-1599933334295-56491e57c933?q=80&w=600&auto=format&fit=crop" },
  { id: 16, name: "Akshardham", region: "North India", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 17, name: "Prem Mandir", region: "North India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 18, name: "Banke Bihari", region: "North India", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 19, name: "Amarnath Cave", region: "North India", image: "https://images.unsplash.com/photo-1566838318109-a8607fa74c6d?q=80&w=600&auto=format&fit=crop" },
  { id: 20, name: "Mansa Devi", region: "North India", image: "https://images.unsplash.com/photo-1562614104-cd5a3151df17?q=80&w=600&auto=format&fit=crop" },

  // --- WEST & CENTRAL INDIA ---
  { id: 21, name: "Somnath", region: "West & Central", image: "https://images.unsplash.com/photo-1594056701886-1a7ea6991863?q=80&w=600&auto=format&fit=crop" },
  { id: 22, name: "Mahakaleshwar", region: "West & Central", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 23, name: "Dwarkadhish", region: "West & Central", image: "https://images.unsplash.com/photo-1618245100067-1dbda78cf3fa?q=80&w=600&auto=format&fit=crop" },
  { id: 24, name: "Siddhivinayak", region: "West & Central", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
  { id: 25, name: "Shirdi Sai Baba", region: "West & Central", image: "https://images.unsplash.com/photo-1589519160732-57fc4e7610ac?q=80&w=600&auto=format&fit=crop" },
  { id: 26, name: "Trimbakeshwar", region: "West & Central", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 27, name: "Omkareshwar", region: "West & Central", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 28, name: "Grishneshwar", region: "West & Central", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 29, name: "Mahalaxmi Temple", region: "West & Central", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 30, name: "Bhimashankar", region: "West & Central", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },

  // --- EAST & NORTH-EAST INDIA ---
  { id: 31, name: "Jagannath Puri", region: "East & North-East", image: "https://images.unsplash.com/photo-1619448102353-83d1c4f1e9b2?q=80&w=600&auto=format&fit=crop" },
  { id: 32, name: "Konark Sun Temple", region: "East & North-East", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 33, name: "Kamakhya Temple", region: "East & North-East", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop" },
  { id: 34, name: "Dakshineswar Kali", region: "East & North-East", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
  { id: 35, name: "Lingaraja Temple", region: "East & North-East", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 36, name: "Kalighat Temple", region: "East & North-East", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 37, name: "Tarapith", region: "East & North-East", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
  { id: 38, name: "Mukteshvara", region: "East & North-East", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 39, name: "Rajarani Temple", region: "East & North-East", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" },
  { id: 40, name: "Danteshwari", region: "East & North-East", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
];

const categories = ["All", "South India", "North India", "West & Central", "East & North-East"];

export default function PopularTemples() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemples = activeCategory === "All"
    ? temples
    : temples.filter(t => t.region === activeCategory);

  return (
    <div className="w-full py-16 px-4 max-w-7xl mx-auto bg-slate-50 rounded-3xl my-8 border border-slate-200/50">
      
      {/* Title and Description */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 tracking-tight">Divine Pilgrimages & Temples</h2>
        <p className="text-slate-500 font-medium mt-2 max-w-xl mx-auto">
          Embark on a spiritual journey. Explore 40 of the most revered and sacred temples across India for your next Yatra or Darshan.
        </p>
      </div>

      {/* Dynamic Category Filtering Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
              activeCategory === cat
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "bg-white/80 text-slate-600 hover:text-orange-600 border border-slate-200/50 backdrop-blur-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout containing cards */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredTemples.map((temple) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              key={temple.id}
              whileHover={{ y: -6 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md shadow-slate-200/40 border border-orange-100 bg-white"
            >
              <img
                src={temple.image}
                alt={temple.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Warmer gradient for temples */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-5 w-full flex items-center gap-2 text-white">
                <MapPin size={18} className="text-orange-300 shrink-0" />
                <h3 className="text-lg font-bold tracking-wide drop-shadow-sm">
                  {temple.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}