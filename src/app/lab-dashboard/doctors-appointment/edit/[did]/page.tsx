import React from "react";
import doctorsAppointmentApi from "@/services/doctorsAppointment.api";

const page = async ({ params }: { params: Promise<{ did: string }> }) => {
  const { did } = await params;

  const appointment = await doctorsAppointmentApi.getById(did);
  console.log("🚀 ~ page ~ appointment:", appointment);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Turno Médico</h1>
      {appointment ? (
        <div>
          <p>
            <strong>ID del Paciente:</strong> {appointment.patientId}
          </p>
          <p>
            <strong>Fecha del Turno:</strong>{" "}
            {new Date(appointment.date).toLocaleString()}
          </p>
          <p>
            <strong>Motivo:</strong> {appointment.reason}
          </p>
          <p>
            <strong>Estado:</strong> {appointment.status}
          </p>
          <p>
            <strong>Creado:</strong>{" "}
            {new Date(appointment.createdAt!).toLocaleString()}
          </p>
          <p>
            <strong>Actualizado:</strong>{" "}
            {new Date(appointment.updatedAt!).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-red-500">Turno no encontrado.</p>
      )}
    </div>
  );
};

export default page;
