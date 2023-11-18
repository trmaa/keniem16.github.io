const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function render(dt){

    ctx.resetTransform();

    ctx.fillStyle = `rgb(255,210,210)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // DRAW GROUND

    ctx.drawImage(srcInstructions_01, worldToScreenX(1350), worldToScreenY(1645))
    ctx.drawImage(srcInstructions_02, worldToScreenX(1900), worldToScreenY(1345))

    world.render();
    
    // DRAW DRONE

    // for (let i = Math.floor((drone.position.y - world.tileSize) / world.tileSize); i < Math.floor((drone.position.y + world.tileSize * 2) / world.tileSize); i++) {
    //     for (let j = Math.floor((drone.position.x - world.tileSize) / world.tileSize); j < Math.floor((drone.position.x + world.tileSize * 2) / world.tileSize); j++) {
    //         world.worldMatrix[j * world.matrixHeight + i].renderSelected();
    //     }
    // }


    drone.render();

    // world.worldMatrix[Math.floor(drone.position.x / world.tileSize) * world.matrixHeight + Math.floor(drone.position.y / world.tileSize)].renderSelected();

    for (let i = Math.floor((drone.position.y - world.tileSize) / world.tileSize); i < Math.floor((drone.position.y + world.tileSize * 2) / world.tileSize); i++) {
        for (let j = Math.floor((drone.position.x - world.tileSize) / world.tileSize); j < Math.floor((drone.position.x + world.tileSize * 2) / world.tileSize); j++) {
            world.worldMatrix[j * world.matrixHeight + i].renderSelected();
        }
    }

    for(let i = 0; i<particles.length; i++){
        particles[i].render();
    }


    // ctx.font = "20px serif";
    // ctx.fillStyle = "#eee";
    // ctx.fillText("Camera: x: " + camera.x + "\t y: " + camera.y, 20, 30);

    ctx.fillStyle = "#444";
    ctx.fillRect(1920 - 300, 50, 250, 50);

    ctx.fillStyle = "#595";
    ctx.fillRect(1920 - 300, 50, drone.health / 100 * 250, 50);

}