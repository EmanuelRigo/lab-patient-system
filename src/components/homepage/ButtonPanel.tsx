"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
    <div
      onClick={() => handleNavigation(path)}
      className="flex items-center gap-4 p-3 bg-sky-200 text-sky-900 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      {/* Ícono con círculo como en ActionCard */}
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-300/70">
        <Icon className="w-6 h-6 text-sky-50" />
      </div>
      <span className="text-base font-semibold">{label}</span>
    </div>
  );

  return (
    <aside className="w-64 p-4 bg-neutral-50 rounded-e-xl shadow-lg flex flex-col gap-4 mb-6">
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
