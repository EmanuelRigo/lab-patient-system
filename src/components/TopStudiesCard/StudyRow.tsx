"use client";

import { ChevronRight } from "lucide-react";

export interface StudyRowProps {
  index: number;
  name: string;
  quantity: number;
  percentage: number;
}

export function StudyRow({
  index,
  name,
  quantity,
  percentage,
}: StudyRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl px-4 transition-colors">
      <div className="flex items-center gap-3">
        <span
          className="
            inline-flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-primary
            p-2
            text-xs
            font-semibold
            text-primary-foreground
          "
        >
          {index}
        </span>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-primary">{name}</span>

          <span className="text-xs text-text-secondary">
            {quantity.toLocaleString()} estudios
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className="
            inline-flex
            min-w-12
            items-center
            justify-center
            rounded-full
            bg-brand-50
            px-2.5
            py-1
            text-xs
            font-semibold
            text-brand-700
          "
        >
          {percentage}%
        </span>

        <ChevronRight className="h-4 w-4 text-text-muted" />
      </div>
    </div>
  );
}
