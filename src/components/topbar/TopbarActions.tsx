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
        className="rounded-xl shadow-sm"
      >
        <Plus className="w-5 h-5" />
      </Button>

      {/* Notificaciones */}
      <TopbarNotifications count={3} />

      {/* Separador vertical sutil */}
      <div
        aria-hidden="true"
        className="hidden md:block w-px h-6 bg-border-default mx-1"
      />

      {/* Usuario */}
      <TopbarUser />
    </div>
  );
};

export default TopbarActions;
