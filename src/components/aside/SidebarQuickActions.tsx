"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { UserPlus, FilePlus, ClipboardPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Role } from "../../../types/frontend.types";
import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";

type NavRole = Exclude<Role, "public">;

type QuickAction = {
  icon: LucideIcon;
  label: string;
  href: string;
  roles: NavRole[];
};

/**
 * Accesos rápidos del sidebar.
 * Las rutas siguen la convención del proyecto (rutas explícitas
 * `/add-...` en lugar de query params) y se filtran por rol.
 */
const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: UserPlus,
    label: "Nuevo Paciente",
    href: "/lab-dashboard/patients/add-patient",
    roles: ["admin", "receptionist"],
  },
  {
    icon: FilePlus,
    label: "Nueva Orden",
    href: "/lab-dashboard/talon",
    roles: ["admin", "receptionist"],
  },
  {
    icon: ClipboardPlus,
    label: "Registrar Resultado",
    href: "/lab-dashboard/results/add-result",
    roles: ["admin", "labTechnician", "biochemist"],
  },
];

type SidebarQuickActionsProps = {
  role: Role;
  isCollapsed: boolean;
};

const SidebarQuickActions = ({ role, isCollapsed }: SidebarQuickActionsProps) => {
  const pathname = usePathname();

  if (role === "public") return null;

  const visibleActions = QUICK_ACTIONS.filter((action) =>
    action.roles.includes(role as NavRole)
  );

  return (
    <SidebarSection title="Accesos Rápidos" isCollapsed={isCollapsed}>
      {visibleActions.map((action) => (
        <SidebarItem
          key={action.href}
          icon={action.icon}
          label={action.label}
          href={action.href}
          isActive={pathname === action.href}
          isCollapsed={isCollapsed}
        />
      ))}
    </SidebarSection>
  );
};

export default SidebarQuickActions;
