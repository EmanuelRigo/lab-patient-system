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
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const percentage =
          total === 0 ? 0 : ((item.value / total) * 100).toFixed(1);

        return (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="text-sm text-text-primary">{item.label}</span>
            </div>

            <div className="text-right">
              <p className="font-semibold text-text-primary">
                {item.value.toLocaleString()}
              </p>

              <p className="text-xs text-text-secondary">{percentage}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
