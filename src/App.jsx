import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import FeaturedGallery from "./components/FeaturedGallery"; // Acts as your Hero section
import TripCalculator from "./components/TripCalculator";
import SpecialServices from "./components/SpecialServices";
import TrendingDestinations from "./components/TrendingDestinations";
import PopularTemples from "./components/PopularTemples";
import FleetShowcase from "./components/FleetShowcase";
import DriverRoster from "./components/DriverRoster";
import TodaysInsight from "./components/TodaysInsight";
import TravelStories from "./components/TravelStories";
import MediaGallery from "./components/MediaGallery"; // Replaced GalleryShowcase
import FAQ from "./components/FAQ";
import StatsBanner from "./components/StatsBanner";
import Footer from "./components/Footer";
import ComingSoon from "./components/ComingSoon";
import VehicleDetails from "./components/VehicleDetails";
import CorporateRentals from "./components/CorporateRentals"; 
import StudentIndustrialVisits from "./components/StudentIndustrialVisits";
import TripsPlanning from "./components/TripsPlanning"; 
import CustomisedServices from "./components/CustomisedServices";// NEW: For the dynamic interior pages

// --- 1. NEW ADMIN & LEGAL IMPORTS ---
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // <-- THE MISSING IMPORT IS ADDED HERE
import TermsConditions from "./pages/TermsConditions";
import MonthlyRentals from "./components/MonthlyRentals"; 
import OurHistory from "./components/OurHistory";
import SafetyProtocols from "./components/SafetyProtocols";
import OurOffices from "./components/OurOffices";
import Helpline from "./components/Helpline";
import QuickInquiry from "./components/QuickInquiry";
import CorporateClients from "./components/CorporateClients";


const Home = () => (
  <div className="flex flex-col pt-4 md:pt-8 pb-0 overflow-x-hidden">
    
    {/* --- INTRO & ACTION --- */}
    <section id="hero"><FeaturedGallery /></section>
    <section id="calculator"><TripCalculator /></section>

    {/* --- INSPIRATION --- */}
    <section id="destinations"><TrendingDestinations /></section>
    <section id="temples"><PopularTemples /></section>

    {/* --- OUR ASSETS & TRUST --- */}
    <section id="fleet"><FleetShowcase /></section>
    <section id="drivers"><DriverRoster /></section>

    {/* --- VALUE PROPOSITION --- */}
    <section id="services"><SpecialServices /></section>

    {/* --- ENGAGEMENT & STORIES --- */}
    <section id="insights"><TodaysInsight /></section>
    <section id="stories"><TravelStories /></section>

    {/* --- SOCIAL PROOF CLUSTER --- */}
    <section id="community" className="w-full py-16 md:py-20 lg:py-24 bg-slate-50/50 border-y border-slate-100 flex flex-col gap-12">
      <MediaGallery />
    </section>
    <section id="clients">
      <CorporateClients />
    </section>

    {/* --- CLOSING OBJECTIONS --- */}
    <section id="faq"><FAQ /></section>
    <section id="stats"><StatsBanner /></section>
    
  </div>
);

// --- 2. LAYOUT WRAPPER TO HANDLE THE FOOTER & SCROLLING ---
function AppLayout() {
  const location = useLocation();
  
  // FIXED: Check if the current URL starts with '/admin' to hide the footer on ALL admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  // NEW: Global Scroll Handler for Hash Links and Page Changes
  useEffect(() => {
    if (location.hash) {
      // If there is a # in the URL (e.g., /#fleet), find that ID
      const id = location.hash.replace("#", "");
      
      // We use a small timeout to let the new page finish rendering the DOM
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // If there is no hash (a normal page change), scroll to the very top
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet/:slug" element={<VehicleDetails />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/services/monthly-rentals" element={<MonthlyRentals />} />
          <Route path="/services/corporate-rentals" element={<CorporateRentals />} />
          <Route path="/services/student-industrial-visits" element={<StudentIndustrialVisits />} />
          <Route path="/services/trips-planning" element={<TripsPlanning />} />
          <Route path="/services/customised-services" element={<CustomisedServices />} />
          <Route path="/about/our-history" element={<OurHistory />} />
          <Route path="/about/safety-protocols" element={<SafetyProtocols />} />
          <Route path="/contact/our-offices" element={<OurOffices />} />
          <Route path="/contact/helpline" element={<Helpline />} />
          <Route path="/contact/quick-inquiry" element={<QuickInquiry />} />
        </Routes>
      </main>

      {/* Global Footer: Displays on every page EXCEPT paths starting with /admin */}
      {!isAdminRoute && <Footer />}

    </div>
  );
}

// --- 3. THE APP ROUTER ---
export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}