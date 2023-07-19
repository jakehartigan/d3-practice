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

    // Create shadow filter
    const defs = svg.append("defs");

    const filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5)
      .attr("result", "blur");

    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", -5)
      .attr("dy", 10)
      .attr("result", "offsetBlur");

    const feComponentTransfer = filter.append("feComponentTransfer");

    feComponentTransfer
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.2);

    const feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g").attr("transform", "translate(250,250)");

    const maxDataValue = d3.max(foodData, (d) => d.value);
    const xScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.nutrient))
      .range([0, 2 * Math.PI]);

    const yScale = d3.scaleRadial().domain([0, maxDataValue]).range([100, 200]);

    // Draw the background circle
    const maxRadius = yScale(maxDataValue) + 3;
    g.append("circle")
      .attr("r", maxRadius)
      .attr("fill", "rgba(0,0,0,0.25)")
      .attr("stroke", "rgba(0,200,250,1");

    // Draw inner circle
    g.append("circle").attr("r", 100).attr("fill", "rgba(0,0,0,1)");

    // Draw rings for each 20% increment up to 100% and each 100% increment if nutrient value exceeds 100%
    for (let i = 0; i <= maxDataValue; i += i < 100 ? 20 : 100) {
      const isMultipleOf100 = i % 100 === 0;
      const shouldShowRing =
        i <= 100 || (isMultipleOf100 && maxDataValue >= 100);

      if (shouldShowRing) {
        g.append("circle")
          .attr("r", yScale(i))
          .attr("fill", "none")
          .attr("stroke", isMultipleOf100 ? "#33658A" : "#86BBD8")
          .attr("stroke-dasharray", isMultipleOf100 ? "0" : "4,4");

        // Add text label
        g.append("text")
          .attr("x", -7) // adjust x position to properly place the label
          .attr("y", -yScale(i) - 2) // adjust y position to properly place the label
          .text(i + "%") // text to display
          .style("font-size", "15px") // adjust text size
          .attr("fill", "#2F4858"); // text color
      }
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
      .attr("fill", (d) => getNutrientColor(d.nutrient))
      .style("filter", "url(#drop-shadow)"); // Apply the filter to the paths

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
      .style("font-size", "8px")
      .attr("fill", "white"); // change text color to white
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
