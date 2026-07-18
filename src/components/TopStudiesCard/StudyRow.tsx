"use client";

import { ChevronRight } from "lucide-react";

export interface StudyRowProps {
  name: string;
  quantity: number;
  percentage: number;
  color?: string;
}

export function StudyRow({
  name,
  quantity,
  percentage,
  color = "var(--color-brand-500)",
}: StudyRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-muted px-4 py-3 transition-colors hover:bg-background">
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />

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
