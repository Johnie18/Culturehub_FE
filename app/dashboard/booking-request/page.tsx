"use client"
import TableSelection01 from "@/app/dashboard/booking-request/booking-req";
import useAuth from "../hooks/page";

export default function Bookings(){
    useAuth();
    return(
<TableSelection01/>
    )
}
