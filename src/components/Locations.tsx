import React from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

const Locations = () => {
  return (
    <div className="w-2/6 h-full bg-red flex items-center justify-end animate-slide ">
      <div className="bg-sky-800 opacity-80 text-white h-4/6 p-6 rounded-s-md shadow-md w-full relative">
        <Link
          href="/"
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <FaTimes className="text-2xl" />
        </Link>
        <h2 className="text-2xl font-bold mb-4">Ubicación</h2>
        <p className="mb-2">
          <strong>Nombre:</strong> Laboratorio Clínico Central
        </p>
        <p className="mb-2">
          <strong>Dirección:</strong> Calle Falsa 123, Ciudad, País
        </p>
        <p className="mb-2">
          <strong>Teléfono:</strong> +123 456 7890
        </p>
        <p className="mb-2">
          <strong>Email:</strong> contacto@labclinico.com
        </p>
        <p className="mb-2">
          <strong>Horario:</strong> Lunes a Viernes, 8:00 AM - 5:00 PM
        </p>
        <p className="mb-2">
          <strong>Descripción:</strong> Laboratorio especializado en análisis
          clínicos y pruebas de diagnóstico.
        </p>
      </div>
    </div>
  );
};

export default Locations;
