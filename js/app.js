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
gridParent = document.addEventListener("click", handleClick);
gridParent = document.addEventListener("contextmenu", handleClick);
//!---------------Functions---------------------
function init(){
    // delete all children from container element 
    // resets all data variables and arrays 
    // creates cell html atributes
    // runs getSettingData and store in vars 
    // runs the loopMines function 
    // runs the alterMetaData(getProxIndexes(mineArray, false), func to add one to the current value)
}