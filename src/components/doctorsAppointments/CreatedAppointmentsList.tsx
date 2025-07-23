import React from "react";
import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";
import talonApi from "@/services/talon.api";

type Props = {
  appointments: DoctorsAppointment[];
  checkedAppointments: string[];
  toggleChecked: (id: string) => void;
};

const CreatedAppointmentsList = ({
  appointments,
  checkedAppointments,
  toggleChecked,
}: Props) => {
  const handleCreateTalon = async () => {
    if (checkedAppointments.length === 0)
      return alert("Selecciona al menos un turno");

    try {
      const response = await talonApi.create({
        DAppointmentId: checkedAppointments,
        ReceptionistID: "686d757346b9e019c5b5d135",
      });

      console.log("Talon creado:", response);
      alert("Talon creado correctamente.");
    } catch (error) {
      console.error("Error creando talon:", error);
      alert("Ocurrió un error al crear el talon.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h3 className="text-xl font-semibold">Turnos creados:</h3>

      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="flex items-center justify-between border rounded px-4 py-2 shadow"
        >
          <div>
            <p className="text-sm">
              <strong>Paciente ID:</strong> {appointment.patientId}
            </p>
            <p className="text-sm">
              <strong>Fecha:</strong>{" "}
              {new Date(appointment.date).toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>Motivo:</strong> {appointment.reason}
            </p>
          </div>
          <button
            onClick={() => toggleChecked(appointment._id!)}
            className={`text-2xl ${
              checkedAppointments.includes(appointment._id!)
                ? "text-green-600"
                : "text-gray-300"
            }`}
          >
            ✅
          </button>
        </div>
      ))}

      <button
        onClick={handleCreateTalon}
        disabled={checkedAppointments.length === 0}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Crear Talon con Turnos Seleccionados
      </button>
    </div>
  );
};

export default CreatedAppointmentsList;
