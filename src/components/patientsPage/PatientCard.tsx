/* components/patientsPage/PatientCard.tsx */
"use client";

import React from "react";
import { FaTrash } from "react-icons/fa";
import { Patient } from "../../../types/patient.types";

interface Props {
  data: Patient;
}

export default function PatientCard({ data }: Props) {
  const handleDelete = () => {
    console.log("Eliminar paciente con id:", data._id);
  };

  return (
    <div className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md bg-white">
      <div>
        <h3 className="text-lg font-bold text-sky-800">{data.name}</h3>
        <p className="text-sm text-gray-600">Edad: {data.age}</p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700"
        title="Eliminar"
      >
        <FaTrash size={18} />
      </button>
    </div>
  );
}
