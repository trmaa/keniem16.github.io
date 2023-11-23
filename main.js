let camera;
let drone;

let world;

let lastUpdate = Date.now();
// let tickInterval = setInterval(tick, 1000 / 5);
let tickInterval = setInterval(tick, 1000 / 60);

// let loaded = false;
let levelLoaded = false;

async function tick(){

    // if(!loaded){

    //     if(localStorage.getItem("level") == undefined){
    //         localStorage.setItem("level", 0);
    //     }
    //     level = JSON.parse(localStorage.getItem("level"));

    //     loaded = true;
    // }   
    // updateMenu();

    if(!levelLoaded && map.length == 0){


        await loadMap();
        
        particles.length = 0;
        particles = [];
        camera = new Vec2(0, 0);
        drone = new Drone();
        world = new World(1000, 1000, 140);

        levelLoaded = true;
        
    }

    let now = Date.now();
    let dt = (now - lastUpdate) / (1000 / 60);
    lastUpdate = now;

    update();
    render();

    // if(screen == "menu"){
    //     renderMenu();
    // }
    // else if(screen == "inGame"){

    // }
}
