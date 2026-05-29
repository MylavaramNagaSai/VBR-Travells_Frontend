import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

// Massive 150+ South & Central India Temples List
const rawTemples = [
  // --- ANDHRA PRADESH ---
  { id: 1, name: "Tirumala Venkateswara", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Srisailam Mallikarjuna", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Kanipakam Vinayaka", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Simhachalam Narasimha", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Annavaram Satyanarayana", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Vijayawada Kanaka Durga", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 7, name: "Srikalahasti Temple", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 8, name: "Ahobilam Narasimha", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 9, name: "Lepakshi Veerabhadra", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 10, name: "Mantralayam Raghavendra", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 11, name: "Mahanandi Temple", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 12, name: "Yaganti Uma Maheshwara", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 13, name: "Mangalagiri Panakala", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 14, name: "Dwaraka Tirumala", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 15, name: "Arasavalli Sun God", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 16, name: "Kotappakonda Trikoteswara", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 17, name: "Ainavilli Siddhi Vinayaka", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 18, name: "Ryali Jaganmohini", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 19, name: "Srikurmam Temple", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 20, name: "Draksharamam Bhimeswara", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 21, name: "Somaramam", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 22, name: "Ksheeraramam", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 23, name: "Kumararamam", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 24, name: "Bhimararamam", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },

  // --- TELANGANA ---
  { id: 25, name: "Yadagirigutta Narasimha", state: "Telangana", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 26, name: "Bhadrachalam Ramadasu", state: "Telangana", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 27, name: "Thousand Pillar Temple", state: "Telangana", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 28, name: "Ramappa Temple", state: "Telangana", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 29, name: "Vemulawada Rajarajeshwara", state: "Telangana", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 30, name: "Basara Saraswathi", state: "Telangana", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 31, name: "Kaleshwaram Mukteshwara", state: "Telangana", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 32, name: "Kondagattu Anjaneya", state: "Telangana", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 33, name: "Karmanghat Hanuman", state: "Telangana", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 34, name: "Chilkur Balaji", state: "Telangana", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 35, name: "Balkampet Yellamma", state: "Telangana", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 36, name: "Ujjaini Mahakali", state: "Telangana", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 37, name: "Wargal Saraswati", state: "Telangana", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 38, name: "Keesaragutta Ramalingeswara", state: "Telangana", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 39, name: "Surendrapuri", state: "Telangana", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 40, name: "Kulpakji Jain Mandir", state: "Telangana", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 41, name: "Alampur Jogulamba", state: "Telangana", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 42, name: "Birla Mandir", state: "Telangana", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 43, name: "Sanghi Temple", state: "Telangana", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 44, name: "Peddamma Thalli", state: "Telangana", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 45, name: "Sita Ramachandraswamy", state: "Telangana", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 46, name: "Gnana Saraswati", state: "Telangana", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },

  // --- TAMIL NADU ---
  { id: 47, name: "Meenakshi Amman", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 48, name: "Brihadeeswarar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 49, name: "Ramanathaswamy", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 50, name: "Sri Ranganathaswamy", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 51, name: "Chidambaram Nataraja", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 52, name: "Arunachalesvara", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 53, name: "Kanchi Kailasanathar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 54, name: "Ekambareswarar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 55, name: "Kapaleeshwarar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 56, name: "Parthasarathy", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 57, name: "Palani Murugan", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 58, name: "Swamimalai Murugan", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 59, name: "Thiruchendur Murugan", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 60, name: "Tiruttani Murugan", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 61, name: "Pazhamudircholai", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 62, name: "Thiruparankundram", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 63, name: "Annamalaiyar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 64, name: "Jambukeswarar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 65, name: "Thillai Nataraja", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 66, name: "Kumbeswarar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 67, name: "Nanjundeswarar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 68, name: "Nellaiappar", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 69, name: "Srivilliputhur Andal", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 70, name: "Kumari Amman", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 71, name: "Vaitheeswaran Koil", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },

  // --- KERALA ---
  { id: 72, name: "Padmanabhaswamy", state: "Kerala", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 73, name: "Sabarimala Ayyappa", state: "Kerala", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 74, name: "Guruvayur Sri Krishna", state: "Kerala", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 75, name: "Vadakkunnathan", state: "Kerala", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 76, name: "Chottanikkara Devi", state: "Kerala", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 77, name: "Attukal Bhagavathy", state: "Kerala", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 78, name: "Ambalappuzha Krishna", state: "Kerala", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 79, name: "Mannarasala Nagaraja", state: "Kerala", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 80, name: "Vaikom Mahadeva", state: "Kerala", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 81, name: "Ettumanoor Mahadeva", state: "Kerala", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 82, name: "Thirunelli", state: "Kerala", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 83, name: "Rajarajeshwara", state: "Kerala", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 84, name: "Thiruvalla Sree Vallabha", state: "Kerala", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 85, name: "Kaviyoor Mahadeva", state: "Kerala", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 86, name: "Aranmula Parthasarathy", state: "Kerala", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 87, name: "Lokanarkavu", state: "Kerala", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 88, name: "Muthappan", state: "Kerala", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 89, name: "Tali Shiva", state: "Kerala", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 90, name: "Thiruvanchikulam", state: "Kerala", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 91, name: "Sree Poornathrayeesa", state: "Kerala", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 92, name: "Pazhavangadi Ganapathy", state: "Kerala", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },

  // --- KARNATAKA ---
  { id: 93, name: "Virupaksha", state: "Karnataka", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 94, name: "Vittala", state: "Karnataka", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 95, name: "Chennakeshava", state: "Karnataka", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 96, name: "Hoysaleswara", state: "Karnataka", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 97, name: "Udupi Sri Krishna", state: "Karnataka", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 98, name: "Kollur Mookambika", state: "Karnataka", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 99, name: "Kukke Subramanya", state: "Karnataka", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 100, name: "Dharmasthala Manjunatha", state: "Karnataka", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 101, name: "Murdeshwar Shiva", state: "Karnataka", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 102, name: "Gokarna Mahabaleshwar", state: "Karnataka", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 103, name: "Chamundeshwari", state: "Karnataka", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 104, name: "Sringeri Sharada Peetham", state: "Karnataka", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 105, name: "Horanadu Annapoorneshwari", state: "Karnataka", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 106, name: "Kateel Durgaparameshwari", state: "Karnataka", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 107, name: "Hasanamba", state: "Karnataka", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 108, name: "Kudalasangama", state: "Karnataka", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 109, name: "Banavasi Madhukeshwara", state: "Karnataka", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 110, name: "Nanjangud Srikanteshwara", state: "Karnataka", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 111, name: "Ghati Subramanya", state: "Karnataka", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 112, name: "Kotilingeshwara", state: "Karnataka", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 113, name: "Vidyashankara", state: "Karnataka", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 114, name: "Somnathpur Keshava", state: "Karnataka", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 115, name: "Pattadakal", state: "Karnataka", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 116, name: "Badami Cave Temples", state: "Karnataka", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 117, name: "ISKCON Bangalore", state: "Karnataka", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },

  // --- MAHARASHTRA ---
  { id: 118, name: "Shirdi Sai Baba", state: "Maharashtra", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 119, name: "Siddhivinayak", state: "Maharashtra", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 120, name: "Trimbakeshwar", state: "Maharashtra", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 121, name: "Grishneshwar", state: "Maharashtra", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 122, name: "Bhimashankar", state: "Maharashtra", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 123, name: "Tuljapur Bhavani", state: "Maharashtra", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 124, name: "Mahalaxmi Kolhapur", state: "Maharashtra", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 125, name: "Pandharpur Vithoba", state: "Maharashtra", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 126, name: "Dagdusheth Halwai", state: "Maharashtra", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 127, name: "Mumba Devi", state: "Maharashtra", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },
  { id: 128, name: "Babulnath", state: "Maharashtra", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 129, name: "Ekvira Aai", state: "Maharashtra", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 130, name: "Jejuri Khandoba", state: "Maharashtra", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 131, name: "Aundha Nagnath", state: "Maharashtra", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 132, name: "Parli Vaijnath", state: "Maharashtra", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 133, name: "Kalaram Temple", state: "Maharashtra", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 134, name: "Saptashrungi", state: "Maharashtra", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 135, name: "Ballaleshwar", state: "Maharashtra", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 136, name: "Chintamani", state: "Maharashtra", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 137, name: "Girijatmaj", state: "Maharashtra", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 138, name: "Vigneshwara", state: "Maharashtra", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 139, name: "Mahaganapati", state: "Maharashtra", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 140, name: "Moreshwar", state: "Maharashtra", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 141, name: "Varadvinayak", state: "Maharashtra", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 142, name: "BAPS Swaminarayan", state: "Maharashtra", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" },

  // --- ODISHA ---
  { id: 143, name: "Jagannath Puri", state: "Odisha", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" },
  { id: 144, name: "Konark Sun Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1599341626473-67a96a7d0d63?q=80&w=600&auto=format&fit=crop" },
  { id: 145, name: "Lingaraj Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8567?q=80&w=600&auto=format&fit=crop" },
  { id: 146, name: "Mukteshvara Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1608958416701-d85311de1734?q=80&w=600&auto=format&fit=crop" },
  { id: 147, name: "Rajarani Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1578165219156-df536ba8b471?q=80&w=600&auto=format&fit=crop" },
  { id: 148, name: "Taratarini Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1477584322813-4372645f340e?q=80&w=600&auto=format&fit=crop" },
  { id: 149, name: "Cuttack Chandi", state: "Odisha", image: "https://images.unsplash.com/photo-1597250861262-42726549a664?q=80&w=600&auto=format&fit=crop" },
  { id: 150, name: "Dhabaleswar", state: "Odisha", image: "https://images.unsplash.com/photo-1580541631971-a4003d8de5f9?q=80&w=600&auto=format&fit=crop" },
  { id: 151, name: "Kapilash Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" },
  { id: 152, name: "Gupteswar Cave Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1621685412403-12d592b2d07d?q=80&w=600&auto=format&fit=crop" },
  { id: 153, name: "Samaleswari Temple", state: "Odisha", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop" },
  { id: 154, name: "Ram Mandir Bhubaneswar", state: "Odisha", image: "https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop" },
  { id: 155, name: "Ananta Vasudeva", state: "Odisha", image: "https://images.unsplash.com/photo-1584813531065-ef56041c6f44?q=80&w=600&auto=format&fit=crop" },
  { id: 156, name: "Parsurameswar", state: "Odisha", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=600&auto=format&fit=crop" },
  { id: 157, name: "Brahmeswara", state: "Odisha", image: "https://images.unsplash.com/photo-1600100398055-143588918947?q=80&w=600&auto=format&fit=crop" }
];

const temples = rawTemples.sort((a, b) => a.name.localeCompare(b.name));
const categories = ["All", "Andhra Pradesh", "Telangana", "Tamil Nadu", "Kerala", "Karnataka", "Maharashtra", "Odisha"];

// Extracted the individual card into a mini-component to prevent the squishing bug
const TempleCard = ({ temple }) => {
  return (
    <div 
      // The strict w-40/w-48 and h-56/h-64 with 'shrink-0' COMPLETELY prevents the image stretching bug!
      className="relative w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 bg-white group shrink-0 cursor-pointer"
    >
      <img
        src={temple.image}
        alt={temple.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
        loading="lazy"
        draggable="false"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />

      <div className="absolute bottom-0 left-0 p-3 w-full flex flex-col gap-0.5 text-white pointer-events-none">
        <div className="flex items-start gap-1">
          <MapPin size={12} className="text-orange-400 shrink-0 mt-0.5" />
          <h3 className="text-[12px] md:text-[14px] font-bold tracking-tight drop-shadow-md leading-tight line-clamp-2">
            {temple.name}
          </h3>
        </div>
        <p className="text-[9px] md:text-[10px] text-orange-200 font-medium pl-4 tracking-wider uppercase">
          {temple.state}
        </p>
      </div>
    </div>
  );
};

// Advanced Custom Component: Auto-scrolling, hover-pausing, and mouse-draggable row
const AutoDraggableRow = ({ items, slideDirection = "left" }) => {
  const trackRef = useRef(null);
  const halfRef = useRef(null);
  const x = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // We pad the array to ensure it is always wide enough to span the screen seamlessly
  const paddedItems = [...items];
  while (paddedItems.length < 15) {
    paddedItems.push(...items);
  }

  // Pure JavaScript Animation Loop (60 frames per second, flawlessly smooth)
  useEffect(() => {
    let animationFrameId;
    const speed = 0.5; // Change this to 0.2 for slower, or 1.0 for faster

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

  // Ensure right-to-left rows start in the correct position seamlessly
  useEffect(() => {
    if (slideDirection === "right" && halfRef.current) {
      x.current = -halfRef.current.offsetWidth;
    }
  }, [slideDirection]);

  // --- Mouse & Touch Dragging Handlers ---
  const handleDragStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX - x.current;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    setIsHovered(false); // Resume scrolling
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current || !halfRef.current) return;
    const halfWidth = halfRef.current.offsetWidth;
    let newX = clientX - startX.current;

    // Mathematically wrap the drag seamlessly in both directions
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
      {/* We render the track twice inside a flex container to loop it */}
      <div ref={trackRef} className="flex w-max cursor-grab">
        
        {/* Half 1 */}
        <div ref={halfRef} className="flex gap-4 md:gap-5 pr-4 md:pr-5">
          {paddedItems.map((temple, idx) => (
            <TempleCard key={`half1-${idx}`} temple={temple} />
          ))}
        </div>

        {/* Half 2 (Exact duplicate for seamless looping) */}
        <div className="flex gap-4 md:gap-5 pr-4 md:pr-5">
          {paddedItems.map((temple, idx) => (
            <TempleCard key={`half2-${idx}`} temple={temple} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default function PopularTemples() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemples = activeCategory === "All"
    ? temples
    : temples.filter(t => t.state === activeCategory);

  // Divide the filtered array into 3 chunks for the 3 distinct rows
  const row1 = filteredTemples.filter((_, i) => i % 3 === 0);
  const row2 = filteredTemples.filter((_, i) => i % 3 === 1);
  const row3 = filteredTemples.filter((_, i) => i % 3 === 2);

  return (
    <div className="w-full py-16 flex flex-col bg-slate-50 my-8 overflow-hidden">
      
      {/* Title and Description */}
      <div className="text-center px-6 lg:px-8 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 tracking-tight">Divine Pilgrimages & Temples</h2>
        <p className="text-slate-500 font-medium mt-4 max-w-xl mx-auto">
          Embark on a spiritual journey. Explore 150+ of the most revered and sacred temples across South and Central India for your next Yatra.
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
                ? "bg-orange-600 text-white shadow-lg shadow-orange-200 scale-105"
                : "bg-white text-slate-600 hover:text-orange-600 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* THE 3-ROW SCROLLING MARQUEE */}
      <div className="relative w-full flex flex-col gap-2 md:gap-4">
        
        {/* Soft edge gradients so items fade in/out smoothly */}
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