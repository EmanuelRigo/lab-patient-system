"use client";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import sessionApi from "@/services/session.api";

/**
 * Hook que valida la sesión UNA SOLA VEZ al mount.
 * En navegaciones internas no se vuelve a llamar al backend,
 * evitando re-renders del layout que desmonten el Aside.
 *
 * - Si la sesión no es válida -> redirige a /login.
 * - Si la sesión es válida y estamos en /login -> redirige al dashboard.
 * - En cualquier otra ruta interna: no hace nada.
 */
export function useSessionGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const hasCheckedOnMount = useRef(false);

  useEffect(() => {
    if (hasCheckedOnMount.current) return;
    hasCheckedOnMount.current = true;

    const fetchOnlineStatus = async () => {
      try {
        console.log("🚀 useSessionGuard: checking session status...");
        const response = await sessionApi.checkOnlineStatus();
        console.log("🚀 useSessionGuard: response status", response.status);

        if (response.status !== 200) {
          clearAuthCookies();
          if (pathname !== "/login") router.push("/login");
          return;
        }

        const data = await response.json();
        const isOnline = Boolean(
          data?.response && Object.keys(data.response).length > 0,
        );

        if (!isOnline) {
          if (pathname !== "/login") router.push("/login");
          return;
        }

        if (pathname === "/login") {
          router.push("/lab-dashboard/patients");
        }
      } catch (error) {
        console.error("Error checking online status:", error);
        if (pathname !== "/login") router.push("/login");
      }
    };

    fetchOnlineStatus();
    // Solo depende de router (estable). NO depende de pathname
    // para que cambios de ruta no re-disparen el guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
}

function clearAuthCookies() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
  }
}
