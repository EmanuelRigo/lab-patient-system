import { Calendar, ClipboardCheck, FlaskConical, Users } from "lucide-react";

import type { StatCardProps } from "./types";

/**
 * Datos mock utilizados por `StatsCards` mientras no exista
 * una fuente real (hook / query al backend).
 *
 * Mantener este archivo como única fuente de mocks permite
 * reemplazar su contenido por datos dinámicos en el futuro
 * sin tocar los componentes.
 */
export const statsMock: StatCardProps[] = [
  {
    title: "Pacientes",
    value: 1254,
    description: "+18 este mes",
    icon: Users,
    color: "primary",
  },
  {
    title: "Turnos de Hoy",
    value: 42,
    description: "5 pendientes",
    icon: Calendar,
    color: "info",
  },
  {
    title: "Estudios Pendientes",
    value: 18,
    description: "3 urgentes",
    icon: FlaskConical,
    color: "warning",
  },
  {
    title: "Resultados Entregados",
    value: 356,
    description: "Hoy",
    icon: ClipboardCheck,
    color: "success",
  },
];
