import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../ThemeContext";



const SalesChart = () => {
  const { theme } = useTheme();
  
  const themeValueColors = {
    green: "#ffffff", 
    light: "#000000", 
  };

  const valueColor = themeValueColors[theme] || "#ffffff"; 
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: "60%", 
        distributed: true, 
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          color: valueColor, 
          fontSize: "12px",
          fontWeight: 600,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: ["تفاح", "تفاحة", "مانجو", "موز"],
    },
    yaxis: {
      opposite: true,
      tickAmount: 5, 
      labels: {
        style: {
          color: valueColor, 
          fontSize: "10px",
          fontWeight: 600,
        },
      },
      title: {
        text: "",
      },
    },
    legend: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.25,
        gradientToColors: ["#055a2e", "#feb204", "#cf3a02", "#027373"], 
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    // colors: ["#448764", "#ffd22b", "#ff4500"], 
  };

  const series = [
    {
      name: "Servings",
      data: [4, 10, 21, 17], 
    },
  ];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={240} />
    </div>
  );
};

export default SalesChart;