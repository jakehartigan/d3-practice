import React from "react";

const Minerals = {
  Calcium: "Ca",
  Iron: "Fe",
  Phosphorus: "P",
  Iodine: "I",
  Magnesium: "Mg",
  Zinc: "Zn",
  Selenium: "Se",
  Copper: "Cu",
  Manganese: "Mn",
  Chromium: "Cr",
  Molybdenum: "Mo",
  Chloride: "Chl",
  Potassium: "K",
};

const MineralList = () => {
  return (
    <div>
      <h3
        style={{
          color: "#DF5C51",
          fontSize: "25px",
          paddingTop: 0,
          marginTop: 0,
        }}
      >
        Minerals
      </h3>
      <div
        style={{
          borderColor: "#DF5C51",
          borderStyle: "solid",
          borderWidth: "3px",
          borderRight: "",
          borderTop: "",
          borderBottom: "",
        }}
      >
        <ul
          style={{ listStyleType: "none", paddingLeft: "14px", paddingTop: 0 }}
        >
          {Object.entries(Minerals).map(([mineral, abbreviation]) => (
            <li
              style={{ paddingBottom: "7px", color: "#f3f3f3" }}
              key={mineral}
            >
              {mineral} ({abbreviation})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MineralList;
