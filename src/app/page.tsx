"use client";
import CardsPanel from "@/components/homepage/CardsPanel";
import DaylyAppointments from "@/components/homepage/DaylyAppointments";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudiesChartCard } from "@/components/dashboard/StudiesChartCard";

import { DASHBOARD_PANEL_HEIGHT } from "@/constants/dashboard";
import { useLabSystemContext } from "@/context/LabContext";
import CurrentDateCard from "@/components/topbar/actions/CurrentDateCard";
import { ResultsStatusCard } from "@/components/RecentResultCard/ResultsStatusCard";
import { TopStudiesCard } from "@/components/TopStudiesCard/TopStudiesCard";
import { RecentResultsCard } from "@/components/ResultsStatusCard/RecentResultsCard";
import { ResultStatus } from "../../types/ResultStatus";
import { RecentResultItem } from "@/components/ResultsStatusCard/RecentResultsCard";

const studiesChartData = [
  { date: "01/05", studies: 22 },
  { date: "02/05", studies: 28 },
  { date: "03/05", studies: 34 },
  { date: "04/05", studies: 26 },
  { date: "05/05", studies: 31 },
  { date: "06/05", studies: 38 },
  { date: "07/05", studies: 44 },
];
// BORRAR - borrar
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
    color: "var(--color-brand-500)",
  },
  {
    id: "2",
    name: "Glucosa",
    quantity: 145,
    percentage: 22,
    color: "var(--color-success-500)",
  },
  {
    id: "3",
    name: "Perfil Lipídico",
    quantity: 101,
    percentage: 15,
    color: "var(--color-warning-500)",
  },
  {
    id: "4",
    name: "TSH",
    quantity: 82,
    percentage: 12,
    color: "var(--color-info-500)",
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
  console.log("🚀 ~ DashboardButtons ~ role:", role);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center ">
      <div className="w-full max-w-[1560px] rounded-xl p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold text-2xl text-text-primary">
                ¡Bienvenido al sistema del laboratorio Mayra!
              </h2>
              <p className="mt-2 text-text-secondary">
                Aquí puedes gestionar pacientes, estudios médicos y personal del
                laboratorio de manera eficiente.
              </p>
            </div>
            <CurrentDateCard></CurrentDateCard>
          </div>

          <StatsCards />

          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="grid gap-6 xl:grid-cols-4">
              <div className="xl:col-span-3">
                <StudiesChartCard
                  data={studiesChartData}
                  period="7d"
                  onPeriodChange={() => undefined}
                  onViewReport={() => undefined}
                />
              </div>

              <div>
                <DaylyAppointments />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid gap-6 xl:grid-cols-3">
              <ResultsStatusCard data={resultsStatus} />

              <TopStudiesCard
                studies={topStudies}
                onViewAll={() => console.log("Ver todos")}
              />

              <RecentResultsCard results={recentResults}></RecentResultsCard>
            </div>

            {/* Row 3 */}
            <div>{/* <RecentActivityTable /> */}</div>
          </div>

          {/* <CardsPanel /> */}
        </div>
      </div>
    </div>
  );
}
