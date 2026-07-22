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
    <div className="group flex h-16 rounded-xl border border-border bg-surface p-3 transition duration-200 ease-out hover:-translate-y-0.5">
      <div className="flex h-full w-full gap-2">
        {/* Icono */}
        <div
          className={`flex h-full aspect-square items-center justify-center rounded-md ${tokens.container}`}
          aria-hidden="true"
        >
          <ResolvedIcon className={`h-4 w-4 ${tokens.icon}`} strokeWidth={2} />
        </div>
        {/* Contenido textual */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <p className="text-xs font-medium leading-none text-text-secondary">
            {title}
          </p>
          <div className="flex justify-between">
            <p className="text-base font-bold leading-none text-text-primary">
              {value}
            </p>
            <p className="self-end text-right text-[10px] leading-none text-text-secondary">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
