"use client";

import {
  UserPlus,
  ClipboardPlus,
  FlaskConical,
  Search,
  BarChart3,
  Boxes,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { QuickActionButton } from "./QuickActionButton";

interface QuickActionsProps {
  onNewPatient?: () => void;
  onNewOrder?: () => void;
  onRegisterResult?: () => void;
  onSearchPatient?: () => void;
  onReports?: () => void;
  onInventory?: () => void;
}

export function QuickActions({
  onNewPatient,
  onNewOrder,
  onRegisterResult,
  onSearchPatient,
  onReports,
  onInventory,
}: QuickActionsProps) {
  const actions = [
    {
      label: "Nuevo Paciente",
      icon: UserPlus,
      onClick: onNewPatient,
    },
    {
      label: "Nueva Orden",
      icon: ClipboardPlus,
      onClick: onNewOrder,
    },
    {
      label: "Registrar Resultado",
      icon: FlaskConical,
      onClick: onRegisterResult,
    },
    {
      label: "Buscar Paciente",
      icon: Search,
      onClick: onSearchPatient,
    },
    {
      label: "Reportes",
      icon: BarChart3,
      onClick: onReports,
    },
    {
      label: "Inventario",
      icon: Boxes,
      onClick: onInventory,
    },
  ];

  return (
    <Card className="h-full rounded-xl border-border bg-surface py-0 shadow-none">
      <CardContent className="flex h-full items-center px-3">
        <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-6">
          {actions.map((action) => (
            <QuickActionButton
              key={action.label}
              label={action.label}
              icon={action.icon}
              onClick={action.onClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
