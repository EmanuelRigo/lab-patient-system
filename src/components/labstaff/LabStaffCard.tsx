"use client";

import React from "react";
import { FaTrash } from "react-icons/fa";

interface LabStaffCardProps {
  id: string;
  name: string;
  role: string;
  onDelete: (id: string) => void;
}

const LabStaffCard: React.FC<LabStaffCardProps> = ({
  id,
  name,
  role,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md bg-white">
      <div>
        <h3 className="text-lg font-bold text-sky-800">{name}</h3>
        <p className="text-sm text-gray-600">Rol: {role}</p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700"
        title="Eliminar"
      >
        <FaTrash size={18} />
      </button>
    </div>
  );
};

export default LabStaffCard;
