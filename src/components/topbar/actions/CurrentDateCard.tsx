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
    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-2 py-1.5 transition-all duration-150 hover:border-border-strong 2xl:px-3.5 2xl:py-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-md border border-primary-200/50 bg-primary-50 text-primary-600 dark:border-primary-800/40 dark:bg-primary-950/60 dark:text-primary-400 2xl:h-8 2xl:w-8">
        <CalendarDays className="h-4 w-4 2xl:h-4.5 2xl:w-4.5" />
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-xs font-semibold text-text-primary">
          {weekDay}
        </span>
        <span className="mt-0.5 text-[11px] text-text-secondary">
          {day} de {month}, {year}
        </span>
      </div>
    </div>
  );
}
