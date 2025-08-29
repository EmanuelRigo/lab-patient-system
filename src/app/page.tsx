"use client";

import { useLabSystemContext } from "@/context/LabContext";

export default function DashboardButtons() {
  const { role } = useLabSystemContext();

  return (
    <div className="h-full w-full flex items-center justify-center">
      {/* {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={
            role as "admin" | "role_receptionist" | "role_lab_technician" | "role_biochemist"
          }
        />
      )} */}
      Bienvenido
    </div>
  );
}
