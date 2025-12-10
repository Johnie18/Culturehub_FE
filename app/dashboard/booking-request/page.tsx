"use client"
import TableSelection01 from "@/components/dashboard/booking-req";
import useAuth from "../hooks/page";

export default function Bookings(){
    useAuth();
    return(
<TableSelection01/>
    )
}
