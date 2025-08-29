"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ButtonPanelProps = {
  role: "admin" | "receptionist" | "lab_technician" | "biochemist" | null;
};

const ButtonPanel = ({ role }: ButtonPanelProps) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const renderButton = (label: string, path: string) => (
    <button
      onClick={() => handleNavigation(path)}
      className="border-2 flex flex-col border-gray-300 p-4 rounded-lg bg-white hover:bg-sky-50 transition-colors w-full"
    >
      {label}
    </button>
  );

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Bienvenido a LabSystem
      </h2>

      <div className="space-y-5">
        {role === "admin" && (
          <>
            {renderButton("Pacientes", "/lab-dashboard/patients")}
            {renderButton("Resultados", "/lab-dashboard/results")}
            {renderButton("Citas", "/lab-dashboard/doctors-appointment")}
            {renderButton("Personal", "/labstaff")}
            {renderButton("Estudios médicos", "/medical-studies")}
            {renderButton("Cobros", "/lab-dashboard/payments")}
            {renderButton("Talones", "/lab-dashboard/talon")}
          </>
        )}

        {role === "receptionist" && (
          <>
            {renderButton("Agregar Paciente", "/lab-dashboard/patients")}
            {renderButton("Citas", "/lab-dashboard/doctors-appointment")}
            {renderButton("Estudios médicos", "/medical-studies")}
            {renderButton("Resultados", "/lab-dashboard/results")}
            {renderButton("Cobros", "/lab-dashboard/payments")}
            {renderButton("Talones", "/lab-dashboard/talon")}
          </>
        )}

        {role === "lab_technician" && (
          <>
            {renderButton("Resultados", "/lab-dashboard/results")}
            {renderButton("Crear Cita", "/lab-dashboard/doctors-appointment")}
            {renderButton("Estudios médicos", "/medical-studies")}
          </>
        )}

        {role === "biochemist" && (
          <>
            {renderButton("Resultados", "/lab-dashboard/results")}
            {renderButton("Estudios médicos", "/medical-studies")}
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonPanel;
