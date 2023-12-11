
let leftDown = false;
let rightDown = false;

window.addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight"){
        leftDown = true;
    }
    else if(event.key == "ArrowLeft"){
        rightDown = true;
    }
});

window.addEventListener("keyup", (event) => {
    if(event.key == "ArrowRight"){
        leftDown = false;
    }
    else if(event.key == "ArrowLeft"){
        rightDown = false;
    }
});
