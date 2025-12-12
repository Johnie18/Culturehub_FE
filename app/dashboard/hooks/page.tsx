"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function useAuth(requiredLevel = null) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const storedLevel = Number(localStorage.getItem("access_level"));

        // No token → redirect to login
        if (!token) {
          router.replace("/auth/login");
          return;
        }

        // 🔥 CALL BACKEND /protected/check
        const res = await axios.get("http://localhost:3000/protected/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const backendUser = res.data.user;
        localStorage.setItem("access_level", backendUser.access_level);

        // If page requires specific access level
        if (requiredLevel !== null && backendUser.access_level !== requiredLevel) {
          router.replace("/auth/unauthorized");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Auth check failed:", err);

        // 401 from backend → redirect to login
        router.replace("/auth/login");
      }
    };

    checkUser();
  }, []);

  return loading;
}
