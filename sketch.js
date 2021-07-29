var bg,bgImg;
var player, shooterImg, shooter_shooting,zombieImg,bullet;
var bulletsGroup,zombiesGroup;
var gameState="play";
var score=0;
var life=3;
var heartImg1,heartImg2,heartImg3;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg =loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

  heartImg1 = loadImage("assets/heart_1.png")
  heartImg2 = loadImage("assets/heart_2.png")
  heartImg3 = loadImage("assets/heart_3.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)

bg.addImage(bgImg)
bg.scale = 1.1


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);

 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  
bulletsGroup=createGroup();
zombiesGroup=createGroup();
   


}

function draw() {
  background(0); 

  if(gameState=="play"){
    
spawnZombie();
//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")&& player.y>windowHeight-300||touches.length>0){
player.y = player.y-30

}
if(keyDown("DOWN_ARROW")&& player.y<windowHeight-50||touches.length>0){
player.y = player.y+30
}
if(keyWentDown("space")){
 
  
  player.addImage(shooter_shooting)
  bullet=createSprite(player.x+100,player.y-22,15,10);
  bullet.shapeColor="orange";
  bullet.velocityX=4;
bullet.lifetime=windowWidth/bullet.velocityX;
bulletsGroup.add(bullet);
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}
for(var i=0;i<zombiesGroup.length;i++){
  if(bulletsGroup.isTouching(zombiesGroup.get(i))){
    zombiesGroup.get(i).destroy();
    bulletsGroup.destroyEach();
    score++;
  }
}


for(var i=0;i<zombiesGroup.length;i++){
  if(player.isTouching(zombiesGroup.get(i))){
    zombiesGroup.get(i).destroy();
      if(life>1){
        life=life-1;
      }
     else{
       gameState="end";
     }
}


}

  }
else if(gameState=="end"){
  zombiesGroup.setVelocityXEach(0);
  bulletsGroup.destroyEach();

}



//release bullets and change the image of shooter to shooting position when space is pressed



drawSprites();
textSize(35);
stroke("white")
fill('white')

text("score: "+score,windowWidth-200,100)

switch(life){
  case 3: image(heartImg3,windowWidth-200,200,200,50);
  break ;
  case 2: image(heartImg2,windowWidth-200,200,150,50);
  break ;
  case 1: image(heartImg1,windowWidth-200,200,100,50);
  break;
  
}


}

function spawnZombie(){
  

  if(frameCount%100==0){
    zombie=createSprite(displayWidth-30,random(displayHeight/2,displayHeight-100),30,30);
    zombie.addImage(zombieImg)
    zombie.scale=0.2;
    zombie.velocityX=-2;
    zombie.lifetime=windowWidth/zombie.velocityX
    zombiesGroup.add(zombie);
    zombie.debug=false;
    zombie.setCollider("rectangle",0,0,100,zombie.height);
    
  
}



}


