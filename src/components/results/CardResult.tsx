"use client";
import React from "react";
import RoleWrapper from "@/components/generics/RoleWrapper";
import ModalEditGeneric from "../generics/ModalEditGeneric";
import resultApi from "@/services/result.api";
import { useState } from "react";
import { Result } from "../../../types/result.types";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

interface CardResultProps {
  result: Result;
}

interface ResultForModal extends Result {
  [key: string]: unknown;
}

const CardResult = ({ result }: CardResultProps) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const onUpdate = async (updatedFields: Partial<Result>) => {
    try {
      await resultApi.update(result._id, updatedFields);
      alert("Personal actualizado correctamente.");
      router.refresh(); // Actualiza la vista sin redireccionar
    } catch (error) {
      console.error("Error al actualizar el personal:", error);
      alert("Error al actualizar el personal. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-sky-800 mb-4">
        {result.labtechnician_id}
      </h2>

      <p className="text-sm text-gray-700">
        <strong>Estatus:</strong> {result.status}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Día de extracción:</strong>{" "}
        {result.extration_date
          ? new Date(result.extration_date).toDateString()
          : "No especificada"}
      </p>

      <p className="text-sm text-gray-700">
        <strong>Hora de extracción:</strong>{" "}
        {result.extractionTime || "No especificada"}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Bioquímico:</strong> {result.biochemist_id || "No asignado"}
      </p>

      <RoleWrapper allowedRoles={["role_lab_technician", "role_biochemist"]}>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md"
        >
          <FaEdit />
          Editar
        </button>

        {showModal && (
          <ModalEditGeneric
            initialData={result as ResultForModal}
            editableFields={[{ name: "status", label: "Estado" }]}
            onClose={() => setShowModal(false)}
            onUpdate={onUpdate}
          />
        )}
      </RoleWrapper>
    </div>
  );
};

export default CardResult;
