import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Car, 
  CheckCircle2,
  Zap
} from "lucide-react";
// 1. Import your Firebase configuration
import { db } from "../firebase";
import { ref, push, serverTimestamp } from "firebase/database";

export default function QuickInquiry() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Create state to hold the form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Push data to Firebase on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a reference to an 'inquiries' folder in your database
      const inquiriesRef = ref(db, 'inquiries');
      
      // Push the form data along with a server timestamp and a "new" status
      await push(inquiriesRef, {
        ...formData,
        timestamp: serverTimestamp(),
        status: "new" // Useful for your Admin Dashboard later!
      });

      // Show success animation
      setIsSubmitted(true);
      
      // Clear the form
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      
      // Reset animation after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting inquiry: ", error);
      alert("Something went wrong. Please try sending your inquiry again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm tracking-widest uppercase mb-6"
        >
          <Zap size={16} className="fill-blue-600" /> Fast Response Guaranteed
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
        >
          Send a <span className="text-blue-600">Quick Inquiry</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Tell us what you need, and our travel experts will get back to you with a customized quotation within minutes.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 p-8 md:p-12">
            {!isSubmitted ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <User size={16} className="text-blue-600" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Phone size={16} className="text-blue-600" /> Mobile Number
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Mail size={16} className="text-blue-600" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hello@company.com (Optional)"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* Service Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Car size={16} className="text-blue-600" /> Service Required
                    </label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="monthly">Monthly Rental</option>
                      <option value="corporate">Corporate Staff Transport</option>
                      <option value="student">Student / Industrial Visit</option>
                      <option value="trip">Custom Trip Planning</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MessageSquare size={16} className="text-blue-600" /> Your Requirements
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Tell us about your trip dates, number of passengers, and destination..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400 font-medium resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-black text-lg py-5 rounded-xl transition-all flex items-center justify-center gap-3 mt-4 group ${
                    isSubmitting 
                      ? "bg-slate-400 text-slate-100 cursor-not-allowed" 
                      : "bg-slate-900 hover:bg-blue-600 text-white shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30"
                  }`}
                >
                  <Send size={20} className={!isSubmitting ? "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" : ""} /> 
                  {isSubmitting ? "Sending..." : "Send Inquiry Now"}
                </motion.button>

              </motion.form>
            ) : (
              /* SUCCESS STATE ANIMATION */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Inquiry Sent Successfully!</h3>
                <p className="text-lg text-slate-500 font-medium max-w-md mx-auto mb-8">
                  Thank you for reaching out. Our dispatch team has received your request and will contact you shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}