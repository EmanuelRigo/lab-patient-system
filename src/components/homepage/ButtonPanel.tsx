"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ButtonPanelProps = {
  role: "Admin" | "Secretary" | "LabTechnician" | "Biochemist" | null;
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
            {renderButton("Resultados", "/resultados/generar")}
            {renderButton("Crear Cita", "/lab-dashboard/doctors-appointment")}
            {renderButton("Personal", "/labstaff")}
            {renderButton("Estudios médicos", "/medical-studies")}
          </>
        )}

        {role === "Secretary" && (
          <>
            {renderButton("Agregar Paciente", "/pacientes/agregar")}
            {renderButton("Crear Cita", "/citas/crear")}
          </>
        )}

        {role === "LabTechnician" && (
          <>
            {renderButton("Generar Resultado", "/resultados/generar")}
            {renderButton("Estudios médicos", "/estudios")}
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonPanel;
