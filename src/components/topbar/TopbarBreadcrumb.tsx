"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

/**
 * Mapa de segmentos de ruta a etiquetas legibles.
 * Si un segmento no aparece acá, se muestra capitalizado.
 */
const ROUTE_LABELS: Record<string, string> = {
  "lab-dashboard": "Dashboard",
  patients: "Pacientes",
  "add-patient": "Nuevo paciente",
  "patient-list": "Listado de pacientes",
  "doctors-appointment": "Citas",
  "create-appointment": "Nueva cita",
  "appointment-list": "Listado de citas",
  results: "Resultados",
  "add-result": "Nuevo resultado",
  payments: "Cobros",
  talon: "Talones",
  "medical-studies": "Estudios",
  labstaff: "Personal",
  "add-staff": "Nuevo personal",
  settings: "Configuración",
  profile: "Perfil",
};

const formatSegment = (segment: string): string =>
  ROUTE_LABELS[segment] ??
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const TopbarBreadcrumb = () => {
  const pathname = usePathname();

  // Construye segmentos a partir del pathname
  const segments = pathname.split("/").filter(Boolean);

  // Caso especial: home del dashboard → solo "Dashboard"
  if (segments.length <= 1) {
    return (
      <div className="flex min-w-0 items-center gap-2 text-xs 2xl:text-sm">
        <span className="font-semibold text-text-primary truncate">
          {segments[0] ? formatSegment(segments[0]) : "Dashboard"}
        </span>
      </div>
    );
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 items-center gap-2 text-xs 2xl:text-sm"
    >
      {/* Icono home + raíz */}
      <div className="flex items-center gap-1.5 text-text-muted shrink-0">
        <Home className="h-3 w-3 2xl:h-4 2xl:w-4" />
        <span className="truncate">{formatSegment(segments[0])}</span>
      </div>

      {/* Segmentos intermedios */}
      {segments.slice(1, -1).map((seg) => (
        <React.Fragment key={seg}>
          <ChevronRight className="h-3 w-3 shrink-0 text-text-muted 2xl:h-3.5 2xl:w-3.5" />
          <span className="text-text-muted truncate">
            {formatSegment(seg)}
          </span>
        </React.Fragment>
      ))}

      {/* Último segmento (pantalla actual) */}
      <ChevronRight className="h-3 w-3 shrink-0 text-text-muted 2xl:h-3.5 2xl:w-3.5" />
      <span className="font-semibold text-text-primary truncate">
        {formatSegment(segments[segments.length - 1])}
      </span>
    </nav>
  );
};

export default TopbarBreadcrumb;
