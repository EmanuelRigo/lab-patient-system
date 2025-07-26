import React from "react";
import Link from "next/link";
import RoleWrapper from "@/components/generics/RoleWrapper";

const page = () => {
  return (
    <div className="h-full flex flex-col gap-4">
      <RoleWrapper allowedRoles={["LabTechnician"]}>
        <Link
          href="results/add-result"
          className="bg-sky-500 rounded-lg p-4 text-white"
        >
          Agregar resultado
        </Link>
      </RoleWrapper>

      <Link
        href="results/list-results"
        className="bg-sky-500 rounded-lg p-4 text-white"
      >
        Ver resultados
      </Link>
    </div>
  );
};

export default page;
