import { rowData } from "./data.js";

const allButtons = document.getElementById("buttons-container");
const mainContainer = document.getElementById("main");
const containerOfTable = document.getElementById("main-container");
const rootContainer = document.getElementById("root-container");

const fadeInInfoWindow = () => {
  const rootContainer = document.getElementById("root-container");
  let opacity = 0;

  const fadeInInterval = setInterval(() => {
    if (opacity < 1) {
      opacity += 0.1;
      rootContainer.style.opacity = opacity;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 60);
};

setTimeout(fadeInInfoWindow, 1000);

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

const bioLinksContainer = document.createElement("div");
bioLinksContainer.id = "bio-links-container";
const linkedInHref = document.createElement("a");
linkedInHref.href = "https://www.linkedin.com/in/ivo-delev-b847b72a4/";
linkedInHref.target = "_blank";
const gitHubHref = document.createElement("a");
gitHubHref.href = "https://github.com/gitbozydar";
gitHubHref.target = "_blank";
const linkedInImg = document.createElement("img");
const gitHubImg = document.createElement("img");
linkedInImg.src = "img/linkedin.png";
gitHubImg.src = "img/github.png";

mainContainer.appendChild(bioLinksContainer);
bioLinksContainer.appendChild(gitHubHref);
bioLinksContainer.appendChild(linkedInHref);
gitHubHref.appendChild(gitHubImg);
linkedInHref.appendChild(linkedInImg);

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
    const deleteCheckBox = document.createElement("input");
    deleteCheckBox.type = "checkbox";
    deleteCheckBox.className = "checkbox-delete";
    const deleteCheckedRows = document.createElement("button");
    deleteCheckedRows.className = "delete-checked-rows";
    deleteCheckedRows.innerText = "Delete Checked Rows";

    deleteCheckBox.addEventListener("change", () => {
      if (deleteCheckBox.checked) {
        tableFilters.appendChild(deleteCheckedRows);
      } else {
        deleteCheckedRows.remove();
      }
    });

    firstActionButton.className = "delete-button";
    firstActionButton.addEventListener("click", () => {
      tableRowRemove(descriptionRow.id);
    });

    secondActionButton.className = "info-button";
    secondActionButton.addEventListener("click", () => {
      infoWindow();
      showMoreInfoByIndex(firstDescriptionHeader.innerHTML - 1);
      buttonDisable();
    });

    const showMoreInfoByIndex = (gettingId) => {
      const moreInfoTable = document.createElement("table");
      moreInfoTable.id = "more-info-table";
      const moreInfoDiv = document.getElementById("info-window");
      moreInfoDiv.appendChild(moreInfoTable);
      for (let i = 0; i < Object.keys(rowData[selectedKey][i]).length; i++) {
        const createInfoTableRow = document.createElement("tr");
        const createInfoTableKeyHeader = document.createElement("th");
        const createInfoTableValueHeader = document.createElement("th");

        createInfoTableKeyHeader.innerHTML = displayMainRowTitles(index, i);
        createInfoTableValueHeader.innerHTML = Object.values(
          rowData[selectedValues][gettingId]
        )[i];

        moreInfoTable.appendChild(createInfoTableRow);
        createInfoTableRow.appendChild(createInfoTableKeyHeader);
        createInfoTableRow.appendChild(createInfoTableValueHeader);
      }
    };

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
    buttonsDiv.appendChild(deleteCheckBox);
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

const infoWindow = () => {
  mainContainer.style.filter = "blur(2px)";
  const popUpWindow = document.createElement("div");
  popUpWindow.id = "info-window";
  const infoWindowCloser = document.createElement("button");
  infoWindowCloser.id = "info-closer-button";
  infoWindowCloser.innerHTML = "&#9587";
  infoWindowCloser.addEventListener("click", () => {
    mainContainer.style.filter = null;
    popUpWindow.remove();
    buttonDisable();
  });

  rootContainer.appendChild(popUpWindow);
  popUpWindow.appendChild(infoWindowCloser);
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

const buttonDisable = () => {
  const infoButton = document.getElementsByClassName("info-button");
  const binButton = document.getElementsByClassName("delete-button");

  if (document.getElementById("info-window") !== null) {
    returnButton.setAttribute("disabled", "disabled");
    for (let k = 0; k < infoButton.length; k++) {
      infoButton[k].setAttribute("disabled", "disabled");
      binButton[k].setAttribute("disabled", "disabled");
    }
  } else {
    returnButton.removeAttribute("disabled");
    for (let k = 0; k < infoButton.length; k++) {
      infoButton[k].removeAttribute("disabled");
      binButton[k].removeAttribute("disabled");
    }
  }
};
