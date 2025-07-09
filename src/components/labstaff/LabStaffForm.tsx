"use client";

import React, { useState } from "react";
import { createUser } from "@/services/labStaff.api";
import { create } from "domain";
import { LabStaffRole } from "../../../types/labStaff.types";

const LabStaffForm = () => {
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: LabStaffRole; // ✅ lo importante
  }>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "LabTechnician", // ✅ valor inicial válido
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
      password: form.password,
      email: form.email,
      phone: form.phone,
      role: form.role as LabStaffRole,
    };

    console.log("Enviando personal:", payload);
    createUser(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  w-full p-6 rounded-lg shadow-md mb-6 flex flex-col gap-4 "
    >
      <h2 className="text-xl font-semibold text-sky-700">Agregar Personal</h2>

      <div className="flex gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={form.firstName}
          onChange={handleChange}
          className="border p-2 rounded-md w-1/2"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={form.lastName}
          onChange={handleChange}
          className="border p-2 rounded-md w-1/2"
          required
        />
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded-md w-1/2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded-md w-1/2"
          required
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded-md"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
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
        <option value="" disabled>
          Selecciona un rol
        </option>

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
