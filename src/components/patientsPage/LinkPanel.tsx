"use client";
import React from "react";
import ActionCard from "../atomics/ActionCard";
import { useLabSystemContext } from "@/context/LabContext";
import {
  PlusCircle,
  Users,
  FileText,
  DollarSign,
  TestTube,
  Building2,
} from "lucide-react";
import { usePathname } from "next/navigation";

const LinkPanel = () => {
  const { role } = useLabSystemContext();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() || "";

  const routeTitles: { [key: string]: string } = {
    patients: "Pacientes",
    "doctors-appointment": "Citas Médicas",
    "medical-studies": "Estudios Médicos",
    payments: "Pagos",
    results: "Resultados",
    talon: "Talonarios",
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-2/3 w-2/3 mx-auto bg-sky-200 overflow-hidden">
      {/* Círculo de fondo ABSOLUTE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2/3 w-[150%] h-[170%] bg-indigo-800 rounded-full z-0"></div>

      {/* Header con icono + lineas */}
      <div className="w-full flex flex-col items-center pt-10 pb-6 relative z-10">
        <div className="flex items-center justify-center w-full px-6">
          {/* Línea izquierda */}
          <span className="flex-grow border-t border-2 border-sky-300"></span>

          {/* Icono con círculo */}
          <div className="bg-sky-100 p-4 rounded-full mx-4 shadow-md">
            <Building2 className="w-10 h-10 text-sky-800" />
          </div>

          {/* Línea derecha */}
          <span className="flex-grow border-t border-2 border-sky-300"></span>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-sky-900 mt-4">
          {routeTitles[lastSegment] || lastSegment}
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-6 pb-12 relative z-10">
        {/* Patients */}
        {lastSegment === "patients" && (
          <>
            {role === "receptionist" && (
              <ActionCard
                icon={PlusCircle}
                title="Agregar Nuevo Paciente"
                description="Crea un nuevo registro de paciente en el sistema."
                href="/lab-dashboard/patients/add-patient"
              />
            )}
            {(role === "receptionist" ||
              role === "admin" ||
              role === "biochemist" ||
              role === "labTechnician") && (
              <ActionCard
                icon={Users}
                title="Ver Lista de Pacientes"
                description="Busca, edita y gestiona los pacientes existentes."
                href="/lab-dashboard/patients/patient-list"
              />
            )}
          </>
        )}

        {/* Doctors Appointment */}
        {lastSegment === "doctors-appointment" && (
          <>
            {role === "receptionist" && (
              <ActionCard
                icon={PlusCircle}
                title="Agregar Nueva Cita"
                description="Crea una nueva cita médica."
                href="/lab-dashboard/doctors-appointment/add-appointment"
              />
            )}
            {(role === "receptionist" || role === "admin") && (
              <ActionCard
                icon={Users}
                title="Ver Todas las Citas"
                description="Busca, edita y gestiona las citas médicas."
                href="/lab-dashboard/doctors-appointment/appointment-list"
              />
            )}
          </>
        )}

        {/* Medical Studies */}
        {lastSegment === "medical-studies" && (
          <>
            {(role === "admin" || role === "biochemist") && (
              <ActionCard
                icon={PlusCircle}
                title="Agregar Estudio Médico"
                description="Crea un nuevo estudio médico en el sistema."
                href="/medical-studies/add-study"
              />
            )}
            {(role === "admin" ||
              role === "biochemist" ||
              role === "labTechnician" ||
              role === "receptionist") && (
              <ActionCard
                icon={TestTube}
                title="Ver Estudios Médicos"
                description="Busca y gestiona los estudios médicos disponibles."
                href="/medical-studies/study-list"
              />
            )}
          </>
        )}

        {/* Payments */}
        {lastSegment === "payments" && (
          <>
            {role === "receptionist" && (
              <ActionCard
                icon={DollarSign}
                title="Registrar Nuevo Pago"
                description="Registra un nuevo pago de un paciente."
                href="/lab-dashboard/payments/add-payment"
              />
            )}
            {(role === "receptionist" || role === "admin") && (
              <ActionCard
                icon={Users}
                title="Ver Historial de Pagos"
                description="Consulta el historial de pagos y gestiona deudas."
                href="/lab-dashboard/payments/payment-list"
              />
            )}
          </>
        )}

        {/* Results */}
        {lastSegment === "results" && (
          <>
            {(role === "labTechnician" || role === "biochemist") && (
              <ActionCard
                icon={PlusCircle}
                title="Cargar Nuevo Resultado"
                description="Carga los resultados de un estudio médico."
                href="/lab-dashboard/results/add-result"
              />
            )}
            {(role === "receptionist" ||
              role === "admin" ||
              role === "biochemist" ||
              role === "labTechnician") && (
              <ActionCard
                icon={FileText}
                title="Ver Resultados"
                description="Busca, visualiza e imprime los resultados de los pacientes."
                href="/lab-dashboard/results/result-list"
              />
            )}
          </>
        )}

        {/* Talon */}
        {lastSegment === "talon" && (
          <>
            {role === "receptionist" && (
              <ActionCard
                icon={PlusCircle}
                title="Crear Nuevo Talonario"
                description="Genera un nuevo talonario para un paciente."
                href="/lab-dashboard/talon/add-talon"
              />
            )}
            {(role === "receptionist" || role === "admin") && (
              <ActionCard
                icon={FileText}
                title="Ver Talonarios"
                description="Busca y gestiona los talonarios existentes."
                href="/lab-dashboard/talon/talon-list"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LinkPanel;
