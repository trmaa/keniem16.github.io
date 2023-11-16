class Drone{
    constructor(){
        this.position = new Vec2(1150,1945);
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
        
        let currentTile = new Vec2(Math.floor(this.position.x / world.tileSize),Math.floor(this.position.y / world.tileSize));

        let currentVertexTiles = [
            new Vec2(Math.floor(this.vertex[0].x / world.tileSize),Math.floor(this.vertex[0].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[1].x / world.tileSize),Math.floor(this.vertex[1].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[2].x / world.tileSize),Math.floor(this.vertex[2].y / world.tileSize)),
            new Vec2(Math.floor(this.vertex[3].x / world.tileSize),Math.floor(this.vertex[3].y / world.tileSize))
        ]

        let currentVertex = this.vertex;
        
        // console.log(currentVertex[0])


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
                                // if(movingOptions[s] < smallerValue){
                                    
                                    smallerValue = movingOptions[s];
                                    smaller = s;
                                }
                            }

                            if(smaller > 3){
                                console.log("diagonal")
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
                            

                // if(world.worldMatrix[j * world.matrixHeight + i] != undefined && world.worldMatrix[j * world.matrixHeight + i].type == 0){
                    
                //     let objectPosition = world.worldMatrix[j * world.matrixHeight + i].worldPosition;
                //     let objectSize = world.tileSize;
                //     vertex:
                //     for(let k = 0; k<4; k++){
                //         if(
                //             this.vertex[k].x > objectPosition.x && 
                //             this.vertex[k].x < objectPosition.x + objectSize &&
                //             this.vertex[k].y > objectPosition.y && 
                //             this.vertex[k].y < objectPosition.y + objectSize
                //         ){
                //             // world.worldMatrix[j * world.matrixHeight + i].renderSelected();
                //             // // this.velocity.y = 0;
                //             hasCollided = true;
                //             this.colliding = true;
                            
                //             let options = [
                //                 Math.abs(objectPosition.y - this.vertex[k].y),
                //                 Math.abs((objectPosition.y + objectSize) - this.vertex[k].y),
                //                 Math.abs(objectPosition.x - this.vertex[k].x),
                //                 Math.abs((objectPosition.x + objectSize) - this.vertex[k].x)
                //             ]

                //             let smaller = 100000;
                //             let smallerValue = 100000;

                //             for(let s = 0; s<4; s++){
                //                 if(options[s] < smallerValue){
                //                     smallerValue = options[s];
                //                     smaller = s;
                //                 }
                //             }

                //             let movement = new Vec2(0,0);
                //             let velocity = new Vec2(0,0);

                //             if(smaller == 0){
                //                 movement.y = objectPosition.y - this.vertex[k].y;
                //                 velocity.x = this.velocity.x * 0.9; 
                //                 velocity.y = this.velocity.y * -0.6;
                //             }
                //             else if(smaller == 1){
                //                 movement.y = (objectPosition.y + objectSize) - this.vertex[k].y;
                //                 velocity.x = this.velocity.x * 0.9;
                //                 velocity.y = this.velocity.y * -0.6;
                //             }
                //             else if(smaller == 2){
                //                 movement.x = objectPosition.x - this.vertex[k].x;
                //                 velocity.x = this.velocity.x * -0.6; 
                //                 velocity.y = this.velocity.y * 0.9; 
                //             }
                //             else if(smaller == 3){
                //                 movement.x = (objectPosition.x + objectSize) - this.vertex[k].x;
                //                 velocity.x = this.velocity.x * -0.6; 
                //                 velocity.y = this.velocity.y * 0.9; 
                //             }

                //             this.velocity = velocity;
                //             this.position = Vec2.add(this.position, movement);
                //             this.angle *= 0.99;
                //             break cells;

                //         }
                //         else if(!hasCollided){
                //             this.colliding = false;
                //         }

                //     }
    
                // }
            
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
        
        /*ctx.fillStyle = `rgb(255,50,50)`;
        ctx.fillRect(worldToScreenX(this.position.x) - 3, worldToScreenY(this.position.y) - 3, 6, 6);
    
        for(let i = 0; i<4; i++){
            ctx.fillRect(worldToScreenX(this.vertex[i].x) - 3, worldToScreenY(this.vertex[i].y) - 3, 6, 6);
        }*/
    }
}

// test