import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RadialChart = ({ data, selectedFood }) => {
  const ref = useRef();

  const transformData = (data, foodName) => {
    let specificFood = data.find((d) => d[""] === foodName);
    let transformedData = [];
    for (let key in specificFood) {
      if (key !== "") {
        transformedData.push({
          nutrient: key,
          value: specificFood[key],
        });
      }
    }
    return transformedData;
  };

  useEffect(() => {
    // Here we use the imported function
    const transformedData = transformData(data, selectedFood);

    //test⚠️
    console.log(transformedData);

    const svg = d3.select(ref.current);

    // Clear the SVG
    svg.selectAll("*").remove();

    const width = 500;
    const height = 500;
    const innerRadius = 100;
    const outerRadius = Math.min(width, height) / 2;

    const labelRadius = (innerRadius + outerRadius) / 2; // Adjust as needed

    // Now use transformedData in your scales and chart rendering logic
    const x = d3
      .scaleBand()
      .domain(transformedData.map((d) => d.nutrient))
      .range([0, 2 * Math.PI])
      .align(0);

    // Compute the max value in your dataset
    const maxValue = d3.max(transformedData, (d) => d.value);

    // Now use this maxValue in your y-scale's domain
    const y = d3
      .scaleRadial()
      .domain([0, maxValue])
      .range([innerRadius, outerRadius]);
    //test⚠️
    console.log(
      "scale x output:",
      transformedData.map((d) => x(d.nutrient))
    );
    console.log(
      "scale y output:",
      transformedData.map((d) => y(d.value))
    );

    const chart = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    chart
      .selectAll("path")
      .data(transformedData)
      .enter()
      .append("path")
      .attr("fill", "#8884d8")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d["Choline"]))
          .startAngle((d) => x(d[""]))
          .endAngle((d) => x(d[""]) + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      );
    const label = d3
      .arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius)
      .startAngle((d) => x(d.nutrient))
      .endAngle((d) => x(d.nutrient) + x.bandwidth());

    //test⚠️
    console.log(
      "centroid arguments:",
      transformedData.map((d) => ({
        startAngle: x(d.nutrient),
        endAngle: x(d.nutrient) + x.bandwidth(),
      }))
    );

    chart
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(transformedData)
      .enter()
      .append("text")
      .attr(
        "transform",
        (d) =>
          `translate(${label.centroid({
            startAngle: x(d.nutrient),
            endAngle: x(d.nutrient) + x.bandwidth(),
          })}) rotate(${(x(d.nutrient) * 180) / Math.PI - 90}) rotate(${90})`
      )

      .text((d) => d.nutrient)
      .style("fill", "black")
      .attr("alignment-baseline", "middle");
  }, [data, selectedFood]);

  return (
    <svg
      ref={ref}
      style={{ height: "800px", width: "800px", fill: "blue" }}
    ></svg>
  );
};

export default RadialChart;
