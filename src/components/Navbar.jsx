import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Bell, ChevronRight, Phone } from "lucide-react"; 

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
  { title: "Contact", isMega: false, submenu: ["Our Offices", "24/7 Helpline", "Quick Inquiry"] },
  { title: "Careers", isMega: false, submenu: ["Open Positions", "Application Process", "Employee Benefits"] },
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
      {/* FIXED HEADER: Never moves on scroll */}
      <header className="fixed top-0 left-0 w-full z-[100] flex flex-col shadow-lg shadow-slate-200/50">
        
        {/* TOP ROW: Logo & Navigation */}
        <div className="flex flex-row items-center justify-between w-full px-4 py-2 lg:px-8 lg:py-3 bg-white/95 backdrop-blur-md">

          <a href="/" className="shrink-0 cursor-pointer group">
            <img 
              src="/vbr-logo.jpg" 
              alt="VBR Travels Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 xl:w-24 xl:h-24 rounded-full bg-white object-cover border-2 border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex relative items-center bg-slate-50/50 rounded-full px-4 py-1.5 border border-slate-100">
            {navItems.map((item, index) => {
              const isFarRight = index >= navItems.length - 2;

              return (
               <div 
                  key={index} 
                  className="relative group shrink-0" 
                  onMouseEnter={() => setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-[14px] font-bold text-slate-700 hover:text-blue-600 transition-colors whitespace-nowrap">
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
                        className={`absolute top-[calc(100%+8px)] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-[160] ${
                          item.isMega 
                            ? 'w-[750px] p-6 left-0' 
                            : isFarRight
                              ? 'w-60 p-2 right-0' 
                              : 'w-60 p-2 left-1/2 -translate-x-1/2' 
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
                                      className="block px-2 py-2 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-all cursor-pointer"
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
                              className="block px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-xl transition-all cursor-pointer"
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

          {/* Mobile Hamburger Button */}
          <div className="xl:hidden flex justify-end">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-3 bg-slate-50 text-slate-800 hover:bg-slate-100 rounded-xl shadow-sm border border-slate-200 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* BOTTOM ROW: Live Updates Ticker */}
        <div className="w-full flex items-center overflow-hidden bg-slate-100/95 backdrop-blur-md border-t border-slate-200 py-2 px-4 lg:px-8">
          <div className="flex items-center gap-1.5 pr-3 border-r border-slate-300 shrink-0 z-10">
            <Bell size={14} className="text-blue-600" />
            <span className="text-[10px] sm:text-xs font-black text-slate-800 tracking-wider uppercase">Live Updates</span>
          </div>

          <div 
            className="flex-1 overflow-hidden relative flex items-center h-full"
            style={{ maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)" }}
          >
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex gap-10 pl-6 whitespace-nowrap"
            >
              {[...updates, ...updates].map((up, i) => (
                <span key={i} className="text-[11px] sm:text-[13px] font-bold text-slate-700">{up}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Invisible Spacer */}
      <div className="h-[116px] sm:h-[132px] xl:h-[148px] w-full shrink-0"></div>

      {/* MOBILE BOTTOM SHEET */}
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

              {/* Scrollable Navigation Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-3">
                {navItems.map((item, index) => (
                  // THE CRITICAL FIX: 'shrink-0' stops Flexbox from crushing this item when another expands!
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

              {/* Sticky Mobile Footer Action */}
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