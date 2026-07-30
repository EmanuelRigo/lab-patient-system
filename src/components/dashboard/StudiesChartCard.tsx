"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  TriangleAlert,
} from "lucide-react";

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
import { cn } from "@/lib/utils";

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

type Period = StudiesChartCardProps["period"];

const periodOptions: Array<{ value: Period; label: string }> = [
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
];

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

  const showMeta = !loading && !error && data.length > 0;

  const renderBody = () => {
    if (loading) {
      return (
        <div
          role="status"
          aria-label="Cargando estudios"
          className="flex h-full min-h-0 flex-1 animate-pulse rounded-xl bg-surface-muted/40"
        />
      );
    }

    if (error) {
      return (
        <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface-muted/30 px-4 text-center">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-danger/10 text-danger">
            <TriangleAlert className="size-4" />
          </span>
          <p className="text-sm font-medium text-text-primary">{error}</p>
          <p className="text-xs text-text-muted">
            Reintentá la operación en unos segundos.
          </p>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface-muted/30 px-4 text-center">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BarChart3 className="size-4" />
          </span>
          <p className="text-sm font-medium text-text-primary">
            No hay estudios para mostrar
          </p>
          <p className="text-xs text-text-muted">
            Cuando se registren estudios vas a verlos acá.
          </p>
        </div>
      );
    }

    return (
      <div className="flex h-full min-h-0 flex-1 flex-col rounded-xl bg-surface-muted/30 p-3">
        <ChartContainer className="min-h-0 flex-1">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
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
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.32}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--color-border)"
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-muted)", fontSize: 10 }}
              dy={6}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
              content={<ChartTooltipContent />}
            />
            <Area
              type="monotone"
              dataKey="studies"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#studiesGradient)"
              fillOpacity={1}
              activeDot={{
                r: 4,
                fill: "var(--color-surface)",
                stroke: "var(--color-primary)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    );
  };

  return (
    <Card className="flex h-full w-full flex-col gap-0 rounded-2xl border border-border bg-surface py-0 shadow-none">
      <CardContent className="flex h-full min-h-0 flex-1 flex-col gap-4 px-4 py-4">
        {/* Header */}
        <header className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Title + KPI */}
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2">
            <h3 className="text-base font-semibold text-text-primary">
              {title}
            </h3>

            {showMeta && (
              <div className="flex items-center gap-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-semibold leading-none text-text-primary">
                    {total.toLocaleString("es-AR")}
                  </span>
                  <span className="text-xs text-text-muted">estudios</span>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden h-6 w-px bg-border sm:block"
                />

                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    variationPositive
                      ? "bg-success/10 text-success"
                      : "bg-danger/10 text-danger",
                  )}
                  title={`Variación respecto al día anterior: ${variationLabel}`}
                >
                  {variationPositive ? (
                    <ArrowUpRight className="size-3.5" />
                  ) : (
                    <ArrowDownRight className="size-3.5" />
                  )}
                  {variationLabel}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <div
              role="tablist"
              aria-label="Período"
              className="inline-flex items-center gap-0.5 rounded-xl border border-border bg-surface-muted/40 p-0.5"
            >
              {periodOptions.map((option) => {
                const isActive = period === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onPeriodChange?.(option.value)}
                    className={cn(
                      "inline-flex h-7 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                      isActive
                        ? "bg-surface text-text-primary shadow-xs"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-xl px-3 text-xs"
              onClick={onViewReport}
            >
              Ver reporte
            </Button>
          </div>
        </header>

        {/* Chart canvas */}
        {renderBody()}
      </CardContent>
    </Card>
  );
}
