const fs = require("fs");

// Function to limit the food name to 26 characters and cut it off at the last comma
function shortenFoodName(name) {
  // If the name is already short enough, return it as is
  if (name.length <= 26) return name;

  // Find the last comma that appears before the 26th character
  let lastCommaIndex = name.substring(0, 26).lastIndexOf(",");

  // If no such comma exists, just cut the name off at the 26th character
  if (lastCommaIndex === -1) return name.substring(0, 26);

  // Otherwise, cut the name off at the last comma
  return name.substring(0, lastCommaIndex);
}

// Read the existing JSON file
const rawData = fs.readFileSync("transformedData.json");
const oldData = JSON.parse(rawData);

let newData = {};

// Iterate over each foodId in the old data
for (let foodId in oldData) {
  let foodItem = oldData[foodId];

  let transformedFood = {
    food: shortenFoodName(foodItem.nutrients.Food),
    nutrients: [],
  };

  // Iterate over each nutrient in the old nutrients object
  for (let nutrientName in foodItem.nutrients) {
    // Skip the "Food" property
    if (nutrientName !== "Food") {
      transformedFood.nutrients.push({
        nutrient: nutrientName,
        value: foodItem.nutrients[nutrientName] * 100, // Convert from decimal to percentage
      });
    }
  }

  newData[foodId] = transformedFood;
}

// Write the new data to a new JSON file
fs.writeFileSync("step2Data.json", JSON.stringify(newData, null, 2));
