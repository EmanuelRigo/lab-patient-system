"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

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
    <Card className="rounded-2xl border-border bg-surface">
      <CardContent>
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {title}
              </h3>

              <p className="mt-1 text-sm text-text-secondary">
                Ranking de los estudios con mayor demanda.
              </p>
            </div>

            <BarChart3 className="h-5 w-5 text-brand-500" />
          </div>

          <div className="flex flex-1 flex-col gap-3">
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

          <Button
            variant="outline"
            className="mt-6 w-full rounded-xl"
            onClick={onViewAll}
          >
            Ver todos los estudios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
