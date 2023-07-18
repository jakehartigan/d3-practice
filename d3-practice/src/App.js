import React, { useState } from "react";
import foodData from "../src/assets/food_nutrition_PDV.json";
import BarChart from "./components/BarChart";

function App() {
  const [selectedFood, setSelectedFood] = useState("Almond milk, sweetened");

  const handleSelectChange = (event) => {
    setSelectedFood(event.target.value);
  };

  return (
    <div
      style={{
        display: "block",
        height: "100vh",
        width: "100vw",
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",

          height: "100%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
        }}
      >
        <BarChart />
      </div>
    </div>
  );
}

export default App;
