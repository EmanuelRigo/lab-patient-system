import React from "react";
import { FlaskConical, ShieldCheck } from "lucide-react";

export function LoginHero() {
  return (
    <aside
      aria-hidden="true"
      className="relative hidden overflow-hidden md:flex md:w-[40%] lg:w-[42%] xl:w-[38%]"
    >
      {/* 1. Fondo base: Degradado con tu paleta azul marino vibrante */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-primary-950)_0%,var(--color-primary-900)_20%,var(--color-primary-800)_45%,var(--color-primary-700)_70%,var(--color-primary-500)_100%)]"
        aria-hidden="true"
      />

      {/* 2. Imagen de fondo: Ahora encima del azul y mezclándose con él */}
      <div
        className="absolute inset-0 bg-[url('/images/image4.jpg')] bg-cover bg-center opacity-[0.18] mix-blend-overlay"
        aria-hidden="true"
      />

      {/* 3. Brillo radial superior izquierdo para dar volumen */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/10" aria-hidden="true" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 sm:p-10 lg:p-12 text-primary-50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-50/10 ring-1 ring-primary-100/25 backdrop-blur-sm">
            <FlaskConical className="h-6 w-6 text-primary-50" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold uppercase tracking-[0.28em] text-primary-50/95">
              LabSystem
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary-50/70">
              Gestión de Laboratorio
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50/15 ring-1 ring-primary-100/30">
            <ShieldCheck className="h-5 w-5 text-primary-50" />
          </div>
          <p className="max-w-sm text-sm leading-7 text-primary-50/80">
            Sistema seguro y confiable para la gestión integral del laboratorio.
          </p>
        </div>
      </div>

      {/* Curva SVG corregida sin bordes grises */}
      <svg
        aria-hidden="true"
        className="absolute right-[-1px] top-0 h-full w-24"
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
