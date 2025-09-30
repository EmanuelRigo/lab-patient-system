import React from "react";
import GenericList from "@/components/generics/GenericList";
import patientApi from "@/services/patients.api";
import { Patient } from "../../../../../types/patient.types";
import GenericCard from "@/components/generics/GenericCard";
import GetPatients from "@/components/patientsPage/GetPatients";

const page = async () => {
  return (
    <div className="h-2/3 w-2/3 max-w-[600px] rounded-s-xl p-4 animate-slide  overflow-y-auto scrollbar-hidden flex flex-col border-2 border-neutral-300">
      <h1 className="text-2xl font-bold mb-4 text-neutral-800">Pacientes</h1>
      <GetPatients />
    </div>
  );
};

export default page;
