import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import {
  getNutrientColor,
  isVitamin,
  isMineral,
} from "../RadialBarChart/getNutrientColor";

function VitaminChart({ foodData }) {
  const vitaminsData = foodData.filter(({ nutrient }) => isVitamin(nutrient));

  return (
    <VictoryChart domainPadding={10}>
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryBar
        data={vitaminsData}
        x="nutrient"
        y="value"
        style={{
          data: { fill: ({ datum }) => getNutrientColor(datum.nutrient) },
        }}
      />
    </VictoryChart>
  );
}

export default VitaminChart;
