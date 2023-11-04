const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function render(dt){
    ctx.fillStyle = `rgb(200,210,255)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // DRAW DRONE

    drone.render();

    // DRAW GROUND

    ctx.fillStyle = `rgb(60,60,60)`;
    ctx.fillRect(worldToScreenX(ground.position.x), worldToScreenY(ground.position.y), ground.size.x, ground.size.y);

    for(let i = 0; i<particles.length; i++){
        particles[i].render();
    }


    ctx.font = "20px serif";
    ctx.fillStyle = "#eee";
    ctx.fillText("Camera: x: " + camera.x + "\t y: " + camera.y, 20, 30);



}