import React, { useState } from "react";
import RadialBarChart from "./components/RadialBarChart";
import data from "../src/components/finalData.json";
import "./App.css";
import Menu from "./components/Menu";
import MineralList from "./components/MineralList";
import VitaminList from "./components/VitaminList/VitaminList";
import profilePic from "./assets/images/Profile_Pic_Deadlift_POP_OFF.png";

// Convert data object into array
const foodArray = Object.keys(data).map((foodId) => ({
  foodId,
  ...data[foodId],
}));

function App() {
  const [selectedFood, setSelectedFood] = useState(foodArray[0]);

  return (
    <div className="App-screen">
      <div className="App-container">
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
          <a
            href="https://twitter.com/MPeytonCox"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <img
                src={profilePic}
                alt="Profile"
                style={{ width: "50px", height: "50px" }}
              />

              <h3 style={{ marginLeft: 5, color: "rgba(0,250,250,1)" }}>
                @MPeytonCox
              </h3>
            </div>
            <div
              style={{
                textDecoration: "none",
                color: "rgba(150,150,150,1)",
                paddingLeft: 20,
              }}
            >
              👆 for more insights
            </div>
          </a>
        </div>

        <div className="App-Keys">
          <MineralList />
          <VitaminList />
        </div>
      </div>

      <div className="App-chart">
        <RadialBarChart foodData={selectedFood.nutrients} />
      </div>
    </div>
  );
}

export default App;
