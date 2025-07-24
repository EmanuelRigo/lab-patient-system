"use client";
import { useState } from "react";
import { MedicalStudy } from "../../../types/medicalStudy.types";
import { FaTrash, FaEdit } from "react-icons/fa";
import medicalStudiesApi from "@/services/medicalStudies.api";
import { useRouter } from "next/navigation";
import ModalEditGeneric from "../generics/ModalEditGeneric";
import RoleWrapper from "../generics/RoleWrapper";

interface MedicalStudiesCardProps {
  study: MedicalStudy;
}

const MedicalStudiesCard = ({ study }: MedicalStudiesCardProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const onDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este estudio médico?")) {
      try {
        await medicalStudiesApi.remove(id);
        alert("Estudio médico eliminado correctamente.");
        router.push("/medical-studies");
      } catch (error) {
        console.error("Error al eliminar el estudio médico:", error);
        alert(
          "Error al eliminar el estudio médico. Inténtalo de nuevo más tarde."
        );
      }
    }
  };

  const onUpdate = async (updatedFields: Partial<MedicalStudy>) => {
    try {
      await medicalStudiesApi.update(study._id, updatedFields);
      alert("Estudio médico actualizado correctamente.");
      router.refresh(); // Actualiza la vista sin redireccionar
    } catch (error) {
      console.error("Error al actualizar el estudio médico:", error);
      alert(
        "Error al actualizar el estudio médico. Inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-sky-800 mb-2">{study.name}</h2>

      <p className="text-gray-700 mb-1">
        <strong>Precio:</strong> ${study.price}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>Duración:</strong> {study.duration} minutos
      </p>

      <p className="text-gray-700 mb-4">
        <strong>Descripción:</strong> {study.description}
      </p>
      <RoleWrapper allowedRoles={["Admin"]}>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md"
          >
            <FaEdit />
            Editar
          </button>

          <button
            onClick={() => onDelete(study._id)}
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            <FaTrash />
            Eliminar
          </button>
        </div>
      </RoleWrapper>

      {showModal && (
        <ModalEditGeneric
          initialData={study}
          editableFields={[
            { name: "name", label: "Nombre" },
            { name: "price", label: "Precio", type: "number" },
            { name: "duration", label: "Duración (minutos)", type: "number" },
            { name: "description", label: "Descripción", type: "textarea" },
          ]}
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default MedicalStudiesCard;
