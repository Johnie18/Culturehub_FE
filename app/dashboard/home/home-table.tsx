"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type Status = "active" | "away";

interface Booking {
  id: string;
  guest_name: string;
  department: string;
  status: Status;
}

// Badge display
function getStatusBadge(status: Status) {
  switch (status) {
    case "active":
      return (
        <Badge
          className="border-green-200 text-green-700 bg-green-100"
          variant="outline"
        >
          Present
        </Badge>
      );
    case "away":
      return (
        <Badge
          className="border-red-200 text-red-700 bg-red-100"
          variant="outline"
        >
          Not Here
        </Badge>
      );
  }
}

export default function HomeTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Update the status for one row
  const updateStatus = (id: string, newStatus: Status) => {
    setBookings((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:3000/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="border rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-blue-100">
            <TableRow>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3 hidden md:table-cell">
                Department
              </TableHead>
              <TableHead className="w-1/6 hidden md:table-cell">Status</TableHead>
              <TableHead className="w-1/6 hidden md:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  Loading bookings...
                </TableCell>
              </TableRow>
            ) : bookings.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center align-middle text-muted-foreground min-h-[200px] h-[200px]"
            >
              No results found
            </TableCell>
          </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell className="truncate">{booking.guest_name}</TableCell>
                  <TableCell className="hidden md:table-cell truncate">
                    {booking.department}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {/* Add action buttons here */}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { HomeTable };
