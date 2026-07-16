import type { LucideIcon } from "lucide-react";

/**
 * Variante semántica de color para el contenedor del ícono
 * de una StatCard. Todas las variantes usan únicamente
 * tokens de la paleta definida en `AGENTS.md` / `globals.css`.
 */
export type StatCardColor = "primary" | "success" | "warning" | "danger" | "info";

/**
 * Props del componente `StatCard`.
 *
 * El componente es 100% presentacional y no conoce la fuente
 * de los datos. Esto lo deja preparado para recibir información
 * real desde un hook / query en el futuro.
 */
export interface StatCardProps {
  /** Título descriptivo de la métrica (ej. "Pacientes"). */
  title: string;

  /**
   * Valor principal a mostrar. Se acepta `string | number`
   * para soportar métricas numéricas formateadas o textos
   * derivados (ej. "1.254", "1,254", "$ 12.500").
   */
  value: string | number;

  /** Texto secundario debajo del valor (ej. "+18 este mes"). */
  description: string;

  /** Ícono de Lucide React que identifica la métrica. */
  icon: LucideIcon;

  /**
   * Color del contenedor del ícono.
   * Opcional — por defecto `"primary"`.
   */
  color?: StatCardColor;
}
