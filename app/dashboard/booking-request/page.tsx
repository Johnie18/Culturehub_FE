"use client"
import TableSelection01 from "@/app/dashboard/booking-request/booking-req";
import useAuth from "../hooks/page";

export default function Bookings(){
    useAuth(2);
    return(
<TableSelection01/>
    )
}