"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { StudyRow } from "./StudyRow";

export interface TopStudy {
  id: string;
  name: string;
  quantity: number;
  percentage: number;
}

interface TopStudiesCardProps {
  title?: string;
  studies: TopStudy[];
  onViewAll?: () => void;
}

export function TopStudiesCard({
  title = "Estudios más solicitados",
  studies,
  onViewAll,
}: TopStudiesCardProps) {
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
          {studies.map((study, index) => (
            <StudyRow
              key={study.id}
              index={index + 1}
              name={study.name}
              quantity={study.quantity}
              percentage={study.percentage}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

