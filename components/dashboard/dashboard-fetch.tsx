 import { redirect, useRouter } from "next/navigation";
 import { useEffect, useState } from "react";

 const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login"); // redirect if no token
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.push("/auth/login"); // redirect if token invalid
          return;
        }
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
        router.push("/auth/login"); // redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

