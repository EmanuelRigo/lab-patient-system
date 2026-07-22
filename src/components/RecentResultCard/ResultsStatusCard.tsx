"use client";

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ResultsStatusLegend,
  type ResultsStatusLegendItem,
} from "./ResultsStatusLegend";

export interface ResultStatusItem extends ResultsStatusLegendItem {}

interface ResultsStatusCardProps {
  title?: string;
  data: ResultStatusItem[];
}

export function ResultsStatusCard({
  title = "Resultados por estado",
  data,
}: ResultsStatusCardProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="h-full rounded-xl border-border bg-surface py-2 shadow-none">
      <CardContent className="flex h-full flex-col px-4">
        {/* Header */}
        <div className="mb-2 border-b border-border pb-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="grid flex-1 grid-cols-[7rem_1fr] items-center gap-2">
          <div className="relative size-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={34}
                  outerRadius={46}
                  paddingAngle={0}
                  stroke="var(--color-surface)"
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold leading-none text-text-primary">
                {total.toLocaleString()}
              </span>
              <span className="text-[10px] text-text-muted">Total</span>
            </div>
          </div>

          <ResultsStatusLegend items={data} />
        </div>
      </CardContent>
    </Card>
  );
}
