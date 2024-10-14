"use client";
import * as React from "react";
import Plot from "react-plotly.js";
import { ResponsiveContainer } from "recharts";
import AutoSizer from "lp-react-virtualized-auto-sizer-react-18";

const chartConfig = {
  c14: {
    label: "C14",
    color: "black",
  },
};
export function C14_plotly({ title, subtitle, width, height, data }) {
  const vizdata = React.useMemo(() => {
    return [
      {
        type: "scatterpolar",
        r: [...data.map((d) => d.c14), data[0]?.c14],
        theta: [...data.map((d) => d.subject), data[0]?.subject],
        fill: "toself",
        name: "C14",
      },
    ];
  }, [data]);
  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [-1, 5],
      },
    },
    autosize: true,
    showlegend: false,
    margin: { t: 20, b: 20, l: 20, r: 20 }, // Adjust margins for responsiveness
    width: "100%",
    height: "100%",
    shapes: [
      {
        type: "circle",
        xref: "paper",
        yref: "paper",
        x0: 0.45, // Adjusting position to center it
        y0: 0.45,
        x1: 0.55,
        y1: 0.55,
        fillcolor: "rgba(0, 0, 0)", // Light gray circle
        line: {
          color: "black",
        },
      },
    ],
    annotations: [
      {
        x: 0.5,
        y: 0.5,
        xref: "paper",
        yref: "paper",
        text: "C14",
        showarrow: false,
        font: {
          size: 20,
          color: "white",
        },
      },
    ],
  };
  return (
    <Plot
      data={vizdata}
      layout={{ ...layout, height, width }}
      useResizeHandler={true}
      config={{ responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
