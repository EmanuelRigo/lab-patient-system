"use client";
import ButtonPanel from "@/components/homepage/ButtonPanel";

import { useLabSystemContext } from "@/context/LabContext";

export default function DashboardButtons() {
  const { role } = useLabSystemContext();

  return (
    <div className="h-full flex items-center justify-center ">
      {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={
            role as "Admin" | "Receptionist" | "LabTechnician" | "Biochemist"
          }
        />
      )}
    </div>
  );
}
