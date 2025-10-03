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
import { FaHospitalAlt } from "react-icons/fa";
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
    <div
      className=" h-full relative flex flex-col items-center justify-center mx-auto overflow-hidden rounded-4xl
  opacity-0  animate-fade-in"
    >
      {/* Círculo de fondo ABSOLUTE */}

      {/* Header con icono + lineas */}
      <div className="w-full flex flex-col items-center pt-10 mb-6 z-10">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-sky-100/70 absolute top-36">
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
