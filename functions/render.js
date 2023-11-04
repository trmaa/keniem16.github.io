const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function render(dt){
    ctx.fillStyle = `rgb(50,50,50)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // DRAW DRONE

    ctx.translate( worldToScreenX(drone.position.x), worldToScreenY(drone.position.y) );
    ctx.rotate(-drone.angle * Math.PI / 180);
    ctx.translate(- worldToScreenX(drone.position.x),- worldToScreenY(drone.position.y) );

    ctx.fillStyle = `rgb(255,50,50)`;
    ctx.fillRect(worldToScreenX(drone.position.x - 50), worldToScreenY(drone.position.y - 15), 100, 30);

    ctx.translate( worldToScreenX(drone.position.x), worldToScreenY(drone.position.y) );
    ctx.rotate(drone.angle * Math.PI / 180);
    ctx.translate(- worldToScreenX(drone.position.x),- worldToScreenY(drone.position.y) );


    ctx.fillStyle = `rgb(50,255,50)`;
    ctx.fillRect(worldToScreenX(drone.position.x) - 3, worldToScreenY(drone.position.y) - 3, 6, 6);

    for(let i = 0; i<4; i++){
        ctx.fillRect(worldToScreenX(drone.vertex[i].x) - 3, worldToScreenY(drone.vertex[i].y) - 3, 6, 6);
    }


    ctx.font = "20px serif";
    ctx.fillStyle = "#eee";
    ctx.fillText("Camera: x: " + camera.x + "\t y: " + camera.y, 20, 30);
}