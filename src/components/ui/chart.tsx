"use client";

import * as React from "react";
import {
  Area as RechartsArea,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  TooltipProps,
  TooltipPayload,
  XAxis,
} from "recharts";
import { cn } from "@/lib/utils";

export function ChartContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("h-[320px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function ChartTooltip(
  props: React.ComponentProps<typeof RechartsTooltip>,
) {
  return <RechartsTooltip {...props} />;
}

interface ChartTooltipContentProps extends React.ComponentProps<"div"> {
  active?: boolean;
  payload?: Array<{ value: number | string }>;
  label?: string | number;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  ...props
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm",
        className,
      )}
      {...props}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-text-primary">
        {item.value}
      </p>
      <p className="text-sm text-text-secondary">Estudios</p>
    </div>
  );
}

export function AreaChart(
  props: React.ComponentProps<typeof RechartsAreaChart>,
) {
  return <RechartsAreaChart {...props} />;
}

export { RechartsArea as Area, CartesianGrid, XAxis };
