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
      container:
        "bg-primary-50 text-primary-600 border border-primary-200/60 dark:bg-primary-950/60 dark:text-primary-400 dark:border-primary-800/50",
      icon: "text-primary-600 dark:text-primary-400",
    },
    success: {
      container:
        "bg-success-50 text-success-600 border border-success-200/60 dark:bg-success-950/60 dark:text-success-400 dark:border-success-800/50",
      icon: "text-success-600 dark:text-success-400",
    },
    warning: {
      container:
        "bg-warning-50 text-warning-600 border border-warning-200/60 dark:bg-warning-950/60 dark:text-warning-400 dark:border-warning-800/50",
      icon: "text-warning-600 dark:text-warning-400",
    },
    danger: {
      container:
        "bg-danger-50 text-danger-600 border border-danger-200/60 dark:bg-danger-950/60 dark:text-danger-400 dark:border-danger-800/50",
      icon: "text-danger-600 dark:text-danger-400",
    },
    info: {
      container:
        "bg-info-50 text-info-600 border border-info-200/60 dark:bg-info-950/60 dark:text-info-400 dark:border-info-800/50",
      icon: "text-info-600 dark:text-info-400",
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
    <div className="group flex h-full items-center rounded-lg border border-border bg-surface px-2.5 py-1.5 transition duration-150 ease-out hover:border-border-strong hover:bg-surface-muted/40">
      <div className="flex w-full items-center gap-2.5">
        {/* Icono estilizado */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-transform duration-150 group-hover:scale-105 ${tokens.container}`}
          aria-hidden="true"
        >
          <ResolvedIcon className={`h-4 w-4 ${tokens.icon}`} strokeWidth={2} />
        </div>
        {/* Contenido textual */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <p className="truncate text-[11px] font-medium leading-none text-text-secondary">
            {title}
          </p>
          <div className="flex items-baseline justify-between gap-1">
            <p className="text-sm font-bold leading-none text-text-primary">
              {value}
            </p>
            {description && (
              <p className="truncate text-[10px] leading-none text-text-muted">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
