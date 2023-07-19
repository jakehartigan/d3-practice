import React, { useState } from "react";
import RadialBarChart from "./components/RadialBarChart";
import data from "../src/components/finalData.json";

// Convert data object into array
const foodArray = Object.keys(data).map((foodId) => ({
  foodId,
  ...data[foodId],
}));

function App() {
  const [selectedFood, setSelectedFood] = useState(foodArray[0]);

  return (
    <div>
      <div>
        <h3>Nutrient Chart</h3>
        <select
          value={selectedFood.foodId}
          onChange={(e) => {
            const foodId = e.target.value;
            const food = foodArray.find((food) => food.foodId === foodId);
            setSelectedFood(food);
          }}
        >
          {foodArray.map((food) => (
            <option key={food.foodId} value={food.foodId}>
              {food.food}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>{selectedFood.food}</h3>
        <RadialBarChart foodData={selectedFood.nutrients} />
      </div>
    </div>
  );
}

export default App;
