"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Home, Users, Calendar, FileText, Microscope, CreditCard, UserCog, ClipboardList } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Role } from "../../../types/frontend.types";
import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";

type NavRole = Exclude<Role, "public">;

type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  roles: NavRole[];
};

/**
 * Mapa de navegación principal.
 * Las rutas y roles reflejan exactamente la lógica de ButtonPanel.tsx.
 */
const NAV_ITEMS: NavItem[] = [
  {
    icon: Home,
    label: "Inicio",
    href: "/",
    roles: ["admin", "receptionist", "labTechnician", "biochemist"],
  },
  {
    icon: Users,
    label: "Pacientes",
    href: "/lab-dashboard/patients",
    roles: ["admin", "receptionist"],
  },
  {
    icon: Calendar,
    label: "Citas",
    href: "/lab-dashboard/doctors-appointment",
    roles: ["admin", "receptionist", "labTechnician"],
  },
  {
    icon: Microscope,
    label: "Estudios",
    href: "/medical-studies",
    roles: ["admin", "receptionist", "labTechnician", "biochemist"],
  },
  {
    icon: FileText,
    label: "Resultados",
    href: "/lab-dashboard/results",
    roles: ["admin", "receptionist", "labTechnician", "biochemist"],
  },
  {
    icon: CreditCard,
    label: "Cobros",
    href: "/lab-dashboard/payments",
    roles: ["admin", "receptionist"],
  },
  {
    icon: UserCog,
    label: "Personal",
    href: "/labstaff",
    roles: ["admin"],
  },
  {
    icon: ClipboardList,
    label: "Talones",
    href: "/lab-dashboard/talon",
    roles: ["admin", "receptionist"],
  },
];

type SidebarNavProps = {
  role: Role;
  isCollapsed: boolean;
  onToggle: () => void;
};

const SidebarNav = ({ role, isCollapsed, onToggle }: SidebarNavProps) => {
  if (role === "public") return null;

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(role as NavRole)
  );

  const collapseBtn = (
    <button
      onClick={onToggle}
      title={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      className="flex items-center justify-center w-5 h-5 rounded shrink-0 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-150 focus:outline-none active:scale-90"
    >
      {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
    </button>
  );

  return (
    <SidebarSection title="Menú Principal" isCollapsed={isCollapsed} action={collapseBtn}>
      {/* En modo colapsado el título se oculta → mostramos el botón encima del primer ítem */}
      {isCollapsed && (
        <div className="flex justify-center mb-1">{collapseBtn}</div>
      )}
      {visibleItems.map((item) => (
        <SidebarItem
          key={item.href}
          icon={item.icon}
          label={item.label}
          href={item.href}
          isCollapsed={isCollapsed}
        />
      ))}
    </SidebarSection>
  );
};

export default SidebarNav;
