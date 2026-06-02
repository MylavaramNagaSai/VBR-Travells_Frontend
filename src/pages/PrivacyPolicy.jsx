import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck size={32} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 font-medium mt-1">Last updated: June 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>At VBR Tours & Travels, we collect information that you provide directly to us when booking a vehicle or contacting our support. This includes your name, phone number, email address, pickup/drop-off locations, and payment details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to process your bookings, communicate with you about your trip, send booking confirmations, provide driver details, and improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Sharing and Security</h2>
            <p>We do not sell your personal data. We only share necessary information (like your name and phone number) with our assigned drivers to ensure seamless pickups. We implement standard security measures to protect your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <ul className="mt-2 space-y-1 text-slate-800 font-bold">
              <li>Email: contact@vbrtourstravels.com</li>
              <li>Phone: +91 98661 28901</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}