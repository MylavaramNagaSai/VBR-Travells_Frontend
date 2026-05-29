import { motion } from "framer-motion";
import { ThumbsUp, MessageSquare, Share2, ExternalLink, Globe } from "lucide-react";

// --- Custom SVG Facebook Icon (100% reliable) ---
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100094000000000"; 

const facebookPosts = [
  {
    id: 1,
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
    text: "Thrilled to announce the addition of 5 brand new Volvo AC Sleepers to our growing fleet! 🚌✨ Getting ready for the holiday rush. Call our Nellore office to book your tickets now!",
    likes: "1.2k",
    comments: "145",
    shares: "56"
  },
  {
    id: 2,
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    text: "A huge thank you to the management at TechPark for trusting VBR Travels with their annual corporate outing. 💼 Safe travels and happy memories!",
    likes: "856",
    comments: "32",
    shares: "12"
  },
  {
    id: 3,
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop",
    text: "Planning a family Darshan? 🙏 Our 12-seater Tempos are fully sanitized, air-conditioned, and driven by our most experienced route specialists. Message us for Tirupati package details.",
    likes: "2.4k",
    comments: "310",
    shares: "189"
  },
  {
    id: 4,
    date: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    text: "Summer is almost here! 🌊 Have you planned your coastal getaway yet? Check out our special weekend rental rates for hatchbacks and SUVs.",
    likes: "640",
    comments: "88",
    shares: "24"
  }
];

export default function FacebookShowcase() {
  return (
    <div className="w-full py-12 bg-slate-50/50 overflow-hidden">
      
      {/* ALIGNMENT FIX: Exact same max-w container as YouTube & Instagram */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* 1. COMPACT HEADER */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-8">
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FacebookIcon size={24} className="text-[#1877F2]" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">VBR Community</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Join our growing family on Facebook. Get the latest announcements, special offers, and community travel updates.
            </p>
          </div>

          <a 
            href={FACEBOOK_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-[#1877F2]/20 active:scale-95 shrink-0"
          >
            <FacebookIcon size={16} />
            Like Our Page
          </a>

        </div>

        {/* 2. RESPONSIVE CARD ROW */}
        <div className="relative w-full">
          
          {/* Soft edge fades - Hidden on desktop since all 4 fit perfectly */}
          <div className="absolute top-0 left-0 w-8 md:w-12 h-full bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />
          <div className="absolute top-0 right-0 w-8 md:w-12 h-full bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none lg:hidden" />

          {/* The Scroll Track */}
          <div className="flex overflow-x-auto lg:overflow-visible gap-5 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            {facebookPosts.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                // Exactly matched to Instagram scaling
                className="relative w-[280px] md:w-[320px] lg:w-full lg:flex-1 shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md shadow-slate-200/50 flex flex-col group"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                    <span className="text-white font-black text-xs tracking-tighter">VB</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 hover:text-[#1877F2] cursor-pointer transition-colors leading-tight">
                      VBR Tours & Travels
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-0.5">
                      <span>{post.date}</span>
                      <span>•</span>
                      <Globe size={10} />
                    </div>
                  </div>
                </div>

                {/* Post Text - Fixed height using line-clamp */}
                <div className="px-4 pb-3 flex-grow">
                  <p className="text-slate-700 text-xs md:text-[13px] font-medium leading-relaxed line-clamp-3">
                    {post.text}
                  </p>
                </div>

                {/* Post Image Container */}
                <div className="relative w-full aspect-video bg-slate-100 overflow-hidden border-t border-slate-50">
                  <img
                    src={post.image}
                    alt="Facebook Post Visual"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <a 
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10"
                  >
                    <ExternalLink size={32} className="text-white drop-shadow-md" />
                  </a>
                </div>

                {/* Post Interactions Footer */}
                <div className="bg-slate-50 border-t border-slate-100">
                  
                  {/* Like/Comment Counts */}
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center">
                        <ThumbsUp size={8} className="text-white fill-white" />
                      </div>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-medium hover:underline cursor-pointer">
                      <span>{post.comments} Comments</span>
                      <span>{post.shares} Shares</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-1.5 px-2 pb-1.5">
                    <button className="flex items-center gap-1.5 text-slate-600 font-bold hover:bg-slate-200/50 px-2 py-1.5 rounded-lg transition-colors flex-1 justify-center text-xs">
                      <ThumbsUp size={14} /> Like
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-600 font-bold hover:bg-slate-200/50 px-2 py-1.5 rounded-lg transition-colors flex-1 justify-center text-xs">
                      <MessageSquare size={14} /> Comment
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-600 font-bold hover:bg-slate-200/50 px-2 py-1.5 rounded-lg transition-colors flex-1 justify-center text-xs">
                      <Share2 size={14} /> Share
                    </button>
                  </div>

                </div>

              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}