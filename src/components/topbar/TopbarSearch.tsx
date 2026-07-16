"use client";

import React from "react";
import { Search } from "lucide-react";

const TopbarSearch = () => {
  return (
    <div className="flex-1 max-w-2xl mx-auto w-full">
      <label htmlFor="topbar-search" className="sr-only">
        Buscar en el sistema
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
        />
        <input
          id="topbar-search"
          type="search"
          placeholder="Buscar pacientes, estudios, resultados..."
          className="
            flex w-full h-10 rounded-xl
            border border-border-default bg-surface
            pl-10 pr-4 text-sm
            text-text-primary placeholder:text-text-muted
            transition-all duration-200
            focus:outline-none focus:border-primary-500
            focus:ring-2 focus:ring-primary-500/20
            hover:border-border-strong
            disabled:cursor-not-allowed disabled:opacity-50
          "
        />
      </div>
    </div>
  );
};

export default TopbarSearch;
