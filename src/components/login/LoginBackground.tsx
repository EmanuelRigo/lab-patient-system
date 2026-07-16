import React from "react";

/**
 * Fondo del Login.
 *
 * - Color base: `bg-background` (token de la paleta).
 * - Patrón SVG de "moléculas" muy sutil en las esquinas
 *   usando únicamente `currentColor` para que herede opacidad
 *   sin colores hardcodeados.
 *
 * El SVG es inline (no requiere asset externo) y se pinta
 * desde el pseudo-element `before` y `after` para que no
 * interfiera con el contenido.
 */
export function LoginBackground() {
  return (
    <>
      {/* Capa base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background"
      />

      {/* Patrón molecular superior-izquierda */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-12 h-72 w-72 text-primary-500/[0.05]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1.25">
          {/* Molécula 1 */}
          <circle cx="40" cy="40" r="4" />
          <circle cx="80" cy="30" r="4" />
          <circle cx="110" cy="70" r="4" />
          <circle cx="60" cy="90" r="4" />
          <circle cx="100" cy="120" r="4" />
          <line x1="40" y1="40" x2="80" y2="30" />
          <line x1="80" y1="30" x2="110" y2="70" />
          <line x1="80" y1="30" x2="60" y2="90" />
          <line x1="60" y1="90" x2="100" y2="120" />
          <line x1="110" y1="70" x2="100" y2="120" />
        </g>
      </svg>

      {/* Patrón molecular inferior-derecha */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 text-primary-500/[0.05]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1.25">
          <circle cx="50" cy="60" r="4" />
          <circle cx="100" cy="50" r="4" />
          <circle cx="140" cy="90" r="4" />
          <circle cx="70" cy="120" r="4" />
          <circle cx="120" cy="140" r="4" />
          <circle cx="160" cy="160" r="4" />
          <line x1="50" y1="60" x2="100" y2="50" />
          <line x1="100" y1="50" x2="140" y2="90" />
          <line x1="100" y1="50" x2="70" y2="120" />
          <line x1="70" y1="120" x2="120" y2="140" />
          <line x1="140" y1="90" x2="120" y2="140" />
          <line x1="120" y1="140" x2="160" y2="160" />
        </g>
      </svg>
    </>
  );
}
