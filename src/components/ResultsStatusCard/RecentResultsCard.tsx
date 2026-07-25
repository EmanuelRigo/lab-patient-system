"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ResultRow } from "./ResultRow";
import { ResultStatus } from "../../../types/ResultStatus";

export interface RecentResultItem {
  id: string;
  patient: string;
  study: string;
  status: ResultStatus;
  date: string;
  color?: string;
}

interface RecentResultsCardProps {
  title?: string;
  results: RecentResultItem[];
  onViewAll?: () => void;
  onSelectResult?: (id: string) => void;
}

export function RecentResultsCard({
  title = "Resultados recientes",
  results,
  onViewAll,
  onSelectResult,
}: RecentResultsCardProps) {
  return (
    <Card className="h-full rounded-lg border-border bg-surface py-1.5 shadow-none min-h-0 overflow-hidden">
      <CardContent className="flex h-full flex-col px-3">
        {/* Header */}
        <div className="mb-1 flex items-center justify-between border-b border-border pb-1">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            {title}
          </h3>
          {onViewAll && (
            <Button
              variant="ghost"
              className="h-4 px-1.5 text-[9px] text-primary"
              onClick={onViewAll}
            >
              Ver todos
            </Button>
          )}
        </div>

        {/* Rows */}
        <div className="flex flex-1 flex-col gap-0.5 min-h-0 overflow-y-auto">
          {results.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border text-xs text-text-muted">
              No hay resultados recientes.
            </div>
          ) : (
            results.map((result) => (
              <ResultRow
                key={result.id}
                patient={result.patient}
                study={result.study}
                status={result.status}
                date={result.date}
                color={result.color}
                onClick={() => onSelectResult?.(result.id)}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}



