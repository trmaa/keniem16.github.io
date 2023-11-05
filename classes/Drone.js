class Drone{
    constructor(){
        this.position = new Vec2(2500,-200);
        this.velocity = new Vec2(0,0);
        this.angle = 0;
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

            spawnParticle(this.position, this.velocity, this.angle, 0);
        }
        if(rightDown){
            this.angleVelocity += 0.6;
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.08));

            spawnParticle(this.position, this.velocity, this.angle, 1);

        }
        if(leftDown && rightDown){
            this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.16));
        }
        
        this.angleVelocity *= 0.9;
        this.angle += this.angleVelocity;
        
        if(this.angle >= 180){
            this.angle -= 360;
        }
        if(this.angle < -180){
            this.angle += 360;
        }

        this.velocity = Vec2.add(this.velocity, new Vec2(0, 0.1));
        this.velocity = Vec2.mult(this.velocity, 0.999);
        this.position = Vec2.add(this.position, this.velocity);

        this.updateVertex();
        for (let i = Math.floor((drone.position.y - world.tileSize) / world.tileSize); i < Math.floor((drone.position.y + world.tileSize * 2) / world.tileSize); i++) {
            for (let j = Math.floor((drone.position.x - world.tileSize) / world.tileSize); j < Math.floor((drone.position.x + world.tileSize * 2) / world.tileSize); j++) {
                
                if(world.worldMatrix[j * world.matrixHeight + i] != undefined && world.worldMatrix[j * world.matrixHeight + i].type == 0){
                    
                    let objectPosition = world.worldMatrix[j * world.matrixHeight + i].worldPosition;
                    let objectSize = world.tileSize;

                    for(let k = 0; k<4; k++){
                        if(
                            this.vertex[k].x > objectPosition.x && 
                            this.vertex[k].x < objectPosition.x + objectSize &&
                            this.vertex[k].y > objectPosition.y && 
                            this.vertex[k].y < objectPosition.y + objectSize
                        ){
                            world.worldMatrix[j * world.matrixHeight + i].renderSelected();
                            // // this.velocity.y = 0;

                            let options = [
                                Math.abs(objectPosition.y - this.vertex[k].y),
                                Math.abs((objectPosition.y + objectSize) - this.vertex[k].y),
                                Math.abs(objectPosition.x - this.vertex[k].x),
                                Math.abs((objectPosition.x + objectSize) - this.vertex[k].x)
                            ]

                            let smaller = 100000;
                            let smallerValue = 100000;

                            for(let s = 0; s<4; s++){
                                if(options[s] < smallerValue){
                                    smallerValue = options[s];
                                    smaller = s;
                                }
                            }

                            let movement = new Vec2(0,0);
                            let velocity = new Vec2(0,0);

                            if(smaller == 0){
                                movement.y = objectPosition.y - this.vertex[k].y;
                                velocity.x = this.velocity.x * 0.9; 
                                velocity.y = this.velocity.y * -0.6;
                            }
                            else if(smaller == 1){
                                movement.y = (objectPosition.y + objectSize) - this.vertex[k].y;
                                velocity.x = this.velocity.x * 0.9;
                                velocity.y = this.velocity.y * -0.6;
                            }
                            else if(smaller == 2){
                                movement.x = objectPosition.x - this.vertex[k].x;
                                velocity.x = this.velocity.x * -0.6; 
                                velocity.y = this.velocity.y * 0.9; 
                            }
                            else if(smaller == 3){
                                movement.x = (objectPosition.x + objectSize) - this.vertex[k].x;
                                velocity.x = this.velocity.x * -0.6; 
                                velocity.y = this.velocity.y * 0.9; 
                            }

                            this.velocity = velocity;
                            this.position = Vec2.add(this.position, movement);
                            this.angle *= 0.99;
                            break;

                        }

                    }
    
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

    render(){
        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(-this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );
        
        ctx.drawImage(srcDrone, worldToScreenX(this.position.x - 60), worldToScreenY(this.position.y - 15), 120, 30);
        
        ctx.fillStyle = `rgb(60,240,100)`;
        if(leftDown){
            ctx.fillRect(worldToScreenX(this.position.x - 60 + 5), worldToScreenY(this.position.y - 15 + 8), 10, 5);
            ctx.drawImage(srcFire[Math.floor(Math.random() * 2)], worldToScreenX(this.position.x - 60 + 1), worldToScreenY(this.position.y - 15 + 28), 18, 32);
        }
        if(rightDown){
            ctx.fillRect(worldToScreenX(this.position.x + 60 - 15), worldToScreenY(this.position.y + 15 - 22), 10, 5);
            ctx.drawImage(srcFire[Math.floor(Math.random() * 2)], worldToScreenX(this.position.x + 60 - 19), worldToScreenY(this.position.y + 15 - 2), 18, 32);
        }


        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );
        
        // ctx.fillStyle = `rgb(255,50,50)`;
        // ctx.fillRect(worldToScreenX(this.position.x) - 3, worldToScreenY(this.position.y) - 3, 6, 6);
    
        // for(let i = 0; i<4; i++){
        //     ctx.fillRect(worldToScreenX(this.vertex[i].x) - 3, worldToScreenY(this.vertex[i].y) - 3, 6, 6);
        // }
    }
}