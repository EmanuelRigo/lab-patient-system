"use client";

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

type Patient = {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
};

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "Juan Pérez", age: 30, diagnosis: "Gripe" },
    { id: 2, name: "María García", age: 25, diagnosis: "Alergia" },
    { id: 3, name: "Carlos López", age: 40, diagnosis: "Diabetes" },
    { id: 4, name: "Ana Martínez", age: 35, diagnosis: "Hipertensión" },
    { id: 5, name: "Luis Rodríguez", age: 50, diagnosis: "Asma" },
  ]);

  const handleDelete = (id: number) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
  };

  return (
    <div className=" h-full overflow-y-auto p-4 space-y-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md bg-white"
        >
          <div>
            <h3 className="text-lg font-bold text-sky-800">{patient.name}</h3>
            <p className="text-sm text-gray-600">Edad: {patient.age}</p>
            <p className="text-sm text-gray-600">
              Diagnóstico: {patient.diagnosis}
            </p>
          </div>
          <button
            onClick={() => handleDelete(patient.id)}
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
