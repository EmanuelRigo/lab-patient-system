"use client";

import React from "react";
import Link from "next/link"; // Solo necesitas Link ahora

interface LabStaffCardProps {
  id: string;
  name: string;
  lastname: string;
  role: string;
  // onDelete ya no es necesario aquí
}

const LabStaffCard: React.FC<LabStaffCardProps> = ({
  id,
  name,
  lastname,
  role,
}) => {
  return (
    <Link
      href={`/labstaff/${id}`} // Usamos el ID para una URL dinámica
      className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-gray-200 transition-colors "
    >
      <div>
        <h3 className="text-lg font-bold text-sky-800">
          {name} {lastname}
        </h3>
        <p className="text-sm text-gray-600">Rol: {role}</p>
      </div>
      {/* El botón de eliminar y su lógica han sido removidos */}
    </Link>
  );
};

export default LabStaffCard;
