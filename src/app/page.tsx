"use client";
import ButtonPanel from "@/components/homepage/ButtonPanel";

import { useLabSystemContext } from "@/context/LabContext";

export default function DashboardButtons() {
  const { role } = useLabSystemContext();

  return (
    <div className="h-full w-full flex items-center justify-center bg-red-500">
      {/* {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={
            role as "Admin" | "Receptionist" | "LabTechnician" | "Biochemist"
          }
        />
      )} */}
      Bienvenido
    </div>
  );
}
