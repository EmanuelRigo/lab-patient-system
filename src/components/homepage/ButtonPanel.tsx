"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Calendar,
  FileText,
  Microscope,
  DollarSign,
  ClipboardList,
  Users,
} from "lucide-react";

type ButtonPanelProps = {
  role: "admin" | "receptionist" | "labTechnician" | "biochemist" | "public";
};

const ButtonPanel = ({ role }: ButtonPanelProps) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const renderButton = (
    label: string,
    path: string,
    Icon: React.ElementType
  ) => (
    <Button
      variant="ghost"
      className="w-full justify-start text-base font-medium gap-2 hover:bg-sky-100"
      onClick={() => handleNavigation(path)}
    >
      <Icon className="w-5 h-5 text-sky-600" />
      {label}
    </Button>
  );

  return (
    <aside className="w-64 p-4 bg-white border rounded-e-xl shadow-sm flex flex-col gap-2">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Menú de navegación
      </h2>
      <Separator />

      {role === "admin" && (
        <>
          {renderButton("Pacientes", "/lab-dashboard/patients", User)}
          {renderButton("Resultados", "/lab-dashboard/results", FileText)}
          {renderButton(
            "Citas",
            "/lab-dashboard/doctors-appointment",
            Calendar
          )}
          {renderButton("Personal", "/labstaff", Users)}
          {renderButton("Estudios", "/medical-studies", Microscope)}
          {renderButton("Cobros", "/lab-dashboard/payments", DollarSign)}
          {renderButton("Talones", "/lab-dashboard/talon", ClipboardList)}
        </>
      )}

      {role === "receptionist" && (
        <>
          {renderButton("Pacientes", "/lab-dashboard/patients", User)}
          {renderButton(
            "Citas",
            "/lab-dashboard/doctors-appointment",
            Calendar
          )}
          {renderButton("Estudios", "/medical-studies", Microscope)}
          {renderButton("Resultados", "/lab-dashboard/results", FileText)}
          {renderButton("Cobros", "/lab-dashboard/payments", DollarSign)}
          {renderButton("Talones", "/lab-dashboard/talon", ClipboardList)}
        </>
      )}

      {role === "labTechnician" && (
        <>
          {renderButton("Resultados", "/lab-dashboard/results", FileText)}
          {renderButton(
            "Crear Cita",
            "/lab-dashboard/doctors-appointment",
            Calendar
          )}
          {renderButton("Estudios", "/medical-studies", Microscope)}
        </>
      )}

      {role === "biochemist" && (
        <>
          {renderButton("Resultados", "/lab-dashboard/results", FileText)}
          {renderButton("Estudios", "/medical-studies", Microscope)}
        </>
      )}
    </aside>
  );
};

export default ButtonPanel;
