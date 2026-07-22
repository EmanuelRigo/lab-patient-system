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
}

export function RecentResultsCard({
  title = "Resultados recientes",
  results,
  onViewAll,
}: RecentResultsCardProps) {
  return (
    <Card className="h-full rounded-xl border-border bg-surface py-2 shadow-none">
      <CardContent className="flex h-full flex-col px-4">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
            {title}
          </h3>
          <Button
            variant="ghost"
            className="h-5 px-2 text-[10px] text-primary"
            onClick={onViewAll}
          >
            Ver todos
          </Button>
        </div>

        {/* Rows */}
        <div className="flex flex-1 flex-col gap-0.5">
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
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
