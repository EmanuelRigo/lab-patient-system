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
    <Card className="h-full rounded-2xl border-border bg-surface py-2 shadow-none">
      <CardContent className="flex h-full flex-col px-3">
        <div className="mb-1 flex items-center justify-between border-b border-border pb-1">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-none text-text-primary">
              {title}
            </h3>

            <p className="text-[10px] leading-none text-text-secondary">
              Últimos estudios procesados por el laboratorio.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-5 px-2 text-[10px] text-primary"
            onClick={onViewAll}
          >
            Ver todos
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-0.5">
          {results.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-text-secondary">
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
