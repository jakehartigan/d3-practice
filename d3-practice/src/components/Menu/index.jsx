import React, { useState } from "react";
import searchIcon from "/Users/jakehartigan/Desktop/Apace/Ai_Coding_Projects/d3-practice/d3-practice/src/search_FILL0_wght400_GRAD0_opsz48.svg";
import "../../App.css";

const Menu = ({ foodArray, setSelectedFood, selectedFood }) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false);

  const handleChange = (e) => {
    const foodId = e.target.value;
    const food = foodArray.find((food) => food.foodId === foodId);
    setSelectedFood(food);
    setIsSelectVisible(false); // hide the select element after selection
  };

  const handleIconClick = () => {
    setIsSelectVisible(true); // show the select element when the icon is clicked
  };

  return (
    <>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "rgba(0,0,0,0)",
            border: "none",
            color: "#fff",
            marginRight: "10px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={handleIconClick}
        >
          <img src={searchIcon} alt="search" />
        </button>
        <select
          style={{
            display: isSelectVisible ? "inline-block" : "none",
            backgroundColor: "rgba(250,250,250,0.25)",
            margin: 0,
          }}
          value={selectedFood.foodId}
          onChange={handleChange}
        >
          {foodArray.map((food) => (
            <option key={food.foodId} value={food.foodId}>
              {food.food}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Menu;
