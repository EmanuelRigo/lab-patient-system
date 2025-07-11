"use client";

import React, { useState } from "react";
import { Patient } from "../../../types/patient.types";
import { addPatient } from "@/services/patients.api";

const PatientForm = () => {
  const [form, setForm] = useState<
    Omit<Patient, "_id" | "createdAt" | "updatedAt">
  >({
    name: "",
    age: 0,
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Paciente enviado:", form);
    addPatient(form);

    setForm({
      name: "",
      age: 0,
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-md w-full p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-sky-700">Agregar Paciente</h2>

      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Edad"
        value={form.age}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico (opcional)"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={form.address}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
        required
      />

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md w-full"
      >
        Agregar
      </button>
    </form>
  );
};

export default PatientForm;
