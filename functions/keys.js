
let leftDown = false;
let rightDown = false;

window.addEventListener("keydown", (event) => {
    if(event.key == "ArrowLeft"){
        leftDown = true;
        console.log("xd")
    }
    else if(event.key == "ArrowRight"){
        rightDown = true;
    }
});

window.addEventListener("keyup", (event) => {
    if(event.key == "ArrowLeft"){
        leftDown = false;
    }
    else if(event.key == "ArrowRight"){
        rightDown = false;
    }
});