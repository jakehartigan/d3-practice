import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getNutrientColor, isVitamin, isMineral } from "./getNutrientColor";
import logo from "../../assets/images/Apace_MicroBreakdown_Logo.svg";

function RadialBarChart({ foodData }) {
  const ref = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width when window size changes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

    // Adjust scale based on window width
    let scaleMultiplier = 0.9;
    if (windowWidth < 1000) {
      scaleMultiplier = 0.5; // Adjust this value as needed
    }

    const svg = d3
      .select(ref.current)
      .attr("width", 1000 * scaleMultiplier)
      .attr("height", 1000 * scaleMultiplier);

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

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${500 * scaleMultiplier},${500 * scaleMultiplier})`
      );

    const maxDataValue = d3.max(foodData, (d) => d.value);
    const xScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.nutrient))
      .range([0, 2 * Math.PI]);

    const yScale = d3
      .scaleRadial()
      .domain([0, maxDataValue])
      .range([200 * scaleMultiplier, 400 * scaleMultiplier]);

    // Draw the background circle
    const maxRadius = yScale(maxDataValue) + 3;
    g.append("circle")
      .attr("r", maxRadius)
      .attr("fill", "rgba(0,0,0,0.25)")
      .attr("stroke", "rgba(0,0,0,0.5")
      .attr("stroke-width", 5);

    // Draw inner circle
    g.append("circle").attr("r", 100).attr("fill", "rgba(0,0,0,1)");

    // Draw rings for each 20% increment up to 100% and each 100% increment if nutrient value exceeds 100%
    for (let i = 0; i <= maxDataValue; i += i < 100 ? 20 : 100) {
      const isMultipleOf100 = i % 100 === 0;
      const shouldShowRing =
        i <= 100 || (isMultipleOf100 && maxDataValue >= 100);

      // Skip the 0% dashed line
      if (i > 0 && shouldShowRing) {
        g.append("circle")
          .attr("r", yScale(i))
          .attr("fill", "none")
          .attr("stroke", isMultipleOf100 ? "#06D6A0" : "#86BBD8")
          .attr("stroke-dasharray", isMultipleOf100 ? "0" : "4,4");

        // Add text label
        g.append("text")
          .attr("x", -10) // adjust x position to properly place the label
          .attr("y", -yScale(i) + 12) // adjust y position to properly place the label
          .text(i + "%") // text to display
          .style("font-size", "16px") // adjust text size
          .attr("fill", isMultipleOf100 ? "#06D6A0" : "#86BBD8"); // text color
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
          .innerRadius((d) => (d.value === 0 ? 0 : 100))
          .outerRadius((d) => (d.value === 0 ? 0 : yScale(d.value)))
          .startAngle((d) => xScale(d.nutrient))
          .endAngle((d) => xScale(d.nutrient) + xScale.bandwidth())
          .padAngle(0.01)
          .padRadius(500)
      )
      .attr("fill", (d) => getNutrientColor(d.nutrient))
      .style("filter", "url(#drop-shadow)");

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
      .style("font-size", `10px`)
      .attr("fill", "white"); // change text color to white

    //ads logo to center
    fetch(logo)
      .then((response) => response.text())
      .then((data) => {
        // Create a new SVG group for the logo
        const logoGroup = g
          .append("g")
          .attr(
            "transform",
            `scale(${scaleMultiplier / 1.5}) translate(-71 -80)`
          );

        // Set the logo SVG as the group's HTML content
        logoGroup.node().innerHTML = data;
      });
  }, [foodData, windowWidth]);

  return (
    <div>
      <svg ref={ref} />
    </div>
  );
}

export default RadialBarChart;
