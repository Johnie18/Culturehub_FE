"use client"
import BookTable from "@/app/dashboard/booked/booked-table"
import useAuth from "../hooks/page";

export default function Page() {
  useAuth();
  return (
    <div className="w-full">
        <BookTable />
        </div>
  )
}
