const fs = require("fs");
const path = require("path");
const rawData = require("./newRadialData.json");

const nutrientNameMap = {
  "Vitamin A": "A",
  "Vitamin C": "C",
  Calcium: "Ca",
  Iron: "Fe",
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
  Phosphorus: "P",
  Iodine: "Iodine",
  Magnesium: "Mg",
  Zinc: "Zn",
  Selenium: "Se",
  Copper: "Cu",
  Manganese: "Mn",
  Chromium: "Cr",
  Molybdenum: "Mo",
  Chloride: "Chloride",
  Potassium: "K",
  Choline: "Choline",
};

// Create a new object to hold the updated data
let newRadialData = {};

// Iterate over all food items
for (let foodId in rawData) {
  // Use map to create a new array where the nutrient names are replaced
  newRadialData[foodId] = {
    food: rawData[foodId].food,
    nutrients: rawData[foodId].nutrients.map(({ nutrient, value }) => ({
      nutrient: nutrientNameMap[nutrient] || nutrient,
      value,
    })),
  };
}

// Write the new data to a new JSON file
fs.writeFileSync(
  path.join(__dirname, "newAbrvRadialData.json"),
  JSON.stringify(newRadialData, null, 2)
);

console.log("New file with abbreviated nutrient names has been created!");
