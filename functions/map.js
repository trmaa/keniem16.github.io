
let map = [];

let nLines = 1;
let currentLine = 0;
let currentChar = 0;

fetch("../maps/01.txt")
    .then(function (res) {
        return res.text();
    })
    .then(function (data) {
        for(let i = 0; i<data.length; i++){
            if(data[i] == "\n"){
                nLines ++;
            }
        }
        for(let i = 0; i<nLines; i++){
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
            map[currentLine][currentChar] = data[i];
            currentChar ++;

        }
});

