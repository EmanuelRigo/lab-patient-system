import React, { useState } from "react";
// Importamos un ícono para los estudios para darle un toque visual
import { ClipboardList, DollarSign } from "lucide-react";

const TalonForm = () => {
  // Asegúrate de que el componente use el nombre correcto si estás importando TalonForm,
  // aunque ya lo tienes definido como una función.
  const [studies, setStudies] = useState([
    { id: "radiografia", name: "Radiografía", price: 465, selected: false },
    { id: "tomografia", name: "Tomografía", price: 2000, selected: false },
    {
      id: "resonancia",
      name: "Resonancia Magnética",
      price: 3500,
      selected: false,
    },
    { id: "analisis", name: "Análisis de Sangre", price: 800, selected: false },
  ]);

  // Usamos 'any' en 'id' para evitar errores de TypeScript si no defines tipos, aunque
  // lo ideal es tipar la función.
  const handleCheckboxChange = (id: any) => {
    setStudies(
      studies.map((study) =>
        study.id === id ? { ...study, selected: !study.selected } : study
      )
    );
  };

  const total = studies.reduce((sum, study) => {
    return study.selected ? sum + study.price : sum;
  }, 0);

  const handlePay = () => {
    alert(`Se realizará el pago de un total de $${total}.`);
    // Aquí iría la lógica para procesar el pago.
  };

  return (
    <div className="bg-neutral-100 px-6 py-8 rounded-xl shadow-lg w-2/6 max-w-sm flex flex-col justify-between gap-6">
      {/* Título armonizado */}
      <div className="flex items-center justify-center border-b border-gray-300 pb-2">
        <h2 className="text-xl font-bold text-sky-800">
          Talonario de Estudios
        </h2>
      </div>

      {/* Lista de Estudios */}
      <div className="space-y-4">
        {studies.map((study) => (
          <div key={study.id} className="flex items-center justify-between">
            <label
              htmlFor={study.id}
              className="flex items-center cursor-pointer group w-full"
            >
              <input
                type="checkbox"
                id={study.id}
                checked={study.selected}
                onChange={() => handleCheckboxChange(study.id)}
                className="hidden peer" // Añadimos 'peer' para el estilo del círculo
              />

              {/* Ícono de la lista de estudios */}
              <ClipboardList className="w-4 h-4 text-sky-600 mr-2" />

              <span className="text-gray-700 flex-grow text-sm">
                {study.name}
              </span>

              {/* Círculo de selección (ahora usa la paleta sky/gray) */}
              <div
                className="w-5 h-5 border-2 border-sky-400 rounded-full flex items-center justify-center ml-4
                             transition-all duration-200 ease-in-out
                             peer-checked:bg-sky-500 peer-checked:border-sky-500"
              >
                {/* El punto blanco cuando está seleccionado (simulando un check) */}
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

      {/* Botón de Pago armonizado con el estilo del formulario principal */}
      <button
        onClick={handlePay}
        className="w-full py-3 rounded-lg bg-sky-900/80 text-white font-semibold text-lg
                   hover:bg-sky-600 transition-colors duration-300 shadow-md"
      >
        PAGAR
      </button>
    </div>
  );
};

export default TalonForm;
