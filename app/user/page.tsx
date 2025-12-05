"use client"
import axios from "axios";
import useAuth from "../dashboard/hooks/page";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Bookings(){
    useAuth();
    const router = useRouter();
    const handleLogout = async () => {
    const token = localStorage.getItem("access_token");

    await axios.get("http://localhost:3000/auth/logout", {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("access_level");
    localStorage.removeItem("logged_in");

    router.push("/auth/login");
    };

    return(
        <div>
            <header>hello</header>    
            <Button type="button" onClick={handleLogout}>Logout</Button>
</div>
    )
}
