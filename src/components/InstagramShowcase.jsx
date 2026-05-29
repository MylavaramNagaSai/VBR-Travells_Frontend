import { motion } from "framer-motion";
import { Heart, MessageCircle, ExternalLink } from "lucide-react";

// --- Custom SVG Instagram Icon (100% reliable) ---
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Official Instagram Link provided
const INSTAGRAM_URL = "https://www.instagram.com/vbr_travels_nellore?igsh=M3hheWEwcXRkbXg=";

// Simulated Instagram Feed Data
const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516934161286-665e8aebcc29?q=80&w=600&auto=format&fit=crop",
    caption: "Our 26-seater Tempo Traveller ready for a peaceful Tirupati Darshan trip! 🙏✨ Comfort for the whole family. #VBRTravels #Nellore #Tirupati",
    likes: "342",
    comments: "18"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
    caption: "Premium airport transfers with our luxury Innova Crysta. Punctuality and comfort guaranteed every single time. ✈️🚙 #AirportTaxi #PremiumTravel",
    likes: "215",
    comments: "9"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop",
    caption: "Weekend vibes! Taking an amazing group on a coastal trip to Goa in our AC Volvo sleeper. 🌊🌴 #GoaDiaries #GroupTravel #VBR",
    likes: "528",
    comments: "42"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
    caption: "Another massive corporate event handled flawlessly by the VBR team! 💼🚐 Dedicated transport solutions for MNCs.",
    likes: "410",
    comments: "24"
  }
];

export default function InstagramShowcase() {
  return (
    <div className="w-full py-12 bg-slate-50/50 overflow-hidden">
      
      {/* ALIGNMENT FIX: Exact same max-w container as YouTube */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* 1. COMPACT HEADER */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-8">
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <InstagramIcon size={24} className="text-pink-600" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">VBR on Instagram</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Follow <span className="font-bold text-slate-700">@vbr_travels_nellore</span> for daily travel inspiration, fleet updates, and behind-the-scenes moments.
            </p>
          </div>

          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:from-yellow-400 hover:via-pink-400 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-pink-500/20 active:scale-95 shrink-0"
          >
            <InstagramIcon size={16} />
            Follow Us
          </a>

        </div>

        {/* 2. RESPONSIVE CARD ROW (Matches YouTube structure perfectly) */}
        <div className="relative w-full">
          
          {/* Soft edge fades - Hidden on desktop since all 4 fit perfectly */}
          <div className="absolute top-0 left-0 w-8 md:w-12 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />
          <div className="absolute top-0 right-0 w-8 md:w-12 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />

          {/* The Scroll Track */}
          <div className="flex overflow-x-auto lg:overflow-visible gap-5 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            {instagramPosts.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                // Increased width sizes, flex-1 ensures perfect distribution on large screens
                className="relative w-[280px] md:w-[320px] lg:w-full lg:flex-1 shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md shadow-slate-200/50 flex flex-col group"
              >
                {/* 1:1 Aspect Ratio Image */}
                <div className="relative w-full aspect-square bg-slate-900 overflow-hidden border-b border-slate-100">
                  <img
                    src={post.image}
                    alt="Instagram Post"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <a 
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10"
                  >
                    <ExternalLink size={32} className="text-white drop-shadow-lg" />
                  </a>
                </div>

                {/* Post Details */}
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  
                  {/* Interactions */}
                  <div className="flex items-center gap-4 mb-3 text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold hover:text-pink-600 transition-colors cursor-pointer">
                      <Heart size={18} />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold hover:text-blue-600 transition-colors cursor-pointer">
                      <MessageCircle size={18} />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-xs md:text-[13px] font-medium text-slate-500 leading-relaxed line-clamp-3">
                    <span className="font-bold text-slate-900 mr-1.5">vbr_travels_nellore</span>
                    {post.caption}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}