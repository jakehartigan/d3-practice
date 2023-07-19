// getNutrientColor.js
export function isVitamin(nutrient) {
  const vitamins = [
    "A",
    "C",
    "D",
    "E",
    "vK",
    "B1",
    "B2",
    "B3",
    "B6",
    "B9",
    "B12",
    "B7",
    "B5",
    "Chol",
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
    "Chl",
    "K",
  ];
  return minerals.includes(nutrient);
}

export function getNutrientColor(nutrient) {
  if (isVitamin(nutrient)) {
    return "#FEBC5E";
  }

  if (isMineral(nutrient)) {
    return "#DF5C51";
  }

  return "#2F4858";
}
