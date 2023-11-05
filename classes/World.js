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

    // update(){
    //     for (let i = Math.floor(screenToWorldY(0) / 100); i < 1080 / this.tileSize; i++) {
    //         for (let j = Math.floor(screenToWorldX(0) / 100); j < 1920 / this.tileSize; j++) {

    //         }
    //     }

    //     world.worldMatrix[Math.floor(drone.position.x / 100) * world.matrixHeight + Math.floor(drone.position.y / 100)].renderSelected();
    //     console.log((Math.floor(drone.position.x / 100)), (Math.floor(drone.position.y / 100)))
    // }

    render(){
        for (let i = Math.floor(screenToWorldY(0) / this.tileSize); i < Math.floor(screenToWorldY(200) / this.tileSize) + 1080 / this.tileSize; i++) {
            for (let j = Math.floor(screenToWorldX(0) / this.tileSize); j < Math.floor(screenToWorldX(200) / this.tileSize) + 1920 / this.tileSize; j++) {
                if(this.worldMatrix[j * this.matrixHeight + i] != undefined && this.worldMatrix[j * this.matrixHeight + i].type == 0){
                    this.worldMatrix[j * this.matrixHeight + i].render();

                }
            
            }
        }
    }
}