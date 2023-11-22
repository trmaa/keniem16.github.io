class Object{
    constructor(x, y, src){
        this.x = x;
        this.y = y;
        this.src = src;
    }

    update(){
        return 0;
    }

    render(){
        ctx.drawImage(this.src, worldToScreenX(this.x), worldToScreenY(this.y));
    }
}