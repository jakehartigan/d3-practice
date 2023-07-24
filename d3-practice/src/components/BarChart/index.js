import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import data from "../finalData.json";

const foodId1Data = data.foodId1.nutrients;
const chartData = Object.keys(foodId1Data).map((nutrient) => ({
  nutrient,
  value: foodId1Data[nutrient],
}));

function BarChart() {
  return (
    <VictoryChart width={800} domainPadding={10} theme={VictoryTheme.material}>
      <VictoryAxis
        tickFormat={(x) => `${x}`}
        style={{
          tickLabels: {
            angle: -80,
            fontSize: 8,
            padding: 5,
            textAnchor: "end",
            verticalAnchor: "start",
          },
        }}
      />
      <VictoryAxis dependentAxis tickFormat={(x) => `${x * 100}%`} />
      <VictoryBar data={chartData} x="nutrient" y="value" />
    </VictoryChart>
  );
}

export default BarChart;
