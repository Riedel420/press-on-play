"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { TooltipProps, LegendProps } from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />");
  return ctx;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} data-chart={chartId} className={cn("flex aspect-video", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

export const ChartTooltip = RechartsPrimitive.Tooltip;

type CustomTooltipProps = TooltipProps<number, string> & {
  hideLabel?: boolean;
};

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, CustomTooltipProps>(
  function ChartTooltipContent(props, ref) {
    const active = props.active;
    const payload = Array.isArray(props.payload) ? props.payload : [];
    const label = typeof props.label === "string" || typeof props.label === "number" ? props.label : "";

    if (!active || payload.length === 0) return null;

    return (
      <div ref={ref} className="rounded border bg-white p-2 text-xs shadow">
        {!props.hideLabel && <div>{label}</div>}
        {payload.map((item: { name?: string; value?: number }, i: number) => (
          <div key={i}>
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

export const ChartLegend = RechartsPrimitive.Legend;

type CustomLegendProps = LegendProps & {
  hideIcon?: boolean;
};

export const ChartLegendContent = React.forwardRef<HTMLDivElement, CustomLegendProps>(
  function ChartLegendContent(props, ref) {
    const payload = Array.isArray(props.payload) ? props.payload : [];

    if (payload.length === 0) return null;

    return (
      <div ref={ref} className="flex gap-2 text-xs">
        {payload.map(
          (
            entry: { value?: string | number; color?: string },
            i: number
          ) => (
            <span key={i} style={{ color: entry.color }}>
              {entry.value}
            </span>
          )
        )}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";