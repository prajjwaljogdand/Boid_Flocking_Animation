const width = 1450;
const height = 750;

const flock = [] ;
const predator = [];

function setup() {
    createCanvas(width, height);
    for(let i = 0 ; i < 100; i++){
        flock.push(new Boid());
    }
    for(let i = 0 ; i < 10; i++){
        predator.push(new Boid());
    }
  
    
}  


function draw() {

    background(0);

    

    for(let boid of flock){
         boid.Show(255,255,255);
        boid.EdgeDetection();
        boid.Move();
        boid. FlockMove(flock,predator);
    } 
    for(let boid of predator){
        boid.Show(255,0,0);
       boid.EdgeDetection();
       boid.Move();
   }      
    
}




  