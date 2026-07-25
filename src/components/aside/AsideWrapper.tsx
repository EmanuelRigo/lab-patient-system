"use client";

import { usePathname } from "next/navigation";
import Aside from "@/components/aside/Aside";
import { useLabSystemContext } from "@/context/LabContext";

/**
 * Monta el Aside únicamente cuando la ruta no sea /login ni el rol sea público.
 * Permite que el SSR y las navegaciones de cliente rendericen la barra lateral
 * sin parpadeos ni desmontajes innecesarios.
 */
export default function AsideWrapper() {
  const { role } = useLabSystemContext();
  const pathname = usePathname();

  console.log("🛡️ [AsideWrapper] Rendered | Role:", role, "| Pathname:", pathname);

  if (pathname === "/login" || role === "public") {
    return null;
  }

  return <Aside />;
}


