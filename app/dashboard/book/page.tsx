"use client"
import BookTable from "@/components/dashboard/booked-table"
import useAuth from "../hooks/page";

export default function Page() {
  useAuth();
  return (
    <div className="w-full">
        <BookTable />
        </div>
  )
}
