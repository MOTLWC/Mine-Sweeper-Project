//!---------------Cached Elements---------------
const gridParent = document.getElementById("cellGrid");
const rowInputElement = document.getElementById("rowCount");
const columnInputElement = document.getElementById("columnCount");
const mineInputElement = document.getElementById("mineCount");
const flagCounterElement = document.getElementById("flagDisplay");
// ? "cellElementArray" will contain the children elements that will be added to "gridParent" when the game is initialised 
const cellElementArray = [];
//!---------------Constants---------------------
const cellValueArray = [];
const mineLocations = [];
const flagLocations = [];
const blankSpot = [];
//!---------------Variables---------------------
let rowNumber;
let columnNumber;
let mineNumber;
let firstTurn;
let gameOver;
//!---------------Event Listeners---------------
gridParent.addEventListener("click", handleClick);
gridParent.addEventListener("contextmenu", handleClick);
//!---------------Arrow Functions---------------
const deleteChildren = () => {
    while (gridParent.firstChild) {
        gridParent.removeChild(gridParent.firstChild);
        cellElementArray.shift();
    }
}
const resetVars = () => {
    cellValueArray.length = 0;
    mineLocations.length = 0;
    flagLocations.length = 0;
    blankSpot.length = 0;
    firstTurn = true;
    gameOver = false;
    getInputData();
    for (let i = 0; i < rowNumber * columnNumber; i++) {
        cellValueArray.push("blank");
    }
}
// interacts with the :root element to get to the CSS variables
const alterCssVariables = (varibleName, newValue) => {
    const root = document.querySelector(":root");
    root.style.setProperty(varibleName, newValue);
}
const alterMineMetaData = (index) => {
    // cellElementArray[index].classList.add("red");
    cellValueArray[index] = "Mine";
}

const countInstances = (totalObject, value) => {
    if (cellValueArray[value] === "Mine") return totalObject;
    if (totalObject[value]) { totalObject[value] = totalObject[value] + 1; }
    else { totalObject[value] = 1; }
    return totalObject;
}

const iterateMetaData = (idArray) => {
    const iteratorObject = idArray.reduce(countInstances, {});
    for (let id in iteratorObject) {
        // updateHtmlContent(id,iteratorObject[id]);
        cellValueArray[id] = String(iteratorObject[id]);
    }
}
//!---------------Functions---------------------
function init() {
    deleteChildren();
    resetVars();
    setColumnValue();
    for (let cellId = 0; cellId < cellValueArray.length; cellId++) {
        createChildElement(gridParent, cellId);
    }
}

function getInputData() {
    rowNumber = Number(rowInputElement.value);
    columnNumber = Number(columnInputElement.value);
    mineNumber = Number(mineInputElement.value);
    if (!rowNumber) rowNumber = 10;
    if (!columnNumber) columnNumber = 10;
    if (!mineNumber) mineNumber = Math.floor(rowNumber * columnNumber * 0.2);
}

// parameters (parentNode, childNodeId, aditional[atribute, value] pairs)
function createChildElement(parent, childId) {
    const newChild = document.createElement("div");
    newChild.setAttribute("id", childId);
    newChild.classList.add("cell");
    parent.appendChild(newChild);
    cellElementArray.push(newChild);
}

// if i don't use alterCssVariables again combine these functions 
function setColumnValue() {
    let columnStringValue = "";
    for (let i = 0; i < columnNumber; i++) {
        columnStringValue += "auto ";
    }
    alterCssVariables("--columnNumber", columnStringValue);
}

function loopMines() {
    do {
        createMine(0);
    } while (mineLocations.length <= mineNumber);
    mineLocations.forEach(alterMineMetaData);
}

function createMine(count, index) {
    if (!index) index = Math.floor(Math.random() * cellValueArray.length);
    if (blankSpot.includes(index)) return;
    if (!mineLocations.includes(index)) {
        mineLocations.push(index);
        return;
    }
    if (count = 3) {
        createMine(0);
        return;
    }
    createMine(count + 1, index + 1);
}
// Come back to this see if you can clean up the code a little
function getAdjacentIndexes(indexes, includeSelf) {
    const returnArray = [];
    for (let cellId of indexes) {
        if (cellId % columnNumber < columnNumber - 1) {
            returnArray.push((cellId - columnNumber + 1), (cellId + 1), (cellId + columnNumber + 1));
        }
        if (cellId % columnNumber > 0) {
            returnArray.push((cellId - columnNumber - 1), (cellId - 1), (cellId + columnNumber - 1));
        }
        if (includeSelf) returnArray.push(cellId);
        returnArray.push((cellId + columnNumber), (cellId - columnNumber));
    }
    return returnArray.filter((index) => { return (index > -1) && (index < cellValueArray.length) });
}

function handleClick(event) {
    if (gameOver) return;
    if (event.target.classList.contains("revealed")) return
    if (!event.target.classList[0].includes("cell")) return;
    switch (event.type) {
        case ("click"):
            leftClick(event.target)
            break;
        case ("contextmenu"):
            rightClick(event.target)
            break;
    }
}

function leftClick(target) {
    if (firstTurn) {
        firstTurn = false;
        getAdjacentIndexes([Number(target.id)], true).forEach((value) => blankSpot.push(value));
        loopMines();
        iterateMetaData(getAdjacentIndexes(mineLocations, false));    }
    if (target.classList.contains("flagStyle")) return;
    if (mineLocations.includes(Number(target.id))) {
            updateLoss();
        return;
    }
    const idsToCheck = getAdjacentIndexes([Number(target.id)], true);
    const checkedTiles = [];
    let cellsToReveal = [];
    cellsToReveal.push(target.id);
    for (let id of idsToCheck) {
        console.log("Current id = " + id);
        if (checkedTiles.includes(id)) continue;
        if (cellValueArray[id] == "blank") {
            checkedTiles.push(id);
            const tempArray = getAdjacentIndexes([id], true);
            tempArray.forEach((value) => idsToCheck.push(value));
            cellsToReveal = cellsToReveal.concat(tempArray);
        }
    }
    revealCells(cellsToReveal);
}

function revealCells(ids) {
    for (let id of ids) {
        switch (cellValueArray[id]) {
            case ("Mine"):
                continue;
            case ("blank"):
                cellElementArray[id].classList.add("revealed");
                break;
            case ("1"):
                cellElementArray[id].classList.add("one", "revealed");
                break;
            case ("2"):
                cellElementArray[id].classList.add("two", "revealed");
                break;
            case ("3"):
                cellElementArray[id].classList.add("three", "revealed");
                break;
            case ("4"):
                cellElementArray[id].classList.add("four", "revealed");
                break;
            case ("5"):
                cellElementArray[id].classList.add("five", "revealed");
                break;
            case ("6"):
                cellElementArray[id].classList.add("six", "revealed");
                break;
            case ("7"):
                cellElementArray[id].classList.add("seven", "revealed");
                break;
            case ("8"):
                cellElementArray[id].classList.add("eight", "revealed");
                break;
        }
    }
}

function rightClick(target) {
    if (flagLocations.includes(target.id)) {
        flagLocations.splice(flagLocations.indexOf(target.id), 1);
        target.classList.remove("flagStyle");
    }
    else if (flagLocations.length === mineLocations.length) return;
    else {
        flagLocations.push(target.id);
        target.classList.add("flagStyle");
    }
    // need to check for win 
}

function updateLoss() {
    for (let mineId of mineLocations) {
        cellElementArray[mineId].classList.add("mineStyle");
    }
    gameOver = true;
}

function giveHint(index){
    // almost exactly like the createmine function
}
//!---------------Testing---------------------
// function updateHtmlContent(id, text){
//     cellElementArray[id].textContent = text;
// }

init();