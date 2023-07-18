// getNutrientColor.js
export function isVitamin(nutrient) {
  const vitamins = [
    "A",
    "C",
    "D",
    "E",
    "K",
    "B1",
    "B2",
    "B3",
    "B6",
    "B9",
    "B12",
    "B7",
    "B5",
    "Choline",
  ];
  return vitamins.includes(nutrient);
}

export function isMineral(nutrient) {
  const minerals = [
    "Ca",
    "Fe",
    "P",
    "Iodine",
    "Mg",
    "Zn",
    "Se",
    "Cu",
    "Mn",
    "Cr",
    "Mo",
    "Chloride",
    "K",
  ];
  return minerals.includes(nutrient);
}

export function getNutrientColor(nutrient) {
  if (isVitamin(nutrient)) {
    return "blue";
  }

  if (isMineral(nutrient)) {
    return "red";
  }

  return "black";
}
