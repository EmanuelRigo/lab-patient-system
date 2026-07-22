"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, UserCircle } from "lucide-react";

import { useLabSystemContext } from "@/context/LabContext";
import sessionApi from "@/services/session.api";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

export default function Aside() {
  const { role, setRole } = useLabSystemContext();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  return (
    <aside className="p-2">
      <div
        className={`
          relative flex flex-col h-full shrink-0
          bg-gradient-to-b from-[#103E8C] via-[#1558B5] to-[#1A73D9]
          border-r border-white/10
          transition-[width] duration-300 ease-in-out
          z-20 rounded-md
          ${isCollapsed ? "w-[56px]" : "w-[200px]"}
        `}
      >
        {/* ── Header: logo ── */}
        <div className="flex items-center px-3 pt-3 pb-2 shrink-0">
          <SidebarHeader isCollapsed={isCollapsed} />
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
          {/* Navegación principal con lógica de roles */}
          <SidebarNav role={role} isCollapsed={isCollapsed} onToggle={() => setIsCollapsed((v) => !v)} />

          {/* Separador entre secciones */}
          <div className="border-t border-white/10" />

          {/* Sección Configuración */}
          <SidebarSection title="Configuración" isCollapsed={isCollapsed}>
            <SidebarItem
              icon={Settings}
              label="Configuración"
              href="/settings"
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={UserCircle}
              label="Perfil"
              href="/profile"
              isCollapsed={isCollapsed}
            />
          </SidebarSection>
        </div>

        {/* ── Footer: usuario + logout ── */}
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
      </div>
    </aside>
  );
}
