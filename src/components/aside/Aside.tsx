"use client";
import ButtonPanel from "@/components/homepage/ButtonPanel";

import { useLabSystemContext } from "@/context/LabContext";
import AsideMenu from "./AsideMenu";

export default function Aside() {
  const { role } = useLabSystemContext();

  return (
    <div className="h-full flex items-center justify-center  ">
      {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={
            role as "Admin" | "Receptionist" | "LabTechnician" | "Biochemist"
          }
        />
      )}
      <div className="bg-red-500">
        <h1>hola</h1>
      </div>
      {/* <AsideMenu
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        isLoginPath={pathname === "/login"}
        role={role}
      /> */}
    </div>
  );
}
