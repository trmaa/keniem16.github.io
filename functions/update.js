function update(dt){

    drone.update();
    camera = drone.position;
    
    for(let i = 0; i<particles.length; i++){
        particles[i].update();
    }
}