import { motion } from "framer-motion";
import { ThumbsUp, MessageSquare, Share2, ExternalLink, Globe } from "lucide-react";

// Placeholder Facebook Link
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

// This is the critical line that was missing from your file!
export default function FacebookShowcase() {
  return (
    <div className="w-full py-10 px-4 max-w-7xl mx-auto mb-10">
      
      {/* Header Section with Official Facebook Link */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <ThumbsUp size={32} className="text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">VBR Community</h2>
          </div>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            Join our growing family on Facebook. Get the latest announcements, special offers, and community travel updates.
          </p>
        </div>
        
        {/* Facebook Blue Button */}
        <a 
          href={FACEBOOK_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1"
        >
          <ThumbsUp size={20} className="fill-white/20" />
          Like Our Page
        </a>
      </div>

      {/* Facebook Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {facebookPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col group"
          >
            {/* Post Header */}
            <div className="p-5 flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-black text-sm tracking-tighter">VB</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors">
                  VBR Tours & Travels
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-0.5">
                  <span>{post.date}</span>
                  <span>•</span>
                  <Globe size={12} />
                </div>
              </div>
            </div>

            {/* Post Text */}
            <div className="px-5 pb-4">
              <p className="text-slate-700 font-medium leading-relaxed">
                {post.text}
              </p>
            </div>

            {/* Post Image */}
            <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
              <img
                src={post.image}
                alt="Facebook Post Visual"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <a 
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                <ExternalLink size={32} className="text-white" />
              </a>
            </div>

            {/* Post Interactions */}
            <div className="p-2 border-t border-slate-100 bg-slate-50">
              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-1 text-sm text-slate-500 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <ThumbsUp size={10} className="text-white fill-white" />
                  </div>
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium hover:underline cursor-pointer">
                  <span>{post.comments} Comments</span>
                  <span>{post.shares} Shares</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 px-4 pb-2">
                <button className="flex items-center gap-2 text-slate-600 font-bold hover:bg-slate-200/50 px-4 py-2 rounded-lg transition-colors flex-1 justify-center">
                  <ThumbsUp size={18} /> Like
                </button>
                <button className="flex items-center gap-2 text-slate-600 font-bold hover:bg-slate-200/50 px-4 py-2 rounded-lg transition-colors flex-1 justify-center">
                  <MessageSquare size={18} /> Comment
                </button>
                <button className="flex items-center gap-2 text-slate-600 font-bold hover:bg-slate-200/50 px-4 py-2 rounded-lg transition-colors flex-1 justify-center">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}