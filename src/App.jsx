import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import YouTubeShowcase from "./components/YouTubeShowcase";
import InstagramShowcase from "./components/InstagramShowcase";
import FacebookShowcase from "./components/FacebookShowcase";
import FAQ from "./components/FAQ";
import StatsBanner from "./components/StatsBanner";
import Footer from "./components/Footer";
import ComingSoon from "./components/ComingSoon";
import VehicleDetails from "./components/VehicleDetails"; // NEW: For the dynamic interior pages

const Home = () => (
  <main className="flex flex-col pt-4 md:pt-8 pb-0 overflow-x-hidden">
    
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
    {/* Grouped tightly together inside a padded grey background */}
    <section id="community" className="w-full py-16 md:py-20 lg:py-24 bg-slate-50/50 border-y border-slate-100 flex flex-col gap-12">
      <MediaGallery />
      <YouTubeShowcase />
      <InstagramShowcase />
      <FacebookShowcase />
    </section>

    {/* --- CLOSING OBJECTIONS & FOOTER --- */}
    <section id="faq"><FAQ /></section>
    <section id="stats"><StatsBanner /></section>
    <Footer />

  </main>
);

// 2. THE APP ROUTER
export default function App() {
  return (
    <Router>
      {/* Global styling baseline */}
     <div className="w-full pb-16 md:pb-20 lg:pb-24 overflow-hidden relative">
        
        {/* Navbar sits OUTSIDE the Routes so it appears on every single page */}
        <Navbar />

        {/* 3. Routing Logic */}
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* NEW: The dynamic route that generates your 22 individual vehicle pages */}
          <Route path="/fleet/:slug" element={<VehicleDetails />} />
          
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>

      </div>
    </Router>
  );
}