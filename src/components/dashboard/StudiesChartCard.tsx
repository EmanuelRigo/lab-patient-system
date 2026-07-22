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

  const renderBody = () => {
    if (loading) {
      return (
        <div className="min-h-0 flex-1 animate-pulse rounded-xl bg-surface-muted" />
      );
    }

    if (error) {
      return (
        <div className="flex min-h-0 flex-1 items-center justify-center gap-2 text-text-secondary">
          <Sparkles className="h-4 w-4" />
          <p className="text-xs font-medium text-text-primary">{error}</p>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="flex min-h-0 flex-1 items-center justify-center gap-2 text-text-secondary">
          <Sparkles className="h-4 w-4" />
          <p className="text-xs font-medium text-text-primary">
            No hay estudios para mostrar.
          </p>
        </div>
      );
    }

    return (
      <ChartContainer className="min-h-0 flex-1">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="studiesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-primary)"
                stopOpacity={0.35}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary)"
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
            tick={{ fill: "var(--color-text-secondary)", fontSize: 10 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="studies"
            stroke="var(--color-primary)"
            fill="url(#studiesGradient)"
            fillOpacity={1}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    );
  };

  return (
    <Card className="flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-0 px-3 shadow-none">
      <CardContent className="flex h-full min-h-0 flex-1 flex-col gap-1 p-3">
        <div className="flex shrink-0 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
            <h3 className="text-base font-semibold text-text-primary">
              {title}
            </h3>
            {!loading && !error && data.length > 0 && (
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <span>
                  Total{" "}
                  <span className="font-semibold text-text-primary">
                    {total}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1">
                  {variationPositive ? (
                    <ArrowUpRight className="h-3 w-3 text-success" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-danger" />
                  )}
                  <span
                    className={
                      variationPositive ? "text-success" : "text-danger"
                    }
                  >
                    {variationLabel}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <select
              value={period}
              onChange={(event) =>
                onPeriodChange?.(event.target.value as "7d" | "30d" | "90d")
              }
              className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
              className="h-8 rounded-xl px-3 text-xs"
              onClick={onViewReport}
            >
              Ver reporte
            </Button>
          </div>
        </div>

        {renderBody()}
      </CardContent>
    </Card>
  );
}
