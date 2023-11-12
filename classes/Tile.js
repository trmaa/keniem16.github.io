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
        ctx.fillStyle = `rgb(255, 0, 0)`;
        ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize, this.tileSize)
    }
}