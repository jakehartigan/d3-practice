const vitamins = [
  { vitaminName: "Vitamin D (D2 + D3)" },
  { vitaminName: "Vitamin D3 (cholecalciferol)" },
  { vitaminName: "Vitamin D2 (ergocalciferol)" },
  { vitaminName: "Vitamin D2 (ergocalciferol)" },
  { vitaminName: "Vitamin K (Menaquinone-4)" },
  { vitaminName: "Vitamin K (Dihydrophylloquinone)" },
  { vitaminName: "Pantothenic acid" },
  { vitaminName: "Riboflavin" },
  { vitaminName: "Niacin" },
  { vitaminName: "Biotin" },
  { vitaminName: "Folate, total" },
  { vitaminName: "10-Formyl folic acid (10HCOFA)" },
  { vitaminName: "5-Formyltetrahydrofolic acid (5-HCOH4" },
  { vitaminName: "Vitamin A, IU" },
  { vitaminName: "Vitamin A, RAE" },
  { vitaminName: "Retinol" },
  { vitaminName: "Vitamin K (phylloquinone)" },
  { vitaminName: "Vitamin B-6" },
  { vitaminName: "Vitamin C, total ascorbic acid" },
  { vitaminName: "Vitamin A" },
  { vitaminName: "Vitamin B-12" },
  { vitaminName: "Vitamin E (alpha-tocopherol)" },
  { vitaminName: "Vitamin D (D2 + D3), International Units" },
];

const omega3FattyAcids = [
  { omega3Name: "PUFA 18:3 n-3 c,c,c (ALA)" },
  { omega3Name: "PUFA 20:5 n-3 (EPA)" },
  { omega3Name: "PUFA 20:3 c" },
  { omega3Name: "PUFA 20:4c" },
  { omega3Name: "PUFA 20:5c" },
  { omega3Name: "PUFA 22:5 c" },
  { omega3Name: "PUFA 22:6 c" },
  { omega3Name: "PUFA 22:5 n-3 (DPA)" },
  { omega3Name: "PUFA 22:6 n-3 (DHA)" },
  { omega3Name: "PUFA 20:4" },
  { omega3Name: "PUFA 18:4" },
  { omega3Name: "PUFA 20:3 n-3" },
];

const omega6FattyAcids = [
  { omega6Name: "PUFA 20:2 c" },
  { omega6Name: "PUFA 18:2 CLAs" },
  { omega6Name: "PUFA 18:2 n-6 c,c" },
  { omega6Name: "PUFA 18:3 n-6 c,c,c" },
  { omega6Name: "PUFA 20:2 n-6 c,c" },
  { omega6Name: "PUFA 20:4 n-6" },
  { omega6Name: "PUFA 22:2" },
  { omega6Name: "PUFA 22:4" },
  { omega6Name: "PUFA 18:2 c" },
];

const minerals = [
  { mineralName: "Calcium, Ca" },
  { mineralName: "Iron, Fe" },
  { mineralName: "Copper, Cu" },
  { mineralName: "Phosphorus, P" },
  { mineralName: "Magnesium, Mg" },
  { mineralName: "Manganese, Mn" },
  { mineralName: "Carotene, beta" },
  { mineralName: "Carotene, alpha" },
  { mineralName: "Sodium, Na" },
  { mineralName: "Zinc, Zn" },
  { mineralName: "Potassium, K" },
  { mineralName: "Selenium, Se" },
  { mineralName: "Molybdenum, Mo" },
  { mineralName: "Selenium, Se" },
  { mineralName: "Iodine" },
  { mineralName: "Iodine" },
  { mineralName: "Iodine" },
  { mineralName: "Choline, total" },
];

const macros = [
  { macroName: "Protein" },
  { macroName: "Carbohydrate, by difference" },
  { macroName: "Carbohydrate, by summation" },
  { macroName: "Protein" },
  { macroName: "Protein" },
  { macroName: "Protein" },
];

// ------------------- common names ------------------------
// Cryptoxanthin, beta (A)
const vitaminA = [
  { vitaminAName: "Vitamin A, RAE" },
  { vitaminAName: "Retinol" },
  { vitaminAName: "Vitamin A" },
  { vitaminAName: "Vitamin A, IU" },
];

const b2 = "Riboflavin";
const b3 = "Niacin";
const b5 = "Pantothenic acid";
const b7 = "Biotin";
const b9 = [
  { b9name: "5-Formyltetrahydrofolic acid (5-HCOH4" },
  { b9name: "10-Formyl folic acid (10HCOFA)" },
  { b9name: "Folate, total" },
];

function NutrientList() {
  return (
    <div>
      {vitamins.map(({ vitaminName }, index) => (
        <p key={index}>
          sheet.getRange(foodIndex + 2, 3{index}).setValue(nutrientData['
          {vitaminName}']);
        </p>
      ))}
    </div>
  );
}

export default NutrientList;
