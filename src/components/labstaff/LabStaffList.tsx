"use client";

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

type LabStaff = {
  id: number;
  name: string;
  role: "ADMIN" | "Secretary" | "LabTechnician";
};

const LabStaffList = () => {
  const [staff, setStaff] = useState<LabStaff[]>([
    { id: 1, name: "Emanuel Rigo", role: "ADMIN" },
    { id: 2, name: "Lucía Gómez", role: "Secretary" },
    { id: 3, name: "Carlos Méndez", role: "LabTechnician" },
    { id: 4, name: "Sofía Álvarez", role: "Secretary" },
  ]);

  const handleDelete = (id: number) => {
    setStaff((prev) => prev.filter((person) => person.id !== id));
  };

  return (
    <div className="max-h-screen overflow-y-auto p-4 space-y-4">
      {staff.map((person) => (
        <div
          key={person.id}
          className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md bg-white"
        >
          <div>
            <h3 className="text-lg font-bold text-sky-800">{person.name}</h3>
            <p className="text-sm text-gray-600">Rol: {person.role}</p>
          </div>
          <button
            onClick={() => handleDelete(person.id)}
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

export default LabStaffList;
