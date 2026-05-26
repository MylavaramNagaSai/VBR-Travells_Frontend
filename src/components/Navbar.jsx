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
      <header className="sticky top-0 z-[100] w-full pt-4 lg:pt-6 pb-2 pointer-events-none">
        
        {/* MAIN ROW */}
        <div className="flex flex-row items-center gap-4 lg:gap-6 w-full px-4 lg:px-8">

          {/* LEFT COLUMN: Logo */}
          <a href="/" className="shrink-0 pointer-events-auto cursor-pointer group relative z-[110]">
            <img 
              src="/vbr-logo.jpg" 
              alt="VBR Travels Logo" 
              className="w-16 h-16 md:w-24 md:h-24 xl:w-28 xl:h-28 rounded-full bg-white object-cover border-4 border-slate-100 shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* RIGHT COLUMN: Stacked Menu and Ticker */}
          <div className="flex flex-col flex-1 gap-2.5 md:gap-3 pointer-events-auto min-w-0 relative justify-center">

            {/* TOP ROW: Desktop Navigation Pill */}
            {/* UPGRADED: Added px-6 to anchor the edges, justify-between distributes the space mathematically equally */}
            <nav className="hidden xl:flex relative z-[150] items-center justify-between w-full bg-white/95 backdrop-blur-md rounded-full px-6 py-2 shadow-md shadow-slate-200/50 border border-slate-200">
              {navItems.map((item, index) => {
                const isFarRight = index >= navItems.length - 2;

                return (
                 <div 
                    key={index} 
                    className="relative group shrink-0" 
                    onMouseEnter={() => setHoveredMenu(index)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {/* UPGRADED FONT SIZE: text-[14px] scaling to text-[15px] on huge screens. Slightly darker slate-700 for better reading */}
                    <button className="flex items-center gap-1.5 px-3 py-2 text-[14px] 2xl:text-[15px] font-bold text-slate-700 hover:text-blue-600 transition-colors whitespace-nowrap">
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

            {/* TOP ROW ALTERNATIVE: Mobile Hamburger Button */}
            <div className="xl:hidden flex justify-end w-full relative z-[150]">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-3 bg-white/95 backdrop-blur-md text-slate-700 hover:bg-slate-50 rounded-full shadow-md border border-slate-200 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* BOTTOM ROW: Live Updates Ticker */}
            <div className="hidden lg:flex w-full relative z-40 items-center overflow-hidden rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm shadow-slate-200/50 py-2.5 px-5">
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
                    <span key={i} className="text-[13px] font-bold text-slate-700">{up}</span>
                  ))}
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* SIDE MOBILE DRAWER */}
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
              className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-white shadow-2xl z-[9999] flex flex-col pointer-events-auto"
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
                      {item.submenu.length > 0 && (
                        <ChevronRight size={18} className={`transition-transform ${activeMobileSub === index ? 'rotate-90' : ''}`} />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {activeMobileSub === index && item.submenu.length > 0 && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-white"
                        >
                          {item.isMega ? (
                            <div className="flex flex-col pb-4">
                              {item.submenu.map((col, idx) => (
                                <div key={idx} className="flex flex-col mt-4 first:mt-2">
                                  <div className="px-6 py-2 text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50/50">
                                    {col.category}
                                  </div>
                                  {col.items.map((subItem, i) => (
                                    <a 
                                      key={i} 
                                      href="/coming-soon"
                                      className="block p-3 pl-8 text-sm font-bold text-slate-500 border-t border-slate-50 active:bg-blue-50 active:text-blue-600 transition-colors cursor-pointer"
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
                                className="block p-4 pl-8 text-sm font-bold text-slate-500 border-t border-slate-50 active:bg-blue-50 active:text-blue-600 transition-colors cursor-pointer"
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