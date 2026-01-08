"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(requiredLevel: number | null = null) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const accessLevel = Number(localStorage.getItem("access_level"));

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    if (
      requiredLevel !== null &&
      (isNaN(accessLevel) || accessLevel !== requiredLevel)
    ) {
      router.replace("/auth/unauthorized");
      return;
    }

    setLoading(false);
  }, [router, requiredLevel]);

  return loading;
}
