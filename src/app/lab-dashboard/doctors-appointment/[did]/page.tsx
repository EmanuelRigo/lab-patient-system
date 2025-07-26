"use client";

import { useState, useEffect } from "react";
import doctorsAppointmentApi from "@/services/doctorsAppointment.api";
import { useParams } from "next/navigation";
import EditAppointmentModal from "@/components/doctorsAppointments/EditAppointmentModal";
import RoleWrapper from "@/components/generics/RoleWrapper";

const Page = () => {
  const { did } = useParams() as { did: string };
  const [dAppointment, setDAppointment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      const data = await doctorsAppointmentApi.getById(did);
      setDAppointment(data);
    };
    fetchAppointment();
  }, [did]);

  const handleUpdate = async (updatedFields: Record<string, any>) => {
    const updated = await doctorsAppointmentApi.update(did, updatedFields);
    setDAppointment((prev: any) => ({ ...prev, ...updated }));
    setIsModalOpen(false);
  };

  if (!dAppointment) {
    return (
      <div className="text-center text-gray-700 p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Turno no encontrado
        </h2>
        <p>Verificá el ID del turno o intentá nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="text-black h-full overflow-y-auto p-6">
      <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sky-800 mb-4">Turno Médico</h2>

        <p className="text-sm text-gray-700">
          <strong>ID del paciente:</strong> {dAppointment.patientId}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Fecha del turno:</strong>{" "}
          {new Date(dAppointment.date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Motivo:</strong> {dAppointment.reason}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Estado:</strong> {dAppointment.status}
        </p>

        <p className="text-sm text-gray-700 mt-2">
          <strong>Creado:</strong>{" "}
          {new Date(dAppointment.createdAt!).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Actualizado:</strong>{" "}
          {new Date(dAppointment.updatedAt!).toLocaleString()}
        </p>
      </div>

      <RoleWrapper allowedRoles={["Receptionist", "LabTechnician"]}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 inline-block bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
        >
          Editar
        </button>
      </RoleWrapper>

      {isModalOpen && (
        <EditAppointmentModal
          appointment={dAppointment}
          onSave={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Page;
