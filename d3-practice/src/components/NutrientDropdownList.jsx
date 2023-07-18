import React from "react";

// Assume this is the array you've got from the previous step
const uniqueNutrientNames = ["Vitamin C", "Vitamin D", "Iron", "Calcium"];

function NutrientDropdownList() {
  return (
    <select>
      {uniqueNutrientNames.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default NutrientDropdownList;
