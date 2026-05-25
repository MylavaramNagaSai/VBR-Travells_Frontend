import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Bell } from "lucide-react"; 
import FeaturedGallery from "./components/FeaturedGallery";
import TripCalculator from "./components/TripCalculator";
import TrendingDestinations from "./components/TrendingDestinations";
import PopularTemples from "./components/PopularTemples";
import FleetShowcase from "./components/FleetShowcase";
import SpecialServices from "./components/SpecialServices";
import DriverRoster from "./components/DriverRoster";
import TravelStories from "./components/TravelStories";
import TodaysInsight from "./components/TodaysInsight";
import YouTubeShowcase from "./components/YouTubeShowcase";
import InstagramShowcase from "./components/InstagramShowcase";
import FacebookShowcase from "./components/FacebookShowcase";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";





// --- NAVIGATION DATA ---
const navItems = [
  { title: "Fleet", submenu: ["Hatchbacks", "SUVs", "Tempo Travellers", "Minibuses", "Volvo Sleepers"] },
  { title: "Tourist Places", submenu: ["Hill Stations", "Coastal Tours", "Heritage Sites", "Wildlife Tours"] },
  { title: "Devotional Places", submenu: ["Tirupati Darshan", "Srisailam Tours", "Pancharama Kshetras"] },
  { title: "Services", submenu: ["Local Sightseeing", "Outstation Trips", "Airport Transfers"] },
  { title: "Packages", submenu: ["Family Vacations", "Honeymoon Specials", "Custom Itineraries"] },
  { title: "Bus Tickets", submenu: ["Daily Routes", "Boarding Points", "Track Bus"] },
  { title: "About", submenu: ["Our History", "Safety Protocols", "Reviews"] },
  { title: "Contact", submenu: ["Our Offices", "24/7 Helpline", "Quick Inquiry"] },
];

// --- LIVE UPDATES DATA ---
const updates = [
  "🎉 Special Offer: Flat 15% off on Tempo Travellers for Tirupati Darshan!",
  "✨ Brand New Volvo Sleepers added to our outstation fleet.",
  "🚧 Route Update: Srisailam ghat road is now open 24/7 for our vehicles.",
  "💼 Corporate Bookings: Dedicated travel desks now available for IT parks."
];

export default function App() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-[#f8fafc]">
      
      {/* Sticky Top Header Area (Holds both Nav and Ticker) */}
      <div className="sticky top-0 z-50 w-full px-4 pt-6 pb-2 bg-[#f8fafc]/80 backdrop-blur-sm">
        
        {/* Navigation Bar */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex items-center justify-between mx-auto max-w-7xl px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white shadow-lg shadow-slate-200/50"
        >
          <div className="flex items-center gap-2 cursor-pointer pr-8 border-r border-slate-300/50">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-xl tracking-tighter">VB</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800">VBR Travels</span>
          </div>

          <div className="hidden xl:flex items-center gap-1 pl-4 flex-1">
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="relative group px-3 py-2 cursor-pointer"
                onMouseEnter={() => setHoveredMenu(index)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                  {item.title}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredMenu === index ? "rotate-180 text-slate-900" : ""}`} />
                </div>

                <AnimatePresence>
                  {hoveredMenu === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-2"
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <div key={subIndex} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
                          {subItem}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="xl:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>

        {/* Scrolling Updates Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
          className="mx-auto max-w-7xl mt-4 flex items-center overflow-hidden rounded-xl bg-white/50 backdrop-blur-xl border border-white shadow-sm shadow-slate-200/50 py-2.5 px-4"
        >
          <div className="flex items-center gap-2 pr-4 border-r border-slate-300/50 shrink-0 z-10 bg-white/50 backdrop-blur-md rounded-l-xl">
            <Bell size={16} className="text-blue-600" />
            <span className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">Live Updates</span>
          </div>

          <div 
            className="flex-1 overflow-hidden relative flex items-center h-full"
            style={{ maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)" }}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="flex whitespace-nowrap w-max items-center gap-12 pl-12"
            >
              {[...updates, ...updates].map((update, index) => (
                <span key={index} className="text-sm font-bold text-slate-600">
                  {update}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Featured Gallery sits right below the ticker now */}
      <div className="pt-6">
        <FeaturedGallery />
        <TripCalculator />
        <TrendingDestinations />
        <PopularTemples />
        <FleetShowcase />
        <SpecialServices />
        <DriverRoster />
        <TodaysInsight />
        <TravelStories />
        <YouTubeShowcase />
        <InstagramShowcase />
        <FacebookShowcase />
        <FAQ />
        <Footer />
      </div>

    </div>
  );
}