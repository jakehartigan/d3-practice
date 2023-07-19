import React, { useState } from "react";
import RadialBarChart from "./components/RadialBarChart";
import data from "../src/components/finalData.json";
import "./App.css";
import Menu from "./components/Menu";

// Convert data object into array
const foodArray = Object.keys(data).map((foodId) => ({
  foodId,
  ...data[foodId],
}));

function App() {
  const [selectedFood, setSelectedFood] = useState(foodArray[0]);

  return (
    <div
      className="App-screen"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        backgroundColor: "#555",
      }}
    >
      <div>
        <div>
          <Menu
            foodArray={foodArray}
            setSelectedFood={setSelectedFood}
            selectedFood={selectedFood}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="App-header">
            <div
              className="App-text"
              style={{
                fontSize: "30px",
                margin: 0,
                fontWeight: 700,
              }}
            >
              Micro
            </div>
            <div
              className="App-text"
              style={{
                fontSize: "30px",
                fontWeight: 300,
                margin: 0,
              }}
            >
              Breakdown
            </div>
          </div>
          <div
            className="App-currentfood"
            style={{
              color: "#fff",
              fontSize: "32px",
              fontWeight: 700,
              fontFamily: "Roboto",
            }}
          >
            {selectedFood.food}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          marginTop: "5px",
          zIndex: 0,
        }}
      >
        <RadialBarChart foodData={selectedFood.nutrients} />
      </div>
    </div>
  );
}

export default App;
