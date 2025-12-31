import React, { useEffect } from "react";
import * as d3 from "d3";
import { useTheme } from "../ThemeContext";

const DonutChartD3 = () => {
  const { theme } = useTheme(); 

  useEffect(() => {
    const width = 400;
    const height = 360;
    const radius = Math.min(width, height) / 2;

    const data = [
      { label: "تحقيق النضج المؤسسي وتعزيز الموارد المالية", value: 25 },
      { label: "تحسين منظومة نظارة الأوقاف وتنظيم أدوارها", value: 25 },
      { label: "تطوير مناخ الأوقاف ورفع الوعي به", value: 25 },
      { label: "تعزيز البيئة التنظيمية للقطاع الوقفي", value: 25 },
    ];

    d3.select("#donut-chart").selectAll("*").remove();

    const svg = d3
      .select("#donut-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style(
        "filter",
        theme === "green"
          ? "drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.35))"
          : "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10))"
      )
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .padAngle(0.05);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.45) // Slice Thickness
      .outerRadius(radius);

    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Colors
    const sliceColor = theme === "light" ? "#f2f2f2" : "rgba(17, 127, 112, 1)";
    const textColor = theme === "light" ? "#000" : "white";
    const borderColor = theme === "light" ? "gray" : "white";

    //  theme- styles 
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", sliceColor) 
      .attr("stroke", borderColor) 
      .style("stroke-width", "1px"); 

    //  wrap text 
    const wrapText = (text, maxWidth) => {
      const words = text.split(" ");
      let line = [];
      const lines = [];

      words.forEach((word) => {
        const testLine = [...line, word].join(" ");
        if (testLine.length > maxWidth) {
          lines.push(line.join(" "));
          line = [word];
        } else {
          line.push(word);
        }
      });

      lines.push(line.join(" "));
      return lines;
    };

    // rotated text 
    arcs
      .append("text")
      .attr("transform", (d) => {
        const centroid = arc.centroid(d);
        const angle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI);
        const x = centroid[0] * 1;
        const y = centroid[1] * 1;

        return `translate(${x}, ${y}) rotate(${angle > 90 && angle < 270 ? angle + 180 : angle})`;
      })
      .attr("text-anchor", "middle")
      .style("font-size", "0.825rem")
      .style("fill", textColor) 
      .style("font-weight", "bold")
      .style("direction", "rtl")
      .each(function (d) {
        const lines = wrapText(d.data.label, 40);
        const textElement = d3.select(this);

        lines.forEach((line, i) => {
          textElement
            .append("tspan")
            .attr("x", 0)
            .attr("dy", i === 0 ? "0" : "1.25em")
            .text(line);
        });
      });

    // Center text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-10px")
      .style("font-size", "1.3rem")
      .style("font-weight", "bold")
      .style("fill", textColor) 
      .text("عدد المشاريع");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "15px")
      .style("font-size", "1.3rem")
      .style("font-weight", "bold")
      .style("fill", textColor)
      .text("40");
  }, [theme]); 


  return (
    <div className="flex justify-center items-center relative">
      <div id="donut-chart"></div>
    </div>
  );
};

export default DonutChartD3;
