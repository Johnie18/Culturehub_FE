"use client";

import { useState } from "react";
import { HomeTable } from "@/components/dashboard/home-table";
import LineChart09 from "@/components/dashboard/chart";
import { Users, MapPin, BookCheckIcon, DollarSign } from "lucide-react";
import useAuth from "../hooks/page";

// Reusable Card Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  shadowColor?: string;
}

const StatCard = ({
  icon,
  title,
  value,
  shadowColor = "rgba(37,99,235,0.3)",
}: StatCardProps) => (
  <div className="bg-white rounded-xl hover:shadow-lg transition-shadow p-3 flex items-center gap-3">
    <div
      className="p-3 rounded-full"
      style={{ boxShadow: `0 0 12px 2px ${shadowColor}` }}
    >
      {icon}
    </div>
    <div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default function Home() {
  useAuth();
  const routes = {
    default: "Select Route",
    route1: "Bacolod-North",
    route2: "Bacolod-South",
    route3: "Bacolod-Victorias",
  };

  const [selectedRoute, setSelectedRoute] = useState("route1");

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<MapPin className="h-8 w-8 text-blue-400" />}
          title="Today's Route"
          value={routes[selectedRoute]}
        />
        <StatCard
          icon={<Users className="h-8 w-8 text-blue-400" />}
          title="Today's Guests"
          value={20}
        />
        <StatCard
          icon={<BookCheckIcon className="h-8 w-8 text-blue-400" />}
          title="Total Bookings"
          value={500}
        />
        <StatCard
          icon={<DollarSign className="h-8 w-8 text-blue-400" />}
          title="Total Payments"
          value="$10,000"
        />
      </div>

      {/* Table and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-3xl p-4 shadow-sm">
          <HomeTable />
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <LineChart09 />
        </div>
      </div>
    </div>
  );
}
