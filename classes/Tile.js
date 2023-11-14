class Tile{
    constructor(position, tileSize){
        this.tileSize = tileSize;
        this.matrixPosition = position;
        this.worldPosition = Vec2.mult(position, tileSize);
        
        // this.type = Math.floor(Math.random() * 2);
        this.type = 0;
        this.var = Math.floor(Math.random() * 5);

        // console.log(position.x, position.y)

        if(map[position.x] !== undefined && map[position.x][position.y] !== undefined){
            if(map[position.x][position.y] == " "){
                this.type = 1;
            }
        }
        else{

        }


        // if(map[position.x][position.y] != undefined){
        //     if(map[position.x][position.y] == "A"){
        //         this.type == 0;
        //     }    
        // }

    }

    render(){
        if(this.type == 0){
            ctx.fillStyle = `rgb(15,15,15)`;
        }
        else{
            ctx.fillStyle = `rgb(255, 255, 255)`;

        }
        ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize + 1, this.tileSize + 1);

        // ctx.drawImage(srcTiles, this.var * 145, 0, 144, 144, worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), 144, 144)
    }

    renderSelected(){
        ctx.fillStyle = `rgba(255, 0, 0, 0.1)`;
        ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize, this.tileSize);
        ctx.fillStyle = `rgba(0, 0, 255, 1)`;
        if(this.type == 0){
            if(world.worldMatrix[(this.matrixPosition.x - 1) * world.matrixHeight + this.matrixPosition.y].type == 1){
                ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), 6, this.tileSize);
            }
            if(world.worldMatrix[(this.matrixPosition.x + 1) * world.matrixHeight + this.matrixPosition.y].type == 1){
                ctx.fillRect(worldToScreenX(this.worldPosition.x + this.tileSize - 6), worldToScreenY(this.worldPosition.y), 6, this.tileSize);
            }
            if(world.worldMatrix[this.matrixPosition.x * world.matrixHeight + (this.matrixPosition.y - 1)].type == 1){
                ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize, 6);
            }
            if(world.worldMatrix[this.matrixPosition.x * world.matrixHeight + (this.matrixPosition.y + 1)].type == 1){
                ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y + this.tileSize - 6), this.tileSize, 6);
            }
        }

    }
}