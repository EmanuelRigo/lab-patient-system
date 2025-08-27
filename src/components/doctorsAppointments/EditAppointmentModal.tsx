"use client";

import { useState } from "react";
import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";

type Appointment = {
  _id: string;
  date: string;
  status: "status_scheduled" | "status_completed" | "status_cancelled";
};

type Props = {
  appointment: DoctorsAppointment;
  onSave: (updated: Appointment) => void;
  onClose: () => void;
};

const EditAppointmentModal = ({ appointment, onSave, onClose }: Props) => {
  const [status, setStatus] = useState(appointment.status);
  const [date, setDate] = useState(appointment.date.slice(0, 16)); // formato para input

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...appointment, status, date });
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Editar Turno
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Appointment["status"])
              }
              className="mt-1 w-full border rounded-md p-2"
            >
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
