"use client";

import { ChevronRight, FileText } from "lucide-react";

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
    <div className="flex h-5 items-center justify-between rounded-md px-1 transition-colors hover:bg-surface-muted">
      <div className="flex min-w-0 items-center gap-2">
        <FileText
          className="h-4 w-4 shrink-0 rounded bg-surface-muted p-0.5"
          style={{ color }}
        />

        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-medium leading-none text-text-primary">
            {patient}
          </span>

          <span className="truncate text-[10px] leading-none text-text-secondary">
            {study}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="rounded-full border border-border px-1 text-[9px] font-medium leading-none text-text-primary">
            {status}
          </p>

          <p className="text-[10px] leading-none text-text-secondary">{date}</p>
        </div>

        <ChevronRight className="h-3 w-3 text-text-muted" />
      </div>
    </div>
  );
}
