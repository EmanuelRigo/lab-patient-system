"use client";
import ButtonPanel from "@/components/homepage/ButtonPanel";
import { useLabSystemContext } from "@/context/LabContext";

export default function Aside() {
  const { role } = useLabSystemContext();

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50/90 p-8">
      {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <>
          <ButtonPanel
            role={
              role as "admin" | "receptionist" | "lab_technician" | "biochemist"
            }
          />

          <button className="bg-sky-500 hover:bg-sky-600 text-neutral-100 p-4 rounded-md w-full mt-8">
            Cerrar sesion
          </button>
        </>
      )}
    </div>
  );
}
