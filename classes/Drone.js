class Drone{
    constructor(){
        this.position = new Vec2(0,0);
        this.velocity = new Vec2(0,0);
        this.angle = 45;
        this.angleVelocity = 0;
        this.vertex = [
            new Vec2(0 - 50, 0 - 15),
            new Vec2(0 + 50, 0 - 15),
            new Vec2(0 - 50, 0 + 15),
            new Vec2(0 + 50, 0 + 15)
        ];
    }

    update(){
        drone.velocity = Vec2.add(drone.velocity, new Vec2(0, 1));
        drone.position = Vec2.add(drone.position, drone.velocity);
        drone.angle += drone.angleVelocity;

        drone.updateVertex();
    
        for(let i = 0; i<4; i++){
            if(
                drone.vertex[i].x > ground.position.x && 
                drone.vertex[i].x < ground.position.x + ground.size.x &&
                drone.vertex[i].y > ground.position.y && 
                drone.vertex[i].y < ground.position.y + ground.size.y
            ){
                drone.position.y -= drone.velocity.y * 2;
                drone.velocity.y = 0;

                if(i == 2){
                    this.angleVelocity -= 1;
                }
                if(i == 3){
                    this.angleVelocity += 1;
                }
            }
        }
    }

    updateVertex() {
        this.vertex[0].x = this.position.x - Math.cos(this.angle * Math.PI / 180) * 50 - Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[0].y = this.position.y - Math.cos(this.angle * Math.PI / 180) * 15 + Math.sin(this.angle * Math.PI / 180) * 50;
    
        this.vertex[1].x = this.position.x + Math.cos(this.angle * Math.PI / 180) * 50 - Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[1].y = this.position.y - Math.cos(this.angle * Math.PI / 180) * 15 - Math.sin(this.angle * Math.PI / 180) * 50;
    
        this.vertex[2].x = this.position.x - Math.cos(this.angle * Math.PI / 180) * 50 + Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[2].y = this.position.y + Math.cos(this.angle * Math.PI / 180) * 15 + Math.sin(this.angle * Math.PI / 180) * 50;
    
        this.vertex[3].x = this.position.x + Math.cos(this.angle * Math.PI / 180) * 50 + Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[3].y = this.position.y + Math.cos(this.angle * Math.PI / 180) * 15 - Math.sin(this.angle * Math.PI / 180) * 50;
    }
}