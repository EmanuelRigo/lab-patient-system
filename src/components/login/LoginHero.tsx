import React from "react";
import { FlaskConical, ShieldCheck } from "lucide-react";

/**
 * Columna izquierda del Login (40% en desktop).
 *
 * Muestra:
 * - Imagen real del laboratorio (`/images/image4.jpg`)
 * - Overlay con el gradiente azul institucional
 * - Logo, nombre, subtítulo y mensaje de seguridad
 * - Curva SVG hacia la derecha (sutil, sin formas exageradas)
 *
 * En tablet se reduce; en mobile se oculta por completo.
 */
export function LoginHero() {
  return (
    <aside
      aria-hidden="true"
      className="
        relative hidden md:flex md:w-[40%]
        items-center justify-center overflow-hidden
        bg-gradient-to-br from-[#103E8C] via-[#1558B5] to-[#1A73D9]
      "
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-[url('/images/image4.jpg')] bg-cover bg-center opacity-40"
        aria-hidden="true"
      />

      {/* Overlay azul institucional */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#103E8C]/85 via-[#1558B5]/80 to-[#1A73D9]/80 mix-blend-multiply"
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 lg:p-14 text-white">
        {/* Logo + nombre */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-wide">LabSystem</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">
              Gestión de Laboratorio
            </span>
          </div>
        </div>

        {/* Mensaje central inferior */}
        <div className="flex flex-col gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/80">
            Sistema seguro y confiable para la gestión integral del laboratorio.
          </p>
        </div>
      </div>

      {/* Curva elegante hacia la derecha (solo desktop ≥ lg) */}
      <svg
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-full lg:block"
        viewBox="0 0 80 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 0 C 60 200, 60 600, 0 800 L 80 800 L 80 0 Z"
          fill="var(--background)"
        />
      </svg>
    </aside>
  );
}
