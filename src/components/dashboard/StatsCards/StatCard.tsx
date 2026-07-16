import {
  Calendar,
  ClipboardCheck,
  FlaskConical,
  Info,
  AlertTriangle,
  AlertOctagon,
  type LucideIcon,
} from "lucide-react";

import type { StatCardColor, StatCardProps } from "./types";

/**
 * Mapeo color → tokens de la paleta.
 * Mantiene centralizado el uso de clases para que
 * ningún `StatCard` introduzca colores fuera de AGENTS.md.
 */
const colorTokens: Record<
  StatCardColor,
  { container: string; icon: string }
> = {
  primary: {
    container: "bg-primary-50",
    icon: "text-primary-600",
  },
  success: {
    container: "bg-success-50",
    icon: "text-success-600",
  },
  warning: {
    container: "bg-warning-50",
    icon: "text-warning-600",
  },
  danger: {
    container: "bg-danger-50",
    icon: "text-danger-600",
  },
  info: {
    container: "bg-info-50",
    icon: "text-info-600",
  },
};

/**
 * Ícono de respaldo cuando una variante no reconocida
 * llegara a entrar. Evita renderizar un ícono vacío.
 */
const fallbackIconMap: Record<StatCardColor, LucideIcon> = {
  primary: Info,
  success: ClipboardCheck,
  warning: AlertTriangle,
  danger: AlertOctagon,
  info: Calendar,
};

/**
 * Card individual que muestra una métrica del dashboard.
 *
 * Componente puramente presentacional: recibe todos sus
 * datos por props y no realiza llamadas externas.
 */
export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "primary",
}: StatCardProps) {
  const tokens = colorTokens[color] ?? colorTokens.primary;
  const ResolvedIcon: LucideIcon = Icon ?? fallbackIconMap[color];

  return (
    <div
      className="group flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Icono */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${tokens.container}`}
        aria-hidden="true"
      >
        <ResolvedIcon className={`h-5 w-5 ${tokens.icon}`} strokeWidth={2} />
      </div>

      {/* Contenido textual */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <p className="text-3xl font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
