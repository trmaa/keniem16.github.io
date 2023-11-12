let camera;
let drone;

let world;

let lastUpdate = Date.now();
let tickInterval = setInterval(tick, 1000 / 60);

let start = false;

function tick(){
    if(mapLoaded && !start){
        camera = new Vec2(0, 0);
        drone = new Drone();
        world = new World(1000, 1000, 140);
        start = true;
    }
    if(!mapLoaded){
        return 0;
    }
    let now = Date.now();
    let dt = (now - lastUpdate) / (1000 / 60);
    lastUpdate = now;

    update(dt);
    render(dt);
}