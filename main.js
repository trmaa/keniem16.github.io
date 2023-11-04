let camera = new Vec2(0, 0);
let drone = new Drone();

let ground = {
    position: new Vec2(-1920, 400),
    size: new Vec2(1920 * 2, 60)
}


let lastUpdate = Date.now();
let tickInterval = setInterval(tick, 1000 / 60);

function tick(){

    let now = Date.now();
    let dt = (now - lastUpdate) / (1000 / 60);
    lastUpdate = now;

    update(dt);
    render(dt);
}