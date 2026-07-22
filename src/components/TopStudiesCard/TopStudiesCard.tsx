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
    <Card className="rounded-2xl border-border bg-surface py-1 shadow-none">
      <CardContent className="px-3">
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand-500" />

              <div>
                <h3 className="text-lg font-semibold leading-none text-text-primary">
                  {title}
                </h3>
              </div>
            </div>

            <Button
              variant="outline"
              className="h-7 rounded-xl px-3 text-xs"
              onClick={onViewAll}
            >
              Ver todos
            </Button>
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
        </div>
      </CardContent>
    </Card>
  );
}
