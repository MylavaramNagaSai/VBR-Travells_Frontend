import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { Bus, Users, CalendarDays, IndianRupee, TrendingUp } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalDrivers: 0,
    thisMonthBookings: 0,
    thisMonthEarnings: 0
  });

  useEffect(() => {
    // Reference to your different database nodes
    const fleetRef = ref(db, "fleet");
    const driversRef = ref(db, "drivers");
    const bookingsRef = ref(db, "bookings");

    const unsubscribe = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const fleet = data.fleet ? Object.keys(data.fleet) : [];
      const drivers = data.drivers ? Object.keys(data.drivers) : [];
      const bookings = data.bookings ? Object.values(data.bookings) : [];

      // Calculate "This Month"
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthlyBookings = bookings.filter(b => {
        const date = new Date(b.timestamp);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      const monthlyEarnings = monthlyBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

      setStats({
        totalVehicles: fleet.length,
        totalDrivers: drivers.length,
        thisMonthBookings: monthlyBookings.length,
        thisMonthEarnings: monthlyEarnings
      });
    });

    return () => unsubscribe();
  }, []);

  const cards = [
    { label: "Total Vehicles", value: stats.totalVehicles, icon: Bus, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Drivers", value: stats.totalDrivers, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "This Month Bookings", value: stats.thisMonthBookings, icon: CalendarDays, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "This Month Earnings", value: `₹${stats.thisMonthEarnings.toLocaleString()}`, icon: IndianRupee, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${card.bg}`}>
              <card.icon size={24} className={card.color} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Visual placeholder for future charts/history */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-slate-400">
        <TrendingUp size={48} className="mb-4 opacity-20" />
        <p className="font-bold text-sm">System analytics and performance history will be displayed here.</p>
      </div>
    </div>
  );
}