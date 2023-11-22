
let returnHover = false;

function update(dt){

    if(mousePosition.x > 15 && mousePosition.x < 115 && mousePosition.y > 15 && mousePosition.y < 115){
        returnHover = true;
    }
    else{
        returnHover = false;
    }

    drone.update();
    camera = drone.position;
    
    for(let i = 0; i<particles.length; i++){
        particles[i].update();
    }

    for(let i = 0; i<mapObjects.length; i++){
        mapObjects[i].update();
    }
}

let mousePosition = new Vec2()

let levelX = 0;
let levelY = 0;

canvas.onmousemove = function(e){
    let rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

    mousePosition.x = (e.clientX - rect.left) * scaleX;
    mousePosition.y = (e.clientY - rect.top) * scaleY;
};

canvas.onmousedown = function(e){
    if(returnHover){
        window.open("./menu.html","_self")
    }
};

