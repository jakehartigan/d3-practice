const fs = require("fs");

fs.readFile(
  "/Users/jakehartigan/Desktop/Apace/Ai_Coding_Projects/d3-practice/d3-practice/src/assets/updatedNutritionTable.json",
  "utf8",
  (err, data) => {
    if (err) {
      console.error("Failed to read file:", err);
      return;
    }

    const originalData = JSON.parse(data);

    const transformedData = originalData.reduce((acc, food, index) => {
      const { title, ...nutrients } = food; // separate the title and nutrients
      acc[`foodId${index + 1}`] = { food: title, nutrients }; // assign a unique id for each food item
      return acc;
    }, {});

    fs.writeFile(
      "transformedData.json",
      JSON.stringify(transformedData, null, 2),
      (err) => {
        if (err) {
          console.error("Failed to write file:", err);
          return;
        }

        console.log("File has been created");
      }
    );
  }
);
