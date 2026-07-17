"use client";

import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  XAxis,
} from "@/components/ui/chart";

export type ChartData = {
  date: string;
  studies: number;
};

export interface StudiesChartCardProps {
  title?: string;
  data: ChartData[];
  loading?: boolean;
  period?: "7d" | "30d" | "90d";
  onPeriodChange?: (period: "7d" | "30d" | "90d") => void;
  onViewReport?: () => void;
  error?: string;
}

const periodOptions = [
  { value: "7d", label: "Últimos 7 días" },
  { value: "30d", label: "Últimos 30 días" },
  { value: "90d", label: "Últimos 90 días" },
] as const;

const getTotalStudies = (data: ChartData[]) =>
  data.reduce((acc, item) => acc + item.studies, 0);

const getVariation = (data: ChartData[]) => {
  if (data.length < 2) return 0;
  const latest = data[data.length - 1].studies;
  const previous = data[data.length - 2].studies;
  if (previous === 0) return latest === 0 ? 0 : 100;
  return Math.round(((latest - previous) / previous) * 100);
};

export function StudiesChartCard({
  title = "Estudios realizados",
  data,
  loading = false,
  period = "7d",
  onPeriodChange,
  onViewReport,
  error,
}: StudiesChartCardProps) {
  const total = getTotalStudies(data);
  const variation = getVariation(data);
  const variationLabel = variation > 0 ? `+${variation}%` : `${variation}%`;
  const variationPositive = variation >= 0;

  return (
    <Card className="w-full rounded-2xl border border-border bg-surface shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {title}
            </div>
            <p className="mt-2 text-text-secondary">
              Visualiza la tendencia de estudios y el comportamiento del
              periodo.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={period}
              onChange={(event) =>
                onPeriodChange?.(event.target.value as "7d" | "30d" | "90d")
              }
              className="min-w-[180px] rounded-2xl border border-border bg-surface px-4 py-2 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="default"
              size="sm"
              className="rounded-2xl px-4 py-2"
              onClick={onViewReport}
            >
              Ver reporte
            </Button>
          </div>
        </div>

        <div className="mt-6 min-h-[320px] rounded-3xl border border-border bg-background p-4 shadow-inner">
          {loading ? (
            <div className="flex h-full flex-col gap-4">
              <div className="h-6 w-32 animate-pulse rounded-full bg-surface" />
              <div className="h-full rounded-3xl bg-surface/70 p-4">
                <div className="h-full w-full animate-pulse rounded-2xl bg-surface" />
              </div>
            </div>
          ) : error ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-text-secondary">
              <Sparkles className="h-8 w-8 text-text-secondary" />
              <p className="text-sm font-medium text-text-primary">{error}</p>
            </div>
          ) : data.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-text-secondary">
              <Sparkles className="h-8 w-8 text-text-secondary" />
              <p className="text-sm font-medium text-text-primary">
                No hay estudios para mostrar.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <ChartContainer className="rounded-3xl border border-border bg-background p-4">
                <AreaChart
                  data={data}
                  margin={{ top: 18, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="studiesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-brand-600)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-brand-600)"
                        stopOpacity={0.06}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="var(--color-border)"
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.15}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="studies"
                    stroke="var(--color-brand-600)"
                    fill="url(#studiesGradient)"
                    fillOpacity={1}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ChartContainer>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-surface p-4 shadow-sm">
                  <p className="text-sm text-text-secondary">
                    Cantidad total de estudios
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-text-primary">
                    {total}
                  </p>
                </div>
                <div className="rounded-2xl bg-surface p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-text-secondary">Variación</p>
                    <span className="inline-flex items-center rounded-full bg-surface px-2 py-1 text-xs font-semibold text-text-secondary">
                      {variationPositive ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-danger" />
                      )}
                      <span
                        className={`ml-1 ${variationPositive ? "text-success" : "text-danger"}`}
                      >
                        {variationLabel}
                      </span>
                    </span>
                  </div>
                  <p className="mt-2 text-text-primary">
                    {variationPositive
                      ? "Respecto al periodo anterior"
                      : "Reducción respecto al periodo anterior"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
