class Vec2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    get m(){
        return this.calcM();
    }

    calcM(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(){
        const magnitude = this.m;
        this.x = this.x/magnitude;
        this.y = this.y/magnitude;
    }

    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    static mult(a, b) {
        return new Vec2(a.x * b, a.y * b);
    }
    static angleToVector(a){
        const vector = new Vec2(Math.cos((a - 90) * Math.PI / 180), Math.sin((a - 90) * Math.PI / 180));
        vector.normalize()
        return vector;
    }
    static distance(a, b){
        const x = Math.abs(a.x - b.x);
        const y = Math.abs(a.y - b.y);
        
        return Math.sqrt( x*x + y*y );
    }
}