import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../ThemeContext";

const PieChartCustom = ({ value, thickness = "65%", size = 160 }) => {
  const { theme } = useTheme();

  const themeColors = {
    green: {
      text: "#ffffff",
      primary: "#E8D9B8",
      secondary: "#5a6268",
    },
    light: {
      text: "#000000",
      primary: "#A67C00", 
      secondary: "#E0E0E0",
    },
  };

  const colors = themeColors[theme] || themeColors["green"];

  const series = [value, 100 - value];

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["", ""],
    colors: [colors.primary, colors.secondary],
    stroke: {
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: thickness,
        },
      },
    },
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Chart options={options} series={series} type="donut" width={size} />
      <p style={{ fontWeight: "700", color: colors.text }}>
        {value.toFixed(2)}%
      </p>
    </div>
  );
};

export default PieChartCustom;
