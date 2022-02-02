class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D(0.5, 1.5);
        this.acceleration = createVector();
        this.maxForce = 0.05;
        this.maxSpeed = 4;
        this.r = 3;
    }

    Show(r,g,b) {
      
        stroke(r,g,b);
        fill(200, 100);
        push();

        let theta = this.velocity.heading() + radians(90);
        translate(this.position.x, this.position.y);
        rotate(theta);
        triangle(0, -this.r*2, -this.r, this.r*2, this.r, this.r*2);
        pop();

    }


    Move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    Alignment(Boids) {

        let avgVelocity = createVector();
        const perception = 100;
        let neighbors = 0;

        for (let otherBoid of Boids) {

            let distance = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);

            if ( distance < perception  && this != otherBoid){
                avgVelocity.add(otherBoid.velocity);
                neighbors++;
            }

        }

        if(neighbors){
            avgVelocity.div(neighbors);
            avgVelocity.setMag(this.maxSpeed);
            avgVelocity.sub(this.velocity);
            avgVelocity.limit(this.maxForce);
        }

        return avgVelocity;


    }

    Cohesion(Boids) {

        let avgPosition = createVector();
        const perception = 100;
        let neighbors = 0;

        for (let otherBoid of Boids) {

            let distance = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);

            if ( distance < perception  && this != otherBoid){
                avgPosition.add(otherBoid.position);
                neighbors++;
            }

        }

        if(neighbors>0){
            avgPosition.div(neighbors);
            avgPosition.sub(this.position);
            avgPosition.setMag(this.maxSpeed);
            avgPosition.sub(this.velocity);
            avgPosition.limit(this.maxForce);
        }

        return avgPosition;


    }

    Separation(Boids){

        let v = createVector();
        const perception = 50;
        const avoidFactor = 0.005;
    

        for(let otherBoid of Boids){
            
          let distance = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);
          if( distance < perception && otherBoid != this ){
              v.x = this.position.x - otherBoid.position.x;
              v.y = this.position.y - otherBoid.position.y;

          }
       
            
        }
        for(let otherBoid of Boids){
            
            let distance = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);
            if( distance < perception && otherBoid != this ){
                v.x = this.position.x - otherBoid.position.x;
                v.y = this.position.y - otherBoid.position.y;
  
            }
         
              
          }

        v.x *= avoidFactor;
        v.y *= avoidFactor;
        
        return v;

    }

    AvoidPredator(Boids){

        let v = createVector();
        const perception = 50;
        const avoidFactor = 0.5;
    

        for(let otherBoid of Boids){
            
          let distance = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);
          if( distance < perception && otherBoid != this ){
              v.x = this.position.x - otherBoid.position.x;
              v.y = this.position.y - otherBoid.position.y;

          }
       
            
        }
        for(let otherBoid of Boids){
            
            let distance = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);
            if( distance < perception && otherBoid != this ){
                v.x = this.position.x - otherBoid.position.x;
                v.y = this.position.y - otherBoid.position.y;
  
            }
         
              
          }

        v.x *= avoidFactor;
        v.y *= avoidFactor;
        
        return v;

    }


    MouseSeparation(Boids){

        let v = createVector();
        const perception = 50;
        const avoidFactor = 1;
    

        for(let otherBoid of Boids){
            
          
          let distance2 = dist(this.position.x, this.position.y, mouseX, mouseY);
          if(distance2 < perception ){

            v.x = this.position.x - mouseX;
            v.y = this.position.y - mouseY;
        
          }
            
        }

        v.x *= avoidFactor;
        v.y *= avoidFactor;
        
        return v;

    }

    FlockMove(Boids,Predator){

        let align = this.Alignment(Boids);
        let cohesion = this.Cohesion(Boids);
        let separation = this.Separation(Boids);
        let pray =  this.MouseSeparation(Boids);
        let predator =  this.AvoidPredator(Predator);
        this.velocity.add(predator);
        this.velocity.add(pray);
        this.velocity.add(separation);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.set(0,0);
        this.acceleration.add(align);
        this.acceleration.add(cohesion);
    }

    EdgeDetection() {
        if (this.position.x > width - 4 || this.position.x < 4) {
            this.velocity.x *= -1;
        }

        if (this.position.y > height - 4 || this.position.y < 4) {
            this.velocity.y *= -1;
        }

    }
}