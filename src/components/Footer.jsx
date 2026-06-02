import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-20 pb-8 mt-20 relative overflow-hidden">
      {/* Decorative Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <a href="/" className="flex items-center gap-4 cursor-pointer group w-fit">
              <img 
                src="/vbr-logo.jpg" 
                alt="VBR Travels Logo" 
                className="w-20 h-20 rounded-full bg-white object-cover border-2 border-slate-700 group-hover:border-blue-500 transition-colors shadow-lg shadow-black/50"
              />
              <span className="font-extrabold text-3xl tracking-tight text-white group-hover:text-blue-400 transition-colors">VBR Travels</span>
            </a>
            <p className="text-sm font-medium leading-relaxed text-slate-400 mt-2">
              Premium Cars, Tempos, and Buses for every journey. Experience seamless, safe, and comfortable travel across India with our high-end fleet and professional chauffeurs.
            </p>
            <a 
              href="/admin" 
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-5 py-2.5 rounded-lg text-sm font-bold w-fit transition-all border border-slate-700 hover:border-blue-500 shadow-sm"
            >
              Admin Login
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Explore</h4>
            <ul className="flex flex-col gap-4">
              {["Our Fleet", "Trending Destinations", "Spiritual Yatras", "Special Services", "Travel Stories", "Careers"].map((link) => (
                <li key={link}>
                  <a href="/coming-soon" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Support</h4>
            <ul className="flex flex-col gap-4">
              {["FAQs", "Cancellation Policy", "24/7 Helpline", "Report an Issue", "Lost & Found"].map((link) => (
                <li key={link}>
                  <a href="/coming-soon" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us & Find Us On */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Contact Us</h4>
            
            <div className="flex flex-col gap-5 text-sm font-medium text-slate-400 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">123 VBR Travels Main Office,<br/>Nellore, Andhra Pradesh, 524001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <a href="tel:+919866128901" className="hover:text-white text-slate-300 transition-colors">+91 98661 28901</a>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-blue-500 shrink-0 mt-1" />
                <div className="flex flex-col gap-3">
                  <a href="mailto:contact@vbrtourstravels.com" className="hover:text-white text-slate-300 font-medium transition-colors">
                    contact@vbrtourstravels.com
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Admin</span> 
                    <a href="mailto:masthanvali@vbrtourstravels.com" className="hover:text-white text-slate-300 font-medium transition-colors">
                      masthanvali@vbrtourstravels.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-white font-bold text-lg mb-5 tracking-wide">Find us on</h4>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <a href="https://wa.me/919866128901" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#25D366] transition-all text-slate-400 hover:text-white shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1Gu3p1BK6b/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] transition-all text-slate-400 hover:text-white shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/vbr_travels_nellore/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E4405F] transition-all text-slate-400 hover:text-white shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-all text-slate-400 shadow-md">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </a>
              </div>

              <a href="https://wa.me/919866128901" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/50 hover:border-[#25D366] px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm w-fit group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Join WhatsApp Channel
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 relative">
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start gap-4 text-sm font-medium text-slate-500">
            
            {/* UPDATED LINKS HERE */}
            <a href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/terms-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</a>
            
          </div>
          
          <div className="w-full lg:w-1/3 flex justify-center">
            <p className="text-sm font-medium text-slate-500">
              Designed & Developed by{" "}
              <a 
                href="https://www.mylavaramsai.me/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition-all cursor-pointer"
              >
                Mylavaram Naga Sai
              </a>
            </p>
          </div>
          
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} VBR Tours & Travels. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}