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
        console.log("🚀 fetchOnlineStatus: checking session status...");
        const response = await sessionApi.checkOnlineStatus();
        console.log("🚀 fetchOnlineStatus: response status", response.status);

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
        console.log("🚀 fetchOnlineStatus: response data", data);

        const isOnline = Boolean(
          data?.response && Object.keys(data.response).length > 0,
        );
        console.log(
          "🚀 fetchOnlineStatus: isOnline",
          isOnline,
          "user",
          data?.response,
        );

        if (!isOnline) {
          if (pathname !== "/login") {
            router.push("/login");
          }
          return;
        }

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
