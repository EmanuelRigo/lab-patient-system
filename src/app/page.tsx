"use client";
import CardsPanel from "@/components/homepage/CardsPanel";
import DaylyAppointments from "@/components/homepage/DaylyAppointments";
import { StatsCards } from "@/components/dashboard/StatsCards";

import { useLabSystemContext } from "@/context/LabContext";

export default function DashboardButtons() {
  const { role } = useLabSystemContext();
  console.log("🚀 ~ DashboardButtons ~ role:", role);

  return (
    <div className="h-full w-screen 2xl:w-full flex flex-col  items-center justify-center bg-green-900">
      {/* {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={
            role as "admin" | "role_receptionist" | "role_lab_technician" | "role_biochemist"
          }
        />
      )} */}
      <div className="w-full h-screen 2xl:h-3/4 rounded-xl  bg-white p-4 flex flex-col gap-6 ">
        {/* CardPanel */}
        <div className="w-full flex flex-col">
          <h2 className="font-bold text-2xl  text-sky-900/80 mb-10 mt-2">
            ¡Bienvenido al sistema del laboratorio Mayra!
            {role}
          </h2>
          <div className=" p-4 rounded-md mb-8">
            <p className="text-sky-900/80 mt-2">
              Aquí puedes gestionar pacientes, estudios médicos y personal del
              laboratorio de manera eficiente.
            </p>
          </div>

          {/* Métricas principales */}
          <StatsCards />

          <div className="mt-8 flex gap-6">
            <CardsPanel></CardsPanel>
            <DaylyAppointments></DaylyAppointments>
          </div>
        </div>
      </div>
    </div>
  );
}
