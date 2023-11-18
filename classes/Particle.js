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
        this.size = Math.random() * 15 + 5;
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
        this.size *= 1.02;
        this.alpha -= 0.01;

        let positionTile = new Vec2(Math.floor(this.position.x / world.tileSize),Math.floor(this.position.y / world.tileSize))

        for (let i = Math.floor((this.position.y - world.tileSize) / world.tileSize); i < Math.floor((this.position.y + world.tileSize * 2) / world.tileSize); i++) {
            for (let j = Math.floor((this.position.x - world.tileSize) / world.tileSize); j < Math.floor((this.position.x + world.tileSize * 2) / world.tileSize); j++) {
                
                let tilePosition = world.worldMatrix[j * world.matrixHeight + i].worldPosition;

                if(world.worldMatrix[j * world.matrixHeight + i] != undefined && world.worldMatrix[j * world.matrixHeight + i].type == 0){

                    if(
                        this.position.x > tilePosition.x && 
                        this.position.x < tilePosition.x + world.tileSize &&
                        this.position.y > tilePosition.y && 
                        this.position.y < tilePosition.y + world.tileSize
                    ){

                        let directionsX = [0, 0, -1, 1,  1, -1, 1, -1];
                        let directionsY = [-1, 1, 0, 0,  1, -1, -1, 1];

                        let movingOptions = [
                            Math.abs(tilePosition.y - this.position.y),
                            Math.abs((tilePosition.y + world.tileSize) - this.position.y),
                            Math.abs(tilePosition.x - this.position.x),
                            Math.abs((tilePosition.x + world.tileSize) - this.position.x),

                            Math.sqrt(((tilePosition.x + world.tileSize) - this.position.x) * ((tilePosition.x + world.tileSize) - this.position.x) + ((tilePosition.y + world.tileSize) - this.position.y) * ((tilePosition.y + world.tileSize) - this.position.y)),
                            Math.sqrt((tilePosition.x - this.position.x) * (tilePosition.x - this.position.x) + (tilePosition.y - this.position.y) * (tilePosition.y - this.position.y)),
                            Math.sqrt(((tilePosition.x + world.tileSize) - this.position.x) * ((tilePosition.x + world.tileSize) - this.position.x) + (tilePosition.y - this.position.y) * (tilePosition.y - this.position.y)),
                            Math.sqrt((tilePosition.x - this.position.x) * (tilePosition.x - this.position.x) + ((tilePosition.y + world.tileSize) - this.position.y) * ((tilePosition.y + world.tileSize) - this.position.y))
                        ]

                        
                        let smaller = 100000;
                        let smallerValue = 100000;

                        for(let s = 0; s<8; s++){

                            if(movingOptions[s] < smallerValue && world.worldMatrix[(positionTile.x + directionsX[s]) * world.matrixHeight + (positionTile.y + directionsY[s])] != undefined && world.worldMatrix[(positionTile.x + directionsX[s]) * world.matrixHeight + (positionTile.y + directionsY[s])].type != 0){
                                
                                smallerValue = movingOptions[s];
                                smaller = s;
                            }
                        }

                        let movement = new Vec2(smallerValue * directionsX[smaller], smallerValue * directionsY[smaller]);
                        this.position = Vec2.add(this.position, movement);
                        this.velocity.x = this.velocity.x * 0.9 * Math.abs(directionsY[smaller]); 
                        this.velocity.y = this.velocity.y * 0.9 * Math.abs(directionsX[smaller]); 


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