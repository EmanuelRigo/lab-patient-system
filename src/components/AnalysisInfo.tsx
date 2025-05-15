"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaTimes, FaInfoCircle } from "react-icons/fa";

const analyses = [
  {
    id: 1,
    name: "Análisis de Sangre",
    details: "Detalles del análisis de sangre.",
  },
  {
    id: 2,
    name: "Análisis de Orina",
    details: "Detalles del análisis de orina.",
  },
  {
    id: 3,
    name: "Análisis de Heces",
    details: "Detalles del análisis de heces.",
  },
  {
    id: 4,
    name: "Análisis de Glucosa",
    details: "Detalles del análisis de glucosa.",
  },
  {
    id: 5,
    name: "Análisis de Colesterol",
    details: "Detalles del análisis de colesterol.",
  },
  {
    id: 6,
    name: "Análisis de Triglicéridos",
    details: "Detalles del análisis de triglicéridos.",
  },
  {
    id: 7,
    name: "Análisis de Hemoglobina",
    details: "Detalles del análisis de hemoglobina.",
  },
  {
    id: 8,
    name: "Análisis de Creatinina",
    details: "Detalles del análisis de creatinina.",
  },
  {
    id: 9,
    name: "Análisis de Urea",
    details: "Detalles del análisis de urea.",
  },
  {
    id: 10,
    name: "Análisis de Ácido Úrico",
    details: "Detalles del análisis de ácido úrico.",
  },
];

const AnalysisInfo = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const handleInfoClick = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  return (
    <div className="w-3/6 h-full bg-red flex items-center justify-end animate-slide">
      <div className="bg-sky-800 opacity-80 text-white h-4/6 p-6 rounded-s-md w-full relative">
        <Link
          href="/"
          className="absolute top-4 right-4 text-white hover:text-gray-300 duration-200"
        >
          <FaTimes className="text-2xl" />
        </Link>
        <h2 className="text-2xl font-bold mb-4">Lista de Análisis</h2>
        <div className="overflow-y-auto h-5/6 scrollbar-custom">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="mb-2 p-2 flex justify-between items-center hover:bg-white/20 duration-200 rounded-s-md"
            >
              <div>
                <p className="text-white">{analysis.name}</p>
              </div>
              <button
                onClick={() => handleInfoClick(analysis)}
                className="text-white hover:text-white transition-colors duration-200"
              >
                <FaInfoCircle className="text-xl" />
              </button>
            </div>
          ))}
        </div>
        {selectedAnalysis && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex rounded items-center justify-center">
            <div className="bg-white text-black p-6 rounded shadow-md w-3/4">
              <h3 className="text-xl font-bold mb-4">
                {selectedAnalysis.name}
              </h3>
              <p>{selectedAnalysis.details}</p>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="mt-4 bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800 transition-colors duration-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisInfo;
