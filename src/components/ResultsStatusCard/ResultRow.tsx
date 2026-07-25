"use client";

import {
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  LucideIcon,
} from "lucide-react";
import { ResultStatus } from "../../../types/ResultStatus";

export interface ResultRowProps {
  patient: string;
  study: string;
  status: ResultStatus;
  date: string;
  color?: string;
  onClick?: () => void;
}

interface StatusConfig {
  label: string;
  icon: LucideIcon;
  badgeStyle: string;
  iconColorStyle: string;
}

const statusMap: Record<ResultStatus, StatusConfig> = {
  completed: {
    label: "Completado",
    icon: CheckCircle2,
    badgeStyle:
      "bg-success-50 text-success-700 border-success-200 dark:bg-success-950/50 dark:text-success-300 dark:border-success-800/60",
    iconColorStyle: "text-success-600 dark:text-success-400",
  },
  processing: {
    label: "En proceso",
    icon: Clock,
    badgeStyle:
      "bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-950/50 dark:text-primary-300 dark:border-primary-800/60",
    iconColorStyle: "text-primary-600 dark:text-primary-400",
  },
  pending: {
    label: "Pendiente",
    icon: AlertCircle,
    badgeStyle:
      "bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-950/50 dark:text-warning-300 dark:border-warning-800/60",
    iconColorStyle: "text-warning-600 dark:text-warning-400",
  },
  validated: {
    label: "Validado",
    icon: FileCheck,
    badgeStyle:
      "bg-info-50 text-info-700 border-info-200 dark:bg-info-950/50 dark:text-info-300 dark:border-info-800/60",
    iconColorStyle: "text-info-600 dark:text-info-400",
  },
};

export function ResultRow({
  patient,
  study,
  status,
  date,
  onClick,
}: ResultRowProps) {
  const config = statusMap[status] ?? {
    label: status,
    icon: Clock,
    badgeStyle: "bg-neutral-100 text-neutral-700 border-neutral-200",
    iconColorStyle: "text-neutral-600",
  };

  const IconComponent = config.icon;

  return (
    <div
      onClick={onClick}
      className="group flex  cursor-pointer items-center justify-between gap-2 rounded-md px-1.5 py-0.5 transition-colors hover:bg-surface-muted"
    >
      {/* Icon & Details */}
      <div className="flex min-w-0 items-center gap-1.5">
        <IconComponent
          className={`h-3.5 w-3.5 shrink-0 ${config.iconColorStyle}`}
        />
        <div className="flex min-w-0 flex-col leading-none">
          <span className="truncate text-xs font-medium text-text-primary group-hover:text-primary">
            {patient}
          </span>
          <span className="truncate text-[10px] text-text-secondary">
            {study}
          </span>
        </div>
      </div>

      {/* Status & Time */}
      <div className="flex shrink-0 items-center gap-1.5">
        <div className="flex flex-col items-end leading-none">
          <span
            className={`inline-flex items-center rounded-full border px-1 py-0.5 text-[9px] font-medium leading-none ${config.badgeStyle}`}
          >
            {config.label}
          </span>
          <span className="mt-0.5 text-[9px] text-text-muted">{date}</span>
        </div>
        <ChevronRight className="h-3 w-3 text-text-muted transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
