// src/data/fleetData.js

const baseFleetData = [
  { 
    id: 1, name: "SML Executive Coach 39 Seater A/C", type: "Large Bus", seats: "39 Seater", ac: true, perKm: "₹75", perDay: "₹9,500", image: "/sml39seater.png",
    interiors: ["/interiors/sml39-1.jpg", "/interiors/sml39-2.jpg"] // Replace with your actual file names
  },
  { 
    id: 2, name: "New SML Executive 22 Seater Coach A/C", type: "Mini Bus", seats: "22 Seater", ac: true, perKm: "₹55", perDay: "₹9,500", image: "/sml22seater.png",
    interiors: ["/interiors/sml22-1.jpg", "/interiors/sml22-2.jpg"]
  },
  { 
    id: 3, name: "Urbania White 2025 12+Bed", type: "Premium Van", seats: "17 Seater", ac: true, perKm: "₹40", perDay: "₹6,500", image: "/urbainiawhite2025.png",
    interiors: ["/interiors/urbania-1.jpg", "/interiors/urbania-2.jpg"]
  },
  { 
    id: 4, name: "Force Traveler 13+Bed Seater A/C", type: "Tempo Traveller", seats: "13+Bed", ac: true, perKm: "₹34", perDay: "₹3,500", image: "/force13bedseater.png",
    interiors: ["/interiors/force13-1.jpg", "/interiors/force13-2.jpg"]
  },
  { 
    id: 5, name: "Force Traveler A/C 18 Seater New", type: "Tempo Traveller", seats: "18 Seater Pushback", ac: true, perKm: "₹37", perDay: "On Request", image: "/force18seater.png",
    interiors: ["/interiors/force18-1.jpg", "/interiors/force18-2.jpg"]
  },
  { 
    id: 6, name: "Volvo Model Bus A/C", type: "Luxury Bus", seats: "29 Seater", ac: true, perKm: "₹75", perDay: "₹9,000", image: "/29seaterbus.png",
    interiors: ["/interiors/volvo-1.jpg", "/interiors/volvo-2.jpg", "/interiors/volvo-3.jpg"]
  },
  { 
    id: 7, name: "Bus 41 Seater Non-A/C Pushback", type: "Large Bus", seats: "41 Seater", ac: false, perKm: "₹80", perDay: "₹13,000", image: "/busnonac41seater.png",
    interiors: ["/interiors/bus41nonac-1.jpg", "/interiors/bus41nonac-2.jpg"]
  },
  { 
    id: 8, name: "41 Seater A/C New Big Bus", type: "Large Bus", seats: "41 Seater", ac: true, perKm: "₹85", perDay: "₹15,000", image: "/41seateracbus.png",
    interiors: ["/interiors/bus41ac-1.jpg", "/interiors/bus41ac-2.jpg"]
  },
  { 
    id: 9, name: "Force Urbania 2025 Model A/C New", type: "Premium Van", seats: "17 Seater", ac: true, perKm: "₹40", perDay: "₹6,500", image: "/forceurbanianew2025.png",
    interiors: ["/interiors/urbanianew-1.jpg", "/interiors/urbanianew-2.jpg"]
  },
  { 
    id: 10, name: "Force Traveler 27 Seater A/C (Dicky Type)", type: "Tempo Traveller", seats: "27 Seater", ac: true, perKm: "₹45", perDay: "On Request", image: "/force27seater.png",
    interiors: ["/interiors/force27dicky-1.jpg", "/interiors/force27dicky-2.jpg"]
  },
  { 
    id: 11, name: "Innova Crysta New 2024", type: "Luxury SUV", seats: "7 Seater", ac: true, perKm: "On Request", perDay: "₹2,500", image: "/innovacrysta2024.png",
    interiors: ["/interiors/innova2024-1.jpg", "/interiors/innova2024-2.jpg"]
  },
  { 
    id: 12, name: "Force Traveler A/C 13 Maxicab", type: "Tempo Traveller", seats: "13 Seater (10+Bed)", ac: true, perKm: "On Request", perDay: "₹3,500", image: "/forcetraveler13maxicab.png",
    interiors: ["/interiors/maxicab13-1.jpg", "/interiors/maxicab13-2.jpg"]
  },
  { 
    id: 13, name: "Innova Crista", type: "Luxury SUV", seats: "7 Seater", ac: true, perKm: "₹23", perDay: "₹2,500", image: "/innovacrysta.png",
    interiors: ["/interiors/innova-1.jpg", "/interiors/innova-2.jpg"]
  },
  { 
    id: 14, name: "Mahindra Xylo 8 Seater A/C", type: "SUV", seats: "8 Seater", ac: true, perKm: "₹20", perDay: "On Request", image: "/mahindraxylo.png",
    interiors: ["/interiors/xylo-1.jpg", "/interiors/xylo-2.jpg"]
  },
  { 
    id: 15, name: "Toyota Rumion", type: "MUV", seats: "7 Seater", ac: true, perKm: "₹18", perDay: "On Request", image: "/toyotarumion.png",
    interiors: ["/interiors/rumion-1.jpg", "/interiors/rumion-2.jpg"]
  },
  { 
    id: 16, name: "Kia Carens", type: "Premium MUV", seats: "7 Seater", ac: true, perKm: "₹20", perDay: "₹2,800", image: "/kiacarens.png",
    interiors: ["/interiors/carens-1.jpg", "/interiors/carens-2.jpg"]
  },
  { 
    id: 17, name: "Force Traveler New 2024", type: "Tempo Traveller", seats: "13 Seater", ac: true, perKm: "On Request", perDay: "₹3,500", image: "/forcetravellernew2024.png",
    interiors: ["/interiors/force13new-1.jpg", "/interiors/force13new-2.jpg"]
  },
  { 
    id: 18, name: "Force Traveler A/C", type: "Tempo Traveller", seats: "26+1 Seater", ac: true, perKm: "₹45", perDay: "On Request", image: "/forcetravellerac.png",
    interiors: ["/interiors/force26-1.jpg", "/interiors/force26-2.jpg"]
  },
  { 
    id: 19, name: "Toyota Innova Crysta 7+1", type: "Premium SUV", seats: "7+1 Seater", ac: true, perKm: "₹22", perDay: "₹2,200", image: "/innovacrysta71.png",
    interiors: ["/interiors/innova71-1.jpg", "/interiors/innova71-2.jpg"]
  },
  { 
    id: 20, name: "10+Bed A/C Pushback", type: "Tempo Traveller", seats: "10+Bed", ac: true, perKm: "On Request", perDay: "₹3,000", image: "/10bedacpushback.png",
    interiors: ["/interiors/10bed-1.jpg", "/interiors/10bed-2.jpg"]
  },
  { 
    id: 21, name: "Bus Non-A/C 41 Seater", type: "Large Bus", seats: "41 Seater", ac: false, perKm: "₹75", perDay: "₹8,000", image: "/41seater.png",
    interiors: ["/interiors/41seater-1.jpg", "/interiors/41seater-2.jpg"]
  },
  { 
    id: 22, name: "A/C 27 Seater Force Traveler", type: "Tempo Traveller", seats: "27 Seater", ac: true, perKm: "₹45", perDay: "₹5,000", image: "/ac27seaterforce.png",
    interiors: ["/interiors/force27-1.jpg", "/interiors/force27-2.jpg"]
  }
];

export const fleetData = baseFleetData.map(v => ({
  ...v,
  slug: v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
  description: `Experience the ultimate journey in our ${v.name}. Perfect for outstation trips, family vacations, and corporate events. Maintained to the highest standards of safety and hygiene.`,
  
  amenities: v.ac 
    ? ["Powerful Dual A/C", "Premium Pushback Seats", "LED TV & Music System", "Ambient Lighting", "Charging Ports", "GPS Tracking", "Spacious Legroom", "First Aid Kit"]
    : ["Premium Pushback Seats", "Music System", "Tinted Windows", "Charging Ports", "GPS Tracking", "Spacious Legroom", "First Aid Kit", "Luggage Carrier"],
  
  // This dynamically builds the gallery for the details page
  gallery: [
    { type: "image", src: v.image }, // The main exterior image
    // This maps through the specific interiors you defined for THIS vehicle above
    ...v.interiors.map(imgSrc => ({ type: "image", src: imgSrc })) 
  ],
  
  // Note: You can also move videoId up to the baseFleetData if you have different YouTube videos for each vehicle!
  videoId: "mwkqCDe98fs" 
}));