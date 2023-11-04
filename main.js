let camera = new Vec2(0, 0);
let drone = {
    position: new Vec2(0,0),
    velocity: new Vec2(0,0),
    angle: 0,
    vertex: [
        new Vec2(0 - 50, 0 - 15),
        new Vec2(0 + 50, 0 - 15),
        new Vec2(0 - 50, 0 + 15),
        new Vec2(0 + 50, 0 + 15)
    ]
};

let ground = {
    position: new Vec2(-1920, 1080),
    size: new Vec2(1920 * 2, 50)
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