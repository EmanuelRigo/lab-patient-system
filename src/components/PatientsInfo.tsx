import React from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

const patients = [
  { id: 1, name: "Juan Pérez", age: 30, diagnosis: "Gripe" },
  { id: 2, name: "María García", age: 25, diagnosis: "Alergia" },
  { id: 3, name: "Carlos López", age: 40, diagnosis: "Diabetes" },
  { id: 4, name: "Ana Martínez", age: 35, diagnosis: "Hipertensión" },
  { id: 5, name: "Luis Rodríguez", age: 50, diagnosis: "Asma" },
  { id: 6, name: "Laura Fernández", age: 28, diagnosis: "Migraña" },
  { id: 7, name: "Pedro Sánchez", age: 45, diagnosis: "Artritis" },
  { id: 8, name: "Sofía Ramírez", age: 32, diagnosis: "Bronquitis" },
  { id: 9, name: "Miguel Torres", age: 38, diagnosis: "Gastritis" },
  { id: 10, name: "Lucía Díaz", age: 27, diagnosis: "Anemia" },
];

const PatientsInfo = () => {
  return (
    <div className="w-2/6 h-full bg-red flex items-center justify-end animate-slide ">
      <div className="bg-sky-800 opacity-80 text-white h-4/6 p-6 rounded-s-md w-full relative">
        <Link
          href="/"
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <FaTimes className="text-2xl" />
        </Link>
        <h2 className="text-2xl font-bold mb-4">Lista de Pacientes</h2>
        <div className="overflow-y-auto h-5/6 scrollbar-custom">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className=" mb-2 p-2 pb-3 border-b-4 border-white border-opacity-20"
            >
              <p>
                <strong>Nombre:</strong> {patient.name}
              </p>
              <p>
                <strong>Edad:</strong> {patient.age}
              </p>
              <p>
                <strong>Diagnóstico:</strong> {patient.diagnosis}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsInfo;
