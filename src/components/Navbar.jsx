import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Bell, ChevronRight, Phone } from "lucide-react"; 
import { db } from "../firebase"; 
import { ref, onValue } from "firebase/database"; 

const navItems = [
  { 
    title: "Fleet", 
    isMega: true, 
    submenu: [
      {
        category: "SUVs & Premium MUVs",
        items: [
          "Toyota Innova Crysta (7 to 8 Seater)", 
          "Kia Carens (7 Seater)", 
          "Mahindra Xylo (8 Seater)", 
          "Toyota Rumion (7 Seater)"
        ]
      },
      {
        category: "Tempo Travellers",
        items: [
          "Force Urbania 2025 (17 Seater)", 
          "Compact Travellers (10 to 14 Seater)", 
          "Standard Traveller (18 Seater Pushback)", 
          "Large Travellers (26 to 27 Seater)"
        ]
      },
      {
        category: "Buses & Coaches",
        items: [
          "SML Mini Buses (22 Seater)", 
          "Volvo Luxury Bus (29 Seater)", 
          "SML Executive Coaches (39 Seater)", 
          "Large Big Buses (41 Seater A/C & Non-A/C)"
        ]
      }
    ]
  },
  { title: "Tourist Places", isMega: false, submenu: ["Hill Stations", "Coastal Tours", "Heritage Sites", "Wildlife Tours"] },
  { title: "Devotional Places", isMega: false, submenu: ["Tirupati Darshan", "Srisailam Tours", "Pancharama Kshetras"] },
  { title: "Services", isMega: false, submenu: ["Local Sightseeing", "Outstation Trips", "Airport Transfers"] },
  { title: "Packages", isMega: false, submenu: ["Family Vacations", "Honeymoon Specials", "Custom Itineraries"] },
  { title: "Monthly Rentals", isMega: false, submenu: ["Pricing", "Booking", "Terms & Conditions"] },
  { title: "Corporate", isMega: false, submenu: ["Employee Transport", "Event Logistics", "Long-term Leases"] },
  { title: "Offers", isMega: false, submenu: ["Current Discounts", "Festival Specials"] },
  { title: "About", isMega: false, submenu: ["Our History", "Safety Protocols", "Reviews"] },
  { title: "Contact", isMega: false, submenu: ["Our Offices", "24/7 Helpline", "Quick Inquiry"] }
];

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState(null);
  const [liveUpdates, setLiveUpdates] = useState(["Connecting to live feed..."]);

  useEffect(() => {
    const updatesRef = ref(db, "live_updates");
    const unsubscribe = onValue(updatesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map(key => data[key]);
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        const messages = formattedData.map(item => item.text);
        setLiveUpdates(messages.length > 0 ? messages : ["Welcome to VBR Travels! Stay tuned for updates."]);
      } else {
        setLiveUpdates(["Welcome to VBR Travels! Stay tuned for updates."]);
      }
    });

    return () => unsubscribe();
  }, []);

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
      {/* 1. SLIMMER HEADER: Reduced padding to make the navbar vertically shorter */}
      <header className="fixed top-0 left-0 w-full z-[100] flex flex-col bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        
        {/* Adjusted padding from py-4 to py-2.5 */}
        <div className="flex flex-row items-center justify-between w-full max-w-[1700px] mx-auto px-4 py-2 lg:px-8 lg:py-2.5">

          {/* Adjusted Logo size from w-20 to w-14 */}
          <a href="/" className="shrink-0 cursor-pointer group flex items-center gap-3">
            <img 
              src="/vbr-logo.jpg" 
              alt="VBR Travels Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white object-cover shadow-sm border border-slate-100 transition-transform duration-300 group-hover:scale-105"
            />
            {/* Adjusted Brand text size */}
            <span className="hidden xl:block font-black text-lg lg:text-xl tracking-tight text-slate-900">
              VBR Tours & Travels
            </span>
          </a>

          <nav className="hidden xl:flex relative items-center justify-center flex-1 px-8">
            {navItems.map((item, index) => {
              const isFarRight = index >= navItems.length - 2;

              return (
               <div 
                  key={index} 
                  className="relative group shrink-0" 
                  onMouseEnter={() => setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] lg:text-[14px] font-bold transition-colors whitespace-nowrap rounded-xl ${hoveredMenu === index ? "text-blue-600 bg-blue-50/50" : "text-slate-600 hover:text-slate-900"}`}>
                    {item.title}
                    {item.submenu.length > 0 && (
                      <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredMenu === index ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                    )}
                  </button>

                  <AnimatePresence>
                    {hoveredMenu === index && item.submenu.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }} 
                        className={`absolute top-[calc(100%+12px)] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-[160] ${
                          item.isMega 
                            ? 'w-[750px] p-6 left-1/2 -translate-x-1/2' 
                            : isFarRight
                              ? 'w-64 p-2 right-0' 
                              : 'w-64 p-2 left-1/2 -translate-x-1/2' 
                        }`}
                      >
                        <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />

                        {item.isMega ? (
                          <div className="grid grid-cols-3 gap-8">
                            {item.submenu.map((col, idx) => (
                              <div key={idx} className="flex flex-col">
                                <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider mb-4 px-2 border-b border-slate-100 pb-2">
                                  {col.category}
                                </h4>
                                <div className="flex flex-col gap-1">
                                  {col.items.map((subItem, i) => (
                                    <a 
                                      key={i} 
                                      href="/coming-soon"
                                      className="block px-2 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-700 rounded-lg transition-all cursor-pointer"
                                    >
                                      {subItem}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          item.submenu.map((sub, i) => (
                            <a 
                              key={i} 
                              href="/coming-soon"
                              className="block px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-700 rounded-xl transition-all cursor-pointer"
                            >
                              {sub}
                            </a>
                          ))
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden xl:flex shrink-0">
             <a 
                href="https://wa.me/919866128901"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-[13px] lg:text-[14px] font-black transition-all shadow-md shadow-slate-900/10 hover:shadow-blue-600/20 active:scale-95"
              >
                <Phone size={14} className="fill-white" /> Call Now
              </a>
          </div>

          <div className="xl:hidden flex justify-end">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 bg-slate-50 text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Adjusted ticker padding */}
        <div className="w-full flex items-center overflow-hidden bg-slate-50 border-t border-slate-200 py-1.5 px-4 lg:px-8">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-300 shrink-0 z-10">
            <Bell size={12} className="text-blue-600" />
            <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-black text-slate-800 tracking-wider uppercase">Live Updates</span>
          </div>

          <div 
            className="flex-1 overflow-hidden relative flex items-center h-full"
            style={{ maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)" }}
          >
            {/* 2. FASTER TICKER: Reduced duration from 35 to 20 for a snappier scroll speed */}
            <motion.div 
              key={liveUpdates.join('-')} 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 pl-8 whitespace-nowrap"
            >
              {/* To ensure seamless looping even with few messages, we map the array 4 times instead of 2 */}
              {[...liveUpdates, ...liveUpdates, ...liveUpdates, ...liveUpdates].map((up, i) => (
                <span key={i} className="text-[11px] sm:text-[12px] lg:text-[13px] font-semibold text-slate-700">{up}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* 3. REDUCED SPACER: To match the slimmer header */}
      <div className="h-[95px] sm:h-[105px] lg:h-[115px] w-full shrink-0"></div>

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
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full h-[90dvh] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2.5rem] z-[9999] flex flex-col pointer-events-auto"
            >
              <div className="w-full flex flex-col items-center pt-4 pb-2 border-b border-slate-100 relative shrink-0">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-4" />
                <h2 className="font-black text-xl text-slate-900 pb-2">Menu</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="absolute right-6 top-6 p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-3">
                {navItems.map((item, index) => (
                  <div key={index} className="shrink-0 rounded-2xl border border-slate-100 overflow-hidden shadow-sm shadow-slate-100/50 bg-white">
                    <button 
                      onClick={() => setActiveMobileSub(activeMobileSub === index ? null : index)}
                      className={`flex items-center justify-between w-full p-4 text-left font-bold transition-colors ${
                        activeMobileSub === index 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {item.title}
                      {item.submenu.length > 0 && (
                        <ChevronRight size={18} className={`transition-transform ${activeMobileSub === index ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {activeMobileSub === index && item.submenu.length > 0 && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden bg-white"
                        >
                          {item.isMega ? (
                            <div className="flex flex-col pb-4">
                              {item.submenu.map((col, idx) => (
                                <div key={idx} className="flex flex-col mt-4 first:mt-2">
                                  <div className="px-6 py-2.5 text-[11px] font-black text-blue-600 uppercase tracking-widest bg-blue-50/40">
                                    {col.category}
                                  </div>
                                  {col.items.map((subItem, i) => (
                                    <a 
                                      key={i} 
                                      href="/coming-soon"
                                      className="block p-4 pl-8 text-sm font-semibold text-slate-600 border-t border-slate-50 active:bg-blue-50 active:text-blue-700 transition-colors cursor-pointer"
                                    >
                                      {subItem}
                                    </a>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            item.submenu.map((sub, i) => (
                              <a 
                                key={i} 
                                href="/coming-soon"
                                className="block p-4 pl-8 text-sm font-semibold text-slate-600 border-t border-slate-50 active:bg-blue-50 active:text-blue-700 transition-colors cursor-pointer"
                              >
                                {sub}
                              </a>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0 pb-safe">
                <a 
                  href="https://wa.me/919866128901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
                >
                  <Phone size={18} /> Call +91 98661 28901
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}