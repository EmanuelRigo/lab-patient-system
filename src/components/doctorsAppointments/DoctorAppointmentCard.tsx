"use client";
import React, { useState } from "react";
import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";
import RoleWrapper from "../generics/RoleWrapper";
import EditAppointmentModal from "./EditAppointmentModal";
import doctorsAppointmentApi from "@/services/doctorsAppointment.api";

interface DoctorAppointmentCardProps {
  appointment: DoctorsAppointment;
}

const DoctorAppointmentCard = ({ appointment }: DoctorAppointmentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dAppointment, setDAppointment] = useState<DoctorsAppointment | null>(
    null
  );

  const handleUpdate = async (updatedFields: Partial<DoctorsAppointment>) => {
    const updated = await doctorsAppointmentApi.update(
      appointment._id,
      updatedFields
    );
    setDAppointment((prev) => ({ ...(prev ?? appointment), ...updated }));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white border-2 border-gray-300 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-sky-800 mb-4">Turno Médico</h2>

      <p className="text-sm text-gray-700">
        <strong>ID del paciente:</strong> {appointment.patientId}
      </p>

      <p className="text-sm text-gray-700">
        <strong>Fecha del turno:</strong>{" "}
        {new Date(appointment.date).toLocaleString()}
      </p>

      <p className="text-sm text-gray-700">
        <strong>Motivo:</strong> {appointment.reason}
      </p>

      <p className="text-sm text-gray-700">
        <strong>Estado:</strong> {appointment.status}
      </p>

      <p className="text-sm text-gray-700 mt-2">
        <strong>Creado:</strong>{" "}
        {new Date(appointment.createdAt!).toLocaleString()}
      </p>

      <p className="text-sm text-gray-700">
        <strong>Actualizado:</strong>{" "}
        {new Date(appointment.updatedAt!).toLocaleString()}
      </p>
      <RoleWrapper allowedRoles={["Receptionist", "LabTechnician"]}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full inline-block bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
        >
          Editar
        </button>
      </RoleWrapper>

      {isModalOpen && (
        <EditAppointmentModal
          appointment={dAppointment ?? appointment}
          onSave={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DoctorAppointmentCard;
