"use client";
import React from "react";
import { MedicalStudy } from "../../../types/medicalStudy.types";
import Link from "next/link";

interface CardMedicalStudiesProps {
  study: MedicalStudy;
}

const CardMedicalStudies = ({ study }: CardMedicalStudiesProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white  w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-sky-800 mb-2">{study.name}</h2>

      <p className="text-gray-700 mb-1">
        <strong>Precio:</strong> ${study.price}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>Duración:</strong> {study.duration} minutos
      </p>

      <p className="text-gray-700 mb-4">
        <strong>Descripción:</strong> {study.description}
      </p>

      <Link
        href={`/medical-studies/edit/${study._id}`}
        className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md"
      >
        Editar
      </Link>
    </div>
  );
};

export default CardMedicalStudies;
