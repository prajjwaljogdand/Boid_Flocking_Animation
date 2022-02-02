

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(0);
  
  noFill();
  rectMode(CENTER);
  translate(windowWidth/2,windowHeight/2)
  for(let i = windowWidth; i >= 10; i -= windowWidth/500){
    
    stroke(i%255,i%200,255)       
    let angle = sin( frameCount*0.0001 );  
    rotate(angle);   
    rect(0,0,i,i);
    
  }
   
  
 
  
  
}