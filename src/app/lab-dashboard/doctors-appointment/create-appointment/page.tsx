// src/app/lab-dashboard/doctors-appointment/create/page.tsx

"use client";

import { useState } from "react";
import CreateDoctorsAForm from "@/components/doctorsAppointments/CreateDoctorsAForm";
import { DoctorsAppointment } from "../../../../../types/doctorsAppointment.types";

const Page = () => {
  const [appointments, setAppointments] = useState<DoctorsAppointment[]>([]);
  const [checkedAppointments, setCheckedAppointments] = useState<string[]>([]);

  const handleAddAppointment = (appointment: DoctorsAppointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const toggleChecked = (id: string) => {
    setCheckedAppointments((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-8">
      <CreateDoctorsAForm onCreated={handleAddAppointment} />

      <div className="max-w-2xl mx-auto space-y-2">
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
      </div>
    </div>
  );
};

export default Page;
