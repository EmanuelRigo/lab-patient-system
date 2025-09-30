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
    <div className="border-2 rounded-lg p-4 flex flex-col gap-4 grow-1 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-600 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar paciente por nombre..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="pl-9 border-2 border-sky-500 px-3 py-2 rounded-md focus:outline-none transition w-full"
          />
        </div>

        <div className="flex gap-2">
          <Link href="/lab-dashboard/patients/add-patient">
            <button className="bg-sky-500 text-white px-5 py-3 rounded-md hover:bg-sky-600 transition">
              Nuevo Paciente
            </button>
          </Link>

          <button
            onClick={() => setShowFilter(true)}
            className="border-2 border-neutral-300 px-4 py-2 rounded-md hover:border-sky-600 text-neutral-400 hover:text-sky-600 transition flex items-center gap-2"
          >
            <Plus></Plus>
            Filtrar
          </button>

          <button
            onClick={() => setSortAsc((prev) => !prev)}
            className="border-2 border-neutral-300 text-neutral-400 px-3 py-2 rounded-md hover:text-sky-600 transition"
          >
            {sortAsc ? (
              <ArrowBigDown></ArrowBigDown>
            ) : (
              <ArrowBigUp></ArrowBigUp>
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Filtrar pacientes</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  placeholder="Ej: 555-123-4567"
                  className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-4 py-2 rounded-md border hover:border-sky-600 hover:text-sky-600 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="grow-1 overflow-y-auto">
        <GenericTable<Patient>
          items={filteredPatients}
          getKey={(p) => p._id!}
          emptyMessage="No hay pacientes registrados."
          columns={[
            {
              label: "Nombre",
              render: (p) => `${p.firstname} ${p.lastname}`,
            },
            {
              label: "Fecha de nacimiento",
              render: (p) => new Date(p.birthDate).toLocaleDateString("es-AR"),
            },
            {
              label: "",
              render: (p) => (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md hover:bg-white/80 my-2 px-2 transition">
                      <MoreHorizontal className="" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log("Ver", p._id)}>
                      Ver datos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Editar", p._id)}
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
  );
};

export default GetPatients;
