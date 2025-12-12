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
import { cn } from "@/lib/utils";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  booking_date: string;
  total_price: number;
  booking_status: "pending" | "completed" | "failed"; // adapt if needed
  availability_id: number;
  total_guests: number;
}

function getStatusBadge(status: Transaction["booking_status"]) {
  switch (status) {
    case "completed":
      return (
        <Badge className="border-green-200 text-green-700" variant="outline">
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge className="border-orange-200 text-orange-700" variant="outline">
          Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge className="border-red-200 text-red-700" variant="destructive">
          Failed
        </Badge>
      );
      default:
        return(
        <Badge className="border-red-200 text-red-700" variant="secondary">
          {status}
        </Badge>
        )
  }
}

export const title = "Table with Expandable Rows";

export default function TableExpandable01() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [bookings, setBookings] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
try{
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:3000/bookings", {
        headers: {Authorization: `Bearer ${token}`}
      });
      setBookings(res.data);
    }catch(err){
      console.error("Failed to Fetch Bookings", err);
    }
  }
    fetchData();
  }, []);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead className="font-semibold text-foreground">Date</TableHead>
            <TableHead className="font-semibold text-foreground">Booking ID</TableHead>
            <TableHead className="font-semibold text-foreground">Total Guests</TableHead>
            <TableHead className="font-semibold text-foreground">Amount</TableHead>
            <TableHead className="font-semibold text-foreground">Booking Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((transaction) => {
            const isExpanded = expandedIds.has(transaction.id);
            return [
              <TableRow key={transaction.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(transaction.id)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {transaction.booking_date}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.id}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.total_guests}
                  </TableCell>
                <TableCell className="font-mono font-semibold">
                  ${Number(transaction.total_price).toFixed(2)}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.booking_status)}</TableCell>
              </TableRow>,
              <TableRow key={`${transaction.id}-details`} className="hover:bg-transparent">
                <TableCell colSpan={6} className="p-0">
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="border-border border-t bg-muted/30 p-4">
                      <div className="grid gap-3">
                        <div>
                          <p className="text-sm font-medium">Availability ID</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.availability_id}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium">Guests</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.total_guests}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Total Price</p>
                            <p className="font-mono text-sm text-muted-foreground">
                              {Number(transaction.total_price).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Category</p>
                            <Badge variant="secondary">{transaction.availability_id}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ];
          })}
        </TableBody>
      </Table>
    </div>
  );
}
