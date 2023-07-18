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
    // Draw rings for each 20% increment
    for (let i = 0; i <= maxDataValue; i += 20) {
      // Check if the increment is a multiple of 100
      const isMultipleOf100 = i % 100 === 0;

      g.append("circle")
        .attr("r", yScale(i))
        .attr("fill", "none")
        .attr("stroke", isMultipleOf100 ? "#33658A" : "#86BBD8") // if i is a multiple of 100, the stroke is green, else it's #ccc
        .attr("stroke-dasharray", isMultipleOf100 ? "0" : "4,4"); // if i is a multiple of 100, the line is solid, else it's dashed

      // Add text label
      g.append("text")
        .attr("x", -7) // adjust x position to properly place the label
        .attr("y", -yScale(i) - 2) // adjust y position to properly place the label
        .text(i + "%") // text to display
        .style("font-size", "15px") // adjust text size
        .attr("fill", "#2F4858"); // text color
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
          .padRadius(500)
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

  const downloadSVG = () => {
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(ref.current);

    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }

    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const url =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <svg ref={ref} />
      <button onClick={downloadSVG}>Download SVG</button>
    </div>
  );
}

export default RadialBarChart;
