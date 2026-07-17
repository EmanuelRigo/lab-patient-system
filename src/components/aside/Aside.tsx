"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Settings, UserCircle } from "lucide-react";

import { useLabSystemContext } from "@/context/LabContext";
import sessionApi from "@/services/session.api";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";
import SidebarCollapseButton from "./SidebarCollapseButton";
import SidebarQuickActions from "./SidebarQuickActions";

export default function Aside() {
  const { role, setRole } = useLabSystemContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* ── Lógica de logout (sin modificar) ── */
  const handleLogout = async () => {
    try {
      const response = await sessionApi.logout();
      if (response.ok) {
        setRole("public");
        router.push("/login");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  /* ── No renderizar en login ni home (comportamiento existente) ── */
  if (pathname === "/login" || pathname === "/error") return null;

  return (
    <aside
      className={`
        relative flex flex-col h-full shrink-0
        bg-gradient-to-b from-[#103E8C] via-[#1558B5] to-[#1A73D9]
        border-r border-white/10
        shadow-[2px_0_24px_rgba(15,23,42,0.12)]
        transition-[width] duration-300 ease-in-out
        aside-slide z-20 rounded-e-2xl
        ${isCollapsed ? "w-[70px]" : "w-[230px]"}
      `}
    >
      {/* ── Header: logo + collapse button ── */}
      <div
        className={`
          flex items-center pt-3 pb-2 shrink-0
          ${isCollapsed ? "flex-col gap-3 px-0" : "justify-between px-4"}
        `}
      >
        <SidebarHeader isCollapsed={isCollapsed} />
        <SidebarCollapseButton
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((v) => !v)}
        />
      </div>

      {/* ── Separador ── */}
      <div className="mx-3 border-t border-white/10 mb-2 shrink-0" />

      {/* ── Área de navegación (scrollable) ── */}
      <div
        className={`
          flex flex-col flex-1 gap-3 overflow-y-auto pb-2 scrollbar-hide
          ${isCollapsed ? "px-2" : "px-3"}
        `}
      >
        {role === "public" ? (
          <p className="px-3 text-sm text-white/70">
            Bienvenido, por favor inicie sesión.
          </p>
        ) : (
          <>
            {/* Navegación principal con lógica de roles */}
            <SidebarNav role={role} isCollapsed={isCollapsed} />

            {/* Separador entre secciones */}
            <div className="border-t border-white/10" />

            {/* Sección Accesos Rápidos */}
            <SidebarQuickActions role={role} isCollapsed={isCollapsed} />

            {/* Separador entre secciones */}
            <div className="border-t border-white/10" />

            {/* Sección Configuración */}
            <SidebarSection title="Configuración" isCollapsed={isCollapsed}>
              <SidebarItem
                icon={Settings}
                label="Configuración"
                href="/settings"
                isActive={pathname === "/settings"}
                isCollapsed={isCollapsed}
              />
              <SidebarItem
                icon={UserCircle}
                label="Perfil"
                href="/profile"
                isActive={pathname === "/profile"}
                isCollapsed={isCollapsed}
              />
            </SidebarSection>
          </>
        )}
      </div>

      {/* ── Footer: usuario + logout ── */}
      {role !== "public" && (
        <>
          <div className="mx-3 border-t border-white/10 mb-2 shrink-0" />
          <div className="shrink-0 pb-2">
            <SidebarFooter
              role={role}
              onLogout={handleLogout}
              isCollapsed={isCollapsed}
            />
          </div>
        </>
      )}
    </aside>
  );
}
