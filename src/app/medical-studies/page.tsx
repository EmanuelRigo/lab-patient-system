"use client";

import { FaTrash } from "react-icons/fa";
import React, { useState } from "react";

type Study = {
  id: number;
  name: string;
  price: number;
};

const MedicalStudyList = () => {
  const [studies, setStudies] = useState<Study[]>([
    { id: 1, name: "Hemograma completo", price: 3500 },
    { id: 2, name: "Glucosa en sangre", price: 2200 },
    { id: 3, name: "Perfil lipídico", price: 4100 },
    { id: 4, name: "Función hepática", price: 3000 },
    { id: 5, name: "Electrocardiograma", price: 4500 },
    { id: 1, name: "Hemograma completo", price: 3500 },
    { id: 2, name: "Glucosa en sangre", price: 2200 },
    { id: 3, name: "Perfil lipídico", price: 4100 },
    { id: 4, name: "Función hepática", price: 3000 },
    { id: 5, name: "Electrocardiograma", price: 4500 },
    { id: 1, name: "Hemograma completo", price: 3500 },
    { id: 2, name: "Glucosa en sangre", price: 2200 },
    { id: 3, name: "Perfil lipídico", price: 4100 },
    { id: 4, name: "Función hepática", price: 3000 },
    { id: 5, name: "Electrocardiograma", price: 4500 },
  ]);

  const handleDelete = (id: number) => {
    setStudies((prev) => prev.filter((study) => study.id !== id));
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {studies.map((study) => (
        <div
          key={study.id}
          className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md bg-white"
        >
          <div>
            <h3 className="text-lg font-bold text-sky-800">{study.name}</h3>
            <p className="text-sm text-gray-600">Precio: ${study.price}</p>
          </div>
          <button
            onClick={() => handleDelete(study.id)}
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

export default MedicalStudyList;
