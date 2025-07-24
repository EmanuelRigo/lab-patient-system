"use client";
import React from "react";
import Link from "next/link";
import RoleWrapper from "@/components/generics/RoleWrapper";
import ModalEditGeneric from "../generics/ModalEditGeneric";
import { useState } from "react";

interface CardResultProps {
  result: {
    _id: string;
    IdLabTechnician: string;
    status: string;
    extractionDate?: Date;
    extractionTime?: string;
    IdBiochemist?: string;
  };
}

const onUpdate = async (updatedFields: Partial<LabStaff>) => {
  try {
    await labStaffApi.update(staff._id, updatedFields);
    alert("Personal actualizado correctamente.");
    router.refresh(); // Actualiza la vista sin redireccionar
  } catch (error) {
    console.error("Error al actualizar el personal:", error);
    alert("Error al actualizar el personal. Inténtalo de nuevo más tarde.");
  }
};

const CardResult = ({ result }: CardResultProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-sky-800 mb-4">
        {result.IdLabTechnician}
      </h2>

      <p className="text-sm text-gray-700">
        <strong>Estatus:</strong> {result.status}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Día de extracción:</strong>{" "}
        {result.extractionDate
          ? new Date(result.extractionDate).toDateString()
          : "No especificada"}
      </p>

      <p className="text-sm text-gray-700">
        <strong>Hora de extracción:</strong>{" "}
        {result.extractionTime || "No especificada"}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Bioquímico:</strong> {result.IdBiochemist || "No asignado"}
      </p>

      <RoleWrapper allowedRoles={["LabTechnician", "Biochemist"]}>
        <Link
          className="bg-sky-500 text-white rounded-lg p-2 mt-4 inline-block"
          href={`/result/edit/${result._id}`}
        >
          Edit
        </Link>
      </RoleWrapper>
    </div>
  );
};

export default CardResult;
