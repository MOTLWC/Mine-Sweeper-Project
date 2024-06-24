//!---------------Cached Elements---------------
const gridParent = document.getElementById("cellGrid");
const rowInputElement = document.getElementById("rowCount");
const columnInputElement = document.getElementById("columnCount");
const mineInputElement = document.getElementById("mineCount");
const flagCounterElement = document.getElementById("flagDisplay");
// ? "cellElementArray" will contain the children elements that will be added to "gridParent" when the game is initialised 
const cellElementArray = [];
//!---------------Constants---------------------
 const cellArray = [];
 const mineLocations = [];
 const flagLocations = [];
//!---------------Variables---------------------
let rowNumber;
let columnNumber;
let mineNumber;
//!---------------Event Listeners---------------
// gridParent = document.addEventListener("click", handleClick);
// gridParent = document.addEventListener("contextmenu", handleClick);
//!---------------Arrow Functions---------------
const deleteChildren = () => {
    while (gridParent.firstChild) {
        gridParent.removeChild(gridParent.firstChild);
        cellElementArray.shift();
        console.log(cellElementArray);
    }
}
const resetVars = () => {
    cellArray = [];
    mineLoction = [];
    flagLoctions = [];
    getInputData();
}
//!---------------Functions---------------------
function init(){
    deleteChildren();
    resetVars();
    // creates cell html atributes
    // runs getSettingData and store in vars 
    // runs the loopMines function 
    // runs the alterMetaData(getProxIndexes(mineArray, false), func to add one to the current value)
}

function getInputData() {
    rowNumber = rowInputElement.value;
    columnNumber = columnInputElement.value;
    mineNumber = mineInputElement.value;
    // if data is falsey or NAN set to default (row = column and vise versa)
}

//!---------------Testing---------------------
// Tests that .forEach(remove) works 
cellElementArray.push(document.querySelectorAll(".cell"));
init();
console.log(rowNumber, columnNumber, mineNumber)