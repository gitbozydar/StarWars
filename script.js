import { rowData } from "./data.js";

const allButtons = document.getElementById("buttons-container");
const containerOfTable = document.getElementById("main-container");

for (let i = 0; i < Object.keys(rowData).length; i++) {
  const featureButton = document.createElement("button");
  featureButton.innerHTML = Object.keys(rowData)[i];
  featureButton.id = "showData" + i;
  featureButton.className = "buttons";
  featureButton.addEventListener("click", () => {
    showInfoByIndex(i);
    displayOnScreen();
    createTable(i);
  });
  allButtons.appendChild(featureButton);
}
const displayOnScreen = () => {
  document.getElementById("main-container").style.display = "flex";
  document.getElementById("buttons-container").style.display = "none";
  document.getElementById("return-button").style.display = "flex";
};

const displayMainRowTitles = (index, indexOfWantedTitle) => {
  const keys = Object.keys(rowData);
  const selectedKey = keys[index];
  const firstKey = Object.keys(rowData[selectedKey][index]);
  return firstKey[indexOfWantedTitle];
};

const displayDescriptionHeaders = (index, indexOfWantedTitle) => {
  const values = Object.values(rowData);
  const selectedValues = values[index];
  const value = Object.values(rowData[selectedValues][index]);
  return value[indexOfWantedTitle];
};

const createTable = (index) => {
  const createTable = document.createElement("table");
  createTable.id = "info-table";
  const createTableUpperRow = document.createElement("tr");
  const createIdHeader = document.createElement("th");
  createIdHeader.innerHTML = "ID";
  const createSecondHeader = document.createElement("th");
  createSecondHeader.innerHTML = displayMainRowTitles(index, 0);
  const createThirdHeader = document.createElement("th");
  createThirdHeader.innerHTML = displayMainRowTitles(index, 1);
  const createFourthHeader = document.createElement("th");
  createFourthHeader.innerHTML = displayMainRowTitles(index, 3);
  const createFifthHeader = document.createElement("th");
  createFifthHeader.innerHTML = "CREATED AT";
  const createSixthHeader = document.createElement("th");
  createSixthHeader.innerHTML = "ACTIONS";

  containerOfTable.appendChild(createTable);
  createTable.appendChild(createTableUpperRow);
  createTableUpperRow.appendChild(createIdHeader);
  createTableUpperRow.appendChild(createSecondHeader);
  createTableUpperRow.appendChild(createThirdHeader);
  createTableUpperRow.appendChild(createFourthHeader);
  createTableUpperRow.appendChild(createFifthHeader);
  createTableUpperRow.appendChild(createSixthHeader);

  const keys = Object.keys(rowData);
  const selectedKey = keys[index];

  for (let i = 0; i < rowData[selectedKey].length; i++) {
    const descriptionRow = document.createElement("tr");
    createTable.appendChild(descriptionRow);
    const firstDescriptionHeader = document.createElement("th");
    firstDescriptionHeader.innerHTML = i + 1;
    descriptionRow.appendChild(firstDescriptionHeader);

    const secondDescriptionHeader = document.createElement("th");
    secondDescriptionHeader.innerHTML;
    descriptionRow.appendChild(secondDescriptionHeader);
  }
};

const showInfoByIndex = (index) => {
  const keys = Object.keys(rowData);
  const selectedKey = keys[index];
  console.log(rowData[selectedKey]);
};

const returnToHome = () => {
  document.getElementById("main-container").style.display = "none";
  document.getElementById("buttons-container").style.display = "flex";
  document.getElementById("return-button").style.display = "none";
};

const removeTable = () => {
  const tableRemoval = document.getElementById("info-table");
  tableRemoval.remove();
};

const returnButton = document.createElement("button");
returnButton.className = "return-button";
returnButton.id = "return-button";
let parentOfReturn = document.getElementById("main");
returnButton.innerHTML = "&#8635;";
returnButton.addEventListener("click", () => {
  removeTable();
  returnToHome();
  console.clear();
});
parentOfReturn.appendChild(returnButton);
