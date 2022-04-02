var PLAY = 1;
var END = 0;


var ball1,ball2,ball3,ball4;
var mars,alien,alienImg,marsImg,stop,alien_collided,collide;
var score,invisiGround,gameSate,monster,monsters,monsterImg;
var sand,sandImg,sandWalking,checkPoint,sing,ball1Img,ball2Img,ball3Img,ball4Img;


score=0;
          function preload(){
          marsImg=loadImage("mars0.png");
          alienImg=loadAnimation("sprite_ali0.png","sprite_ali1.png");
          mons2Img=loadImage("sprite_mon0.png");
          alien_collided = loadAnimation("sprite_hit0.png");
          sandImg=loadImage("sand.png");
checkPoint=loadSound("checkpoint.mp3");

        
          monsterImg=loadImage("sprite_ghost0.png");
          restartImg=loadImage("restart.png");
          gameOverImg=loadImage("gameOver.png");
          cloudImg=loadImage("cloud.png");
         ball1Img=loadImage("blue_balloon0.png");
          ball2Img=loadImage("green_balloon0.png");
          ball3Img=loadImage("pink_balloon0.png");
          ball4Img=loadImage("red_balloon0.png");
          }

var gameState=PLAY;

function setup() {
    createCanvas(windowWidth,windowHeight);

    mars= createSprite(800,200);
    mars.addImage("ground",marsImg);
    sand=createSprite(250,940,);
    sand.addImage("sandWalking",sandImg);
  
    sand.scale=0.4;
    mars.scale=4;
   
    sand.x=400;
 
    alien=createSprite(100,540);
    alien.addAnimation("walking",alienImg);
    alien.addAnimation("collided", alien_collided);
    alien.scale=8;
   

   invisiGround=createSprite(100,790,1000,3);
   invisiGround.visible=false;
  
  
   monstersGroup=new Group();
   cloudsGroup=new Group();
}
   





                              function spawnMonsters(){
                                if (frameCount%130===(0)){
                                var monster = createSprite(740,695);
                                //obstacle.debug = true;
                                monster.velocityX = -(6 + 3*score/100);
                                
                                //generate random obstacles
                                var rand = Math.round(random(1,2));
                                switch(rand) {
                                  case 1: monster.addImage("monsters",monsterImg);
                                          break;
                                  case 2: monster.addImage(mons2Img);
                                          break;
                                  default: break;
                              
                                }
                                monster.scale=0.5;
                               
                            monster.lifetime=300;
                            monster.depth = alien.depth;
                            alien.depth = alien.depth + 2;
                            monster.x = Math.round(random(740,770));
                            monstersGroup.add(monster);
                         
                              }    
                              

}

      
function draw() {
 
 text("save the alien:)",500,700);
  if (gameState===PLAY){
    
      score = score + Math.round(getFrameRate()/60);
 
      alien.scale=2;
    

      sand.velocityX = -(6 + 3*score/100)
    spawnClouds();
      spawnMonsters();
  alien.collide(invisiGround);
  gameOver = createSprite(700,300);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(700,500);
    restart.addImage(restartImg);
    
    gameOver.scale = 2.5;
    restart.scale = 1;
  
    gameOver.visible = false;
    restart.visible = false;
   
   
 if (sand.x<-100){
  sand.x = 300;
}

if(frameCount%400===(0)) {
ball1=createSprite(1,100,20,20);
ball1.addImage(ball1Img);
ball1.scale=0.2;
ball2=createSprite(5,200,20,20);
ball2.addImage(ball2Img);
ball2.scale=0.2;
ball3=createSprite(1,300,20,20);
ball3.addImage(ball3Img);
ball3.scale=2.5;
ball4=createSprite(3,400,20,20);
ball4.addImage(ball4Img);
ball4.scale=0.2;

ball1.velocityX=10;
ball2.velocityX=8;
ball3.velocityX=12;
ball4.velocityX=9;

}
  



    if(keyDown("Up") && alien.y >= 159) {
      alien.velocityY = -16;
       
    checkPoint.play();

    }
  
    alien.velocityY = alien.velocityY + 0.8;
    

   
  
  }
 if(monstersGroup.isTouching(alien)){
  gameState = END;

}





  else if (gameState=== END){
 background("blue");

   gameOver.visible = true;
   restart.visible = true;
   mars.x=800;
   sand.x=500;
  sand.velocityX = 0;
  alien.x=100;
  alien.y=790;
  alien.changeAnimation("collided",alien_collided);
 alien.scale=0.6;


   alien.velocityY = 0;
   alien.velocityX = 0;
  
  
   alien.collide(invisiGround);


    
  monstersGroup.setVelocityEach(0);
  cloudsGroup.setVelocityEach(0);
 

  
    
monstersGroup.setLifetimeEach(0);
cloudsGroup.setLifetimeEach(0);
   
   
   if(mousePressedOver(restart)) {
     reset();
 
 }
 
 }





    drawSprites();
   
   

textSize(50);
  fill("black");
    text("Score: "+ score, 300,100);
    textSize(20);
    fill("white");
    text("press up Key to JUMP!",20,50);






}
 
 
 
 



function spawnClouds() {

  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(60,150));
    cloud.addImage(cloudImg);
    cloud.scale = 0.19;

    cloud.velocityX = -(6 + 3*score/100)
     
    cloud.lifetime = 200;
  
    cloud.depth = alien.depth;
    alien.depth = alien.depth + 1;
    
 
    cloudsGroup.add(cloud);
  }
  
}
function reset(){
  gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    monstersGroup.destroyEach();
    cloudsGroup.destroyEach();
    alien.x=100;
    alien.y=540;
    alien.changeAnimation("walking",alienImg);
   
  score=0;
  
  }
  function stageTwo(){


  
  
  
  
  
  if(keyDown("left")){

    alien.velocityX=-2;
   }

if(keyDown("right")){

alien.velocityX=2;
}
if(keyDown("down")){

alien.velocityY=2;
}



  }