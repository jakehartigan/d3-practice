const fs = require("fs");

// Read the existing JSON file
const rawData = fs.readFileSync("transformedData.json");
const oldData = JSON.parse(rawData);

let newData = {};

// Iterate over each foodId in the old data
for (let foodId in oldData) {
  let foodItem = oldData[foodId];

  let transformedFood = {
    food: foodItem.nutrients.Food,
    nutrients: [],
  };

  // Iterate over each nutrient in the old nutrients object
  for (let nutrientName in foodItem.nutrients) {
    // Skip the "Food" property
    if (nutrientName !== "Food") {
      transformedFood.nutrients.push({
        nutrient: nutrientName,
        value: foodItem.nutrients[nutrientName],
      });
    }
  }

  newData[foodId] = transformedFood;
}

// Write the new data to a new JSON file
fs.writeFileSync("step2Data.json", JSON.stringify(newData, null, 2));
