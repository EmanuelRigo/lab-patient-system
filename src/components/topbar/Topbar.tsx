"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TopbarBreadcrumb from "./TopbarBreadcrumb";
import TopbarSearch from "./TopbarSearch";
import TopbarActions from "./TopbarActions";

const HIDDEN_ROUTES = ["/login"];

const Topbar = () => {
  const pathname = usePathname();

  // Se oculta únicamente en /login. El resto de las rutas
  // (incluida la home pública) muestran el Topbar.
  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <header
      role="banner"
      className="
        sticky top-0 z-30
        flex items-center gap-6
        h-12 2xl:h-[72px] w-full
       
        border-b border-border-default
        
        px-6 lg:px-8
        transition-shadow duration-200
      "
    >
      {/* Izquierda: breadcrumb + nombre de pantalla */}
      <div className="shrink-0 min-w-0 max-w-[260px]">
        <TopbarBreadcrumb />
      </div>

      {/* Centro: búsqueda global */}
      <TopbarSearch />

      {/* Derecha: acciones + notificaciones + usuario */}
      <TopbarActions />
    </header>
  );
};

export default Topbar;
