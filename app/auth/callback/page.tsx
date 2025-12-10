"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const params = useSearchParams();
  const router = useRouter(); 

  useEffect(() => {
    const token = params.get("access_token");
    const level = params.get("access_level");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    localStorage.setItem("access_token", token);
    localStorage.setItem("access_level", level || "0");

    if (level === "2") router.replace("/dashboard/home");
    else if (level === "1") router.replace("/user");
    else router.replace("/auth/login");
  }, []);

  return <p>Processing login...</p>;
}
