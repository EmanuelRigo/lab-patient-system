"use client";

import { ChevronRight } from "lucide-react";

export interface StudyRowProps {
  index: number;
  name: string;
  quantity: number;
  percentage: number;
}

export function StudyRow({ index, name, quantity, percentage }: StudyRowProps) {
  return (
    <div className="group flex h-6 items-center justify-between rounded-md px-1.5 transition-colors hover:bg-surface-muted">
      <div className="flex items-center gap-1.5">
        <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
          {index}
        </span>
        <span className="text-xs font-medium leading-none text-text-primary">
          {name}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-semibold leading-none text-text-secondary">
          {quantity.toLocaleString()}
        </span>
        <ChevronRight className="h-3 w-3 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </div>
  );
}

