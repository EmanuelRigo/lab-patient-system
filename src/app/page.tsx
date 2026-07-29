"use client";

import DaylyAppointments from "@/components/homepage/DaylyAppointments";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudiesChartCard } from "@/components/dashboard/StudiesChartCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

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
  return (
    <div className="h-full w-full">
      <div className="mx-auto w-full max-w-[1560px] p-4 h-full">
        <div className="grid h-full grid-cols-5 grid-rows-[3rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_8.5rem_2.5rem] gap-2 2xl:grid-rows-[4rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_8.5rem_2.5rem]">
          {/* 1 - Stats */}
          <section className="col-span-5 h-12">
            <StatsCards />
          </section>

          {/* 2 - Contenido principal */}
          <section className="col-span-4 row-span-3 row-start-2 flex h-full min-h-0 flex-col">
            <StudiesChartCard
              data={studiesChartData}
              period="7d"
              onPeriodChange={() => undefined}
              onViewReport={() => undefined}
            />
          </section>

          {/* 4 - Panel lateral */}
          <section className="col-start-5 row-span-3 row-start-2 flex h-full min-h-0 flex-col">
            <DaylyAppointments />
          </section>

          {/* 5 - Resumen de resultados */}
          <section className="col-span-5 row-start-5 grid h-[8.5rem] min-h-0 grid-cols-3 gap-2">
            <ResultsStatusCard data={resultsStatus} />
            <TopStudiesCard
              studies={topStudies}
              onViewAll={() => console.log("Ver todos")}
            />
            <RecentResultsCard results={recentResults} />
          </section>

          {/* 3 - Acciones rápidas */}
          <section className="col-span-5 row-start-6 h-10 min-h-0">
            <QuickActions />
          </section>
        </div>
      </div>
    </div>
  );
}
