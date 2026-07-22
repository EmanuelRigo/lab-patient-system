"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLabSystemContext } from "@/context/LabContext";
import TopbarNotifications from "./TopbarNotifications";
import TopbarUser from "./TopbarUser";

const TopbarActions = () => {
  const { role } = useLabSystemContext();

  // Si no hay sesión, no renderizar nada de la zona derecha
  if (role === "public") return null;

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Botón de acción rápida */}
      <Button
        type="button"
        variant="default"
        size="icon-lg"
        aria-label="Acción rápida"
        title="Acción rápida"
        className="h-8 w-8 rounded-lg 2xl:h-10 2xl:w-10"
      >
        <Plus className="h-4 w-4 2xl:h-5 2xl:w-5" />
      </Button>

      {/* Notificaciones */}
      <TopbarNotifications count={3} />

      {/* Separador vertical sutil */}
      <div
        aria-hidden="true"
        className="mx-1 hidden h-5 w-px bg-border-default md:block 2xl:h-6"
      />

      {/* Usuario */}
      <TopbarUser />
    </div>
  );
};

export default TopbarActions;
