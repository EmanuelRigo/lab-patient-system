"use client";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ModalEditGeneric from "../generics/ModalEditGeneric";
import patientsApi from "@/services/patients.api";
import { Patient } from "../../../types/patient.types";

interface PatientCardProps {
  patient: Patient;
}

interface PatientForModal extends Patient {
  [key: string]: unknown;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const onDelete = async () => {
    if (confirm("¿Estás seguro de eliminar este paciente?")) {
      try {
        await patientsApi.remove(patient._id);
        alert("Paciente eliminado correctamente.");
        router.push("/lab-dashboard/patients"); // Redirecciona a la lista de pacientes
      } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        alert("No se pudo eliminar el paciente. Intenta nuevamente más tarde.");
      }
    }
  };

  const onUpdate = async (updatedFields: Partial<Patient>) => {
    try {
      await patientsApi.update(patient._id, updatedFields);
      alert("Paciente actualizado correctamente.");
      router.refresh();
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
      alert("No se pudo actualizar el paciente. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-sky-800 mb-2">
        {patient.firstname} {patient.lastname}
      </h2>

      <p className="text-gray-700 mb-1">
        <strong>Fecha de nacimiento:</strong>{" "}
        {patient.birthDate instanceof Date
          ? patient.birthDate.toLocaleDateString()
          : patient.birthDate}{" "}
        años
      </p>

      <p className="text-gray-700 mb-1">
        <strong>DNI:</strong> {patient.dni}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>Teléfono:</strong> {patient.phone}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>Dirección:</strong> {patient.address}
      </p>

      <p className="text-gray-700 mb-4">
        <strong>Email:</strong> {patient.email}
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
          onClick={onDelete}
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          <FaTrash />
          Eliminar
        </button>
      </div>

      {showModal && (
        <ModalEditGeneric
          initialData={patient as PatientForModal}
          editableFields={[
            { name: "firstname", label: "Nombre" },
            { name: "lastname", label: "Apellido" },
            { name: "birthDate", label: "Fecha de nacimiento" },
            { name: "dni", label: "DNI", type: "number" },
            { name: "phone", label: "Teléfono" },
            { name: "address", label: "Dirección" },
            { name: "email", label: "Email" },
          ]}
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default PatientCard;
