import React from "react";

type UnderConstructionBadgeProps = {
  /** Posición fija en pantalla. Default: top-10 right-10 */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Tamaño en píxeles (ancho = alto). Default: 150 */
  size?: number;
  /** Distancia al borde en píxeles. Default: 40 (equivale a top-10/right-10) */
  offset?: number;
  /** Ícono a mostrar arriba. Default: 🚧 */
  icon?: React.ReactNode;
  /** Texto principal. Default: "En construcción" */
  label?: React.ReactNode;
  /** Si true, no bloquea clics ni selección de texto. Default: true */
  inert?: boolean;
  /** z-index. Default: 50 */
  zIndex?: number;
  /** Clases extra para el contenedor */
  className?: string;
};

const POSITION_CLASSES: Record<
  NonNullable<UnderConstructionBadgeProps["position"]>,
  string
> = {
  "top-right": "top-10 right-10",
  "top-left": "top-10 left-10",
  "bottom-right": "bottom-10 right-10",
  "bottom-left": "bottom-10 left-10",
};

/**
 * Badge flotante tipo "señal de obra" para indicar que una pantalla
 * o el proyecto entero está en construcción.
 *
 * - Redondo, fondo amarillo translúcido, texto negro.
 * - No interfiere con el cursor ni con la selección (pointer-events-none).
 * - Reutilizable: pasale `position`, `size`, `icon` y `label`.
 */
const UnderConstructionBadge: React.FC<UnderConstructionBadgeProps> = ({
  position = "top-right",
  size = 100,
  offset,
  icon = "🚧",
  label = "En construcción",
  inert = true,
  zIndex = 50,
  className = "",
}) => {
  // Si el usuario pasa `offset`, sobrescribimos las clases top-*/right-*
  // generadas por `position` para respetar el valor exacto.
  const positionClass = offset != null ? "" : POSITION_CLASSES[position];
  const offsetStyle =
    offset != null
      ? {
          top: position.includes("bottom") ? "auto" : `${offset}px`,
          bottom: position.includes("bottom") ? `${offset}px` : "auto",
          left: position.includes("right") ? "auto" : `${offset}px`,
          right: position.includes("right") ? `${offset}px` : "auto",
        }
      : undefined;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        zIndex,
        ...offsetStyle,
      }}
      className={`
        fixed ${positionClass}
        flex flex-col items-center justify-center
        rounded-full
        bg-yellow-500/60 text-black
        ring-4 ring-black/70
        text-center text-sm font-semibold
        leading-tight
        px-4
        ${inert ? "pointer-events-none select-none" : ""}
        ${className}
      `}
    >
      <span aria-hidden="true" className="text-xl">
        {icon}
      </span>
      <span className="mt-1 text-xs">{label}</span>
    </div>
  );
};

export default UnderConstructionBadge;
