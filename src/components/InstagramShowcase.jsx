import { motion } from "framer-motion";
// FIX: Replaced 'Instagram' with 'Camera' to resolve the export error
import { Camera, Heart, MessageCircle, ExternalLink } from "lucide-react";

// Official Instagram Link
const INSTAGRAM_URL = "https://www.instagram.com/vbr_travels_nellore/?hl=en";

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
    <div className="w-full py-10 px-4 max-w-7xl mx-auto">
      
      {/* Header Section with Official Instagram Link */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            {/* FIX: Using Camera here */}
            <Camera size={32} className="text-pink-600" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">VBR on Instagram</h2>
          </div>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            Follow <span className="font-bold text-slate-700">@vbr_travels_nellore</span> for daily travel inspiration, fleet updates, and behind-the-scenes moments.
          </p>
        </div>
        
        {/* Instagram Gradient Button */}
        <a 
          href={INSTAGRAM_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-1"
        >
          {/* FIX: Using Camera here */}
          <Camera size={20} className="text-white/80" />
          Follow Us
        </a>
      </div>

      {/* Instagram Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {instagramPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col group"
          >
            {/* 1:1 Aspect Ratio Image */}
            <div className="relative w-full aspect-square bg-slate-900 overflow-hidden">
              <img
                src={post.image}
                alt="Instagram Post"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                <ExternalLink size={32} className="text-white" />
              </a>
            </div>

            {/* Post Interactions & Caption */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-4 mb-3 text-slate-700">
                <div className="flex items-center gap-1.5 font-bold hover:text-pink-600 transition-colors cursor-pointer">
                  <Heart size={20} />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold hover:text-blue-600 transition-colors cursor-pointer">
                  <MessageCircle size={20} />
                  <span>{post.comments}</span>
                </div>
              </div>

              <p className="text-sm font-medium text-slate-600 leading-relaxed line-clamp-3">
                <span className="font-bold text-slate-900 mr-2">vbr_travels_nellore</span>
                {post.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}