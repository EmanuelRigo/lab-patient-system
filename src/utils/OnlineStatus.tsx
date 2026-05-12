"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import sessionApi from "@/services/session.api";

interface RootLayoutProps {
  children: React.ReactNode;
}

const OnlineStatus = ({ children }: RootLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchOnlineStatus = async () => {
      try {
        const response = await sessionApi.checkOnlineStatus();

        if (response.status !== 200) {
          const cookies = document.cookie.split("; ");
          for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
          }
          if (pathname !== "/login") {
            router.push("/login");
          }
          return;
        }

        const data = await response.json();
        console.log("🚀 ~ fetchOnlineStatus ~ data:", data);

        if (data.response.isOnline !== 1) {
          console.log(
            "🚀 ~ fetchOnlineStatus ~ isOnline:",
            data.response.isOnline
          );
          console.log("aqui");
          if (pathname !== "/login") {
            router.push("/login");
          }
          return;
        }

        // If the user is online and is on the login page, redirect them to the dashboard
        if (pathname === "/login") {
           router.push("/lab-dashboard/patients");
        }
      } catch (error) {
        console.error("Error checking online status:", error);
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    };

    fetchOnlineStatus();
  }, [router, pathname]);

  return <>{children}</>;
};

export default OnlineStatus;
