class Tile{
    constructor(position, tileSize){
        this.tileSize = tileSize;
        this.matrixPosition = position;
        this.worldPosition = Vec2.mult(position, tileSize);
        this.type = Math.floor(Math.random()*2);
    }

    render(){
        ctx.fillStyle = `rgb(${this.type * 255}, ${this.type * 255}, ${this.type * 255})`;
        ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize, this.tileSize)
    }

    renderSelected(){
        ctx.fillStyle = `rgb(255, 0, 0)`;
        ctx.fillRect(worldToScreenX(this.worldPosition.x), worldToScreenY(this.worldPosition.y), this.tileSize, this.tileSize)
    }
}