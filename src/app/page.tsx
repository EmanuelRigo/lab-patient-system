"use client";
import CardsPanel from "@/components/homepage/CardsPanel";
import DaylyAppointments from "@/components/homepage/DaylyAppointments";

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
      <div className="h-2/3 w-full rounded-xl bg-white p-4 flex gap-6 ">
        <div className="w-5/7 flex flex-col">
          <div className=" p-4 rounded-md mb-8">
            <h2 className="font-bold text-2xl text-sky-900/80">
              ¡Bienvenido al sistema del laboratorio Mayra!
            </h2>
            <p className="text-sky-900/80 mt-2">
              Aquí puedes gestionar pacientes, estudios médicos y personal del
              laboratorio de manera eficiente.
            </p>
          </div>
          <CardsPanel></CardsPanel>
        </div>

        <DaylyAppointments></DaylyAppointments>
      </div>
    </div>
  );
}
