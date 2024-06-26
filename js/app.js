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
    cellArray.length = 0;
    mineLocations.length = 0;
    flagLocations.length = 0;
    firstTurn = true;
    gameOver = false;
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
    // cellElementArray[index].classList.add("red");
    cellElementArray[index].setAttribute("value","Mine");
}

const countInstances = (totalObject, value) => {
    if (cellElementArray[value].value === "Mine") return totalObject;
    if (totalObject[value]) {totalObject[value] = totalObject[value] + 1;}
    else {totalObject[value] = 1;}
    return totalObject;
}

const iterateMetaData = (idArray) => {
    const iteratorObject = idArray.reduce(countInstances,{});
    for( let id in iteratorObject){
        // updateHtmlContent(id,iteratorObject[id]);
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
    rowNumber = Number(rowInputElement.value);
    columnNumber = Number(columnInputElement.value);
    mineNumber = Number(mineInputElement.value);
    console.log(rowNumber, columnNumber,mineNumber);
    if (!rowNumber) rowNumber = 7;
    if (!columnNumber) columnNumber = 7;
    if (!mineNumber) mineNumber = Math.floor(rowNumber*columnNumber*0.2); 
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
    alterCssVariables("--columnNumber", columnStringValue);
}

function loopMines() {
    do {
        createMine(0);
    } while(mineLocations.length <= mineNumber);
    mineLocations.forEach(alterMineMetaData);
}

function createMine(count, index){
    if (!index) index = Math.floor(Math.random() *cellArray.length);
    if (!mineLocations.includes(index)){
        mineLocations.push(index);
        return;
    }
    if (count = 3) {
        createMine(0);
        return;
}
    createMine(count+1, index+1);
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
    if (gameOver) return;
    if (!event.target.classList[0].includes("cell")) return;
    switch(event.type){
        case("click"):
        leftClick(event.target)
        break;
        case("contextmenu"):
        rightClick(event.target)
        break;
    }
}

function leftClick(target){
    if (target.classList.contains("flagStyle")) return;
    if (mineLocations.includes(Number(target.id))){
        console.log("lol")
        if (firstTurn){
            firstTurn = false;
            rightClick(target);
            console.log("Damn That was a lucky guess");
            // ? You might switch this out if you want a large area to open up when first clicking 
        }
        else{
        updateLoss();
        }
        firstTurn = false;
        return;
    }
    firstTurn = false;
     let idArray = getAdjacentIndexes([Number(target.id)], true);
     const checkedTiles = [];
    for (let id of idArray){
        if (checkedTiles.includes(id)) continue;
        console.log(id)
        console.log(!cellElementArray[id].getAttribute("value"))
        if (!cellElementArray[id].getAttribute("value")){
            checkedTiles.push(id);
             idArray = idArray.concat(getAdjacentIndexes([id], false));
        }
        cellElementArray[id].classList.add("revealed", cellElementArray[id].getAttribute("value"));
    }

    // tempArrayName getProxIndexes(target.index, true)
    // for tempIndex of tempArrayName
    // const recursionGodWrath = []
    // 
    //      if tempIndex is in recursionGodWroth continue (moves to the next element in the array)
    //      if child.tempIndex.value == ""
    //          recursionGodWrath.push(tempIndex)
    //          tempArrayName.push(getProxIndexes(tempIndex,false))
}

function rightClick(target){
    if (flagLocations.includes(target.id)) {
        flagLocations.splice(flagLocations.indexOf(target.id),1);
        target.classList.remove("flagStyle");
    }
    else if (flagLocations.length === mineLocations.length) return;
    else {
        flagLocations.push(target.id);
        target.classList.add("flagStyle");
    }
    // need to check for win 
}

function updateLoss(){
    for( let mineId of mineLocations){
        cellElementArray[mineId].classList.add("mineStyle");
    }
    gameOver = true;
}
//!---------------Testing---------------------
// function updateHtmlContent(id, text){
//     cellElementArray[id].textContent = text;
// }

init();