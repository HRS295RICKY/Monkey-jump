
var PLAY = 1;
var END =0;
var gameState = PLAY;
var monkey,monkeyrunning;
var banana ,bananaImage, obstacles, obstaclesImage;
var foodGroup, obstacleGroup;
var score = 0;
var ground,size;
var spawnbanana,spawnobstacles;
var foodsgathered = 0;
var gameover,overgame,restart,startagain;

function preload(){
  
  
  monkeyrunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
  overgame = loadImage("gameOver.png");
  
  startagain = loadImage("restart.png");
  
}



function setup() {
  createCanvas(600,400);
  
monkey = createSprite(100,300,20,20);
  monkey.addAnimation("monkey1",monkeyrunning);
  monkey.scale=0.150;
 
  
  ground = createSprite(200,350,1200,10)
  ground.velocityX = -(10 + score/100);
  
  gameover = createSprite(300,150,20,20);
  gameover.addImage("gameover1",overgame);
  gameover.scale=0.9;
  
  restart = createSprite(300,200,20,20);
  restart.addImage("restart1",startagain);
  restart.scale = 0.9;
  
  monkey.setCollider("circle",-100,0,300);
  //monkey.debug = true;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
 background("green");
   text("Score: "+ score ,  500,50);
  text("Foods Gathered:" +foodsgathered ,50,50);
     
  
  if(gameState === PLAY){
     score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && monkey.y>259){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY +0.8;
  monkey.collide(ground);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    gameover.visible = false;
    restart.visible = false;
    
  spawnbanana();
  spawnobstacles();
  
  if(monkey.isTouching(foodGroup)){
     foodsgathered = foodsgathered +1;
    foodGroup.destroyEach();
    foodGroup.setVelocityXEach(0);
    
     }
  
   
  if(monkey.isTouching(obstacleGroup)){
     gameState=END;
  }
  }
  
 if(gameState === END){
 ground.velocityX =0;
   monkey.velocityY = 0;
   
   gameover.visible = true;
   restart.visible = true;
   
   foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
   
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
   
   if(mousePressedOver(restart)){
   reset();
   }
 }
  
  drawSprites()
}


function spawnbanana (){
  if(frameCount % 60 === 0){
  var banana = createSprite(600,Math.round(random (120,250)), 20,20);
  banana.addImage("banana1",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 100;
  
    foodGroup.add(banana);
  }}

function spawnobstacles(){
 if(frameCount % 200 === 0){
  var obstacles = createSprite(600,310, 20,20);
  obstacles.addImage("obstacles1",obstaclesImage);
   
    obstacles.velocityX = -10;
    obstacles.lifetime = 100;
    
   size = Math.round(random(1,2))
       if(size==1){
          obstacles.scale = 0.17;
       } else   {
         obstacles.scale = 0.1;
         obstacles.y = 325;
       }
    obstacleGroup.add(obstacles);
}

}

function reset(){


  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
   
  
  score = 0;
  
  foodsgathered = 0;
  }
