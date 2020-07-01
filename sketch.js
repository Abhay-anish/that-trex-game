var PLAY=1
var END=0,endstateimg,restartimg,deadtreximg
var gameState=PLAY;
var Trex,checkpointmp3,deadmp3,jumpmp3
var animetrex,edges,g1,g2,g3,cloudimg
var rand,o1,o2,o3,o4,o5,o6
var cloudGroup,obsGroup,hiscore
var score=0,hs=0
var restart,gO;
function preload()
{
      animetrex=loadAnimation("trex1.png","trex3.png","trex4.png")
      g2=loadImage("ground2.png")
      cloudimg=loadImage("cloud.png")
  
     o1=loadImage("obstacle1.png")
     o2=loadImage("obstacle2.png")
     o3=loadImage("obstacle3.png") 
     o4=loadImage("obstacle4.png")
     o5=loadImage("obstacle5.png")
     o6=loadImage("obstacle6.png")
  
    endstateimg=loadImage("gameOver.png")
    restartimg=loadImage("restart.png")
    deadtreximg=loadImage("trex_collided.png")
  
    checkpointmp3=loadSound("checkPoint.mp3")
    deadmp3=loadSound("die.mp3")
    jumpmp3=loadSound("jump.mp3")
}

function setup()
{
        createCanvas(600,200);
  
        Trex=createSprite(50,190,40,30)
        Trex.addAnimation("t1",animetrex)
        Trex.scale=0.4
        Trex.debug=false
       // Trex.setCollider("rectangle",0,0,400,Trex.height)
  
        g1=createSprite(300,190,600,10)
        g1.addImage("G1",g2)
        //console.log(g1.x)
        
        g3=createSprite(300,195,600,6)
        g3.visible=false
        cloudGroup=createGroup();
        obsGroup=createGroup();
          
        edges=createEdgeSprites()
    gO=createSprite(300,100,10,10)
  gO.addImage("wo",endstateimg)
    gO.scale=0.7
    
    restart=createSprite(300,140,10,10)
    restart.addImage("so",restartimg)
    restart.scale=0.5
}

function draw()
{
        background("white");
  
  textSize(25)
  text(score,500,50)
  text(hs,300,50)
  
       rand=Math.round(random(1,6))
  
  if(gameState===PLAY)
  {
    restart.visible=false
    gO.visible=false;
    //Gravity
     score=Math.round(frameCount/4)
    g1.velocityX=-(5+3*score/50)
  if(keyDown("space")&& Trex.y>=159)
       {
           Trex.velocityY=-10
           jumpmp3.play()
       }
        Trex.velocityY=Trex.velocityY+0.5 
    
    
    if(Trex.isTouching(obsGroup))
    {
     gameState=END
    deadmp3.play()
     // Trex.velocityY=-12
     // jumpmp3.play()
    }
    
   
    if(score>0 && score%50===0)
    {
      checkpointmp3.play()
      //g1.velocityX=-(6+3*score)
    }
    
    //stop
    spawnClouds();
    spawnObs();
  }
  
  else if(gameState===END)
  {
    gO.visible=true
    restart.visible=true
    obsGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    
    obsGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    
    if(hs<score)
    {
      hs=score
    }
    
    
    g1.velocityX=0;
  Trex.velocityY=0
   
 
    
    Trex.addImage("t1",deadtreximg)
  }
  
    if (mousePressedOver(restart)&&gameState===END)
    {
      reset()
    }
    // console.log("obstacle"+rand)
        
       
        Trex.collide(g3)
                    
        if (g1.x<0)
        { 
              g1.x=g1.width/2
        }
  
        //console.log(Trex.y)
        drawSprites();
}


function spawnClouds()
{
   // var r1=Math.round(random(70,100))
    
  if(frameCount%200===0)
  {
    var clouds=createSprite(600,100,10,10)
    clouds.velocityX=-3
    clouds.addImage("ha",cloudimg)
    clouds.y=random(50,100)
    clouds.lifetime=240
    Trex.depth=clouds.depth+1
    cloudGroup.add(clouds)
  }
  
  
}


function spawnObs()
{
  //var c1=Math.round(random(90,300))
  var r2=Math.round(random(1,6))
  if(frameCount%100===0)
  {
   var obs=createSprite(600,180,10,10)
   obs.velocityX=-(3+3*score/50)
   switch(r2)
   {
     case 1:obs.addImage("o11",o1)
       console.log("CASE !!!!!!!!!!!")
       obs.scale=0.5
             break
     case 2:obs.addImage("o22",o2)
       obs.scale=0.5
       break
      case 3:obs.addImage("o33",o3)
       obs.scale=0.5
       break
       case 4:obs.addImage("o44",o4)
       obs.scale=0.5
       break
       case 5:obs.addImage("o55",o5)
       obs.scale=0.5
       break
       case 6:obs.addImage("o66",o6)
       obs.scale=0.5
       break
       default:break
       
   }
    obs.lifetime=240
       obsGroup.add(obs)
    
     
  }
}
  function reset()
  {
    gameState=PLAY
    
    gO.visible=false
    restart.visible=false
    Trex.addAnimation("t1",animetrex)
    obsGroup.destroyEach()
    cloudGroup.destroyEach()
    score=0
    frameCount=0
  }



