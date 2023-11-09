let camera = new Vec2(0, 0);
let drone = new Drone();

let world = new World(1000, 1000, 120);


let lastUpdate = Date.now();
let tickInterval = setInterval(tick, 1000 / 60);

function tick(){
    //testChromebook
    let now = Date.now();
    let dt = (now - lastUpdate) / (1000 / 60);
    lastUpdate = now;

    update(dt);
    render(dt);
}