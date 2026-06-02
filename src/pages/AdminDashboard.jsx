import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Added 'Menu' and 'X' for the mobile toggle button
import { 
  LayoutDashboard, Bell, Bus, Users, MessageSquare, 
  Briefcase, Map as MapIcon, MapPin, Camera, LogOut, 
  Settings, Landmark, Tv, Activity, Menu, X 
} from "lucide-react";

import AdminOverview from "../components/AdminOverview";
import AdminLiveUpdates from "../components/AdminLiveUpdates"; 
import AdminBookings from "../components/AdminBookings"; 
import AdminTrips from "../components/AdminTrips";
import AdminFleet from "../components/AdminFleet";
import AdminTracking from "../components/AdminTracking"; 
import AdminDestinations from "../components/AdminDestinations";
import AdminPilgrimages from "../components/AdminPilgrimages"; 
import AdminInsights from "../components/AdminInsights"; 
import AdminDrivers from "../components/AdminDrivers"; 
import AdminFeedback from "../components/AdminFeedback"; 
import AdminMedia from "../components/AdminMedia"; 

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NEW: Mobile Menu State
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/admin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  if (!user) return <div className="min-h-screen bg-slate-50" />;

  const sidebarLinks = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "updates", label: "Live Updates (Ticker)", icon: Bell },
    { id: "bookings", label: "Booking Status", icon: Briefcase },
    { id: "fleet", label: "Manage Fleet", icon: Bus },
    { id: "tracking", label: "Live Tracking", icon: Activity },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "pilgrimages", label: "Pilgrimages", icon: Landmark }, 
    { id: "trips", label: "Trips & Planner", icon: MapIcon },
    { id: "media", label: "Media & TV", icon: Tv }, 
    { id: "insights", label: "Today's Insights", icon: Camera },
    { id: "drivers", label: "Driver Roster", icon: Users },
    { id: "feedback", label: "User Feedback", icon: MessageSquare },
  ];

  return (
    <div className="w-full bg-slate-50 pt-[115px] relative">
      
      {/* MOBILE OVERLAY: Darkens the background when menu is open on phones */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR: Responsive sliding drawer on mobile, fixed on desktop */}
      <aside className={`w-64 bg-white border-r border-slate-200 fixed top-[115px] bottom-0 left-0 flex flex-col shadow-xl md:shadow-sm z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-6 border-b border-slate-100 shrink-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Admin Panel</p>
            <p className="text-sm font-bold text-slate-800 truncate pr-2">{user.email}</p>
          </div>
          {/* Close button for mobile inside the sidebar */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-red-500 bg-slate-50 p-1.5 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setIsMobileMenuOpen(false); // Close menu automatically when a tab is selected on mobile
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === link.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-red-50 text-red-600 rounded-xl text-sm font-bold transition-colors"
          >
            <LogOut size={16} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      {/* md:ml-64 keeps the margin on desktop, but removes it on mobile so content uses full width */}
      <main className="md:ml-64 p-4 md:p-8 min-h-[calc(100vh-115px)] flex flex-col w-full md:w-auto">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          
          {/* MOBILE HEADER: Only shows on phones to open the menu */}
          <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
            <h1 className="text-lg font-black text-slate-900 capitalize flex items-center gap-2">
              <LayoutDashboard size={20} className="text-blue-600" />
              {sidebarLinks.find(l => l.id === activeTab)?.label}
            </h1>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* DESKTOP HEADER: Hidden on mobile */}
          <h1 className="hidden md:block text-3xl font-black text-slate-900 mb-8 capitalize shrink-0">
            {sidebarLinks.find(l => l.id === activeTab)?.label}
          </h1>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8 flex-1 mb-10 overflow-x-hidden">
            
            {activeTab === "dashboard" && <AdminOverview />}
            {activeTab === "updates" && <AdminLiveUpdates />}
            {activeTab === "bookings" && <AdminBookings />}
            {activeTab === "trips" && <AdminTrips />}
            {activeTab === "fleet" && <AdminFleet />} 
            {activeTab === "tracking" && <AdminTracking />} 
            {activeTab === "destinations" && <AdminDestinations />} 
            {activeTab === "pilgrimages" && <AdminPilgrimages />} 
            {activeTab === "media" && <AdminMedia />} 
            {activeTab === "insights" && <AdminInsights />} 
            {activeTab === "drivers" && <AdminDrivers />} 
            {activeTab === "feedback" && <AdminFeedback />} 

            {activeTab !== "dashboard" &&
             activeTab !== "updates" && 
             activeTab !== "bookings" && 
             activeTab !== "trips" && 
             activeTab !== "fleet" && 
             activeTab !== "tracking" && 
             activeTab !== "destinations" && 
             activeTab !== "pilgrimages" && 
             activeTab !== "media" && 
             activeTab !== "insights" && 
             activeTab !== "drivers" && 
             activeTab !== "feedback" && ( 
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Settings size={48} className="mb-4 opacity-20" />
                <p className="font-medium text-lg text-center">Module in development</p>
              </div>
            )}
          </div>
          
          <footer className="mt-auto border-t border-slate-200 pt-6 pb-2 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-slate-400 gap-4 text-center md:text-left">
            <p>© {new Date().getFullYear()} VBR Tours & Travels. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-2 md:mt-0">
              <span className="hover:text-blue-600 transition-colors cursor-pointer">System Status: <span className="text-emerald-500">Online</span></span>
              <span className="hover:text-blue-600 transition-colors cursor-pointer">Admin Support</span>
              <span className="hover:text-blue-600 transition-colors cursor-pointer">Documentation</span>
            </div>
          </footer>

        </div>
      </main>

    </div>
  );
}