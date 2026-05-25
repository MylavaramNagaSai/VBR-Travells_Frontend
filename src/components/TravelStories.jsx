import { motion } from "framer-motion";
import { PlayCircle, Quote, MapPin, Star } from "lucide-react";

// The Travel Stories Data
const stories = [
  {
    id: 1,
    name: "The Sharma Family",
    destination: "Kerala Backwaters",
    feedback: "The Innova Crysta was pristine and our chauffeur, Suresh, was incredibly polite and safe. Our 5-day Kerala trip was absolutely flawless thanks to VBR Travels.",
    videoThumbnail: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 2,
    name: "Vikram & Friends",
    destination: "Goa Coastal Trip",
    feedback: "We booked a 12-Seater Tempo Traveller for a bachelor trip. The music system, the AC, and the driving were top-notch. Highly recommend them for group travels!",
    videoThumbnail: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Desai",
    destination: "Tirupati Darshan",
    feedback: "Traveling with elderly parents can be stressful, but VBR made our Tirupati Darshan so comfortable. The driver knew all the best routes and stops.",
    videoThumbnail: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop",
    rating: 5
  }
];

export default function TravelStories() {
  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto">
      
      {/* Title & Description Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Travel Stories & Testimonials</h2>
        <p className="text-slate-500 font-medium mt-3 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. Watch and read about the beautiful memories our clients have made while traveling with VBR.
        </p>
      </div>

      {/* Grid Layout for Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col"
          >
            {/* Video Thumbnail Section */}
            <div className="relative h-56 bg-slate-900 overflow-hidden">
              <img 
                src={story.videoThumbnail} 
                alt={`${story.destination} trip`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all group-hover:bg-black/30 cursor-pointer">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                  <PlayCircle size={32} className="text-white fill-white/20" />
                </div>
              </div>

              {/* Destination Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wide">
                <MapPin size={14} className="text-blue-600" />
                {story.destination}
              </div>
            </div>

            {/* Written Feedback Section */}
            <div className="p-8 flex flex-col flex-1 relative">
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote size={40} className="text-slate-900" />
              </div>

              {/* Star Ratings */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Feedback Text */}
              <p className="text-slate-600 font-medium italic leading-relaxed mb-6 flex-1">
                "{story.feedback}"
              </p>

              {/* Traveler Name */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-700 font-bold text-lg border border-white shadow-sm">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{story.name}</h4>
                  <span className="text-xs font-medium text-slate-500">Verified Traveler</span>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}