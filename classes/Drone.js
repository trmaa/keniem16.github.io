class Drone{
    constructor(){
        this.position = mapPositions[level -1];
        // this.position = new Vec2(1150,1945);
        this.velocity = new Vec2(0,0);
        this.angle = 0;
        this.angleVelocity = 0;
        this.vertex = [
            new Vec2(0 - 60, 0 - 15),
            new Vec2(0 + 60, 0 - 15),
            new Vec2(0 - 60, 0 + 15),
            new Vec2(0 + 60, 0 + 15)
        ];
        this.health = 100;
        this.colliding = false;
        this.timeSinceCollision = 0;
    }

    update(){
        this.colliding = false;

        let currentTile = new Vec2(Math.floor(this.position.x / world.tileSize),Math.floor(this.position.y / world.tileSize));

        let currentVertexTiles = [
            new Vec2(Math.floor(this.vertex[0].x / world.tileSize),Math.floor(this.vertex[0].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[1].x / world.tileSize),Math.floor(this.vertex[1].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[2].x / world.tileSize),Math.floor(this.vertex[2].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[3].x / world.tileSize),Math.floor(this.vertex[3].y / world.tileSize))
        ]

        let currentVertex = this.vertex;
        
        // console.log(currentVertex[0])

        let velocityIncrement = new Vec2(0,0);
        
        if(leftDown){
            this.angleVelocity -= 0.6;
            velocityIncrement = Vec2.mult(Vec2.angleToVector(this.angle), 0.16);

            let randomSize = Math.random() * 20 + 5;
            spawnParticle(
                new Vec2(
                    this.position.x - Math.cos(this.angle * Math.PI / 180) * 50 + Math.sin(this.angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
                    this.position.y + Math.cos(this.angle * Math.PI / 180) * 40 + Math.sin(this.angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
                ), 
                this.velocity, randomSize, randomSize, new Color(180, 180, 180, Math.random()), 0.01, 1, true
            );
        }
        if(rightDown){
            this.angleVelocity += 0.6;
            velocityIncrement = Vec2.mult(Vec2.angleToVector(this.angle), 0.16);

            let randomSize = Math.random() * 20 + 5;
            spawnParticle(
                new Vec2(
                    this.position.x + Math.cos(this.angle * Math.PI / 180) * 50 + Math.sin(this.angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
                    this.position.y + Math.cos(this.angle * Math.PI / 180) * 40 - Math.sin(this.angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
                ), 
                this.velocity, randomSize, randomSize, new Color(180, 180, 180, Math.random()), 0.01, 1, true
            );

        }
        if(leftDown && rightDown){
            // this.velocity = Vec2.add(this.velocity, Vec2.mult(Vec2.angleToVector(this.angle), 0.16));
            velocityIncrement = Vec2.mult(Vec2.angleToVector(this.angle), 0.32)
        }
        
        this.angleVelocity *= 0.9;
        this.angle += this.angleVelocity;

        this.velocity = Vec2.add(this.velocity, velocityIncrement);

        if(this.angle >= 180){
            this.angle -= 360;
        }
        if(this.angle < -180){
            this.angle += 360;
        }

        this.velocity = Vec2.add(this.velocity, new Vec2(0, 0.12));
        this.velocity = Vec2.mult(this.velocity, 0.999);

        this.position = Vec2.add(this.position, this.velocity);

        let hasCollided = false;

        this.updateVertex();

        let newVertex = this.vertex;

        // console.log(currentVertex, newVertex)

        let newTile = new Vec2(Math.floor(this.position.x / world.tileSize),Math.floor(this.position.y / world.tileSize));
        
        let newVertexTiles = [
            new Vec2(Math.floor(this.vertex[0].x / world.tileSize),Math.floor(this.vertex[0].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[1].x / world.tileSize),Math.floor(this.vertex[1].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[2].x / world.tileSize),Math.floor(this.vertex[2].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[3].x / world.tileSize),Math.floor(this.vertex[3].y / world.tileSize))
        ]

        cells:
        for (let i = Math.floor((this.position.y - world.tileSize) / world.tileSize); i < Math.floor((this.position.y + world.tileSize * 2) / world.tileSize); i++) {
            for (let j = Math.floor((this.position.x - world.tileSize) / world.tileSize); j < Math.floor((this.position.x + world.tileSize * 2) / world.tileSize); j++) {
                
                let tilePosition = world.worldMatrix[j * world.matrixHeight + i].worldPosition;

                if(world.worldMatrix[j * world.matrixHeight + i] != undefined && world.worldMatrix[j * world.matrixHeight + i].type == 0){
                    for(let k = 0; k<4; k++){

                        if(this.vertex[k].x > tilePosition.x && 
                            this.vertex[k].x < tilePosition.x + world.tileSize &&
                            this.vertex[k].y > tilePosition.y && 
                            this.vertex[k].y < tilePosition.y + world.tileSize
                        ){
                            hasCollided = true;
                            this.colliding = true;


                            if(this.velocity.calcM() > 4){
                                for(let l = 0; l<30; l++){
                                    let randomSize = Math.random()*5;
                                    let randomDirection = Math.random()*2*Math.PI;
                                    let randomVelocity = Math.random()*3;

                                    spawnParticle(this.vertex[k], new Vec2(Math.cos(randomDirection) * randomVelocity, Math.sin(randomDirection) * randomVelocity) , randomSize, randomSize * 4, new Color(170, 25, 25, Math.random()), 0, 0, false);
                                }
                            }


                            let directionsX = [0, 0, -1, 1,  1, -1, 1, -1];
                            let directionsY = [-1, 1, 0, 0,  1, -1, -1, 1];

                            let movingOptions = [
                                Math.abs(tilePosition.y - this.vertex[k].y),
                                Math.abs((tilePosition.y + world.tileSize) - this.vertex[k].y),
                                Math.abs(tilePosition.x - this.vertex[k].x),
                                Math.abs((tilePosition.x + world.tileSize) - this.vertex[k].x),

                                Math.sqrt(((tilePosition.x + world.tileSize) - this.vertex[k].x) * ((tilePosition.x + world.tileSize) - this.vertex[k].x) + ((tilePosition.y + world.tileSize) - this.vertex[k].y) * ((tilePosition.y + world.tileSize) - this.vertex[k].y)),
                                Math.sqrt((tilePosition.x - this.vertex[k].x) * (tilePosition.x - this.vertex[k].x) + (tilePosition.y - this.vertex[k].y) * (tilePosition.y - this.vertex[k].y)),
                                Math.sqrt(((tilePosition.x + world.tileSize) - this.vertex[k].x) * ((tilePosition.x + world.tileSize) - this.vertex[k].x) + (tilePosition.y - this.vertex[k].y) * (tilePosition.y - this.vertex[k].y)),
                                Math.sqrt((tilePosition.x - this.vertex[k].x) * (tilePosition.x - this.vertex[k].x) + ((tilePosition.y + world.tileSize) - this.vertex[k].y) * ((tilePosition.y + world.tileSize) - this.vertex[k].y))
                            ]

                            
                            let smaller = 100000;
                            let smallerValue = 100000;

                            for(let s = 0; s<8; s++){

                                if(movingOptions[s] < smallerValue && world.worldMatrix[(newVertexTiles[k].x + directionsX[s]) * world.matrixHeight + (newVertexTiles[k].y + directionsY[s])] != undefined && world.worldMatrix[(newVertexTiles[k].x + directionsX[s]) * world.matrixHeight + (newVertexTiles[k].y + directionsY[s])].type != 0){
                                    
                                    smallerValue = movingOptions[s];
                                    smaller = s;
                                }
                            }

                            let movement = new Vec2(smallerValue * directionsX[smaller], smallerValue * directionsY[smaller]);
                            this.position = Vec2.add(this.position, movement);
                            this.velocity.x = this.velocity.x * 0.9 * Math.abs(directionsY[smaller]) + this.velocity.x * -0.6 * Math.abs(directionsX[smaller]); 
                            this.velocity.y = this.velocity.y * 0.9 * Math.abs(directionsX[smaller]) + this.velocity.y * -0.6 * Math.abs(directionsY[smaller]); 


                        }
                        else if(!hasCollided){
                            this.colliding = false;
                        }
                    }
                }
            
            }
        }

        if(this.colliding && this.timeSinceCollision < 0 && this.velocity.calcM() > 1 && this.health > 0){
            this.health -= 2 * this.velocity.m;
            this.timeSinceCollision = 25;
        }
        if(this.health < 0){
            this.health = 0;
        }

        this.timeSinceCollision -= 1;
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
        ctx.save();

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

        ctx.restore(); //restore canvas state
        // ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        // ctx.rotate(this.angle * Math.PI / 180);
        // ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );
        
        /*ctx.fillStyle = `rgb(255,50,50)`;
        ctx.fillRect(worldToScreenX(this.position.x) - 3, worldToScreenY(this.position.y) - 3, 6, 6);
    
        for(let i = 0; i<4; i++){
            ctx.fillRect(worldToScreenX(this.vertex[i].x) - 3, worldToScreenY(this.vertex[i].y) - 3, 6, 6);
        }*/
    }
}

// test