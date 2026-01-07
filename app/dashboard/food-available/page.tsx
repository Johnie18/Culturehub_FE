"use client"

import MenuTable from "@/app/dashboard/food-available/routeAvailability";
import useAuth from "../hooks/page";

export default function Food(){
    useAuth();

    return(<div>
<MenuTable/>
</div>
    )
}
