"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import GenericTable from "./GenericTable";
import patientsApi from "@/services/patients.api";
import { Patient } from "../../../types/patient.types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  Plus,
  ArrowBigDown,
  ArrowBigUp,
  UserPlus,
} from "lucide-react";

const GetPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await patientsApi.getAll();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients
    .filter((p) =>
      `${p.firstname} ${p.lastname}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.firstname.localeCompare(b.firstname)
        : b.firstname.localeCompare(a.firstname)
    );

  return (
    // 1. Contenedor principal: Ocupa toda la altura (h-full) y usa flexbox.
    <div className="h-full relative flex flex-col items-center justify-start pt-32 mx-auto overflow-hidden pb-8">
      {/* 2. Título (Fijo) */}
      <div className="w-full flex flex-col items-center pt-10 mb-16 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-100/70 absolute top-36">
          Listado de Pacientes
        </h1>
      </div>

      {/* 3. Contenedor de la Tarjeta Principal (Tabla y Controles) */}
      <div className="w-full max-w-6xl mx-auto bg-neutral-100 rounded-xl shadow-lg p-8 flex flex-col gap-6  z-20 flex-grow min-h-0 max-h-2/3">
        {/* 4. Barra de Controles: Se ajusta para seguir el orden de la imagen (Búsqueda + Botones) */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          {/* Búsqueda */}
          <div className="relative flex-grow min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar paciente por nombre o DNI..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              // Estilos de input simplificados para coincidir con la apariencia de la imagen
              className="pl-9 bg-white px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-900/80 cursor-text transition w-full shadow-sm"
            />
          </div>

          {/* Botones: Agrupados a la derecha */}
          <div className="flex gap-3">
            {/* Botón Nuevo Paciente - Estilo primario */}
            <Link href="/lab-dashboard/patients/add-patient">
              <button className="bg-sky-900/80 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition flex items-center gap-2 font-semibold shadow-md whitespace-nowrap">
                <UserPlus className="w-5 h-5" />
                Nuevo Paciente
              </button>
            </Link>

            {/* Botón Filtrar - Estilo secundario */}
            <button
              onClick={() => setShowFilter(true)}
              className="bg-white px-4 py-2 rounded-lg hover:ring-sky-900/80 cursor-pointer text-gray-700 hover:ring-2 hover:text-sky-600 transition flex items-center gap-2 font-medium shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Filtrar
            </button>

            {/* Botón de Ordenamiento (Asc/Desc) */}
            <button
              onClick={() => setSortAsc((prev) => !prev)}
              className=" bg-white text-sky-600 px-3 py-2 rounded-lg hover:ring-2 hover:ring-sky-900/80 cursor-pointer  transition shadow-sm"
              title={sortAsc ? "Orden Ascendente" : "Orden Descendente"}
            >
              {sortAsc ? (
                <ArrowBigDown className="w-5 h-5" />
              ) : (
                <ArrowBigUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* 5. Contenedor de la Tabla: Scroll solo en la tabla */}
        <div className="flex-grow overflow-y-auto">
          <GenericTable<Patient>
            items={filteredPatients}
            getKey={(p) => p._id!}
            emptyMessage="No hay pacientes registrados que coincidan con la búsqueda."
            columns={[
              {
                label: "Nombre Completo",
                render: (p) =>
                  `${p.firstname} ${p.secondname ? p.secondname + " " : ""}${
                    p.lastname
                  }`,
              },
              // Se elimina el DNI de las columnas
              // {
              //   label: "DNI",
              //   render: (p) => p.dni,
              // },
              {
                label: "Fecha de Nacimiento",
                render: (p) =>
                  new Date(p.birthDate).toLocaleDateString("es-AR"),
              },
              {
                label: "Teléfono",
                render: (p) => p.phone,
              },
              {
                label: "",
                render: (p) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-md py-3 hover:bg-sky-200/50 transition">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white shadow-lg rounded-md p-1"
                    >
                      <DropdownMenuItem
                        onClick={() => console.log("Ver", p._id)}
                        className="cursor-pointer hover:bg-sky-50 transition rounded-sm p-2 text-sm"
                      >
                        Ver datos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Editar", p._id)}
                        className="cursor-pointer hover:bg-sky-50 transition rounded-sm p-2 text-sm"
                      >
                        Editar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* Modal de Filtro (sin cambios) */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-sky-600">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Filtrar Pacientes
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  placeholder="Ej: 555-123-4567"
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition font-semibold shadow-md"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetPatients;
