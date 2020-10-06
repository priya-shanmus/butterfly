var bgrdImg, bgrd;
var birdsImg, birds, birdssGroup;

var girl, girlImg;
var bee, beeImg, beeGroup;
var gameState = "play"
var edges;
var score = 0;
var gameoverSound,birdsSound;

function preload() {
  bgrdImg = loadImage("1.jpg");

  birdsImg = loadImage("butterfly.png");

  girlImg = loadImage("5.png");
  beeImg = loadImage("bee.png");
  gameoverSound = loadSound("gameover.mp3");
  birdsSound = loadSound("Birds.mp3");
}

function setup() {
  createCanvas(600, 600);

  bgrd = createSprite(300, 300);
  bgrd.addImage("background", bgrdImg);
  bgrd.velocityX = 2;
  
  birdsGroup = new Group();
  beeGroup = new Group();

  girl = createSprite(400, 400, 50, 50);
  girl.addImage("girl", girlImg);
  edges = createEdgeSprites();
}

function draw() {
  background(0);
  if (gameState === "play") {
   
    if (keyDown("left_arrow")) {
      girl.x = girl.x - 3;
    }

    if (keyDown("right_arrow")) {
      girl.x = girl.x + 3;
    }

    if (keyDown("space")) {
      girl.velocityY = -10;
    }
    girl.velocityY = girl.velocityY + 0.5


    if (bgrd.x > 600) {
      bgrd.x = 300
    }
    spawnbirds();
    spawnBee();
    girl.collide(edges[3]);
    if (birdsGroup.isTouching(girl)) {
      score = score + 10;
      birdsGroup.destroyEach();
       birdsSound.play();
    }
    
    drawSprites();
    fill("black");
    text("SCORE: " + score, 400, 100);
    
    if (beeGroup.isTouching(girl)) {
      gameState = "end";
      gameoverSound.play();
      
    }
    
  }

  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("MUMMY HELP ME", 200, 250)
  
  }

}

function spawnbirds() {
  //write code here to spawn the doors in the tower
  if (frameCount % 100 === 0) {
    var birds = createSprite(0, 50);


    birds.y = Math.round(random(120, 400));

    birds.addImage(birdsImg);
    birds.scale = 0.2;

    birds.velocityX = 3;


    girl.depth = birds.depth;
    girl.depth += 1;

    //assign lifetime to the variable
    birds.lifetime = 200;


    //add each door to the group
    birdsGroup.add(birds);

  }
}

function spawnBee() {
  if (frameCount % 150 === 0) {
    bee = createSprite(0, 200, 10, 10);
    bee.addImage(beeImg);
    bee.setCollider("circle",0,0,100)
    bee.scale = 0.3;
    bee.velocityX = 3;
    bee.y = Math.round(random(100, 400))
    beeGroup.add(bee);
  }
}