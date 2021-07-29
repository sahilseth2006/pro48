


var shooter,shooterAmmo,bg,enemy;

var shooterImg,shooterAmmoImg,enemy1Img,enemy2Img,enemy3Img,bgImage,gameOverImg,restartImg;

var enemyGroup,shooterAmmoGroup;

var score=0;
var health=3;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver;

var	shooterAmmoSound,gameEndedSound,destroyedSound;
function preload(){

	bgImage=loadImage("images/bg.jpg");	
	shooterImg=loadImage("images/shooter2.png");
	shooterAmmoImg=loadImage("images/ammo2.png");
	enemy1Img=loadImage("images/enemy1.png");
	enemy2Img=loadImage("images/enemy2.png");
	
	enemy3Img=loadImage("images/enemy7.png");
	gameOverImg = loadImage("images/gameOver.png");
	

	shooterAmmoSound=loadSound("sound/Gunshot.mp3");
	gameEndedSound=loadSound("sound/preview.mp3");
	destroyedSound=loadSound("sound/destroyed.mp3");
	
}

function setup() {
	createCanvas(displayWidth-10, displayHeight-10);




	//Create the Bodies Here.
	bg=createSprite(displayWidth/2,displayHeight/2-200,displayWidth,displayHeight)
	bg.addImage(bgImage)
	bg.velocityY=3


	shooter=createSprite(displayWidth/2,displayHeight/2+200,30,30)

	
	gameOver = createSprite(700,300);

	gameOver.addImage(gameOverImg);

	 
	

	shooter.addImage(shooterImg)

	enemyGroup=new Group()
	shooterAmmoGroup=new Group();
  
}


function draw() {
	
  background(0);
   
  //console.log(bg.y)

  if(gameState===PLAY){

	gameOver.visible = false;

	
  spawnEnemy()
 

	if(keyDown("space")){
		createAmmo()
		shooterAmmoSound.play()
	}


	if(keyDown(UP_ARROW)){
		shooter.y-=20
	}
	
	if(keyDown(DOWN_ARROW)){
		shooter.y+=20
	}



	

	if(keyDown(LEFT_ARROW)){
		shooter.x-=20
	}



	if(keyDown(RIGHT_ARROW)){
		shooter.x+=20
	}

	if(enemyGroup.isTouching(shooterAmmoGroup)){
		shooterAmmoGroup.destroyEach();
		enemyGroup.destroyEach();
		score=score+10
		destroyedSound.play();
	}

	if(shooter.isTouching(enemyGroup)){
		enemyGroup.destroyEach();
		health=health-1
	}
	
	if(bg.y>600 ){
		bg.y=displayHeight/2
	}

	if(health===0){
		gameState=END
		gameEndedSound.play();
	}
}
	else if(gameState===END){
		enemyGroup.setLifetimeEach(-1)
		enemyGroup.setVelocityEach(0)
		gameOver.visible = true;
		

		bg.velocityY=0

		
	}


	drawSprites();
	textSize(30)
	fill("blue")
	text("Score:"+score,250,70)


	fill("green")
	text("Health:"+health,50,70)
}

function spawnEnemy(){

	//var r=Math.round(random(180,270))
    if(frameCount % 200===0){

        enemy=createSprite(random(displayWidth),0,30,30)

        var rand=Math.round(random(1,3))
        switch(rand){
            case 1:enemy.addImage(enemy1Img)
			//enemy.debug=true
			enemy.setCollider("circle",0,0,200)
            enemy.scale=0.2
            break;

            case 2:enemy.addImage(enemy2Img)
		
			//enemy.debug=true
          //  enemy.scale=0.5
            break;

            case 3:enemy.addImage(enemy3Img)
			//enemy.debug=true
           enemy.scale=0.2
            break;
            default:break;
          
        }
        enemy.velocityY=7
        enemy.lifetime=displayWidth/4
		enemyGroup.add(enemy)

		enemy.depth=shooter.depth
         shooter.depth+=1

       
     
        
    }

}

function createAmmo(){
	var shooterAmmo= createSprite(100, 500, 60, 10);
	//shooterAmmo.debug=true
	shooterAmmo.setCollider("rectangle",0,0,100,450)
	shooterAmmo.scale=0.2
	shooterAmmo.addImage(shooterAmmoImg);
	//arrow.x = 360;
	shooterAmmo.x=shooter.x;
	shooterAmmo.velocityY = -5;
	shooterAmmoGroup.add(shooterAmmo)
	shooterAmmo.lifetime=displayWidth/5

	
}
