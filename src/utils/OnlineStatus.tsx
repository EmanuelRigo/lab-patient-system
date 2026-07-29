"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

import sessionApi from "@/services/session.api";

function clearAuthCookies() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
  }
}

const OnlineStatus = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hasCheckedOnMount = useRef(false);

  useEffect(() => {
    if (hasCheckedOnMount.current) return;
    hasCheckedOnMount.current = true;

    const fetchOnlineStatus = async () => {
      try {
        const response = await sessionApi.checkOnlineStatus();

        if (response.status !== 200) {
          clearAuthCookies();
          if (pathname !== "/login") {
            router.replace("/login");
          }
          return;
        }

        const data = await response.json();

        const isOnline = Boolean(
          data?.response && Object.keys(data.response).length > 0,
        );

        if (!isOnline) {
          if (pathname !== "/login") {
            router.replace("/login");
          }
          return;
        }

        if (pathname === "/login") {
          router.replace("/lab-dashboard/patients");
        }
      } catch (error) {
        console.error("Error checking online status:", error);
        if (pathname !== "/login") {
          router.replace("/login");
        }
      }
    };

    void fetchOnlineStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return null;
};

export default OnlineStatus;
