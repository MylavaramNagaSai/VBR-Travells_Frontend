import Navbar from "./components/Navbar";
import FeaturedGallery from "./components/FeaturedGallery";
import TripCalculator from "./components/TripCalculator";
import TrendingDestinations from "./components/TrendingDestinations";
import PopularTemples from "./components/PopularTemples";
import FleetShowcase from "./components/FleetShowcase";
import SpecialServices from "./components/SpecialServices";
import DriverRoster from "./components/DriverRoster";
import TravelStories from "./components/TravelStories";
import TodaysInsight from "./components/TodaysInsight";
import YouTubeShowcase from "./components/YouTubeShowcase";
import InstagramShowcase from "./components/InstagramShowcase";
import FacebookShowcase from "./components/FacebookShowcase";
import FAQ from "./components/FAQ";
import StatsBanner from "./components/StatsBanner";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-[#f8fafc]">
      
      {/* Extracted Navbar Component */}
      <Navbar />

      {/* Featured Gallery sits right below the ticker now */}
      <div className="pt-6">
        <FeaturedGallery />
        <TripCalculator />
        <TrendingDestinations />
        <PopularTemples />
        <FleetShowcase />
        <SpecialServices />
        <DriverRoster />
        <TodaysInsight />
        <TravelStories />
        <YouTubeShowcase />
        <InstagramShowcase />
        <FacebookShowcase />
        <FAQ />
        <StatsBanner />
        <Footer />
      </div>

    </div>
  );
}