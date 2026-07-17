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
/**
 * Mapeo color → tokens de la paleta.
 * El contenedor del ícono usa el tono sólido de la familia
 * y el ícono se renderiza en blanco para garantizar contraste
 * sin depender del color de fondo.
 *
 * Mantiene centralizado el uso de clases para que
 * ningún `StatCard` introduzca colores fuera de AGENTS.md.
 */
const colorTokens: Record<StatCardColor, { container: string; icon: string }> =
  {
    primary: {
      container: "bg-primary-600",
      icon: "text-white",
    },
    success: {
      container: "bg-success-600",
      icon: "text-white",
    },
    warning: {
      container: "bg-warning-600",
      icon: "text-white",
    },
    danger: {
      container: "bg-danger-600",
      icon: "text-white",
    },
    info: {
      container: "bg-info-600",
      icon: "text-white",
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
    <div className="group flex flex-col gap-6 rounded-xl border border-border bg-surface p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-2">
        {/* Icono */}
        <div
          className={`flex h-full aspect-square items-center justify-center rounded-lg ${tokens.container}`}
          aria-hidden="true"
        >
          <ResolvedIcon className={`h-6 w-6 ${tokens.icon}`} strokeWidth={2} />
        </div>
        {/* Contenido textual */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-3xl font-bold text-text-primary">{value}</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
}
