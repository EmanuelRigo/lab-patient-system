"use client";

import React, { useState } from "react";

const LabStaffForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "LabTechnician",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando personal:", form);
    // Aquí podrías hacer el POST al backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col gap-4 max-w-md"
    >
      <h2 className="text-xl font-semibold text-sky-700">Agregar Personal</h2>

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded-md"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded-md"
        required
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 rounded-md"
      >
        <option value="LabTechnician">Técnico de Laboratorio</option>
        <option value="Secretary">Secretaria</option>
        <option value="Admin">Administrador</option>
      </select>

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md"
      >
        Guardar
      </button>
    </form>
  );
};

export default LabStaffForm;
