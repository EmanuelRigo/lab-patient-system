"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Microscope,
  CreditCard,
  UserCog,
  ClipboardList,
} from "lucide-react";
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
};

const SidebarNav = ({ role, isCollapsed }: SidebarNavProps) => {
  const pathname = usePathname();

  if (role === "public") return null;

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(role as NavRole)
  );

  return (
    <SidebarSection title="Menú Principal" isCollapsed={isCollapsed}>
      {visibleItems.map((item) => (
        <SidebarItem
          key={item.href}
          icon={item.icon}
          label={item.label}
          href={item.href}
          isActive={pathname === item.href}
          isCollapsed={isCollapsed}
        />
      ))}
    </SidebarSection>
  );
};

export default SidebarNav;
