const fs = require("fs");
const path = require("path");

const data = require("/Users/jakehartigan/Desktop/Apace/Ai_Coding_Projects/d3-practice/d3-practice/src/components/transformedData.json"); // path to your original json file

const nutrientNameMap = {
  // your nutrient mapping...
};

let newRadialData = {};

Object.keys(data).forEach((foodId) => {
  let nutrientsArray = [];
  let foodData = data[foodId];

  Object.keys(foodData.nutrients).forEach((nutrient) => {
    let nutrientName = nutrientNameMap[nutrient] || nutrient;
    let value = foodData.nutrients[nutrient] * 100;

    nutrientsArray.push({
      nutrient: nutrientName,
      value: value,
    });
  });

  newRadialData[foodId] = {
    food: foodData.food,
    nutrients: nutrientsArray,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, "newRadialData.json"),
  JSON.stringify(newRadialData, null, 2)
);
