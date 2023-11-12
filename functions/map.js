
let map = [];

let nChar = 1;
let currentLine = 0;
let currentChar = 0;
let mapLoaded = false;

fetch("../maps/01.txt")
    .then(function (res) {
        return res.text();
    })
    .then(function (data) {
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
        mapLoaded = true;
});

