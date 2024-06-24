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
    }
}
const resetVars = () => {
    cellArray.length = 0;
    mineLocations.length = 0;
    flagLocations.length = 0;
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
    console.log(rowNumber, columnNumber,mineNumber);
    if (!rowNumber) rowNumber = 5;
    if (!columnNumber) columnNumber = 5;
    if (!mineNumber) mineNumber = Math.floor(rowNumber*columnNumber*0.2);
    console.log(rowNumber, columnNumber,mineNumber);
}

//!---------------Testing---------------------
init();