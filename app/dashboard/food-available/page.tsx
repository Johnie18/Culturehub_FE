"use client"

import { Availability } from "@/components/dashboard/available-date";
import MenuTable from "@/components/dashboard/menu-available-table";
import useAuth from "../hooks/page";

export default function Food(){
    useAuth();

    return(<div>
<MenuTable/>
</div>
    )
}
