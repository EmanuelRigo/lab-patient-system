"use client";

import React, { useEffect, useState } from "react";
import GenericTable from "./GenericTable";
import patientsApi from "@/services/patients.api";
import { Patient } from "../../../types/patient.types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const GetPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await patientsApi.getAll();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <GenericTable<Patient>
      items={patients}
      getKey={(p) => p._id!}
      emptyMessage="No hay pacientes registrados."
      className="scrollbar-hidden"
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
                <button className="p-2 rounded-md hover:bg-white/70 my-2 transition">
                  <MoreVertical className="" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Ver", p._id)}>
                  Ver datos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Editar", p._id)}>
                  Editar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ]}
    />
  );
};

export default GetPatients;
