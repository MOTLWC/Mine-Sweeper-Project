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
const alterMineMetaData = (index) =>{
    cellElementArray[index].classList.add("red");
    cellElementArray[index].setAttribute("value","Mine");
}

const countInstances = (totalObject, value) => {
    if (cellElementArray[value].value === "Mine") return;
    if (totalObject[value]) {totalObject[value] = totalObject[value] + 1;}
    else {totalObject[value] = 1;}
    return totalObject;
}

const iterateMetaData = (idArray) => {
    const iteratorObject = idArray.reduce(countInstances,{});
    console.log(iteratorObject);
    for( let id in iteratorObject){
        console.log(id, iteratorObject[id]);
        updateHtmlContent(id,iteratorObject[id]);
        cellElementArray[id].setAttribute("value", iteratorObject[id]);
    }
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
    iterateMetaData(getAdjacentIndexes(mineLocations, false));
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
    cellElementArray.push(newChild);
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
    do {
        createMine();
    } while(mineLocations.length <= mineNumber);
    mineLocations.forEach(alterMineMetaData);
}

function createMine(index){
    if (!index) index = Math.floor(Math.random() *cellArray.length);
    if (!mineLocations.includes(index)){
        mineLocations.push(index);
        return;
    }
    createMine(index+1);
}
// Come back to this see if you can clean up the code a little
function getAdjacentIndexes(indexes, includeSelf){
    const returnArray =[];
    for(let cellId of indexes){
        if (cellId%columnNumber < columnNumber-1){
            returnArray.push((cellId - columnNumber + 1),(cellId + 1),(cellId + columnNumber + 1));
        }
        if (cellId%columnNumber > 0){
            returnArray.push((cellId - columnNumber - 1),(cellId - 1),(cellId + columnNumber - 1));
        }
        if (includeSelf)  returnArray.push(cellId);
        returnArray.push((cellId + columnNumber),(cellId - columnNumber));
    }
    return returnArray.filter((index) => {return (index > -1) && (index < cellArray.length)});
}

function handleClick(event) {
    if (!event.target.classList[0].includes("cell")) return;
    switch(event.type){
        case("click"):
        console.log("click")
        break;
        case("contextmenu"):
        console.log("right click")
        break;
    }
    // ! do a switch statment for different types of element not speciffic id's and do another for click 

    // switch depending on target id 
    // case runs 

        // if clicktype left or right respectively run 
    // leftClick(target)
    // rightClick(target)
}
//!---------------Testing---------------------
function updateHtmlContent(id, text){
    cellElementArray[id].textContent = text;
}

init();