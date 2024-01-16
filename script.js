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

  const values = Object.keys(rowData);
  const selectedValues = values[index];

  for (let i = 0; i < rowData[selectedKey].length; i++) {
    const descriptionRow = document.createElement("tr");
    descriptionRow.id = "row" + i;
    createTable.appendChild(descriptionRow);
    const firstDescriptionHeader = document.createElement("th");
    firstDescriptionHeader.innerHTML = i + 1;
    descriptionRow.appendChild(firstDescriptionHeader);

    const secondDescriptionHeader = document.createElement("th");
    secondDescriptionHeader.innerHTML = Object.values(
      rowData[selectedValues][i]
    )[0];

    const thirdDescriptionHeader = document.createElement("th");
    thirdDescriptionHeader.innerHTML = Object.values(
      rowData[selectedValues][i]
    )[1];

    const fourthDescriptionHeader = document.createElement("th");
    fourthDescriptionHeader.innerHTML = Object.values(
      rowData[selectedValues][i]
    )[3];

    const createdAt = Object.values(rowData[selectedValues][i])[
      Object.values(rowData[selectedValues][i]).length - 3
    ];

    const timeConvertion = () => {
      const originalDate = createdAt;
      const newDate = new Date(originalDate);
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const formattedData = newDate.toLocaleDateString("en-GB", options);
      return formattedData;
    };

    const fifthDescriptionHeader = document.createElement("th");
    fifthDescriptionHeader.innerHTML = timeConvertion();

    const actionDescriptionHeader = document.createElement("th");

    const buttonsDiv = document.createElement("div");

    const firstActionButton = document.createElement("button");
    const secondActionButton = document.createElement("button");
    firstActionButton.className = "delete-button";
    firstActionButton.id = "bin-button";
    firstActionButton.addEventListener("click", () => {
      tableRowRemove(descriptionRow.id);
    });

    secondActionButton.className = "info-button";

    const trashIcon = document.createElement("img");
    trashIcon.src = "img/bin.png";
    trashIcon.alt = "bin-icon";

    const infoIcon = document.createElement("img");
    infoIcon.src = "img/info.png";
    infoIcon.alt = "info-icon";

    descriptionRow.appendChild(secondDescriptionHeader);
    descriptionRow.appendChild(thirdDescriptionHeader);
    descriptionRow.appendChild(fourthDescriptionHeader);
    descriptionRow.appendChild(fifthDescriptionHeader);
    descriptionRow.appendChild(actionDescriptionHeader);
    actionDescriptionHeader.appendChild(buttonsDiv);
    buttonsDiv.appendChild(firstActionButton);
    buttonsDiv.appendChild(secondActionButton);
    firstActionButton.appendChild(trashIcon);
    secondActionButton.appendChild(infoIcon);
  }
  const tableFilters = document.createElement("div");
  tableFilters.className = "table-filters";
  tableFilters.id = "filters";

  const pageLeftButton = document.createElement("button");
  pageLeftButton.innerHTML = "&larr;";

  const pageRightButton = document.createElement("button");
  pageRightButton.innerHTML = "&rarr;";

  const inputOfRows = document.createElement("input");
  inputOfRows.placeholder = "1";
  inputOfRows.id = "input-rows";
  inputOfRows.type = "number";
  inputOfRows.min = "1";

  const selectOptions = document.createElement("select");
  const firstOption = document.createElement("option");
  const secondOption = document.createElement("option");

  firstOption.innerHTML = "10";
  secondOption.innerHTML = "20";

  containerOfTable.appendChild(tableFilters);
  tableFilters.appendChild(pageLeftButton);
  tableFilters.appendChild(inputOfRows);
  tableFilters.appendChild(pageRightButton);
  tableFilters.appendChild(selectOptions);
  selectOptions.appendChild(firstOption);
  selectOptions.appendChild(secondOption);
};

const tableRowRemove = (idOfRemovedRow) => {
  const pickedRow = document.getElementById(idOfRemovedRow);
  pickedRow.remove();
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

const removeTableFilters = () => {
  const filtersRemoval = document.getElementById("filters");
  filtersRemoval.remove();
};

const returnButton = document.createElement("button");
returnButton.className = "return-button";
returnButton.id = "return-button";
let parentOfReturn = document.getElementById("main");
returnButton.innerHTML = "&#8635;";
returnButton.addEventListener("click", () => {
  removeTable();
  removeTableFilters();
  returnToHome();
  console.clear();
});
parentOfReturn.appendChild(returnButton);
