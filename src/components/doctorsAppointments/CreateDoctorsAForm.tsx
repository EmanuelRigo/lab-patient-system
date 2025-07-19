"use client";

import { useState } from "react";
import GenericSearchInput from "../generics/GenericSearchInput";
import { Patient } from "../../../types/patient.types";

const CreateDoctorsAForm = () => {
  const [form, setForm] = useState({
    doctorId: "",
    patientDNI: "",
    date: "",
    reason: "",
    status: "scheduled",
  });

  const fetchPatients = async (query: string): Promise<Patient[]> => {
    const res = await fetch(
      `/api/patients/search?query=${encodeURIComponent(query)}`
    );
    return res.json();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Aquí podrías llamar a una función para enviar los datos al backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded shadow space-y-4 max-w-md mx-auto"
    >
      <GenericSearchInput<Patient>
        onSearch={fetchPatients}
        onSelect={(patient) => console.log("Paciente seleccionado:", patient)}
        renderItem={(patient) => (
          <span>
            {patient.dni} - {patient.firstName}
          </span>
        )}
        placeholder="Buscar paciente..."
      />
      <div>
        <label className="block font-semibold mb-1">Doctor ID:</label>
        <input
          type="text"
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Patient DNI:</label>
        <input
          type="text"
          name="patientDNI"
          value={form.patientDNI}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Date and Time:</label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Reason:</label>
        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Status:</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Crear cita
      </button>
    </form>
  );
};

export default CreateDoctorsAForm;
