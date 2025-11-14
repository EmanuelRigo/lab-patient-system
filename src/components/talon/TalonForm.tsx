"use client";

import React, { useState, useEffect } from "react";
import { ClipboardList, DollarSign } from "lucide-react";
import medicalStudyApi from "@/services/medicalStudies.api";

interface Study {
  _id: string;
  name: string;
  price: number;
  selected: boolean;
}

const TalonForm = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Cargar los estudios desde la API al montar el componente
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await medicalStudyApi.getAll();
        const data = response;
        console.log("🚀 ~ fetchStudies ~ data:", data);
        const formatted = data.map((study: any) => ({
          _id: study._id,
          name: study.name,
          price: Math.floor(Number(study.price)),
          selected: false,
        }));
        setStudies(formatted);
      } catch (err) {
        console.error("Error loading studies:", err);
        setError("No se pudieron cargar los estudios.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setStudies((prev) =>
      prev.map((study) =>
        study._id === id ? { ...study, selected: !study.selected } : study
      )
    );
  };

  const total = studies.reduce((sum, study) => {
    return study.selected ? sum + study.price : sum;
  }, 0);

  const handlePay = () => {
    alert(`Se realizará el pago de un total de $${total}.`);
  };

  if (loading)
    return <p className="text-center text-gray-600">Cargando estudios...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-neutral-100 px-6 py-8 rounded-xl shadow-lg w-2/6 max-w-sm flex flex-col justify-between gap-6">
      {/* Título */}
      <div className="flex items-center justify-center border-b border-gray-300 pb-2">
        <h2 className="text-xl font-bold text-sky-800">
          Talonario de Estudios
        </h2>
      </div>

      {/* Lista de estudios */}
      <div className="space-y-4">
        {studies.map((study) => (
          <div key={study._id} className="flex items-center justify-between">
            <label
              htmlFor={study._id}
              className="flex items-center cursor-pointer group w-full"
            >
              <input
                type="checkbox"
                id={study._id}
                checked={study.selected}
                onChange={() => handleCheckboxChange(study._id)}
                className="hidden peer"
              />

              <ClipboardList className="w-4 h-4 text-sky-600 mr-2" />
              <span className="text-gray-700 flex-grow text-sm">
                {study.name}
              </span>

              <div
                className="w-5 h-5 border-2 border-sky-400 rounded-full flex items-center justify-center ml-4
                             transition-all duration-200 ease-in-out
                             peer-checked:bg-sky-500 peer-checked:border-sky-500"
              >
                <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-sky-300 pt-4 mt-2">
        <div className="flex items-center justify-between text-xl font-bold text-gray-800">
          <span className="flex items-center gap-2 text-sky-800">
            <DollarSign className="w-5 h-5" />
            Total:
          </span>
          <span>${total}</span>
        </div>
      </div>

      {/* Botón de Pago */}
      <button
        onClick={handlePay}
        disabled={total === 0}
        className={`w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md transition-colors duration-300
          ${
            total === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-900/80 hover:bg-sky-600"
          }`}
      >
        PAGAR
      </button>
    </div>
  );
};

export default TalonForm;
