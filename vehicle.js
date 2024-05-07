

function draw(){
  for (let vehicle of vehicles) {
    vehicle.behaviors();
    vehicle.update();
    vehicle.show();
}
}


class Vehicle {
    constructor(x, y) {
      //q los puntos viajen desde cualquier lado
      this.home = createVector(random(width), random(height));
      this.pos = this.home.copy();
      this.target = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.acc = createVector();
      this.r = 6;
      this.maxspeed = 10;
      this.maxforce = 1;
    }
  
    behaviors() {
      var arrive = this.arrive(this.target);
      var mouse = createVector(mouseX, mouseY);
      var flee = this.flee(mouse);
      
      arrive.mult(1);
      flee.mult(8);

      this.applyForce(flee);
      this.applyForce(arrive);
        
    }
  
    applyForce(f) {
      this.acc.add(f);
    }
  
    update() {
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.acc.mult(0);
    }
  
    show() {
      stroke(255);
      strokeWeight(this.r);
      point(this.pos.x, this.pos.y);
    }
  
  
    arrive(target) {
      var desired = p5.Vector.sub(target, this.pos);
      var d = desired.mag();
      var speed = this.maxspeed;
      if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxspeed);
      }
      desired.setMag(speed);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    }
  
    flee(target) {
      var desired = p5.Vector.sub(target, this.pos);
      //que al pasar el mouse los vehiculos no se vayan tan lejos, una distancia máxima
      var d = desired.mag();
      if (d < 50) {
        desired.setMag(this.maxspeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
      } else {
        return createVector(0, 0);
      }
    }
  }