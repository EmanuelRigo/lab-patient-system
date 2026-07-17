"use client";
import CardsPanel from "@/components/homepage/CardsPanel";
import DaylyAppointments from "@/components/homepage/DaylyAppointments";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudiesChartCard } from "@/components/dashboard/StudiesChartCard";

import { useLabSystemContext } from "@/context/LabContext";

const studiesChartData = [
  { date: "01/05", studies: 22 },
  { date: "02/05", studies: 28 },
  { date: "03/05", studies: 34 },
  { date: "04/05", studies: 26 },
  { date: "05/05", studies: 31 },
  { date: "06/05", studies: 38 },
  { date: "07/05", studies: 44 },
];

export default function DashboardButtons() {
  const { role } = useLabSystemContext();
  console.log("🚀 ~ DashboardButtons ~ role:", role);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background px-4 py-6">
      <div className="w-full max-w-[1560px] rounded-xl bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-bold text-2xl text-text-primary">
              ¡Bienvenido al sistema del laboratorio Mayra!
            </h2>
            <p className="mt-2 text-text-secondary">
              Aquí puedes gestionar pacientes, estudios médicos y personal del
              laboratorio de manera eficiente.
            </p>
          </div>

          <StatsCards />

          <StudiesChartCard
            data={studiesChartData}
            period="7d"
            onPeriodChange={() => undefined}
            onViewReport={() => undefined}
          />

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <CardsPanel />
            <DaylyAppointments />
          </div>
        </div>
      </div>
    </div>
  );
}
