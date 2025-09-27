import React from "react";
import GenericList from "@/components/generics/GenericList";
import patientApi from "@/services/patients.api";
import { Patient } from "../../../../../types/patient.types";
import GenericCard from "@/components/generics/GenericCard";

const page = async () => {
  const patients = await patientApi.getAll();
  console.log("🚀 ~ page ~ patients:", patients);
  return (
    <div className="bg-sky-800/80 h-2/3 w-2/3 rounded-s-xl p-4 animate-slide text-white">
      <GenericList<Patient>
        items={patients}
        getKey={(p) => p._id!}
        emptyMessage="No hay pacientes registrados."
        className="scrollbar-hidden overflow-y-auto"
        Card={({ data }) => (
          <GenericCard
            item={data}
            title="firstname"
            id="_id"
            fields={["birthDate", "phone", "address"]}
            basePath="lab-dashboard/patients/"
          />
        )}
      />
    </div>
  );
};

export default page;
