"use client";

import { UserPlus, FilePlus, ClipboardPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useLabSystemContext } from "@/context/LabContext";
import { Role } from "../../../types/frontend.types";

import { QuickActionButton } from "./QuickActionButton";

type NavRole = Exclude<Role, "public">;

interface QuickActionDef {
  label: string;
  icon: LucideIcon;
  href: string;
  roles: NavRole[];
}

const QUICK_ACTIONS: QuickActionDef[] = [
  {
    label: "Nuevo Paciente",
    icon: UserPlus,
    href: "/lab-dashboard/patients/add-patient",
    roles: ["admin", "receptionist"],
  },
  {
    label: "Nueva Orden",
    icon: FilePlus,
    href: "/lab-dashboard/talon",
    roles: ["admin", "receptionist"],
  },
  {
    label: "Registrar Resultado",
    icon: ClipboardPlus,
    href: "/lab-dashboard/results/add-result",
    roles: ["admin", "labTechnician", "biochemist"],
  },
];

export function QuickActions() {
  const { role } = useLabSystemContext();
  const router = useRouter();

  if (role === "public") return null;

  const visibleActions = QUICK_ACTIONS.filter((action) =>
    action.roles.includes(role as NavRole)
  );

  return (
    <Card className="h-full rounded-xl border-border bg-surface py-0 shadow-none">
      <CardContent className="flex h-full items-center px-3">
        <div className="flex w-full flex-wrap gap-2">
          {visibleActions.map((action) => (
            <QuickActionButton
              key={action.href}
              label={action.label}
              icon={action.icon}
              onClick={() => router.push(action.href)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
