// src/data/fleetData.js

const baseFleetData = [
  { 
    id: 1, name: "SML Executive Coach 39 Seater A/C", type: "Large Bus", seats: "39 Seater", ac: true, perKm: "₹75", perDay: "₹9,500", image: "/sml39seater.png",
    interiors: [
      "/interiors/img1_1.png", "/interiors/img1_2.png", "/interiors/img1_3.png", 
      "/interiors/img1_4.png", "/interiors/img1_5.png", "/interiors/img1_6.png", 
      "/interiors/img1_7.png", "/interiors/img1_8.png", "/interiors/img1_9.png"
    ] 
  },
  { 
    id: 2, name: "New SML Executive 22 Seater Coach A/C", type: "Mini Bus", seats: "22 Seater", ac: true, perKm: "₹55", perDay: "₹9,500", image: "/sml22seater.png",
    interiors: [
      "/interiors/img2_1.png", "/interiors/img2_2.png", "/interiors/img2_3.png", 
      "/interiors/img2_4.png", "/interiors/img2_5.png", "/interiors/img2_6.png", 
      "/interiors/img2_7.png", "/interiors/img2_8.png"
    ]
  },
  { 
    id: 3, name: "Urbania White 2025 12+Bed", type: "Premium Van", seats: "17 Seater", ac: true, perKm: "₹40", perDay: "₹6,500", image: "/urbainiawhite2025.png",
    interiors: [
      "/interiors/img3_1.png", "/interiors/img3_2.png", "/interiors/img3_3.png", 
      "/interiors/img3_4.png", "/interiors/img3_5.png", "/interiors/img3_6.png", 
      "/interiors/img3_7.png", "/interiors/img3_8.png", "/interiors/img3_9.png", 
      "/interiors/img3_10.png"
    ]
  },
  { 
    id: 4, name: "Force Traveler 13+Bed Seater A/C", type: "Tempo Traveller", seats: "13+Bed", ac: true, perKm: "₹34", perDay: "₹3,500", image: "/force13bedseater.png",
    interiors: [
      "/interiors/img4_1.png", "/interiors/img4_2.png", "/interiors/img4_3.png", 
      "/interiors/img4_4.png", "/interiors/img4_5.png", "/interiors/img4_6.png", 
      "/interiors/img4_7.png", "/interiors/img4_8.png", "/interiors/img4_9.png", 
      "/interiors/img4_10.png"
    ]
  },
  { 
    id: 5, name: "Force Traveler A/C 18 Seater New", type: "Tempo Traveller", seats: "18 Seater Pushback", ac: true, perKm: "₹37", perDay: "On Request", image: "/force18seater.png",
    interiors: [
      "/interiors/img5_1.png", "/interiors/img5_2.png", "/interiors/img5_3.png", 
      "/interiors/img5_4.png", "/interiors/img5_5.png", "/interiors/img5_6.png", 
      "/interiors/img5_7.png", "/interiors/img5_8.png"
    ]
  },
  { 
    id: 6, name: "Volvo Model Bus A/C", type: "Luxury Bus", seats: "29 Seater", ac: true, perKm: "₹75", perDay: "₹9,000", image: "/29seaterbus.png",
    interiors: [
      "/interiors/img6_1.png", "/interiors/img6_2.png", "/interiors/img6_3.png", 
      "/interiors/img6_4.png", "/interiors/img6_5.png", "/interiors/img6_6.png", 
      "/interiors/img6_7.png", "/interiors/img6_8.png", "/interiors/img6_9.png", 
      "/interiors/img6_10.png"
    ]
  },
  { 
    id: 7, name: "Bus 41 Seater Non-A/C Pushback", type: "Large Bus", seats: "41 Seater", ac: false, perKm: "₹80", perDay: "₹13,000", image: "/busnonac41seater.png",
    interiors: [
      "/interiors/img7_1.png", "/interiors/img7_2.png", "/interiors/img7_3.png", 
      "/interiors/img7_4.png", "/interiors/img7_5.png", "/interiors/img7_6.png", 
      "/interiors/img7_7.png", "/interiors/img7_8.png"
    ]
  },
  { 
    id: 8, name: "41 Seater A/C New Big Bus", type: "Large Bus", seats: "41 Seater", ac: true, perKm: "₹85", perDay: "₹15,000", image: "/41seateracbus.png",
    interiors: [
      "/interiors/img8_1.png", "/interiors/img8_2.png", "/interiors/img8_3.png", 
      "/interiors/img8_4.png", "/interiors/img8_5.png", "/interiors/img8_6.png", 
      "/interiors/img8_7.png"
    ]
  },
  { 
    id: 9, name: "Force Urbania 2025 Model A/C New", type: "Premium Van", seats: "17 Seater", ac: true, perKm: "₹40", perDay: "₹6,500", image: "/forceurbanianew2025.png",
    interiors: [
      "/interiors/img9_1.png", "/interiors/img9_2.png", "/interiors/img9_3.png", 
      "/interiors/img9_4.png", "/interiors/img9_5.png", "/interiors/img9_6.png"
    ]
  },
  { 
    id: 10, name: "Force Traveler 27 Seater A/C (Dicky Type)", type: "Tempo Traveller", seats: "27 Seater", ac: true, perKm: "₹45", perDay: "On Request", image: "/force27seater.png",
    interiors: [
      "/interiors/img10_1.png", "/interiors/img10_2.png", "/interiors/img10_3.png", 
      "/interiors/img10_4.png", "/interiors/img10_5.png", "/interiors/img10_6.png", 
      "/interiors/img10_7.png", "/interiors/img10_8.png"
    ]
  },
  { 
    id: 11, name: "Innova Crysta New 2024", type: "Luxury SUV", seats: "7 Seater", ac: true, perKm: "On Request", perDay: "₹2,500", image: "/innovacrysta2024.png",
    interiors: [
      "/interiors/img11_1.png", "/interiors/img11_2.png", "/interiors/img11_3.png", 
      "/interiors/img11_4.png"
    ]
  },
  { 
    id: 12, name: "Force Traveler A/C 13 Maxicab", type: "Tempo Traveller", seats: "13 Seater (10+Bed)", ac: true, perKm: "On Request", perDay: "₹3,500", image: "/forcetraveler13maxicab.png",
    interiors: [
      "/interiors/img12_1.png", "/interiors/img12_2.png", "/interiors/img12_3.png", 
      "/interiors/img12_4.png", "/interiors/img12_5.png", "/interiors/img12_6.png", 
      "/interiors/img12_7.png", "/interiors/img12_8.png", "/interiors/img12_9.png", 
      "/interiors/img12_10.png"
    ]
  },
  { 
    id: 13, name: "Innova Crista", type: "Luxury SUV", seats: "7 Seater", ac: true, perKm: "₹23", perDay: "₹2,500", image: "/innovacrysta.png",
    interiors: [
      "/interiors/img13_1.png", "/interiors/img13_2.png", "/interiors/img13_3.png", 
      "/interiors/img13_4.png", "/interiors/img13_5.png", "/interiors/img13_6.png", 
      "/interiors/img13_7.png", "/interiors/img13_8.png", "/interiors/img13_9.png"
    ]
  },
  { 
    id: 14, name: "Mahindra Xylo 8 Seater A/C", type: "SUV", seats: "8 Seater", ac: true, perKm: "₹20", perDay: "On Request", image: "/mahindraxylo.png",
    interiors: [
      "/interiors/img14_1.png", "/interiors/img14_2.png", "/interiors/img14_3.png", 
      "/interiors/img14_4.png", "/interiors/img14_5.png", "/interiors/img14_6.png", 
      "/interiors/img14_7.png", "/interiors/img14_8.png", "/interiors/img14_9.png", 
      "/interiors/img14_10.png"
    ]
  },
  { 
    id: 15, name: "Toyota Rumion", type: "MUV", seats: "7 Seater", ac: true, perKm: "₹18", perDay: "On Request", image: "/toyotarumion.png",
    interiors: [
      "/interiors/img15_1.png", "/interiors/img15_2.png", "/interiors/img15_3.png", 
      "/interiors/img15_4.png", "/interiors/img15_5.png", "/interiors/img15_6.png", 
      "/interiors/img15_7.png", "/interiors/img15_8.png", "/interiors/img15_9.png", 
      "/interiors/img15_10.png"
    ]
  },
  { 
    id: 16, name: "Kia Carens", type: "Premium MUV", seats: "7 Seater", ac: true, perKm: "₹20", perDay: "₹2,800", image: "/kiacarens.png",
    interiors: [
      "/interiors/img16_1.png", "/interiors/img16_2.png", "/interiors/img16_3.png", 
      "/interiors/img16_4.png", "/interiors/img16_5.png"
    ]
  },
  { 
    id: 17, name: "Force Traveler New 2024", type: "Tempo Traveller", seats: "13 Seater", ac: true, perKm: "On Request", perDay: "₹3,500", image: "/forcetravellernew2024.png",
    interiors: [
      "/interiors/img17_1.png", "/interiors/img17_2.png", "/interiors/img17_3.png", 
      "/interiors/img17_4.png", "/interiors/img17_5.png", "/interiors/img17_6.png", 
      "/interiors/img17_7.png", "/interiors/img17_8.png", "/interiors/img17_9.png"
    ]
  },
  { 
    id: 18, name: "Force Traveler A/C", type: "Tempo Traveller", seats: "26+1 Seater", ac: true, perKm: "₹45", perDay: "On Request", image: "/forcetravellerac.png",
    interiors: [
      "/interiors/img18_1.png", "/interiors/img18_2.png", "/interiors/img18_3.png", 
      "/interiors/img18_4.png", "/interiors/img18_5.png", "/interiors/img18_6.png", 
      "/interiors/img18_7.png", "/interiors/img18_8.png", "/interiors/img18_9.png"
    ]
  },
  { 
    id: 19, name: "Toyota Innova Crysta 7+1", type: "Premium SUV", seats: "7+1 Seater", ac: true, perKm: "₹22", perDay: "₹2,200", image: "/innovacrysta71.png",
    interiors: [
      "/interiors/img19_1.png", "/interiors/img19_2.png", "/interiors/img19_3.png", 
      "/interiors/img19_4.png", "/interiors/img19_5.png", "/interiors/img19_6.png", 
      "/interiors/img19_7.png", "/interiors/img19_8.png", "/interiors/img19_9.png", 
      "/interiors/img19_10.png"
    ]
  },
  { 
    id: 20, name: "10+Bed A/C Pushback", type: "Tempo Traveller", seats: "10+Bed", ac: true, perKm: "On Request", perDay: "₹3,000", image: "/10bedacpushback.png",
    interiors: [
      "/interiors/img20_1.png", "/interiors/img20_2.png", "/interiors/img20_3.png"
    ]
  },
  { 
    id: 21, name: "Bus Non-A/C 41 Seater", type: "Large Bus", seats: "41 Seater", ac: false, perKm: "₹75", perDay: "₹8,000", image: "/41seater.png",
    interiors: [
      "/interiors/img21_1.png", "/interiors/img21_2.png", "/interiors/img21_3.png", 
      "/interiors/img21_4.png", "/interiors/img21_5.png", "/interiors/img21_6.png", 
      "/interiors/img21_7.png", "/interiors/img21_8.png", "/interiors/img21_9.png", 
      "/interiors/img21_10.png"
    ]
  },
  { 
    id: 22, name: "A/C 27 Seater Force Traveler", type: "Tempo Traveller", seats: "27 Seater", ac: true, perKm: "₹45", perDay: "₹5,000", image: "/ac27seaterforce.png",
    interiors: [
      "/interiors/img22_1.png", "/interiors/img22_2.png", "/interiors/img22_3.png", 
      "/interiors/img22_4.png", "/interiors/img22_5.png", "/interiors/img22_6.png"
    ]
  }
];

export const fleetData = baseFleetData.map(v => ({
  ...v,
  slug: v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
  description: `Experience the ultimate journey in our ${v.name}. Perfect for outstation trips, family vacations, and corporate events. Maintained to the highest standards of safety and hygiene.`,
  
  amenities: v.ac 
    ? ["Powerful Dual A/C", "Premium Pushback Seats", "LED TV & Music System", "Ambient Lighting", "Charging Ports", "GPS Tracking", "Spacious Legroom", "First Aid Kit"]
    : ["Premium Pushback Seats", "Music System", "Tinted Windows", "Charging Ports", "GPS Tracking", "Spacious Legroom", "First Aid Kit", "Luggage Carrier"],
  
  gallery: [
    { type: "image", src: v.image },
    ...v.interiors.map(imgSrc => ({ type: "image", src: imgSrc })) 
  ],
  
  videoId: "mwkqCDe98fs" 
}));