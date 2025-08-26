"use client";
import ButtonPanel from "@/components/homepage/ButtonPanel";

import { useLabSystemContext } from "@/context/LabContext";
// import AsideMenu from "./AsideMenu";

export default function Aside() {
  const { role } = useLabSystemContext();

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50/90 p-8">
      aside
      {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={
            role as
              | "role_admin"
              | "Receptionist"
              | "LabTechnician"
              | "Biochemist"
          }
        />
      )}
      {/* <AsideMenu
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        isLoginPath={pathname === "/login"}
        role={role}
      /> */}
    </div>
  );
}
