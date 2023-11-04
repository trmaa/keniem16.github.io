function update(dt){
    
    drone.velocity = Vec2.add(drone.velocity, new Vec2(0, 1));
    drone.position = Vec2.add(drone.position, drone.velocity);


    camera = drone.position;

}