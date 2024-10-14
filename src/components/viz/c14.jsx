"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts";

const chartConfig = {
  c14: {
    label: "C14",
    color: "black",
  },
};
export function C14({ title, subtitle, data, width, height }) {
  return (
    // <ResponsiveContainer width={width} height={height}>
    <ChartContainer config={chartConfig} className="mx-auto aspect-square">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="subject" />
        <PolarGrid />
        <Radar dataKey="c14" stroke="var(--color-c14)" fillOpacity={0.2} />
      </RadarChart>
    </ChartContainer>
    // </ResponsiveContainer>
  );
}
