"use client";

import DaylyAppointments from "@/components/homepage/DaylyAppointments";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudiesChartCard } from "@/components/dashboard/StudiesChartCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

import { useLabSystemContext } from "@/context/LabContext";
import CurrentDateCard from "@/components/topbar/actions/CurrentDateCard";

import { ResultsStatusCard } from "@/components/RecentResultCard/ResultsStatusCard";
import { TopStudiesCard } from "@/components/TopStudiesCard/TopStudiesCard";
import {
  RecentResultsCard,
  RecentResultItem,
} from "@/components/ResultsStatusCard/RecentResultsCard";

const studiesChartData = [
  { date: "01/05", studies: 22 },
  { date: "02/05", studies: 28 },
  { date: "03/05", studies: 34 },
  { date: "04/05", studies: 26 },
  { date: "05/05", studies: 31 },
  { date: "06/05", studies: 38 },
  { date: "07/05", studies: 44 },
];

const resultsStatus = [
  {
    id: "completed",
    label: "Completados",
    value: 1987,
    color: "var(--color-success-500)",
  },
  {
    id: "processing",
    label: "En proceso",
    value: 315,
    color: "var(--color-primary-500)",
  },
  {
    id: "pending",
    label: "Pendientes",
    value: 38,
    color: "var(--color-warning-500)",
  },
  {
    id: "cancelled",
    label: "Cancelados",
    value: 23,
    color: "var(--color-danger-500)",
  },
];

const topStudies = [
  {
    id: "1",
    name: "Hemograma",
    quantity: 182,
    percentage: 28,
  },
  {
    id: "2",
    name: "Glucosa",
    quantity: 145,
    percentage: 22,
  },
  {
    id: "3",
    name: "Perfil Lipídico",
    quantity: 101,
    percentage: 15,
  },
  {
    id: "4",
    name: "TSH",
    quantity: 82,
    percentage: 12,
  },
];

const recentResults: RecentResultItem[] = [
  {
    id: "1",
    patient: "Juan Pérez",
    study: "Hemograma",
    status: "completed",
    date: "Hace 10 min",
    color: "var(--color-success-500)",
  },
  {
    id: "2",
    patient: "María López",
    study: "Glucemia",
    status: "processing",
    date: "Hace 25 min",
    color: "var(--color-warning-500)",
  },
  {
    id: "3",
    patient: "Carlos Gómez",
    study: "Perfil Lipídico",
    status: "pending",
    date: "Hace 1 h",
    color: "var(--color-info-500)",
  },
];

export default function DashboardButtons() {
  const { role } = useLabSystemContext();

  return (
    <div className="h-full w-full">
      <div className="mx-auto w-full max-w-[1560px] p-4 h-full">
        <div className="grid h-full grid-cols-5 grid-rows-[3rem_4rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_10rem_0_2.5rem] gap-2 2xl:grid-rows-[4rem_4rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_10rem_0_2.5rem]">
          {/* 1 - Header */}
          <section className="col-span-5 h-12 2xl:h-16">
            <div className="flex h-full items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text-primary 2xl:text-2xl">
                  ¡Bienvenido al sistema del laboratorio Mayra!
                </h2>

                <p className="mt-1 text-xs leading-none text-text-secondary 2xl:mt-2 2xl:text-base 2xl:leading-normal">
                  Aquí puedes gestionar pacientes, estudios médicos y personal
                  del laboratorio de manera eficiente.
                </p>
              </div>

              <CurrentDateCard />
            </div>
          </section>

          {/* 2 - Stats */}
          <section className="col-span-5 h-16 row-start-2">
            <StatsCards />
          </section>

          {/* 3 - Contenido principal */}
          <section className="col-span-4 row-span-3 row-start-3 flex h-full min-h-0 flex-col">
            <StudiesChartCard
              data={studiesChartData}
              period="7d"
              onPeriodChange={() => undefined}
              onViewReport={() => undefined}
            />
          </section>

          {/* 5 - Panel lateral */}
          <section className="row-span-3 col-start-5 row-start-3 flex h-full min-h-0 flex-col">
            <DaylyAppointments />
          </section>

          {/* 4 - Acciones rápidas */}
          <section className="col-span-5 mt-2 h-10 row-start-8">
            <QuickActions />
          </section>

          {/* 6 - Resumen de resultados */}
          <section className="col-span-5 h-40 row-span-2 row-start-6 grid grid-cols-3 gap-2">
            <ResultsStatusCard data={resultsStatus} />
            <TopStudiesCard
              studies={topStudies}
              onViewAll={() => console.log("Ver todos")}
            />
            <RecentResultsCard results={recentResults} />
          </section>
        </div>
      </div>
    </div>
  );
}
