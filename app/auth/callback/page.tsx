"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("access_token");
    const level = params.get("access_level");

    if (!token || !level) {
      router.replace("/auth/login");
      return;
    }

    localStorage.setItem("access_token", token);
    localStorage.setItem("access_level", level);

    switch (level) {
      case "2":
        router.replace("/dashboard/home");
        break;
      case "1":
        router.replace("/user");
        break;
      default:
        router.replace("/auth/login");
    }
  }, [params, router]);

  return <p>Processing login...</p>;
}
