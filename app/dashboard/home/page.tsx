"use client";

import { useState } from "react";
import { HomeTable } from "@/app/dashboard/home/home-table";
import LineChart09 from "@/app/dashboard/home/chart";
import { Users, MapPin, BookCheckIcon, DollarSign } from "lucide-react";
import useAuth from "../hooks/page";
import StatCard from "./StatCard";

export default function Home() {
   useAuth(2);


  const routes = {
    default: "Select Route",
    route1: "Bacolod-North",
    route2: "Bacolod-South",
    route3: "Bacolod-Victorias",
  };

 const [selectedRoute, setSelectedRoute] = useState<keyof typeof routes>(
    "route1"
  );
  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-100 min-h-screen">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Route Card */}
        <StatCard
          icon={<MapPin className="h-8 w-8 text-blue-400" />}
          title="Today's Route"
          value={routes[selectedRoute]}
          popoverTitle="Route Stops"
          popoverItems={[
            "Downtown Terminal",
            "City Mall",
            "North Gate",
            "Main Highway",
          ]}
        />

        {/* Guests Card */}
        <StatCard
          icon={<Users className="h-8 w-8 text-blue-400" />}
          title="Today's Guests"
          value={20}
          popoverTitle="Guest List"
          popoverItems={[
            "John Doe",
            "Maria Santos",
            "Alex Cruz",
            "Kim Reyes",
            "Paulo Garcia",
          ]}
        />

        {/* Bookings Card */}
        <StatCard
          icon={<BookCheckIcon className="h-8 w-8 text-blue-400" />}
          title="Total Bookings"
          value={500}
          popoverTitle="Booking Summary"
          popoverItems={[
            "Online: 320",
            "Walk-in: 180",
          ]}
        />

        {/* Payments Card */}
        <StatCard
          icon={<DollarSign className="h-8 w-8 text-blue-400" />}
          title="Total Payments"
          value="$10,000"
          popoverTitle="Payment Breakdown"
          popoverItems={[
            "Cash: $4,000",
            "GCash: $3,500",
            "Card: $2,500",
          ]}
        />
      </div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div className="col-span-2 bg-white rounded-3xl p-4 shadow-sm overflow-x-auto">
      <HomeTable />
  </div>

  <div className="bg-white rounded-3xl p-4 shadow-sm">
    <LineChart09 />
  </div>
</div>

    </div>
  );
}
