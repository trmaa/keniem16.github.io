let particles = [];

function spawnParticle(position, velocity, angle, variation){
    if(variation == 0){
        for(let i = 0; i<particles.length; i++){
            if(particles[i].alpha < 0){
                particles[i].beNew(new Vec2(
                    position.x - Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
                    position.y + Math.cos(angle * Math.PI / 180) * 40 + Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
                ), velocity)
                return;
            }
        }
        particles.push(new Particle(new Vec2(
            position.x - Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
            position.y + Math.cos(angle * Math.PI / 180) * 40 + Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
        ), velocity));
    }
    else{
        for(let i = 0; i<particles.length; i++){
            if(particles[i].alpha < 0){
                particles[i].beNew(new Vec2(
                    position.x + Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
                    position.y + Math.cos(angle * Math.PI / 180) * 40 - Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
                ), velocity);
                return;
            }

        }
        particles.push(new Particle(new Vec2(
            position.x + Math.cos(angle * Math.PI / 180) * 50 + Math.sin(angle * Math.PI / 180) * 40 + Math.random() * 10 - 5,
            position.y + Math.cos(angle * Math.PI / 180) * 40 - Math.sin(angle * Math.PI / 180) * 50 + Math.random() * 10 - 5
        ), velocity));
    }

}


class Particle{
    constructor(position, velocity){
        this.position = position;
        this.size = Math.random() * 30 + 5;
        this.angle = Math.random() * 360;
        this.alpha = Math.random();

        this.velocity = Vec2.add(velocity, Vec2.mult(velocity, -0.1));
    }

    beNew(position, velocity){
        this.position = position;
        this.size = Math.random() * 30 + 5;
        this.angle = Math.random() * 360;
        this.alpha = Math.random();

        this.velocity = Vec2.add(velocity, Vec2.mult(velocity, -0.1));
    }

    update(){
        this.velocity.y += 0.1;
        this.position = Vec2.add(this.position, this.velocity);
        this.size *= 0.99;
        this.alpha -= 0.01;

        if(
            this.position.x > ground.position.x && 
            this.position.x < ground.position.x + ground.size.x &&
            this.position.y > ground.position.y && 
            this.position.y < ground.position.y + ground.size.y
        ){
            if(Math.abs(ground.position.y - this.position.y) < Math.abs((ground.position.y + ground.size.y) - this.position.y)){
                this.position.y -= Math.abs(ground.position.y - this.position.y)
            }
            else{
                this.position.y += Math.abs((ground.position.y + ground.size.y) - this.position.y);
            }
        }
    }

    render(){
        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(-this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );

        ctx.fillStyle = `rgba(180, 180, 180, ${this.alpha})`
        ctx.fillRect(worldToScreenX(this.position.x - this.size/2), worldToScreenY(this.position.y - this.size/2), this.size, this.size)

        ctx.translate( worldToScreenX(this.position.x), worldToScreenY(this.position.y) );
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(- worldToScreenX(this.position.x),- worldToScreenY(this.position.y) );

    }
}