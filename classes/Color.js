class Color{
    constructor(red, green, blue, alpha = 1){
        this.r = red;
        this.g = green;
        this.b = blue;
        this.alpha = alpha;
    }

    colorText(){
        if(this.alpha == 1){
            return `rgb(${this.r}, ${this.g}, ${this.b})`;
        }
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
    }
}

let colorTest = new Color(255, 90, 70);
console.log(colorTest)