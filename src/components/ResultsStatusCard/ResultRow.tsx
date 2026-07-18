"use client";

import { ChevronRight } from "lucide-react";

import { ResultStatus } from "../../../types/ResultStatus";

export interface ResultRowProps {
  patient: string;
  study: string;
  status: ResultStatus;
  date: string;
  color?: string;
}

export function ResultRow({
  patient,
  study,
  status,
  date,
  color = "var(--color-info-500)",
}: ResultRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-muted px-4 py-3 transition-colors hover:bg-background">
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />

        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-primary">
            {patient}
          </span>

          <span className="text-xs text-text-secondary">{study}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs font-medium text-text-primary">{status}</p>

          <p className="text-xs text-text-secondary">{date}</p>
        </div>

        <ChevronRight className="h-4 w-4 text-text-muted" />
      </div>
    </div>
  );
}
