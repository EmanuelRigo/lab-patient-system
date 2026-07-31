"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Activity } from "lucide-react";
import TopbarBreadcrumb from "./TopbarBreadcrumb";
import CurrentDateCard from "./actions/CurrentDateCard";
import { useLabSystemContext } from "@/context/LabContext";

const HIDDEN_ROUTES = ["/login"];

const Topbar = () => {
  const pathname = usePathname();
  const { userInfoToken } = useLabSystemContext();

  // Se oculta únicamente en /login. El resto de las rutas
  // (incluida la home pública) muestran el Topbar.
  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <header
      role="banner"
      className="
        sticky top-0 z-30
        flex items-center gap-4
        h-12 2xl:h-[72px] w-full
        border-b border-border-default
        bg-surface/80 backdrop-blur-sm
        px-4 lg:px-6
        transition-shadow duration-200
      "
    >
      {/* Izquierda: breadcrumb + nombre de pantalla */}
      <div className="shrink-0 min-w-0 max-w-[260px]">
        <TopbarBreadcrumb />
      </div>

      {/* Centro flexible: empuja la zona derecha hacia el final */}
      <div className="flex-1" />

      {/* Derecha: estado en vivo del sistema */}
      <div className="flex items-center gap-2 min-w-0">
        <span
          aria-hidden="true"
          className="relative flex h-2 w-2 shrink-0"
        >
          {/* Anillo pulsante (estado "vivo") */}
          <span
            className="
              absolute inline-flex h-full w-full
              rounded-full bg-success-500
              opacity-60
              animate-ping
            "
          />
          {/* Núcleo del punto */}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
        </span>

        <div
          className="
            hidden sm:flex flex-col items-end justify-center leading-tight
            min-w-0
          "
        >
          <span
            className="
              inline-flex items-center gap-1.5
              text-[11px] font-medium uppercase tracking-wider
              text-text-muted 2xl:text-xs
            "
          >
            <Activity
              aria-hidden="true"
              className="h-3 w-3 2xl:h-3.5 2xl:w-3.5"
            />
            <span className="truncate max-w-[180px]">
              Lab. {userInfoToken?.name ?? "Mayra"} · Operativo
            </span>
          </span>
          {userInfoToken?._id && (
            <span
              className="
                hidden md:block
                text-[9px] font-normal normal-case tracking-normal
                text-text-muted/70 2xl:text-[10px]
                truncate max-w-[180px]
              "
            >
              id: {userInfoToken._id}
            </span>
          )}
        </div>
      </div>

      {/* Separador vertical sutil entre estado y fecha */}
      <div
        aria-hidden="true"
        className="h-5 w-px bg-border-default 2xl:h-6"
      />

      {/* Fecha actual (mismo chip del header del dashboard) */}
      <CurrentDateCard />
    </header>
  );
};

export default Topbar;
