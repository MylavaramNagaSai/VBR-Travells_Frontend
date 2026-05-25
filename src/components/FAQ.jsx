import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

// 30 Comprehensive FAQs split into 3 logical columns for the grid
const faqColumns = [
  // COLUMN 1: Bookings & Payments
  [
    { id: 1, q: "How do I book a vehicle with VBR Travels?", a: "You can book directly through our website, call our 24/7 helpline, or visit our Nellore office. We recommend booking at least 48 hours in advance for assured availability." },
    { id: 2, q: "What is the advance payment required?", a: "We require a standard 20% to 30% advance payment to confirm your booking, depending on the vehicle type and season. The balance can be paid during the trip." },
    { id: 3, q: "What payment methods do you accept?", a: "We accept all major UPIs (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash." },
    { id: 4, q: "What is your cancellation policy?", a: "Cancellations made 48 hours before the trip receive a full refund. Cancellations within 24-48 hours incur a 10% fee. Same-day cancellations are non-refundable." },
    { id: 5, q: "Are toll and parking charges included?", a: "Toll gates, parking fees, and interstate permit charges are usually extra and to be borne by the customer during the trip unless you opt for an all-inclusive package." },
    { id: 6, q: "Do I need to pay for the driver's food/stay?", a: "A standard driver 'bata' (allowance) is applied per day to cover their meals. For outstation overnight trips, if you do not provide accommodation, a standard night halt charge applies." },
    { id: 7, q: "Can I modify my booking dates?", a: "Yes, date modifications are free of charge if requested at least 3 days in advance, subject to vehicle availability." },
    { id: 8, q: "Is there a minimum billing for outstation trips?", a: "Yes, outstation trips are generally billed at a minimum of 250 km to 300 km per calendar day, depending on the vehicle class." },
    { id: 9, q: "Do you provide GST invoices for corporate bookings?", a: "Absolutely. We provide valid GST invoices for all B2B and corporate tie-up bookings." },
    { id: 10, q: "How are refunds processed?", a: "Approved refunds are credited back to the original payment source within 3 to 5 working days." }
  ],
  // COLUMN 2: Fleet & Services
  [
    { id: 11, q: "Are your vehicles air-conditioned?", a: "Yes, our entire premium fleet (Cars, SUVs, Tempos, and Volvo Buses) is fully air-conditioned for your comfort." },
    { id: 12, q: "Can I choose a specific car model?", a: "Yes, you can select the exact vehicle category (e.g., Innova Crysta, Dzire) during booking. We guarantee the category, subject to maintenance availability." },
    { id: 13, q: "Do you offer self-drive rentals?", a: "Currently, VBR Travels strictly provides chauffeur-driven vehicles to ensure maximum safety and a premium experience." },
    { id: 14, q: "Are pets allowed in the vehicles?", a: "We love pets! Small, well-behaved pets are allowed in private car/SUV bookings. Please inform us during booking so we can arrange a pet-friendly vehicle." },
    { id: 15, q: "Is there a limit on luggage?", a: "Luggage capacity depends on the vehicle. For example, an SUV holds 4 bags, while a 26-Seater Tempo has ample dedicated boot space. Please refer to our Fleet section." },
    { id: 16, q: "Do you provide vehicles for weddings?", a: "Yes, we specialize in wedding logistics. We provide luxury cars for the couple and high-capacity buses/tempos for guests." },
    { id: 17, q: "What is your daily local rental limit?", a: "Local city rentals are typically packaged as 8 Hours / 80 Kms. Extra hours and kilometers are billed at nominal rates." },
    { id: 18, q: "Can I book a one-way drop?", a: "Yes, we offer dedicated outstation one-way drops to major airports and cities at competitive rates." },
    { id: 19, q: "Do your buses have charging ports?", a: "Yes, our premium Volvo sleepers and luxury mini-buses are equipped with individual USB charging ports and reading lights." },
    { id: 20, q: "How often are vehicles serviced?", a: "Every vehicle undergoes a strict 30-point mechanical and cleanliness inspection before dispatch. Major servicing is done monthly." }
  ],
  // COLUMN 3: Safety & Support
  [
    { id: 21, q: "Are your drivers verified?", a: "100%. All our chauffeurs undergo rigorous background checks, hold valid commercial licenses, and have years of safe driving experience." },
    { id: 22, q: "What happens if a vehicle breaks down?", a: "While rare due to our maintenance, in case of a breakdown, we immediately dispatch a replacement vehicle from our nearest network hub at no extra cost." },
    { id: 23, q: "Is night driving allowed?", a: "Yes. Our drivers are trained for safe night driving. We operate 24/7 for your convenience." },
    { id: 24, q: "How do you ensure passenger safety?", a: "All vehicles have real-time GPS tracking. Our speed limits are strictly monitored, and our drivers adhere to a zero-tolerance alcohol policy." },
    { id: 25, q: "Do you track flight timings for airport pickups?", a: "Yes, if you provide your flight number, our travel desk monitors the arrival time to ensure your chauffeur is waiting when you land." },
    { id: 26, q: "Can I share my live location with family?", a: "Yes, our central system can generate a live tracking link for your specific trip which you can share with your loved ones." },
    { id: 27, q: "What should I do if I leave luggage behind?", a: "Contact our 24/7 helpline immediately. Our drivers check the vehicle after every trip, and lost items are safely deposited at our Nellore office." },
    { id: 28, q: "Are your vehicles insured?", a: "Yes, our entire fleet is fully comprehensively insured, including third-party and passenger cover." },
    { id: 29, q: "How do I contact support during a trip?", a: "You will be provided with a dedicated 24/7 emergency helpline number and a travel coordinator assigned specifically to your booking." },
    { id: 30, q: "Can I request a bilingual driver?", a: "Yes, most of our drivers speak Telugu, Hindi, and English. Please specify your preference during booking!" }
  ]
];

// Helper Component for the Accordion logic
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-800 text-sm leading-snug pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <ChevronDown size={16} className="text-blue-600" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-sm font-medium text-slate-500 leading-relaxed border-t border-slate-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto border-t border-slate-200 mt-10">
      
      {/* Title Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-3">
          <HelpCircle size={32} className="text-blue-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
          Everything you need to know about bookings, fleet policies, and safety before you travel with VBR.
        </p>
      </div>

      {/* 3-Column Layout for Desktop, Stacks on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        
        {/* Render the 3 Columns */}
        {faqColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {/* Optional Section Headers for the Columns */}
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 mb-2">
              {colIndex === 0 ? "Bookings & Payments" : colIndex === 1 ? "Fleet & Services" : "Safety & Policies"}
            </h3>
            
            {column.map((item) => (
              <FAQItem key={item.id} question={item.q} answer={item.a} />
            ))}
          </div>
        ))}

      </div>

    </div>
  );
}