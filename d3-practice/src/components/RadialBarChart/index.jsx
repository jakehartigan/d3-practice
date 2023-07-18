import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { getNutrientColor, isVitamin, isMineral } from "./getNutrientColor";

function RadialBarChart({ foodData }) {
  const ref = useRef();

  useEffect(() => {
    const sortedData = foodData.sort((a, b) => {
      if (isVitamin(a.nutrient) && isMineral(b.nutrient)) {
        return -1;
      }
      if (isMineral(a.nutrient) && isVitamin(b.nutrient)) {
        return 1;
      }
      return 0;
    });

    const svg = d3.select(ref.current).attr("width", 500).attr("height", 500);

    // Clear svg
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", "translate(250,250)");

    const maxDataValue = d3.max(foodData, (d) => d.value);
    const xScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.nutrient))
      .range([0, 2 * Math.PI]);

    const yScale = d3.scaleRadial().domain([0, maxDataValue]).range([100, 200]);

    // Draw rings for each 100% increment
    for (let i = 1; i <= Math.ceil(maxDataValue / 100); i++) {
      g.append("circle")
        .attr("r", yScale(i * 100))
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-dasharray", "4,4");
    }

    g.selectAll("path")
      .data(sortedData)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(100)
          .outerRadius((d) => yScale(d.value))
          .startAngle((d) => xScale(d.nutrient))
          .endAngle((d) => xScale(d.nutrient) + xScale.bandwidth())
          .padAngle(0.01)
          .padRadius(100)
      )
      .attr("fill", (d) => getNutrientColor(d.nutrient));

    g.append("g")
      .selectAll("g")
      .data(sortedData)
      .enter()
      .append("g")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        (d) =>
          `rotate(${(xScale(d.nutrient) * 180) / Math.PI - 83}) translate(110)`
      )
      .append("text")
      .attr("transform", (d) =>
        (xScale(d.nutrient) + xScale.bandwidth() / 2 + Math.PI / 2) %
          (2 * Math.PI) <
        Math.PI
          ? "rotate(90)translate(0,22)"
          : "rotate(-90)translate(0, -15)"
      )
      .text((d) => d.nutrient)
      .style("font-size", "8px");
  }, [foodData]);

  return <svg ref={ref} />;
}

export default RadialBarChart;
