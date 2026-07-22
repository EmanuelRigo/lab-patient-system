"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

type TopbarNotificationsProps = {
  /**
   * Número de notificaciones no leídas.
   * Si es 0 o undefined, no se muestra el badge.
   * Es placeholder por ahora: la lógica real se conectará más adelante.
   */
  count?: number;
};

/**
 * Campana de notificaciones del Topbar.
 * - Estructura visual lista, sin lógica de apertura/click real.
 * - Badge rojo (token `danger-500`) con contador, solo si count > 0.
 */
const TopbarNotifications = ({ count = 3 }: TopbarNotificationsProps) => {
  const showBadge = count > 0;

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="Notificaciones"
        title="Notificaciones"
        className="h-8 w-8 rounded-xl 2xl:h-10 2xl:w-10"
      >
        <Bell className="h-4 w-4 2xl:h-5 2xl:w-5" />
      </Button>

      {showBadge && (
        <span
          aria-hidden="true"
          className="
            absolute top-1.5 right-1.5
            flex items-center justify-center
            min-w-[18px] h-[18px] px-1
            rounded-full bg-danger-500 text-white
            text-[10px] font-semibold leading-none
            border-2 border-surface
            pointer-events-none
          "
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
};

export default TopbarNotifications;
