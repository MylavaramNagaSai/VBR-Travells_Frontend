import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

// Extracted exactly from your screenshot
const faqData = [
  {
    category: "BOOKINGS & PAYMENTS",
    items: [
      { q: "How do I book a vehicle with VBR Travels?", a: "You can book directly through our website, via our WhatsApp booking line, or by calling our 24/7 customer support." },
      { q: "What is the advance payment required?", a: "We require a standard 20% advance payment to confirm and block the vehicle for your dates." },
      { q: "What payment methods do you accept?", a: "We accept UPI (Google Pay, PhonePe), Credit/Debit Cards, Net Banking, and Cash." },
      { q: "What is your cancellation policy?", a: "Cancellations made 48 hours prior to the journey are eligible for a full refund of the advance." },
      { q: "Are toll and parking charges included?", a: "No, toll gates, parking fees, and state border taxes are generally extra and paid by the customer during the trip." },
      { q: "Do I need to pay for the driver's food/stay?", a: "A standard driver allowance is usually added to your bill to cover their food and stay. Please check your specific package details." }
    ]
  },
  {
    category: "FLEET & SERVICES",
    items: [
      { q: "Are your vehicles air-conditioned?", a: "Yes, our entire fleet features powerful dual-AC systems to ensure maximum comfort." },
      { q: "Can I choose a specific car model?", a: "Absolutely! You can select from our range of Sedans, SUVs, Innovas, and Tempo Travellers based on availability." },
      { q: "Do you offer self-drive rentals?", a: "Currently, we only provide chauffeur-driven vehicles to ensure a premium, hassle-free experience for our clients." },
      { q: "Are pets allowed in the vehicles?", a: "We are pet-friendly! Please inform us in advance so we can arrange a vehicle with appropriate seating covers." },
      { q: "Is there a limit on luggage?", a: "Luggage limits depend on the vehicle selected. We recommend carrier-equipped vehicles for heavy luggage." },
      { q: "Do you provide vehicles for weddings?", a: "Yes, we have a dedicated fleet of premium and luxury cars available specifically for wedding events and VIP transport." }
    ]
  },
  {
    category: "SAFETY & POLICIES",
    items: [
      { q: "Are your drivers verified?", a: "Yes. Every driver undergoes a strict background check, driving test, and holds a valid commercial license." },
      { q: "What happens if a vehicle breaks down?", a: "We have a 24/7 rapid response team. In the rare event of a breakdown, a replacement vehicle will be dispatched immediately." },
      { q: "Is night driving allowed?", a: "Yes, our experienced drivers are trained for safe night driving on highways." },
      { q: "How do you ensure passenger safety?", a: "Our vehicles are GPS-tracked, regularly serviced, and equipped with first-aid kits and fire extinguishers." },
      { q: "Do you track flight timings for airport pickups?", a: "Yes, if you provide your flight number, our travel desk monitors delays to ensure your driver is there right on time." },
      { q: "Can I share my live location with family?", a: "Absolutely. We can provide a live tracking link for your specific vehicle upon request so your family can monitor your journey." }
    ]
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        // TIGHTER PADDING & SMALLER TEXT HERE: px-4 py-3.5 and text-[13px]
        className="w-full flex items-center justify-between px-4 py-3.5 text-left focus:outline-none"
      >
        <span className="font-bold text-slate-700 text-[13px] leading-tight pr-4">
          {question}
        </span>
        <div 
          className={`flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-blue-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-blue-50" : ""}`}
        >
          <ChevronDown size={14} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* TIGHTER ANSWER PADDING: px-4 pb-3.5 */}
            <div className="px-4 pb-3.5 text-slate-500 text-xs leading-relaxed border-t border-slate-50 mt-1 pt-2.5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  return (
    // REDUCED VERTICAL SECTION PADDING: py-12 instead of py-20+
    <div className="w-full py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle size={28} className="text-blue-500" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
            Everything you need to know about bookings, fleet policies, and safety before you travel with VBR.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {faqData.map((categoryData, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              {/* Category Title */}
              <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1 pl-1">
                {categoryData.category}
              </h3>
              
              {/* The tight stack of questions */}
              <div className="flex flex-col gap-2.5">
                {categoryData.items.map((item, itemIdx) => (
                  <FAQItem key={itemIdx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}