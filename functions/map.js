
let map = [];

let nChar = 1;
let currentLine = 0;
let currentChar = 0;

let mapPositions = [
    new Vec2(1180, 1525),
    new Vec2(1150,1945)
]

let allMapObjects = [
    [new Object(1500, 1250, srcInstructions_01)],
    [new Object(1900, 1345, srcInstructions_02)]
]

console.log(allMapObjects)

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const level = urlParams.get("lvl");

let mapObjects = allMapObjects[level - 1];

async function loadMap() {
    console.log("loadingMap")
    let response = await fetch(`../maps/${level}.txt`);
    let data = await response.text();

    let nChar = 1;

    currentLine = 0;
    currentChar = 0;
        
    for(let i = 0; i<data.length; i++){
        nChar ++;
        if(data[i] == "\n"){
            break;
        }
    }
    for(let i = 0; i<nChar; i++){
        map[i] = [];
    }
    for(let i = 0; i<data.length; i++){
        if(data[i] == "\n"){
            currentLine ++;
            currentChar = 0;
            continue;
        }
        if(data[i] == "\r"){
            continue;
        }
        map[currentChar][currentLine] = data[i];
        currentChar ++;
    }

    data.length = 0;

}


