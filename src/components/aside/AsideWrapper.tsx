"use client";

import Aside from "@/components/aside/Aside";
import { useLabSystemContext } from "@/context/LabContext";

/**
 * Monta el Aside únicamente cuando hay una sesión activa (role !== "public").
 * Al hacer logout, role vuelve a "public" y el Aside se desmonta sin
 * depender de pathname, evitando re-renders innecesarios por cambio de ruta.
 */
export default function AsideWrapper() {
  const { role, isRoleReady } = useLabSystemContext();

  if (!isRoleReady || role === "public") return null;

  return <Aside />;
}
