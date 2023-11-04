const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function render(dt){
    ctx.fillStyle = `rgb(50,50,50)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = `rgb(255,50,50)`;
    ctx.fillRect(worldToScreenX(drone.position.x - 50), worldToScreenY(drone.position.y - 15), 100, 30);

    ctx.font = "20px serif";
    ctx.fillStyle = "#eee";
    ctx.fillText("Camera: x: " + camera.x + "\t y: " + camera.y, 20, 30);
}