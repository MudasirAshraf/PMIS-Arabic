import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../ThemeContext";

const RadialChart = () => {
  const { theme } = useTheme();

  const themeValueColors = {
    green: "#ffffff", 
    light: "#000000", 
  };

  const valueColor = themeValueColors[theme] || "#ffffff"; 

  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        track: {
          background: "", 
          strokeWidth: "100%", 
          margin: 0, 
        },
        dataLabels: {
          name: {
            show: false, 
          },
          value: {
            fontSize: "20px", 
            fontWeight: "bold", 
            color: valueColor, 
            show: true,
            offsetY: 5,
          },
        },
        hollow: {
          size: "65%", 
        },
        strokeWidth: "10%", 
      },
    },
    labels: [""],
  };

  const series = [70];

  return (
    <div className="w-full flex justify-center">
      <Chart options={options} series={series} type="radialBar" height={190} />
    </div>
  );
};

export default RadialChart;