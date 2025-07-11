"use client";
import React from "react";

interface GenericCardProps<T> {
  item: T;
  title: keyof T; // campo principal
  fields: (keyof T)[]; // campos extra a mostrar
}

// Diccionario de traducción para los labels
const fieldLabels: Record<string, string> = {
  price: "Precio",
  role: "Rol",
  age: "Edad",
  email: "Correo",
  phone: "Teléfono",
  address: "Dirección",
  createdAt: "Creado",
  updatedAt: "Actualizado",
  name: "Nombre",
  title: "Título",
};

const GenericCard = <T,>({ item, title, fields }: GenericCardProps<T>) => (
  <div
    className="border border-gray-300 p-4 rounded-lg shadow-md bg-white
               hover:bg-sky-50 transition-colors"
  >
    <h3 className="text-lg font-bold text-sky-800">{String(item[title])}</h3>

    {fields.map((field) => (
      <p key={String(field)} className="text-sm text-gray-600">
        <strong>{fieldLabels[String(field)] ?? String(field)}:</strong>{" "}
        {String(item[field])}
      </p>
    ))}
  </div>
);

export default GenericCard;
