"use client";
import React from "react";
import Link from "next/link";

interface GenericCardProps<T> {
  item: T;
  id: keyof T;
  title: keyof T;
  fields: (keyof T)[];
  basePath: string; // <-- nueva prop
}

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

const GenericCard = <T,>({
  item,
  id,
  title,
  fields,
  basePath,
}: GenericCardProps<T>) => {
  const itemId = String(item[id]);

  return (
    <Link
      href={`/${basePath}/${itemId}`}
      className="border flex flex-col border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-sky-50 transition-colors"
    >
      <h3 className="text-lg font-bold text-sky-800">{String(item[title])}</h3>

      {fields.map((field) => (
        <p key={String(field)} className="text-sm text-gray-600">
          <strong>{fieldLabels[String(field)] ?? String(field)}:</strong>{" "}
          {String(item[field])}
        </p>
      ))}
    </Link>
  );
};

export default GenericCard;
