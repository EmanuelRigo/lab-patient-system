"use client";

import { useState } from "react";
import resultApi from "@/services/result.api";
import { Result } from "../../../types/result.types";

const ResultForm = () => {
  const [form, setForm] = useState<
    Omit<Result, "_id" | "createdAt" | "updatedAt">
  >({
    medicalStudyId: "",
    doctorAppointmentId: "",
    status: "pending",
    biochemistId: "",
    labtechnicianId: "",
    extractionDate: undefined,
    result: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Si es fecha, convertir a Date
    if (name === "extractionDate") {
      setForm((prev) => ({
        ...prev,
        [name]: value ? new Date(value) : undefined,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📦 Enviando resultado:", form);
    await resultApi.create(form);

    setForm({
      medicalStudyId: "",
      doctorAppointmentId: "",
      status: "pending",
      labtechnicianId: "",
      extractionDate: undefined,
      result: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col gap-4 w-full"
    >
      <h2 className="text-xl font-semibold text-sky-700">Agregar Resultado</h2>

      <input
        type="text"
        name="medical_study_id"
        value={form.medicalStudyId}
        onChange={handleChange}
        placeholder="ID de Estudio Médico"
        required
        className="border p-2 rounded-md"
      />

      <input
        type="text"
        name="doctorAppointmentId"
        value={form.doctorAppointmentId}
        onChange={handleChange}
        placeholder="ID de Cita Médica"
        required
        className="border p-2 rounded-md"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 rounded-md"
      >
        <option value="pending">Pendiente</option>
        <option value="completed">Completado</option>
        <option value="failed">Fallido</option>
      </select>

      <input
        type="text"
        name="labtechnicianId"
        value={form.labtechnicianId}
        onChange={handleChange}
        placeholder="ID del Técnico de Laboratorio"
        className="border p-2 rounded-md"
      />

      <input
        type="text"
        name="biochemistId"
        value={form.biochemistId}
        onChange={handleChange}
        placeholder="ID del Bioquímico"
        className="border p-2 rounded-md"
      />

      <input
        type="text"
        name="result"
        value={form.result}
        onChange={handleChange}
        placeholder="Resultado"
        className="border p-2 rounded-md"
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="border p-2 rounded-md"
      />

      <input
        type="date"
        name="extractionDate"
        value={
          form.extractionDate
            ? form.extractionDate.toISOString().split("T")[0]
            : ""
        }
        onChange={handleChange}
        className="border p-2 rounded-md"
      />

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md"
      >
        Agregar Resultado
      </button>
    </form>
  );
};

export default ResultForm;
