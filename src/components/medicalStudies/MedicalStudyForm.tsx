"use client";

import React, { useState } from "react";
import medicalStudiesApi from "@/services/medicalStudies.api";

const MedicalStudyForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      duration: parseInt(form.duration),
    };

    console.log("📦 Enviando estudio médico:", payload);
    await medicalStudiesApi.create(payload);

    // (Opcional) reset form
    setForm({
      name: "",
      price: "",
      description: "",
      duration: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col gap-4 w-full"
    >
      <h2 className="text-xl font-semibold text-sky-700">
        Agregar Estudio Médico
      </h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre del estudio"
        required
        className="border p-2 rounded-md"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Precio"
        required
        className="border p-2 rounded-md"
        min={0}
        step="0.01"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        required
        className="border p-2 rounded-md"
        rows={3}
      />

      <input
        type="number"
        name="duration"
        value={form.duration}
        onChange={handleChange}
        placeholder="Duración en minutos"
        required
        className="border p-2 rounded-md"
        min={0}
      />

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md"
      >
        Guardar
      </button>
    </form>
  );
};

export default MedicalStudyForm;
