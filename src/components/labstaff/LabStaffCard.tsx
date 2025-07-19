"use client";
import { useState } from "react";
import { LabStaff } from "../../../types/labStaff.types";
import { FaTrash, FaEdit } from "react-icons/fa";
import labStaffApi from "@/services/labStaff.api";
import { useRouter } from "next/navigation";
import ModalEditGeneric from "../generics/ModalEditGeneric";

interface LabStaffCardProps {
  staff: LabStaff;
}

const LabStaffCard = ({ staff }: LabStaffCardProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const onDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar el personal?")) {
      try {
        await labStaffApi.remove(id);
        alert("Personal eliminado correctamente.");
        router.push("/labstaff");
      } catch (error) {
        console.error("Error al eliminar el personal:", error);
        alert(
          "Error al eliminar el estudio médico. Inténtalo de nuevo más tarde."
        );
      }
    }
  };

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

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-sky-800 mb-2">
        {staff.firstName}{" "}
      </h2>

      <p className="text-gray-700 mb-1">
        <strong>Role:</strong> ${staff.role}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md"
        >
          <FaEdit />
          Editar
        </button>

        <button
          onClick={() => onDelete(staff._id)}
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          <FaTrash />
          Eliminar
        </button>
      </div>

      {showModal && (
        <ModalEditGeneric
          initialData={staff}
          editableFields={[
            { name: "firstName", label: "Nombre" },

            { name: "description", label: "Descripción", type: "textarea" },
          ]}
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default LabStaffCard;
