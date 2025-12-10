"use client"
import DateAvailable from "@/components/dashboard/calendar";
import RouteAvailable from "@/components/dashboard/routeAvail-table";
import { Button } from "@/components/ui/button";
import useAuth from "../hooks/page";

export default function Bookings(){
    const loading = useAuth(2);
    if (loading) return <p>Loading...</p>;
    return(
        <div>
            <header className="mb-4"><DateAvailable /></header>    
<RouteAvailable/>
<Button className="mt-4">Confirm</Button>
</div>
    )
}
