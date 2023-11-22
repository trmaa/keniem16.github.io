const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function render(dt){

    ctx.resetTransform();

    ctx.fillStyle = `rgb(255,210,210)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // DRAW GROUND

    for(let i = 0; i<mapObjects.length; i++){
        mapObjects[i].render();
    }

    world.render();
    
    // DRAW DRONE


    drone.render();

    for(let i = 0; i<particles.length; i++){
        particles[i].render();
    }

    if(returnHover){
        ctx.drawImage(srcReturnHover, 15, 15, 100, 100);
        canvas.style.cursor = "pointer";
    }
    else{
        ctx.drawImage(srcReturn, 15, 15, 100, 100);
        canvas.style.cursor = "default";
    }

    ctx.fillStyle = "#444";
    ctx.fillRect(1920 - 300, 50, 250, 50);

    ctx.fillStyle = "#595";
    ctx.fillRect(1920 - 300, 50, drone.health / 100 * 250, 50);

}