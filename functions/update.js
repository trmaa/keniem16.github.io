function update(dt){
    
    // drone.velocity = Vec2.add(drone.velocity, new Vec2(0, 1));
    // drone.position = Vec2.add(drone.position, drone.velocity);

    drone.angle += 1;

    drone.vertex[0].x = drone.position.x - Math.cos(drone.angle * Math.PI / 180) * 50 - Math.sin(drone.angle * Math.PI / 180) * 15;
    drone.vertex[0].y = drone.position.y - Math.cos(drone.angle * Math.PI / 180) * 15 + Math.sin(drone.angle * Math.PI / 180) * 50;

    drone.vertex[1].x = drone.position.x + Math.cos(drone.angle * Math.PI / 180) * 50 - Math.sin(drone.angle * Math.PI / 180) * 15;
    drone.vertex[1].y = drone.position.y - Math.cos(drone.angle * Math.PI / 180) * 15 - Math.sin(drone.angle * Math.PI / 180) * 50;

    drone.vertex[2].x = drone.position.x - Math.cos(drone.angle * Math.PI / 180) * 50 + Math.sin(drone.angle * Math.PI / 180) * 15;
    drone.vertex[2].y = drone.position.y + Math.cos(drone.angle * Math.PI / 180) * 15 + Math.sin(drone.angle * Math.PI / 180) * 50;

    drone.vertex[3].x = drone.position.x + Math.cos(drone.angle * Math.PI / 180) * 50 + Math.sin(drone.angle * Math.PI / 180) * 15;
    drone.vertex[3].y = drone.position.y + Math.cos(drone.angle * Math.PI / 180) * 15 - Math.sin(drone.angle * Math.PI / 180) * 50;
    
    camera = drone.position;

}