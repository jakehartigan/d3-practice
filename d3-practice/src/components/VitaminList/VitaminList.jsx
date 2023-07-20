import React from "react";

const Vitamins = {
  "Vitamin A": "A",
  "Vitamin C": "C",
  "Vitamin D": "D",
  "Vitamin E": "E",
  "Vitamin K": "vK",
  Thiamin: "B1",
  Riboflavin: "B2",
  Niacin: "B3",
  "Vitamin B6": "B6",
  Folate: "B9",
  "Vitamin B12": "B12",
  Biotin: "B7",
  "Pantothenic acid": "B5",
  Choline: "Chol",
};

const VitaminList = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <h3 style={{ color: "#FEBC5E", fontSize: "25px" }}>Vitamins</h3>
      <div
        style={{
          borderColor: "#FEBC5E",
          borderStyle: "solid",
          borderWidth: "3px",
          borderRight: "",
          borderTop: "",
          borderBottom: "",
        }}
      >
        <ul style={{ listStyleType: "none", paddingLeft: "14px" }}>
          {Object.entries(Vitamins).map(([vitamin, abbreviation]) => (
            <li
              style={{ paddingBottom: "7px", color: "#f3f3f3" }}
              key={vitamin}
            >
              {vitamin} ({abbreviation})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VitaminList;
