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
    for(let i = 0; i < rowNumber*columnNumber;i++){
        cellArray.push(i);
    }
}
// interacts with the :root element to get to the CSS variables
const alterCssVariables = (varibleName, newValue) => {
    const root =document.querySelector(":root");
    root.style.setProperty(varibleName, newValue);
}
//!---------------Functions---------------------
function init(){
    deleteChildren();
    resetVars();
    setColumnValue();
    for(let cellId of cellArray){
        createChildElement(gridParent, cellId, ["reveal",false],["class","cell"],["value",""],["flagged",false]);
    }
    loopMines();
    // runs the loopMines function 
    // runs the alterMetaData(getProxIndexes(mineArray, false), func to add one to the current value)
}

function getInputData() {
    rowNumber = rowInputElement.value;
    columnNumber = columnInputElement.value;
    mineNumber = mineInputElement.value;
    console.log(rowNumber, columnNumber,mineNumber);
    if (!Number(rowNumber)) rowNumber = 7;
    if (!Number(columnNumber)) columnNumber = 7;
    if (!Number(mineNumber)) mineNumber = Math.floor(rowNumber*columnNumber*0.2); 
}

// parameters (parentNode, childNodeId, aditional[atribute, value] pairs)
function createChildElement(parent, childId, ...atributes){
    const newChild = document.createElement("div");
    newChild.setAttribute("id",childId);
    for(let atribute of atributes){
        newChild.setAttribute(atribute[0],atribute[1]);
    }
    parent.appendChild(newChild);
}

// if i don't use alterCssVariables again combine these functions 
function setColumnValue(){
    let columnStringValue = "";
    for(let i = 0; i < columnNumber;i++){
        columnStringValue += "auto ";
    }
    console.log(columnStringValue);
    alterCssVariables("--columnNumber", columnStringValue);
}

function loopMines() {
    // do 
    // run createmine()
    // while mineArray.length !== numberOfMines Var
    // runs alterMetaData on mineArray with the add mine function to alter the html "value" metadata to be mines
}
//!---------------Testing---------------------
init();