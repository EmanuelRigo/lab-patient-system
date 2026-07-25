"use client";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import sessionApi from "@/services/session.api";

interface RootLayoutProps {
  children: React.ReactNode;
}

const OnlineStatus = ({ children }: RootLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const hasCheckedOnMount = useRef(false);

  console.log("🌐 [OnlineStatus] Rendered | Pathname:", pathname);

  useEffect(() => {
    // Evita volver a ejecutar el chequeo en cada cambio de ruta interna
    if (hasCheckedOnMount.current) return;
    hasCheckedOnMount.current = true;

    const fetchOnlineStatus = async () => {
      try {
        console.log("🚀 OnlineStatus: checking session status on mount...");
        const response = await sessionApi.checkOnlineStatus();

        if (response.status !== 200) {
          clearAuthCookies();
          if (pathname !== "/login") {
            router.push("/login");
          }
          return;
        }

        const data = await response.json();

        const isOnline = Boolean(
          data?.response && Object.keys(data.response).length > 0,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <>{children}</>;
};

function clearAuthCookies() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
  }
}

export default OnlineStatus;

