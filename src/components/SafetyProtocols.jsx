import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  MapPin, 
  Ban, 
  Activity, 
  CheckCircle2, 
  ShieldCheck,
  Stethoscope,
  Eye
} from "lucide-react";

export default function SafetyProtocols() {
  // Grouped 25-Step Protocol for better readability and UI presentation
  const safetySteps = [
    {
      category: "Pre-Trip Mechanical Inspection",
      steps: [
        "1. Brake pad and hydraulic fluid levels tested.",
        "2. Tire pressure, alignment, and tread depth verified.",
        "3. Engine oil, coolant, and transmission fluids checked.",
        "4. All exterior lights and indicators tested.",
        "5. Battery health and alternator output measured.",
        "6. Windshield wipers and washer fluid topped up.",
        "7. Steering mechanism and suspension inspected."
      ]
    },
    {
      category: "Driver Readiness & Compliance",
      steps: [
        "8. Mandatory breathalyzer test passed before receiving keys.",
        "9. Valid commercial license and transport badge verified.",
        "10. Mandatory 8-hour rest period between shifts confirmed.",
        "11. Uniform inspection and professional grooming check.",
        "12. Route briefing and hazard awareness mapping completed.",
        "13. Background verification and police clearance active."
      ]
    },
    {
      category: "In-Cabin Safety & Hygiene",
      steps: [
        "14. Complete interior deep cleaning and sanitization.",
        "15. Every individual seatbelt tested for tension and locking.",
        "16. AC ventilation and cabin air filters inspected.",
        "17. Strict No Smoking & No Drinking policy enforced.",
        "18. First-Aid medical kit restocked and verified.",
        "19. Fire extinguisher pressure gauge checked (Green zone)."
      ]
    },
    {
      category: "Technology & Emergency Systems",
      steps: [
        "20. Live GPS tracker signal verified with Control Room.",
        "21. Speed governor locked and tested at 80 km/h.",
        "22. Emergency exit doors and glass-breaking hammers present.",
        "23. Dashboard cameras and cabin CCTVs (if applicable) active.",
        "24. Emergency breakdown toolkit and spare tire secured.",
        "25. 24/7 SOS communication link tested and live."
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm tracking-widest uppercase mb-6"
        >
          <ShieldCheck size={16} /> Zero Compromise Policy
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
        >
          Uncompromising <span className="text-emerald-600">Safety Standards</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed"
        >
          Your life is our highest priority. Before any VBR vehicle arrives at your pickup location, it has already passed the most rigorous safety clearing process in the travel industry.
        </motion.p>
      </div>

      {/* THE BIG THREE: HIGHLIGHTED PROTOCOLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
              <Ban size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">Zero Tolerance</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Strictly <strong className="text-slate-800">No Smoking and No Drinking</strong> allowed inside any of our vehicles at any time. We maintain pristine, odor-free environments for all guests.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-200/20 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden ring-2 ring-emerald-500/10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 relative z-10">
              <Activity size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10">Mandatory Testing</h3>
            <p className="text-slate-500 font-medium leading-relaxed relative z-10">
              Every single driver must undergo and pass a strict <strong className="text-emerald-700">breathalyzer/drinking test</strong> at the depot before they are handed the keys to begin duty.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
              <MapPin size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">Live GPS Tracking</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Every vehicle is fitted with a <strong className="text-blue-700">Live GPS Telematics</strong> system, actively monitored 24/7 by our central control room for route deviation and overspeeding.
            </p>
          </motion.div>

        </div>
      </div>

      {/* THE 25-STEP VERIFICATION GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">The 25-Step Clearance</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            No vehicle leaves our parking bays without checking every single box on this mandatory safety manifest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {safetySteps.map((group, groupIndex) => (
            <motion.div 
              key={groupIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: groupIndex * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/40"
            >
              <h3 className="text-xl font-black text-emerald-600 uppercase tracking-wider mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                <CheckCircle2 size={24} /> {group.category}
              </h3>
              <ul className="flex flex-col gap-4">
                {group.steps.map((step, stepIndex) => (
                  <motion.li 
                    key={stepIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (groupIndex * 0.1) + (stepIndex * 0.05) }}
                    className="flex items-start gap-3 text-slate-600 font-semibold"
                  >
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    {step}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}