class Drone{
    constructor(){
        this.position = new Vec2(0,0);
        this.velocity = new Vec2(0,0);
        this.angle = 45;
        this.angleVelocity = 0;
        this.vertex = [
            new Vec2(0 - 60, 0 - 15),
            new Vec2(0 + 60, 0 - 15),
            new Vec2(0 - 60, 0 + 15),
            new Vec2(0 + 60, 0 + 15)
        ];
    }

    update(){
        
        if(leftDown){
            this.angleVelocity -= 0.6;
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.08));
        }
        if(rightDown){
            this.angleVelocity += 0.6;
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.08));
        }
        if(leftDown && rightDown){
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.16));
        }
        
        this.angleVelocity *= 0.9;
        this.angle += this.angleVelocity;
        this.angle *= 0.99;

        this.velocity = Vec2.add(this.velocity, new Vec2(0, 0.1));
        this.velocity = Vec2.mult(this.velocity, 0.999);
        this.position = Vec2.add(this.position, this.velocity);

        this.updateVertex();
    
        for(let i = 0; i<4; i++){
            if(
                this.vertex[i].x > ground.position.x && 
                this.vertex[i].x < ground.position.x + ground.size.x &&
                this.vertex[i].y > ground.position.y && 
                this.vertex[i].y < ground.position.y + ground.size.y
            ){
                this.velocity.y = 0;
                
                if(Math.abs(ground.position.y - this.vertex[i].y) < Math.abs((ground.position.y + ground.size.y) - this.vertex[i].y)){
                    this.velocity.y -= Math.abs(ground.position.y - this.vertex[i].y)
                }
                else{
                    this.velocity.y += Math.abs((ground.position.y + ground.size.y) - this.vertex[i].y);
                }
                
                // this.velocity.y -= Math.min(Math.abs(ground.position.y - this.vertex[i].y), Math.abs((ground.position.y + ground.size.y) - this.vertex[i].y));
                this.velocity.x /= 1.1;

                if(i == 2){
                    this.angleVelocity -= 0.5;
                }
                if(i == 3){
                    this.angleVelocity += 0.5;
                }
            }
        }
    }

    updateVertex() {
        this.vertex[0].x = this.position.x - Math.cos(this.angle * Math.PI / 180) * 60 - Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[0].y = this.position.y - Math.cos(this.angle * Math.PI / 180) * 15 + Math.sin(this.angle * Math.PI / 180) * 60;
    
        this.vertex[1].x = this.position.x + Math.cos(this.angle * Math.PI / 180) * 60 - Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[1].y = this.position.y - Math.cos(this.angle * Math.PI / 180) * 15 - Math.sin(this.angle * Math.PI / 180) * 60;
    
        this.vertex[2].x = this.position.x - Math.cos(this.angle * Math.PI / 180) * 60 + Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[2].y = this.position.y + Math.cos(this.angle * Math.PI / 180) * 15 + Math.sin(this.angle * Math.PI / 180) * 60;
    
        this.vertex[3].x = this.position.x + Math.cos(this.angle * Math.PI / 180) * 60 + Math.sin(this.angle * Math.PI / 180) * 15;
        this.vertex[3].y = this.position.y + Math.cos(this.angle * Math.PI / 180) * 15 - Math.sin(this.angle * Math.PI / 180) * 60;
    }
}