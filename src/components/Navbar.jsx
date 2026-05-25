import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Bell, ChevronRight, Phone } from "lucide-react"; 

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

const updates = [
  "🎉 Special Offer: Flat 15% off on Tempo Travellers!",
  "✨ Brand New Volvo Sleepers added to fleet.",
  "🚧 Route Update: Srisailam ghat road open 24/7.",
  "💼 Dedicated travel desks now available for IT parks."
];

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState(null);

  // Lock body scroll when side-drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* 1. MAIN HEADER (Sticky Wrapper) */}
      {/* Added pointer-events-none and padding to create the "floating" separated look */}
      <header className="sticky top-0 z-[100] w-full px-4 pt-4 lg:pt-6 pb-2 pointer-events-none">
        
        {/* Navigation Bar (Floating Pill) */}
        <nav className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm relative z-[110] max-w-7xl mx-auto rounded-2xl px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl tracking-tighter">VB</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">VBR Travels</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-2">
              {navItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative py-7"
                  onMouseEnter={() => setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className="flex items-center gap-1 px-3 text-sm font-bold text-slate-600 hover:text-blue-600 transition-all">
                    {item.title}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredMenu === index ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                  </button>

                  <AnimatePresence>
                    {hoveredMenu === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} 
                        className="absolute top-[100%] left-0 w-60 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 overflow-hidden z-[120]"
                      >
                        {item.submenu.map((sub, i) => (
                          <div key={i} className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-xl transition-all cursor-pointer">
                            {sub}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </nav>

        {/* Desktop Scrolling Ticker (Separated Floating Pill) */}
        {/* Added mt-4 to create the gap between the nav and the ticker */}
        <div className="pointer-events-auto hidden lg:flex relative z-40 mx-auto max-w-7xl mt-4 items-center overflow-hidden rounded-xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm shadow-slate-200/50 py-2.5 px-4">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-300 shrink-0 z-10">
            <Bell size={16} className="text-blue-600" />
            <span className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">Live Updates</span>
          </div>

          <div 
            className="flex-1 overflow-hidden relative flex items-center h-full"
            style={{ maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)" }}
          >
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-16 pl-8 whitespace-nowrap"
            >
              {[...updates, ...updates].map((up, i) => (
                <span key={i} className="text-sm font-bold text-slate-700">{up}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. SIDE MOBILE DRAWER (Remains unchanged and fully functional) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
              className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-white shadow-2xl z-[9999] flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-100">
                <span className="font-black text-xl text-slate-900">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-slate-50 overflow-hidden">
                    <button 
                      onClick={() => setActiveMobileSub(activeMobileSub === index ? null : index)}
                      className="flex items-center justify-between w-full p-4 text-left font-bold text-slate-800 bg-slate-50/50"
                    >
                      {item.title}
                      <ChevronRight size={18} className={`transition-transform ${activeMobileSub === index ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeMobileSub === index && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-white"
                        >
                          {item.submenu.map((sub, i) => (
                            <div key={i} className="p-4 pl-8 text-sm font-bold text-slate-500 border-t border-slate-50 active:bg-blue-50 active:text-blue-600 transition-colors cursor-pointer">
                              {sub}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <Phone size={18} className="text-blue-600" /> +91 98765 43210
                </div>
                <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
                  Book A Trip Now
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}