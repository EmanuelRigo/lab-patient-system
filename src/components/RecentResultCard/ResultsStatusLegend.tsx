"use client";

export interface ResultsStatusLegendItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface ResultsStatusLegendProps {
  items: ResultsStatusLegendItem[];
}

export function ResultsStatusLegend({ items }: ResultsStatusLegendProps) {
  const total = items.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        const percentage =
          total === 0 ? 0 : ((item.value / total) * 100).toFixed(1);

        return (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] text-text-primary">{item.label}</span>
            </div>

            <div className="flex items-baseline gap-1 text-right">
              <p className="text-[10px] font-semibold leading-none text-text-primary">
                {item.value.toLocaleString()}
              </p>
              <p className="border-l border-border pl-1 text-[10px] leading-none text-text-muted">
                {percentage}%
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
