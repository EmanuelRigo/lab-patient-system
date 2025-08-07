"use client";
import { Patient } from "../../../types/patient.types";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface PatientListProps {
  patients: Patient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const handleDelete = (id: string | undefined) => {
    // Este delete es solo visual, no persistente
    console.log("Eliminar paciente con id:", id);
  };

  return (
    <div className="h-full overflow-y-auto space-y-4 scrollbar-hidden">
      {patients.map((patient) => (
        <div
          key={patient._id}
          className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md bg-white"
        >
          <div>
            <h3 className="text-lg font-bold text-sky-800">
              {patient.firstName}
            </h3>
            <p className="text-sm text-gray-600">
              Edad: {patient.birthDate.toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(patient._id)}
            className="text-red-500 hover:text-red-700"
            title="Eliminar"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
