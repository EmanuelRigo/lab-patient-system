"use client";

import React, { useState } from "react";
import { Patient } from "../../../types/patient.types";
import patientsApi from "@/services/patients.api";
import ErrorModal from "../atomics/ErrorModal";
type PatientFormState = {
  firstName: string;
  lastName: string;
  secondName: string;
  age: string;
  dni: string;
  email: string;
  phone: string;
  address: string;
};

const PatientForm = () => {
  const [form, setForm] = useState<PatientFormState>({
    firstName: "",
    lastName: "",
    secondName: "",
    age: "",
    dni: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await patientsApi.create({
        ...form,
        age: Number(form.age),
        dni: Number(form.dni),
      });

      // Limpiar solo si fue exitoso
      setForm({
        firstName: "",
        secondName: "",
        lastName: "",
        age: "",
        dni: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el paciente:", error.message);
        setError(error.message);
      } else {
        console.error("Error desconocido:", error);
        setError("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-sky-700">Agregar Paciente</h2>
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />{" "}
        <input
          type="text"
          name="secondName"
          placeholder="Segundo Nombre (opcional)"
          value={form.secondName}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />{" "}
        <input
          type="text"
          name="Apellido"
          placeholder="Apellido"
          value={form.lastName}
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
          type="number"
          name="dni"
          placeholder="DNI"
          value={form.dni}
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

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  );
};

export default PatientForm;
