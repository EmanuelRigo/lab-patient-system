"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import {
  AreaChart,
  Card,
  Flex,
  Title,
  Text,
  Metric,
  ColGrid,
  Block,
  Select,
  SelectItem,
  BadgeDelta,
  Table,
  TableBody,
  TableRow,
  TableCell,
  ProgressBar,
  Icon,
} from "@tremor/react";

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
    <Card className="w-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <Title className="text-text-primary">{title}</Title>
          <Text className="mt-2 text-text-secondary">
            Visualiza la tendencia de estudios y el comportamiento del periodo.
          </Text>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            value={period}
            onValueChange={(value) =>
              onPeriodChange?.(value as "7d" | "30d" | "90d")
            }
            className="min-w-[180px] rounded-2xl border-border bg-surface text-text-primary shadow-sm"
            placeholder="Selecciona un periodo"
          >
            {periodOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                text={option.label}
              />
            ))}
          </Select>
          <button
            type="button"
            onClick={onViewReport}
            className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            Ver reporte
          </button>
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
            <div className="h-[320px] w-full">
              <AreaChart
                data={data}
                categories={["studies"]}
                index="date"
                showLegend={false}
                colors={["#3A7CA5"]}
                valueFormatter={(value) => `${value}`}
                showGridLines
                showYAxis={false}
                marginTop="mt-2"
                curve="smooth"
                autoMinValue
                className="h-full"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface p-4 shadow-sm">
                <Text className="text-sm text-text-secondary">
                  Cantidad total de estudios
                </Text>
                <Metric className="mt-2 text-text-primary">{total}</Metric>
              </div>
              <div className="rounded-2xl bg-surface p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Text className="text-sm text-text-secondary">Variación</Text>
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
                <Text className="mt-2 text-text-primary">
                  {variationPositive
                    ? "Respecto al periodo anterior"
                    : "Reducción respecto al periodo anterior"}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
