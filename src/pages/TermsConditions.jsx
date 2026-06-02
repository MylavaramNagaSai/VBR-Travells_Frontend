import { FileText } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-8">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
            <FileText size={32} className="text-slate-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms & Conditions</h1>
            <p className="text-slate-500 font-medium mt-1">Last updated: June 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using the VBR Tours & Travels website and booking our services, you agree to be bound by these Terms and Conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Booking and Payments</h2>
            <p>All bookings are subject to vehicle availability. A minimum advance payment may be required to confirm your booking. Final payment must be settled as per the agreed terms before or at the end of the journey. Tolls, parking, and state permits are usually extra unless explicitly included in your package.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Cancellation Policy</h2>
            <p>Cancellations made 48 hours prior to the journey may be eligible for a full refund of the advance. Cancellations made within 24 hours will incur a cancellation fee. No-shows will result in a 100% forfeiture of the advance amount.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Passenger Responsibilities</h2>
            <p>Passengers are responsible for their belongings. VBR Tours & Travels is not liable for lost or damaged items. Smoking and consumption of alcohol inside the vehicles is strictly prohibited.</p>
          </section>
        </div>
      </div>
    </div>
  );
}