"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ButtonPanelProps = {
  role: "Admin" | "Receptionist" | "LabTechnician" | "Biochemist" | null;
};

const ButtonPanel = ({ role }: ButtonPanelProps) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const renderButton = (label: string, path: string) => (
    <button
      onClick={() => handleNavigation(path)}
      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-md transition duration-200 text-lg"
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
      <h2 className="text-3xl font-bold mb-8 text-sky-700">
        Bienvenido a LabSystem
      </h2>

      <div className="space-y-6">
        {role === "Admin" && (
          <>
            {renderButton("Pacientes", "/lab-dashboard/patients")}
            {renderButton("Resultados", "/lab-dashboard/results")}
            {renderButton("Crear Cita", "/lab-dashboard/doctors-appointment")}
            {renderButton("Personal", "/labstaff")}
            {renderButton("Estudios médicos", "/medical-studies")}
            {renderButton("Cobros", "/lab-dashboard/payments")}
            {renderButton("Talones", "/lab-dashboard/talon")}
          </>
        )}

        {role === "Receptionist" && (
          <>
            {renderButton("Agregar Paciente", "/lab-dashboard/patients")}
            {renderButton("Crear Cita", "/lab-dashboard/doctors-appointment")}
            {renderButton("Estudios médicos", "/medical-studies")}
            {renderButton("Resultados", "/lab-dashboard/results")}
            {renderButton("Cobros", "/lab-dashboard/payments")}
            {renderButton("Talones", "/lab-dashboard/talon")}
          </>
        )}

        {role === "LabTechnician" && (
          <>
            {renderButton("Resultados", "/lab-dashboard/results")}
            {renderButton("Crear Cita", "/lab-dashboard/doctors-appointment")}
            {renderButton("Estudios médicos", "/medical-studies")}
          </>
        )}

        {role === "Biochemist" && (
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
