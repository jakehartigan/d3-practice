import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import {
  getNutrientColor,
  isVitamin,
  isMineral,
} from "../RadialBarChart/getNutrientColor";

function MineralChart({ foodData }) {
  const mineralsData = foodData.filter(({ nutrient }) => isMineral(nutrient));

  return (
    <VictoryChart domainPadding={10}>
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryBar
        data={mineralsData}
        x="nutrient"
        y="value"
        style={{
          data: { fill: ({ datum }) => getNutrientColor(datum.nutrient) },
        }}
      />
    </VictoryChart>
  );
}

export default MineralChart;
