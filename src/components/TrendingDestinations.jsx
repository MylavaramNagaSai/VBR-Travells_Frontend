import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const destinations = [
  // --- HILL STATIONS ---
  { id: 1, name: "Ooty", category: "Hill Stations", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Munnar", category: "Hill Stations", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Manali", category: "Hill Stations", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Shimla", category: "Hill Stations", image: "https://images.unsplash.com/photo-1562614104-cd5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Leh Ladakh", category: "Hill Stations", image: "https://images.unsplash.com/photo-1599933334295-56491e57c933?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Srinagar", category: "Hill Stations", image: "https://images.unsplash.com/photo-1566838318109-a8607fa74c6d?q=80&w=600&auto=format&fit=crop" },
  { id: 7, name: "Darjeeling", category: "Hill Stations", image: "https://images.unsplash.com/photo-1557999810-cb5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 8, name: "Kodaikanal", category: "Hill Stations", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop" },
  { id: 9, name: "Wayanad", category: "Hill Stations", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop" },
  { id: 10, name: "Coorg", category: "Hill Stations", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },

  // --- BEACHES & COASTAL ---
  { id: 11, name: "Goa", category: "Beaches", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
  { id: 12, name: "Alleppey", category: "Beaches", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
  { id: 13, name: "Andaman (Havelock)", category: "Beaches", image: "https://images.unsplash.com/photo-1589519160732-57fc4e7610ac?q=80&w=600&auto=format&fit=crop" },
  { id: 14, name: "Pondicherry", category: "Beaches", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 15, name: "Varkala", category: "Beaches", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 16, name: "Tarkarli", category: "Beaches", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 17, name: "Kovalam", category: "Beaches", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 18, name: "Lakshadweep", category: "Beaches", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop" },
  { id: 19, name: "Marari", category: "Beaches", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 20, name: "Diu Island", category: "Beaches", image: "https://images.unsplash.com/photo-1594056701886-1a7ea6991863?q=80&w=600&auto=format&fit=crop" },

  // --- HERITAGE & FORTS ---
  { id: 21, name: "Taj Mahal", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 22, name: "Jaipur (Amber Fort)", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 23, name: "Udaipur (City Palace)", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 24, name: "Jodhpur (Mehrangarh)", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 25, name: "Jaisalmer Fort", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 26, name: "Mysore Palace", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 27, name: "Agra Fort", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 28, name: "Gwalior Fort", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 29, name: "Red Fort", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 30, name: "Chittorgarh Fort", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },

  // --- WILDLIFE & SAFARIS ---
  { id: 31, name: "Ranthambore", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 32, name: "Jim Corbett", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 33, name: "Kaziranga", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },
  { id: 34, name: "Bandhavgarh", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1583344075193-4e4cf19d7bdc?q=80&w=600&auto=format&fit=crop" },
  { id: 35, name: "Sundarbans", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1558500201-987823f0df68?q=80&w=600&auto=format&fit=crop" },
  { id: 36, name: "Gir National Park", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1518118014377-cecb4c062c9c?q=80&w=600&auto=format&fit=crop" },
  { id: 37, name: "Periyar", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 38, name: "Kanha National Park", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 39, name: "Bandipur", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 40, name: "Pench National Park", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },
];

const categories = ["All", "Hill Stations", "Beaches", "Heritage & Forts", "Wildlife & Safaris"];

export default function TrendingDestinations() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = activeCategory === "All"
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  return (
    <div className="w-full py-16 px-4 max-w-7xl mx-auto">
      
      {/* Title and Description */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Trending Leisure Destinations</h2>
        <p className="text-slate-500 font-medium mt-2 max-w-xl mx-auto">
          Explore the most breathtaking holiday spots across India. Filter by category to find your next perfect getaway.
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
                ? "bg-slate-800 text-white shadow-md shadow-slate-300"
                : "bg-white/60 text-slate-600 hover:text-slate-900 border border-slate-200/50 backdrop-blur-md"
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
          {filteredDestinations.map((place) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              key={place.id}
              whileHover={{ y: -6 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md shadow-slate-200/40 border border-white/60 bg-white"
            >
              <img
                src={place.image}
                alt={place.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-5 w-full flex items-center gap-2 text-white">
                <MapPin size={18} className="opacity-80 shrink-0" />
                <h3 className="text-lg font-bold tracking-wide drop-shadow-sm">
                  {place.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}