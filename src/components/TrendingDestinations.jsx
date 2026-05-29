import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

// The Massive 150+ South & Central India Destinations List
const rawDestinations = [
  // --- HILL STATIONS ---
  { id: 1, name: "Ooty", state: "Tamil Nadu", category: "Hill Stations", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Munnar", state: "Kerala", category: "Hill Stations", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Kodaikanal", state: "Tamil Nadu", category: "Hill Stations", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Wayanad", state: "Kerala", category: "Hill Stations", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Coorg", state: "Karnataka", category: "Hill Stations", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Mahabaleshwar", state: "Maharashtra", category: "Hill Stations", image: "https://images.unsplash.com/photo-1562614104-cd5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 7, name: "Lonavala", state: "Maharashtra", category: "Hill Stations", image: "https://images.unsplash.com/photo-1599933334295-56491e57c933?q=80&w=600&auto=format&fit=crop" },
  { id: 8, name: "Chikmagalur", state: "Karnataka", category: "Hill Stations", image: "https://images.unsplash.com/photo-1566838318109-a8607fa74c6d?q=80&w=600&auto=format&fit=crop" },
  { id: 9, name: "Araku Valley", state: "Andhra Pradesh", category: "Hill Stations", image: "https://images.unsplash.com/photo-1557999810-cb5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 10, name: "Horsley Hills", state: "Andhra Pradesh", category: "Hill Stations", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 11, name: "Yercaud", state: "Tamil Nadu", category: "Hill Stations", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" },
  { id: 12, name: "Coonoor", state: "Tamil Nadu", category: "Hill Stations", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
  { id: 13, name: "Ponmudi", state: "Kerala", category: "Hill Stations", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop" },
  { id: 14, name: "Vagamon", state: "Kerala", category: "Hill Stations", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop" },
  { id: 15, name: "Agumbe", state: "Karnataka", category: "Hill Stations", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 16, name: "Kemmangundi", state: "Karnataka", category: "Hill Stations", image: "https://images.unsplash.com/photo-1562614104-cd5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 17, name: "Khandala", state: "Maharashtra", category: "Hill Stations", image: "https://images.unsplash.com/photo-1599933334295-56491e57c933?q=80&w=600&auto=format&fit=crop" },
  { id: 18, name: "Panchgani", state: "Maharashtra", category: "Hill Stations", image: "https://images.unsplash.com/photo-1566838318109-a8607fa74c6d?q=80&w=600&auto=format&fit=crop" },
  { id: 19, name: "Matheran", state: "Maharashtra", category: "Hill Stations", image: "https://images.unsplash.com/photo-1557999810-cb5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 20, name: "Daringbadi", state: "Odisha", category: "Hill Stations", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 21, name: "Lambasingi", state: "Andhra Pradesh", category: "Hill Stations", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop" },
  { id: 22, name: "Ananthagiri Hills", state: "Telangana", category: "Hill Stations", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop" },
  { id: 23, name: "Kolli Hills", state: "Tamil Nadu", category: "Hill Stations", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop" },
  { id: 24, name: "Meghamalai", state: "Tamil Nadu", category: "Hill Stations", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop" },
  { id: 25, name: "Silent Valley", state: "Kerala", category: "Hill Stations", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 26, name: "Nandi Hills", state: "Karnataka", category: "Hill Stations", image: "https://images.unsplash.com/photo-1562614104-cd5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 27, name: "BR Hills", state: "Karnataka", category: "Hill Stations", image: "https://images.unsplash.com/photo-1599933334295-56491e57c933?q=80&w=600&auto=format&fit=crop" },
  { id: 28, name: "Amboli", state: "Maharashtra", category: "Hill Stations", image: "https://images.unsplash.com/photo-1566838318109-a8607fa74c6d?q=80&w=600&auto=format&fit=crop" },
  { id: 29, name: "IgATPURI", state: "Maharashtra", category: "Hill Stations", image: "https://images.unsplash.com/photo-1557999810-cb5a3151df17?q=80&w=600&auto=format&fit=crop" },
  { id: 30, name: "Taptapani", state: "Odisha", category: "Hill Stations", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },

  // --- BEACHES & COASTAL ---
  { id: 31, name: "Goa (North & South)", state: "Maharashtra/Goa", category: "Beaches", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
  { id: 32, name: "Alleppey", state: "Kerala", category: "Beaches", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
  { id: 33, name: "Pondicherry", state: "Tamil Nadu", category: "Beaches", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 34, name: "Varkala", state: "Kerala", category: "Beaches", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 35, name: "Tarkarli", state: "Maharashtra", category: "Beaches", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 36, name: "Kovalam", state: "Kerala", category: "Beaches", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 37, name: "Gokarna", state: "Karnataka", category: "Beaches", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop" },
  { id: 38, name: "Marari", state: "Kerala", category: "Beaches", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 39, name: "Puri Beach", state: "Odisha", category: "Beaches", image: "https://images.unsplash.com/photo-1594056701886-1a7ea6991863?q=80&w=600&auto=format&fit=crop" },
  { id: 40, name: "Rishikonda", state: "Andhra Pradesh", category: "Beaches", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
  { id: 41, name: "Yarada Beach", state: "Andhra Pradesh", category: "Beaches", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
  { id: 42, name: "Suryalanka", state: "Andhra Pradesh", category: "Beaches", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 43, name: "Mahabalipuram Beach", state: "Tamil Nadu", category: "Beaches", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 44, name: "Marina Beach", state: "Tamil Nadu", category: "Beaches", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 45, name: "Kanyakumari Beach", state: "Tamil Nadu", category: "Beaches", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 46, name: "Cherai Beach", state: "Kerala", category: "Beaches", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop" },
  { id: 47, name: "Bekal Beach", state: "Kerala", category: "Beaches", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 48, name: "Murudeshwar Beach", state: "Karnataka", category: "Beaches", image: "https://images.unsplash.com/photo-1594056701886-1a7ea6991863?q=80&w=600&auto=format&fit=crop" },
  { id: 49, name: "Kaup Beach", state: "Karnataka", category: "Beaches", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
  { id: 50, name: "Alibaug", state: "Maharashtra", category: "Beaches", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
  { id: 51, name: "Ganpatipule", state: "Maharashtra", category: "Beaches", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 52, name: "Chandipur Beach", state: "Odisha", category: "Beaches", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 53, name: "Gopalpur Beach", state: "Odisha", category: "Beaches", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 54, name: "Konark Beach", state: "Odisha", category: "Beaches", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 55, name: "Vodarevu Beach", state: "Andhra Pradesh", category: "Beaches", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop" },
  { id: 56, name: "Kalingapatnam", state: "Andhra Pradesh", category: "Beaches", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 57, name: "Dhanushkodi", state: "Tamil Nadu", category: "Beaches", image: "https://images.unsplash.com/photo-1594056701886-1a7ea6991863?q=80&w=600&auto=format&fit=crop" },
  { id: 58, name: "Muzhappilangad", state: "Kerala", category: "Beaches", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
  { id: 59, name: "Malpe Beach", state: "Karnataka", category: "Beaches", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
  { id: 60, name: "Kashid Beach", state: "Maharashtra", category: "Beaches", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },

  // --- HERITAGE & FORTS ---
  { id: 61, name: "Mysore Palace", state: "Karnataka", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 62, name: "Hampi Ruins", state: "Karnataka", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 63, name: "Golkonda Fort", state: "Telangana", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 64, name: "Charminar", state: "Telangana", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 65, name: "Warangal Fort", state: "Telangana", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 66, name: "Chowmahalla Palace", state: "Telangana", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 67, name: "Raigad Fort", state: "Maharashtra", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 68, name: "Ajanta & Ellora", state: "Maharashtra", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 69, name: "Sindhudurg Fort", state: "Maharashtra", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 70, name: "Daulatabad Fort", state: "Maharashtra", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 71, name: "Konark Sun Temple", state: "Odisha", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 72, name: "Udayagiri Caves", state: "Odisha", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 73, name: "Kondapalli Fort", state: "Andhra Pradesh", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 74, name: "Chandragiri Fort", state: "Andhra Pradesh", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 75, name: "Belum Caves", state: "Andhra Pradesh", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 76, name: "Borra Caves", state: "Andhra Pradesh", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 77, name: "Brihadeeswarar Temple", state: "Tamil Nadu", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 78, name: "Mahabalipuram", state: "Tamil Nadu", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 79, name: "Gingee Fort", state: "Tamil Nadu", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 80, name: "Padmanabhapuram Palace", state: "Kerala", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 81, name: "Bekal Fort", state: "Kerala", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 82, name: "Mattancherry Palace", state: "Kerala", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 83, name: "Badami Caves", state: "Karnataka", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 84, name: "Pattadakal", state: "Karnataka", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 85, name: "Gol Gumbaz", state: "Karnataka", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 86, name: "Murud Janjira", state: "Maharashtra", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 87, name: "Pratapgad", state: "Maharashtra", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 88, name: "Khandagiri Caves", state: "Odisha", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 89, name: "Barabati Fort", state: "Odisha", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 90, name: "Qutb Shahi Tombs", state: "Telangana", category: "Heritage & Forts", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },

  // --- WILDLIFE & SAFARIS ---
  { id: 91, name: "Periyar National Park", state: "Kerala", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 92, name: "Bandipur National Park", state: "Karnataka", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 93, name: "Nagarhole National Park", state: "Karnataka", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },
  { id: 94, name: "Mudumalai National Park", state: "Tamil Nadu", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 95, name: "Tadoba Andhari", state: "Maharashtra", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1558500201-987823f0df68?q=80&w=600&auto=format&fit=crop" },
  { id: 96, name: "Sanjay Gandhi NP", state: "Maharashtra", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1518118014377-cecb4c062c9c?q=80&w=600&auto=format&fit=crop" },
  { id: 97, name: "Simlipal National Park", state: "Odisha", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 98, name: "Bhitarkanika Mangroves", state: "Odisha", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 99, name: "Nagarjunsagar Srisailam", state: "Andhra Pradesh", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 100, name: "Papikondalu", state: "Andhra Pradesh", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },
  { id: 101, name: "Kawal Tiger Reserve", state: "Telangana", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 102, name: "Amrabad Tiger Reserve", state: "Telangana", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 103, name: "Guindy National Park", state: "Tamil Nadu", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },
  { id: 104, name: "Anamalai Tiger Reserve", state: "Tamil Nadu", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 105, name: "Eravikulam National Park", state: "Kerala", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1558500201-987823f0df68?q=80&w=600&auto=format&fit=crop" },
  { id: 106, name: "Silent Valley NP", state: "Kerala", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1518118014377-cecb4c062c9c?q=80&w=600&auto=format&fit=crop" },
  { id: 107, name: "Bannerghatta Bio Park", state: "Karnataka", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 108, name: "Kudremukh National Park", state: "Karnataka", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 109, name: "Pench National Park", state: "Maharashtra", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 110, name: "Navegaon National Park", state: "Maharashtra", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },
  { id: 111, name: "Chilika Lake Bird Sanctuary", state: "Odisha", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 112, name: "Satkosia Gorge Sanctuary", state: "Odisha", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 113, name: "Coringa Wildlife Sanctuary", state: "Andhra Pradesh", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },
  { id: 114, name: "Nelapattu Bird Sanctuary", state: "Andhra Pradesh", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 115, name: "Kasu Brahmananda Reddy", state: "Telangana", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1558500201-987823f0df68?q=80&w=600&auto=format&fit=crop" },
  { id: 116, name: "Mrugavani National Park", state: "Telangana", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1518118014377-cecb4c062c9c?q=80&w=600&auto=format&fit=crop" },
  { id: 117, name: "Gulf of Mannar", state: "Tamil Nadu", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop" },
  { id: 118, name: "Mukkurthi National Park", state: "Tamil Nadu", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1589304028590-798eb4b75225?q=80&w=600&auto=format&fit=crop" },
  { id: 119, name: "Wayanad Wildlife Sanctuary", state: "Kerala", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1563806282869-705a610be55c?q=80&w=600&auto=format&fit=crop" },
  { id: 120, name: "Kumarakom Bird Sanctuary", state: "Kerala", category: "Wildlife & Safaris", image: "https://images.unsplash.com/photo-1584988716164-1cfa82d8c360?q=80&w=600&auto=format&fit=crop" },

  // --- SPIRITUAL & PILGRIMAGE ---
  { id: 121, name: "Tirupati", state: "Andhra Pradesh", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 122, name: "Srisailam", state: "Andhra Pradesh", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 123, name: "Kanipakam", state: "Andhra Pradesh", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 124, name: "Yadagirigutta", state: "Telangana", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 125, name: "Bhadrachalam", state: "Telangana", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 126, name: "Madurai Meenakshi", state: "Tamil Nadu", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 127, name: "Rameswaram", state: "Tamil Nadu", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 128, name: "Kanchipuram", state: "Tamil Nadu", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 129, name: "Sabarimala", state: "Kerala", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 130, name: "Guruvayur", state: "Kerala", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 131, name: "Sree Padmanabhaswamy", state: "Kerala", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 132, name: "Udupi Sri Krishna", state: "Karnataka", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 133, name: "Dharmasthala", state: "Karnataka", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 134, name: "Kollur Mookambika", state: "Karnataka", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 135, name: "Shirdi", state: "Maharashtra", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 136, name: "Trimbakeshwar", state: "Maharashtra", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 137, name: "Pandharpur", state: "Maharashtra", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 138, name: "Jagannath Puri", state: "Odisha", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 139, name: "Lingaraj Temple", state: "Odisha", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 140, name: "Muktesvara Temple", state: "Odisha", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 141, name: "Lepakshi", state: "Andhra Pradesh", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop" },
  { id: 142, name: "Ahobilam", state: "Andhra Pradesh", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 143, name: "Kaleshwaram", state: "Telangana", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 144, name: "Chidambaram", state: "Tamil Nadu", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 145, name: "Thanjavur", state: "Tamil Nadu", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 146, name: "Chottanikkara", state: "Kerala", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 147, name: "Gokarna Mahabaleshwar", state: "Karnataka", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 148, name: "Kukke Subramanya", state: "Karnataka", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 149, name: "Bhimashankar", state: "Maharashtra", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop" },
  { id: 150, name: "Tuljapur", state: "Maharashtra", category: "Spiritual & Pilgrimage", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" }
];

const destinations = rawDestinations.sort((a, b) => a.name.localeCompare(b.name));
const categories = ["All", "Hill Stations", "Beaches", "Heritage & Forts", "Wildlife & Safaris", "Spiritual & Pilgrimage"];

// Destination Card using the exact dimensions and 'shrink-0' as the Temple Card
const DestinationCard = ({ place }) => {
  return (
    <div 
      className="relative w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 bg-white group shrink-0 cursor-pointer"
    >
      <img
        src={place.image}
        alt={place.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
        loading="lazy"
        draggable="false"
      />

      {/* Retained the original Slate-colored gradient for the Destinations section */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />

      <div className="absolute bottom-0 left-0 p-3 w-full flex flex-col gap-0.5 text-white pointer-events-none">
        <div className="flex items-start gap-1">
          <MapPin size={12} className="text-blue-400 shrink-0 mt-0.5" />
          <h3 className="text-[12px] md:text-[14px] font-bold tracking-tight drop-shadow-md leading-tight line-clamp-2">
            {place.name}
          </h3>
        </div>
        <p className="text-[9px] md:text-[10px] text-slate-300 font-medium pl-4 tracking-wider uppercase">
          {place.state}
        </p>
      </div>
    </div>
  );
};

// Reusable Auto-Draggable Component
const AutoDraggableRow = ({ items, slideDirection = "left" }) => {
  const trackRef = useRef(null);
  const halfRef = useRef(null);
  const x = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const paddedItems = [...items];
  while (paddedItems.length < 15) {
    paddedItems.push(...items);
  }

  useEffect(() => {
    let animationFrameId;
    const speed = 0.5;

    const animate = () => {
      if (!isHovered && !isDragging.current && halfRef.current && trackRef.current) {
        const halfWidth = halfRef.current.offsetWidth;

        if (slideDirection === "left") {
          x.current -= speed;
          if (x.current <= -halfWidth) x.current += halfWidth;
        } else {
          x.current += speed;
          if (x.current >= 0) x.current -= halfWidth;
        }
        trackRef.current.style.transform = `translateX(${x.current}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, slideDirection]);

  useEffect(() => {
    if (slideDirection === "right" && halfRef.current) {
      x.current = -halfRef.current.offsetWidth;
    }
  }, [slideDirection]);

  const handleDragStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX - x.current;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    setIsHovered(false);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current || !halfRef.current) return;
    const halfWidth = halfRef.current.offsetWidth;
    let newX = clientX - startX.current;

    while (newX > 0) newX -= halfWidth;
    while (newX <= -halfWidth) newX += halfWidth;

    x.current = newX;
    trackRef.current.style.transform = `translateX(${x.current}px)`;
  };

  return (
    <div 
      className="w-full overflow-hidden py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleDragEnd}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onMouseDown={(e) => handleDragStart(e.pageX)}
      onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
      onMouseMove={(e) => {
        if (isDragging.current) e.preventDefault();
        handleDragMove(e.pageX);
      }}
      onTouchMove={(e) => handleDragMove(e.touches[0].pageX)}
    >
      <div ref={trackRef} className="flex w-max cursor-grab">
        <div ref={halfRef} className="flex gap-4 md:gap-5 pr-4 md:pr-5">
          {paddedItems.map((place, idx) => (
            <DestinationCard key={`half1-${idx}`} place={place} />
          ))}
        </div>
        <div className="flex gap-4 md:gap-5 pr-4 md:pr-5">
          {paddedItems.map((place, idx) => (
            <DestinationCard key={`half2-${idx}`} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TrendingDestinations() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = activeCategory === "All"
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  const row1 = filteredDestinations.filter((_, i) => i % 3 === 0);
  const row2 = filteredDestinations.filter((_, i) => i % 3 === 1);
  const row3 = filteredDestinations.filter((_, i) => i % 3 === 2);

  return (
    <div className="w-full py-16 flex flex-col bg-slate-50 my-8 overflow-hidden">
      
      {/* Title Section */}
      <div className="text-center px-6 lg:px-8 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Trending Destinations
        </h2>
        <p className="text-slate-500 font-medium mt-4 max-w-xl mx-auto">
          Explore the most breathtaking holiday and pilgrimage spots across South & Central India. 
          Filter by category to find your next perfect getaway.
        </p>
      </div>

      {/* Dynamic Category Filtering Buttons */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all shadow-sm ${
              activeCategory === cat
                ? "bg-slate-900 text-white shadow-lg scale-105"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* THE 3-ROW SCROLLING MARQUEE */}
      <div className="relative w-full flex flex-col gap-2 md:gap-4">
        
        {/* Soft edge gradients */}
        <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left to Right */}
        {row1.length > 0 && <AutoDraggableRow items={row1} slideDirection="left" />}

        {/* Row 2: Right to Left */}
        {row2.length > 0 && <AutoDraggableRow items={row2} slideDirection="right" />}

        {/* Row 3: Left to Right */}
        {row3.length > 0 && <AutoDraggableRow items={row3} slideDirection="left" />}

      </div>
    </div>
  );
}