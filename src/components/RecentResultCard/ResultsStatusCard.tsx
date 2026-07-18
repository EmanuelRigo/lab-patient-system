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
    <Card className="rounded-2xl border-border bg-surface ">
      <CardContent className="">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <div className="grid grid-cols-[140px_1fr] items-center gap-6">
            <div className="relative size-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={42}
                    outerRadius={56}
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
                <span className="text-2xl font-bold text-text-primary">
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
