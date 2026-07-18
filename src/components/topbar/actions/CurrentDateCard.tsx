"use client";

import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function CurrentDateCard() {
  const now = new Date();

  const day = format(now, "d", { locale: es });
  const month = format(now, "MMMM", { locale: es });
  const year = format(now, "yyyy", { locale: es });

  const weekDay =
    format(now, "EEEE", { locale: es }).charAt(0).toUpperCase() +
    format(now, "EEEE", { locale: es }).slice(1);

  return (
    <div
      className="
        flex items-center gap-4
        rounded-2xl
        border border-border
        bg-surface
        px-4 py-0
        transition-all
        duration-200
      "
    >
      <div
        className="
          flex  items-center justify-center
          rounded-lg
          bg-brand-50
          text-brand-600
        "
      >
        <CalendarDays className="h-5 w-5" />
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-text-secondary">
          {day} de {month}, {year}
        </span>

        <span className="text-xs text-text-secondary">{weekDay}</span>
      </div>
    </div>
  );
}
