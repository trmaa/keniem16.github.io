let particles = [];

function spawnParticle(position, velocity, angle, variation){
    if(variation == 0){
        for(let i = 0; i<particles.length; i++){
            if(particles[i].alpha < 0){
                particles[i].beNew(new Vec2(
                    position.x - Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
                    position.y + Math.cos(angle * Math.PI / 180) * 40 + Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
                ), velocity)
                return;
            }
        }
        particles.push(new Particle(new Vec2(
            position.x - Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
            position.y + Math.cos(angle * Math.PI / 180) * 40 + Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
        ), velocity));
    }
    else{
        for(let i = 0; i<particles.length; i++){
            if(particles[i].alpha < 0){
                particles[i].beNew(new Vec2(
                    position.x + Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
                    position.y + Math.cos(angle * Math.PI / 180) * 40 - Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
                ), velocity);
                return;
            }

        }
        particles.push(new Particle(new Vec2(
            position.x + Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
            position.y + Math.cos(angle * Math.PI / 180) * 40 - Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
        ), velocity));
    }

}


class Particle{
    constructor(position, velocity){
        this.position = position;
        this.size = Math.random() * 30 + 5;
        this.angle = Math.random() * 360;
        this.alpha = Math.random();

        this.velocity = Vec2.add(velocity, Vec2.mult(velocity, -0.1));
    }

    beNew(position, velocity){
        this.position = position;
        this.size = Math.random() * 30 + 5;
        this.angle = Math.random() * 360;
        this.alpha = Math.random();

        this.velocity = Vec2.add(velocity, Vec2.mult(velocity, -0.1));
    }

    update(){
        this.velocity.y += 0.1;
        this.position = Vec2.add(this.position, this.velocity);
        this.size *= 0.99;
        this.alpha -= 0.01;

        for (let i = Math.floor((this.position.y - world.tileSize) / world.tileSize); i < Math.floor((this.position.y + world.tileSize * 2) / world.tileSize); i++) {
            for (let j = Math.floor((this.position.x - world.tileSize) / world.tileSize); j < Math.floor((this.position.x + world.tileSize * 2) / world.tileSize); j++) {
                
                if(world.worldMatrix[j * world.matrixHeight + i] != undefined && world.worldMatrix[j * world.matrixHeight + i].type == 0){
                    
                    let objectPosition = world.worldMatrix[j * world.matrixHeight + i].worldPosition;
                    let objectSize = world.tileSize;
                    if(
                        this.position.x > objectPosition.x && 
                        this.position.x < objectPosition.x + objectSize &&
                        this.position.y > objectPosition.y && 
                        this.position.y < objectPosition.y + objectSize
                    ){
                        world.worldMatrix[j * world.matrixHeight + i].renderSelected();
                        // // this.velocity.y = 0;

                        let options = [
                            Math.abs(objectPosition.y - this.position.y),
                            Math.abs((objectPosition.y + objectSize) - this.position.y),
                            Math.abs(objectPosition.x - this.position.x),
                            Math.abs((objectPosition.x + objectSize) - this.position.x)
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
                            movement.y = objectPosition.y - this.position.y;
                            velocity.x = this.velocity.x * 0.9; 
                            // velocity.y = this.velocity.y * -0.6;
                        }
                        else if(smaller == 1){
                            movement.y = (objectPosition.y + objectSize) - this.position.y;
                            velocity.x = this.velocity.x * 0.9;
                            // velocity.y = this.velocity.y * -0.6;
                        }
                        else if(smaller == 2){
                            movement.x = objectPosition.x - this.position.x;
                            // velocity.x = this.velocity.x * -0.6; 
                            velocity.y = this.velocity.y * 0.9; 
                        }
                        else if(smaller == 3){
                            movement.x = (objectPosition.x + objectSize) - this.position.x;
                            // velocity.x = this.velocity.x * -0.6; 
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

    render(){
        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(-this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );

        ctx.fillStyle = `rgba(180, 180, 180, ${this.alpha})`
        ctx.fillRect(worldToScreenX(this.position.x - this.size/2), worldToScreenY(this.position.y - this.size/2), this.size, this.size)

        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );

    }
}