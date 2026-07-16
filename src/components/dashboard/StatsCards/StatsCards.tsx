import { StatCard } from "./StatCard";
import { statsMock } from "./stats.mock";
import type { StatCardProps } from "./types";

interface StatsCardsProps {
  /**
   * Métricas a renderizar. Si no se proveen se utilizan
   * los datos mock definidos en `stats.mock.ts`.
   *
   * Aceptar este prop permite que en el futuro un padre
   * le pase datos reales (ej. desde `useDashboardStats()`)
   * sin modificar el componente.
   */
  stats?: StatCardProps[];
}

/**
 * `StatsCards` muestra la fila principal de métricas
 * del Dashboard.
 *
 * Grilla responsive:
 * - 4 columnas en desktop
 * - 2 columnas en laptop / tablet
 * - 1 columna en mobile (no prioritario, pero no rompe)
 */
export function StatsCards({ stats = statsMock }: StatsCardsProps) {
  return (
    <section
      aria-label="Métricas principales del laboratorio"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </section>
  );
}
