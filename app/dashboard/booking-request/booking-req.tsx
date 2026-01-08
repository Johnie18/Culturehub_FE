"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { FileText, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Booking {
  id: number;
  total_guests: number;
  booking_status: "pending" | "completed";
  contact_email: string;
  booking_date: string;
  special_requests?: string;
  route_name?: string;
}

function getBookingStatusBadge(status: Booking["booking_status"]) {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "completed":
      return (
        <Badge variant="outline" className="border-green-200 text-green-700">
          Completed
        </Badge>
      );
  }
}

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
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

    fetchBookings();
  }, []);

  async function handleAccept(id: number) {
  try {
    const token = localStorage.getItem("access_token");

    await axios.patch(
      `http://localhost:3000/bookings/${id}`,
      { booking_status: "success" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // remove accepted booking from this table
    setBookings((prev) => prev.filter((b) => b.id !== id));

  } catch (err) {
    console.error("Failed to accept booking", err);
  }
}

async function handleDelete(id: number) {
  if (!confirm("Delete this booking?")) return;

  try {
    const token = localStorage.getItem("access_token");

    await axios.delete(
      `http://localhost:3000/bookings/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // remove deleted booking from table
    setBookings((prev) => prev.filter((b) => b.id !== id));

  } catch (err) {
    console.error("Failed to delete booking", err);
  }
}


  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading bookings...</div>;
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Route</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="hidden md:table-cell">
                Total Guests
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Email
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Booking Date
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Notes
              </TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No bookings found
                </TableCell>
              </TableRow>
            )}

            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                {/* Mobile-visible */}
                <TableCell className="font-medium">
                  {booking.route_name ?? "Unknow Route"}
                </TableCell>

                <TableCell>
                  {getBookingStatusBadge(booking.booking_status)}
                </TableCell>

                {/* Desktop-only */}
                <TableCell className="hidden md:table-cell">
                  {booking.total_guests}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {booking.contact_email}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {booking.booking_date}
                </TableCell>

                <TableCell className="hidden md:table-cell truncate max-w-xs">
                  {booking.special_requests || "—"}
                </TableCell>

                {/* Actions */}
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">

          {/* ACCEPT booking */}
            <Button
              size="icon"
              variant="ghost"
              aria-label="Accept booking"
              onClick={() => handleAccept(booking.id)}
            >
              <span className="text-green-600 font-bold">✓</span>
            </Button>

          {/* DELETE booking */}
            <Button
              size="icon"
              variant="ghost"
              aria-label="Delete booking"
              onClick={() => handleDelete(booking.id)}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>

        </div>
      </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
