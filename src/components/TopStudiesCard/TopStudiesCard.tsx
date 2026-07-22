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
