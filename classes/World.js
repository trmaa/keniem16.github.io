class World{
    constructor(matrixWidth, matrixHeight, tileSize){
        
        this.tileSize = tileSize;
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;
        
        this.worldMatrix = {};
        for(let i = 0; i < matrixHeight; i++) {
            for (let j = 0; j < matrixWidth; j++) {
                this.worldMatrix[j * matrixHeight + i] = new Tile(new Vec2(j, i), tileSize);
            }
        }

    }

    render(){
        for (let i = Math.floor(screenToWorldY(0) / this.tileSize); i < Math.floor(screenToWorldY(200) / this.tileSize) + 1080 / this.tileSize; i++) {
            for (let j = Math.floor(screenToWorldX(0) / this.tileSize); j < Math.floor(screenToWorldX(200) / this.tileSize) + 1920 / this.tileSize; j++) {
                if(this.worldMatrix[j * this.matrixHeight + i] != undefined && this.worldMatrix[j * this.matrixHeight + i].type == 0){
                    this.worldMatrix[j * this.matrixHeight + i].render();

                }
            
            }
        }
    }

    collision(x, y){

    }

}