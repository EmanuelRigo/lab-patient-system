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
    <Card className="h-full rounded-2xl border-border bg-surface py-3 shadow-none">
      <CardContent className="px-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <div className="grid grid-cols-[7.5rem_1fr] items-center gap-2">
            <div className="relative size-30">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={36}
                    outerRadius={48}
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
                <span className="text-lg font-bold text-text-primary">
                  {total.toLocaleString()}
                </span>

                <span className="text-[10px] text-text-secondary">Total</span>
              </div>
            </div>

            <ResultsStatusLegend items={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
