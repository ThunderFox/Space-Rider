var canvasJeu; //Canvas game
var contextJeu; //Canvas context
var monVaisseau; //The playes's ship
var scoreBarre; //Bar containing informations and score
var mesObstacles; //Obstacles collections
var unObstacle; //One obstacle in the list
var mesBonus;
var unBonus;
var myInterval; //The interval to manage the main loop
var tempsJeu; //playing time
var play; //If game is started
var pause; //If pause is actived
var stop; //If game is over
var positionObstacle = 0; //Allows for the position of the obstacle in the list
var vitesse; //Speed of obstacles
var collisionVaisseau; //Indicates if a collision has occurred
var nbToursStart; //Counts the number of start function call
var limiteTop; //Top limit background
var limiteDown; //Down limit background
var niveauFini; //Indiccates if the level is finished or not
var score; //Score variable
var collision; //Collision variaible
var collisionBonus;
var cptBackground;
var cadreTerrainDroit;
var cadreTerrainGauche;
var myReq;
var appearTimer; //Manages the frequency occurrence of obstacles
var appearTimerObstacle;
var appearTimerBonus;
var scoreRequis;
var gravite;
var niveau = 1;
var tailleBackgroundMax;
var scoreBonus = 0;
var reactor;
var piece;
var boom;
var vaisseauChoisi;
var grandCaractere, petitCaractere;
var gameOver;
var etatSon;
var difficulte;
var esquive;


var typeImages = {
  "vaisseau": new Image(),
  "obstacle": new Image(),
  "bonusRing1": new Image()
};
var imgTerrain = {
  "play":new Image(),
  "fini":new Image(),
  "perdu":new Image(),
  "crash":new Image(),
};

function launchGame(selectSong,difficulty,num_ship)
{
  vaisseauChoisi = num_ship;
  etatSon = selectSong;
  difficulte = difficulty;
  typeImages.vaisseau.src='img/main_ship_'+num_ship+'.png';
  niveau = 1;
  scoreBonus = 0;
  init();
  if(stop!=1)
  {
    requestAnimationFrame(start);
  }
  else
  {
    alert("sorti du jeu");
  }

}

//Function to draw a rectangle by passing the required parameters
function dessiner(type,x,y,w,h){

  if(type=="vaisseau")
  {
    //contextJeu.drawImage(typeImages.vaisseau, 152, 323, 100, 100, x, y, 80, 60);
    contextJeu.drawImage(typeImages.vaisseau, x, y, w+10, h+10); //Must change the size of the ship in accordance with the image used
  }
  else if(type=="obstacle1")
  {
    contextJeu.drawImage(typeImages.obstacle, 0, 0, 40, 40, x, y, w+10, h+10); //Must change the size of the obstacle in accordance with the image used
  }
  else if(type=="obstacle2")
  {
    contextJeu.drawImage(typeImages.obstacle, 40, 0, 35, 40, x, y, w+10, h+10); //Must change the size of the obstacle in accordance with the image used
  }
  else if(type=="obstacle3")
  {
    contextJeu.drawImage(typeImages.obstacle, 75, 0, 35, 40, x, y, w+10, h+10); //Must change the size of the obstacle in accordance with the image used
  }
  else if(type=="obstacle4")
  {
    contextJeu.drawImage(typeImages.obstacle, 110, 0, 35, 40, x, y, w+10, h+10); //Must change the size of the obstacle in accordance with the image used
  }
  else if(type=="obstacle5")
  {
    contextJeu.drawImage(typeImages.obstacle, 145, 0, 33, 40, x, y, w+10, h+10); //Must change the size of the obstacle in accordance with the image used
  }
  else if(type=="obstacle6")
  {
    contextJeu.drawImage(typeImages.obstacle, 178, 0, 35, 40, x, y, w+10, h+10); //Must change the size of the obstacle in accordance with the image used
  }
  else if(type=="obstacle7")
  {
    contextJeu.drawImage(typeImages.obstacle, 210, 0, 35, 40, x, y, w+10, h+10); //Must change the size of the obstacle in accordance with the image used
  }
  else if(type=="bonus1")
  {
    contextJeu.drawImage(typeImages.bonusRing1, 0, 95, 62, 62, x, y, w+10, h+10); //Must change the size of the bonus in accordance with the image used
  }
  else if(type=="bonus2")
  {
    contextJeu.drawImage(typeImages.bonusRing1, 70, 95, 62, 62, x, y, w+10, h+10); //Must change the size of the bonus in accordance with the image used
  }
  else if(type=="bonus3")
  {
    contextJeu.drawImage(typeImages.bonusRing1, 140, 95, 62, 62, x, y, w+10, h+10); //Must change the size of the bonus in accordance with the image used
  }
  else if(type=="bonus4")
  {
    contextJeu.drawImage(typeImages.bonusRing1, 210, 95, 62, 62, x, y, w+10, h+10); //Must change the size of the bonus in accordance with the image used
  }
  
  else if(type=="scoreBarre")
  {
    contextJeu.fillStyle="black";
    contextJeu.fillRect(x,y,w+100,h+5);
    contextJeu.strokeStyle="red";
    contextJeu.strokeRect(x,y,w+100,h+5);
  }
  else if(type=="score")
  {
    contextJeu.fillStyle="white";
    contextJeu.font=grandCaractere+"px gameOver";
    contextJeu.fillText(gererScore(),x-40,y+5);
  }
  else if(type=="scoreBonus")
  {
    contextJeu.drawImage(typeImages.bonusRing1, 0, 95, 62, 62, x-emplacementDynamique(1.5), y+6, w, h);
    contextJeu.fillStyle="gold";
    contextJeu.font=grandCaractere+"px gameOver";
    contextJeu.fillText(scoreBonus,x+emplacementDynamique(5),y+25);
  }
  else if(type=="bestScore")
  {
    contextJeu.fillStyle="red";
    contextJeu.font=petitCaractere+"px gameOver";
    contextJeu.fillText("Best : ",x,y+5);
    contextJeu.fillStyle="white";
    contextJeu.font=grandCaractere+"px gameOver";+
    contextJeu.fillText(""+saveBestScore(),x+emplacementDynamique(15),y+5);
  }
  
  
  return true;

}
//***********************************************************************************

//Initialization game function
function init(){
  
  //Initialization game variables
  score=0;
  niveauFini=false;
  collision=false;
  gameOver=false;
  
  cptBackground = 0;
  cadreTerrainDroit = 350;
  cadreTerrainGauche = 0;
  
  tempsJeu = 0; //indicates playing time
  play = 0; //if game is launched
  pause = 0;//if pause is actived
  stop = 0;
  
  nbToursStart=0;
  appearTimerObstacle = 10;
  appearTimerBonus = 30;
  appearTimer=0;
  
  //*************************************
  
  //LocalStorage initialisation
  if(!localStorage){
     }else if (localStorage.bestScore === undefined){
    localStorage.bestScore = 0;
  }
  //***********************************
  
  //Specific ship caracteristics
  var v, p, m;
  switch(vaisseauChoisi)
  {
    case 1 : v=3; p=1; m=2; break;
    case 2 : v=2; p=1; m=2; break;
    case 3 : v=2; p=1; m=1; break;
    case 4 : v=1; p=2; m=1; break;
  }
  
  //Difficulty and level initialisation
  if(niveau==1)
  {
    appearTimer = 50; //meteor frequency (decrease to add dificulty)
    scoreRequis = 10*difficulte;
    vitesse = 8*v;//meteor speed (increase to add difficulty)
    gravite = 2*p;
    esquive = 4*m;
    imgTerrain.play.src='img/bg_niveau1.png';
    tailleBackgroundMax = 800;
  }
  else if(niveau==2)
  {
    appearTimer = 50;
    scoreRequis = 15*difficulte;
    vitesse = 8*v;
    gravite = 2*p;
    esquive = 3*m;
    imgTerrain.play.src='img/bg_niveau2.png';
    tailleBackgroundMax = 800;
  }
  else if(niveau==3)
  {
    appearTimer = 45;
    scoreRequis = 15*difficulte;
    vitesse = 9*v;
    gravite = 3*p;
    esquive = 3*m;
    imgTerrain.play.src='img/bg_niveau3.png';
    tailleBackgroundMax = 800;
  }
  else if(niveau==4)
  {
    appearTimer = 40;
    scoreRequis = 20*difficulte;
    vitesse = 10*v;
    gravite = 3*p;
    esquive = 1*m;
    imgTerrain.play.src='img/bg_niveau4.png';
    tailleBackgroundMax = 800;
  }
  //***********************************
  
  
  //initialization of images
  imgTerrain.fini.src='img/StarBackground.jpg';
  imgTerrain.perdu.src='';
  imgTerrain.crash.src='';
  
  //typeImages.vaisseau.src='../img/vaisseaux.png';
  typeImages.obstacle.src='img/meteorites.png';
  typeImages.bonusRing1.src='img/rings2.png';

  
  //get the canvas from html
  canvasJeu = document.getElementById("myCanvas");
  
  //context creation
  contextJeu = canvasJeu.getContext("2d");
  
  //score bar creation
  scoreBarre = new ScoreBarre(0,0,canvasJeu.width,40,1); 
  
  //limit top and down represent the limits of generation of obstacles and navigation of the ship
  limiteTop = scoreBarre.getHeight();
  limiteDown = canvasJeu.height-30;
  
  monVaisseau = new Vaisseau(50, limiteTop+100, 70, 50); //creation of vessel
  
  //initializing the list of obstacles
  mesObstacles = new Obstacles();
  
  //list initialization bonus
  mesBonus = new BonusArray();
  

  
  myInterval = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000/60);
    };
  })();
  
  window.requestAnimationFrame = myInterval;


  //stop=0;
  pause = 0;
  play = 1;
  
  //sound effects of the reactor vessel
  reactor = document.getElementById('reactor');
  piece = document.getElementById('piece');
  boom = document.getElementById('boom');
  
}
//***********************************************************************************


//Function that marks the beginning of the game
function start(){
  
  //remove menu listeners 
  removeAllListener();
  
  //listener is added the game
  ajoutListener();
  
  //change the size and scoreBarre limiteDown
  scoreBarre.width = canvasJeu.width;
  limiteDown = canvasJeu.height-30;

  //Time management game and deffilement ground
  if(play)
  {
    nbToursStart++;
    if(nbToursStart==20)
    {
      tempsJeu++;
      nbToursStart=0;
    }
    
    //Defilement of the land management
    cptBackground++;
    if(cptBackground==1)
    {
      if(cadreTerrainGauche+cadreTerrainDroit<tailleBackgroundMax)
      {
        cadreTerrainGauche = cadreTerrainGauche + 1;
      }
    cptBackground=0;
    }
  }
  
  
  //clear le canvas
  contextJeu.clearRect(0, 0, canvasJeu.width, canvasJeu.height);//we refreshed our canvas
  
  //the creation of the land and the ship
  creerTerrain();

    if(pause)
    {
      play = 0;
      pauseJeu();
    }
    if(collision)
    {
      play=0;
      stop=1;
      niveauFini = false;
      reactor.pause();
      reactor.currentTime = 0;
      stopJeu();
    }
    else if(stop!=1 && pause!=1)//if the game is not paused or Stopp
    {
      //moving obstacles and bonuses
      mooveObstacle();
      mooveBonus();
      
      //management bonus appearances
      if(appearTimerBonus--<0){
        mesBonus.add(generateBonus(limiteDown-30,limiteTop));
        appearTimerBonus=appearTimer+40;
      }
      
      //Management appearances obstacles
      if(appearTimerObstacle--<0 && score<scoreRequis+1){
        mesObstacles.add(generateObstacle(limiteDown-30,limiteTop));
        appearTimerObstacle=appearTimer;
      }
      else if(score>=scoreRequis && mesObstacles.getNb()==0)
      {
        niveauFini = true;
        stop = 1;
        play = 0;
      }
      
      attractionTerrestre();
        
      //we test the collision
      testCollision();
      testCollisionBonus();
  
      if(etatSon)
      {
        reactor.play();
      }
    }
    else if(stop==1)
    {
      reactor.pause();
      reactor.currentTime = 0;
      stopJeu();
    
    }
    
    
  

  requestAnimationFrame(start);
  
}
//***********************************************************************************


//Function to have a sleep
function sleep(time)
{
  
  d=new Date();
  diff=0;
    while(diff < time)
    {
      n=new Date();
      diff=n-d;
    } 
}
//***********************************************************************************

//Function to return a new obstacle with randoms parameters
function generateObstacle(max,min)
{
  
  var obstacle;
  var x = canvasJeu.width;
  var y = Math.floor(Math.random() * (max - min +1)) + min;
  var w = 40;//typeImages.obstacle.width;
  var h = 40;//typeImages.obstacle.height;
  
  obstacle = new Obstacle(x,y,w,h);

  return obstacle;
}
//***********************************************************************************


//Function for moving obstacles
function mooveObstacle()
{
  for(var i = 0 ; i < mesObstacles.getNb() ; i++){
    mesObstacles.get(i).posX-=vitesse;
    if(mesObstacles.get(i).posX<-50){
      mesObstacles.array.splice(i, 1);
    }
  }
}
//***********************************************************************************

//Function to return a new bonus with randoms parameters
function generateBonus(max,min)
{
  
  var bonus;
  var x = canvasJeu.width;
  var y = Math.floor(Math.random() * (max - min +1)) + min;
  var w = 20;//typeImages.obstacle.width;
  var h = 20;//typeImages.obstacle.height;
  
  bonus = new Bonus(x,y,w,h);

  return bonus;
}
//***********************************************************************************


//Function to manage the movement bonus
function mooveBonus()
{
  for(var i = 0 ; i < mesBonus.getNb() ; i++){
    mesBonus.get(i).posX-=vitesse;
    if(mesBonus.get(i).posX<-50){
      mesBonus.array.splice(i, 1);
    }
  }

}
//***********************************************************************************

//Function for an alternate color
function randomColor()
{
  var couleur = "";
  var numCouleur = Math.floor(Math.random()*10);
  
  switch(numCouleur)
  {
    case 0 : couleur="cyan"; break;
    case 1 : couleur="red"; break;
    case 2 : couleur="green"; break;
    case 3 : couleur="blue"; break;
    case 4 : couleur="orange"; break;
    case 5 : couleur="brown"; break;
    case 6 : couleur="grey"; break;
    case 7 : couleur="purple"; break;
    case 8 : couleur="gold"; break;
    case 9 : couleur="white"; break;
  }

  return couleur;

}
//***********************************************************************************

//Function that create the ground and the ship
function creerTerrain()
{
  //resizing of fonts
  taillePolice();
  
  //background
  contextJeu.drawImage(imgTerrain.play, cadreTerrainGauche, 0, cadreTerrainDroit, imgTerrain.play.height, 0, 0, canvasJeu.width, canvasJeu.height);
  
  //bar score
  dessiner("scoreBarre",scoreBarre.getPosX(),scoreBarre.getPosY(),scoreBarre.getWidth(),scoreBarre.getHeight());
  
  //best score
  dessiner("bestScore",5,scoreBarre.getPosY()+30,"","");
  
  //score
  contextJeu.font=petitCaractere+"px gameOver";
  contextJeu.fillStyle="red";
  contextJeu.fillText("Score : ",emplacementDynamique(26),scoreBarre.getPosY()+35);
  dessiner("score",emplacementDynamique(52),scoreBarre.getPosY()+30,"","");
  
  //scoreBonus
  if(canvasJeu.width<480)
  {
    dessiner("scoreBonus",emplacementDynamique(66),scoreBarre.getPosY()+10,30,25);
  }
  else
  {
    dessiner("scoreBonus",scoreBarre.getWidth()-emplacementDynamique(10),scoreBarre.getPosY()+10,30,25);
  }
  
  //outline of the game
  contextJeu.strokeStyle="black";
  contextJeu.strokeRect(0,0,canvasJeu.width, canvasJeu.height);
  
  //draw obstacles
  for (var i = 0 ; i < mesObstacles.getNb() ; i++){
    dessiner("obstacle",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
    
    if(mesObstacles.get(i).phase<5)
    {
      dessiner("obstacle1",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
      mesObstacles.get(i).phase++;
    }
    else if(mesObstacles.get(i).phase>4 && mesObstacles.get(i).phase<10)
    {
      dessiner("obstacle2",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
      mesObstacles.get(i).phase++;
    }
    else if(mesObstacles.get(i).phase>9 && mesObstacles.get(i).phase<16)
    {
      dessiner("obstacle3",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
      mesObstacles.get(i).phase++;
    }
    else if(mesObstacles.get(i).phase>15 && mesObstacles.get(i).phase<20)
    {
      dessiner("obstacle4",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
      mesObstacles.get(i).phase++;
    }
    else if(mesObstacles.get(i).phase>19 && mesObstacles.get(i).phase<25)
    {
      dessiner("obstacle5",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
      mesObstacles.get(i).phase++;
    }
    else if(mesObstacles.get(i).phase>24 && mesObstacles.get(i).phase<30)
    {
      dessiner("obstacle6",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
      mesObstacles.get(i).phase++;
    }
    else if(mesObstacles.get(i).phase>29)
    {
      dessiner("obstacle7",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
      mesObstacles.get(i).phase=0;
    }
    
  }
  
  //draw bonus
  for (var i = 0 ; i < mesBonus.getNb() ; i++){
    if(mesBonus.get(i).phase<7)
    {
      dessiner("bonus1",mesBonus.get(i).getPosX(),mesBonus.get(i).getPosY(),mesBonus.get(i).getWidth(),mesBonus.get(i).getHeight());
      mesBonus.get(i).phase++;
    }
    else if(mesBonus.get(i).phase>6 && mesBonus.get(i).phase<14)
    {
      dessiner("bonus2",mesBonus.get(i).getPosX(),mesBonus.get(i).getPosY(),mesBonus.get(i).getWidth(),mesBonus.get(i).getHeight());
      mesBonus.get(i).phase++;
    }
    else if(mesBonus.get(i).phase>13 && mesBonus.get(i).phase<21)
    {
      dessiner("bonus3",mesBonus.get(i).getPosX(),mesBonus.get(i).getPosY(),mesBonus.get(i).getWidth(),mesBonus.get(i).getHeight());
      mesBonus.get(i).phase++;
    }
    else if(mesBonus.get(i).phase>20)
    {
      dessiner("bonus4",mesBonus.get(i).getPosX(),mesBonus.get(i).getPosY(),mesBonus.get(i).getWidth(),mesBonus.get(i).getHeight());
      mesBonus.get(i).phase=0;
    }
  }
  
  //draw ship
  dessiner("vaisseau",monVaisseau.getPosX(),monVaisseau.getPosY(),monVaisseau.getWidth(),monVaisseau.getHeight());
  
  //Button pause
  contextJeu.font=grandCaractere+"px gameOver";
  contextJeu.fillStyle="red";
  contextJeu.fillText("Pause",canvasJeu.width - (grandCaractere*8),limiteDown);// sera remplacé par un bouton pause

}
//***********************************************************************************

//function for stop the game
function stopJeu()
{
  mesObstacles.removeAll();
  
  if(niveauFini)
  {  
    contextJeu.drawImage(imgTerrain.fini, 0, 0, canvasJeu.width, canvasJeu.height);//arriere plan
    contextJeu.fillStyle=randomColor();
    var gpx = (grandCaractere*2)-10;
    var ppx = petitCaractere - 4;
    contextJeu.font=gpx+"px gameOver";
    if(canvasJeu.width<400)
    {
      contextJeu.fillText("LEVEL "+niveau+" CLEAR",(canvasJeu.width/2)-emplacementDynamique(20),emplacementDynamique(15));
    }
    else
    {
      contextJeu.fillText("LEVEL "+niveau+" CLEAR",(canvasJeu.width/2)-emplacementDynamique(28),emplacementDynamique(15));
    }
    
    if(niveau+1<5)
    {
      contextJeu.fillStyle="white";
      contextJeu.font=ppx+"px gameOver";
      if(canvasJeu.width<400)
      {
        contextJeu.fillText("Touch the screen to play next level",(canvasJeu.width/2)-emplacementDynamique(24),emplacementDynamique(24));
      }
      else
      {
        contextJeu.fillText("Touch the screen to play next level",(canvasJeu.width/2)-emplacementDynamique(33),emplacementDynamique(24));
      }
    }
    else
    {
      scoreBonus = 0;
      contextJeu.fillStyle="white";
      contextJeu.font=ppx+"px gameOver";
      if(canvasJeu.width<400)
      {
        contextJeu.fillText("CONGRATULATION, you won this game!",(canvasJeu.width/2)-emplacementDynamique(22),emplacementDynamique(24));
      }
      else
      {
        contextJeu.fillText("CONGRATULATION, you won this game!",(canvasJeu.width/2)-emplacementDynamique(30),emplacementDynamique(24));
      }
    }
  }
  
  else if(collision)
  {
    contextJeu.fillStyle="yellow";
    contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
    contextJeu.fillStyle="black";
    var px = grandCaractere*3
    contextJeu.font=px+"px gameOver";
    contextJeu.fillText("CRASH",(canvasJeu.width/2)-emplacementDynamique(25),canvasJeu.height/2);
    contextJeu.font=grandCaractere+"px gameOver";
    contextJeu.fillText("menu",(canvasJeu.width/2)-emplacementDynamique(25),(canvasJeu.height/2)+emplacementDynamique(10));
    contextJeu.font=grandCaractere+"px gameOver";
    contextJeu.fillText("rejouer",(canvasJeu.width/2)+emplacementDynamique(6),(canvasJeu.height/2)+emplacementDynamique(10));
    stop=1;
    play = 0;
    scoreBonus = 0;
  }
  else if(stop)
  {
    contextJeu.save();
    contextJeu.fillStyle="black";
    contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
    contextJeu.fillStyle="red";
    var px = grandCaractere*2;
    contextJeu.font=px+"px gameOver";
    contextJeu.fillText("GAME OVER",(canvasJeu.width/2)-emplacementDynamique(28),(canvasJeu.height/2));
    contextJeu.restore();
    stop = 1;
    play = 0;
    scoreBonus = 0;
    gameOver=true;
  }
}
//***********************************************************************************

//Function that simulates the Land attraction
function attractionTerrestre()
{
  var bool;
  var tailleVaisseau = monVaisseau.getHeight();
  var tailleTerrain = canvasJeu.height;
  var endroitCle = (tailleTerrain-tailleVaisseau);
  
  if(monVaisseau.getPosY()>=endroitCle || monVaisseau.getPosY()<=limiteTop-10)
  {
    bool=false;
    stop=1;
    play=0;
  }
  else
  {
    var nb = monVaisseau.getPosY();
    nb = nb + gravite;
    monVaisseau.setPosY(nb);
  }

}
//***********************************************************************************

//function add listener
function ajoutListener()
{
  window.addEventListener("mousedown", eventAction, false);
  window.addEventListener("touchstart", eventAction, false);

}
//***********************************************************************************

//Function that removes the listener on canvas
function supprimerListener()
{
  window.removeEventListener("mousedown", eventAction, false);
  window.removeEventListener("touchstart", eventAction, false);

}
//***********************************************************************************

//Function that defines the behavior after the execution of a listener on the canvas
function eventAction(e)
{
  var event = e;
  var x=event.pageX;
    y=event.pageY;
    
  if(!niveauFini && !pause && !gameOver && !collision)
  {
    if( (x >= canvasJeu.width - (grandCaractere*8) &&  x <= canvasJeu.width ) && (y >= limiteDown-30 && y <= canvasJeu.height ))
    {  
      pause=1;
      pauseJeu();
    
    }
    else
    {  
      var i=0;
      while(i<=10)
      {
        var y = monVaisseau.getPosY();
        y = y-esquive;
        monVaisseau.setPosY(y);
        i++;
      }
    }
  }
  else if(pause) //action if the game is paused
  {
    pause = 0;
    pauseJeu();
  }
  else if(niveauFini) //action if the game is finished
  {

    if(niveau+1<5)
    {
      stop=0;
      play=1;
      niveau++;
      niveauFini=false;
      init();
      sleep(1500);
    }
    else
    {
      stop=0;
      play=0;
      niveau=0;
      scoreBonus=0;
      stateMenuSelected=0;
      sleep(1000);
      fenetre();
    }
  
  }
  else if(gameOver)
  {
    stop=0;
    play=0;
    niveau=0;
    scoreBonus=0;
    stateMenuSelected=0;
    sleep(1000);
    fenetre();
  
  }
  else if(collision)
  {  
	//if menu was clicked
    if( ( x >= ( (canvasJeu.width/2)-emplacementDynamique(25) ) &&  x <= ( (canvasJeu.width/2)-emplacementDynamique(10) ) ) && ( y >= ((canvasJeu.height/2)+emplacementDynamique(8)) && y <= ((canvasJeu.height/2)+emplacementDynamique(10))) )
    {  
      collision=false;
      stop=0;
      play=0;
      niveau=0;
      scoreBonus=0;
      stateMenuSelected=0;
      sleep(1000);
      fenetre();
    } //else if replay click
    else if( ( x >= ( (canvasJeu.width/2)+emplacementDynamique(6) ) &&  x <= ( (canvasJeu.width/2)+emplacementDynamique(25) ) ) && ( y >= ((canvasJeu.height/2)+emplacementDynamique(8)) && y <= ((canvasJeu.height/2)+emplacementDynamique(10))) )
    {  
      collision=false;
      stop=0;
      sleep(1000);
      init();
    }
    
 
  }

}
//***********************************************************************************

//Function that manages the scoring
function gererScore()
{
  var temps = 0;
  var coefficient = scoreBarre.getCoeff();
  var scoreTmp;
  
  temps=tempsJeu;
  scoreTmp=Math.floor(temps*coefficient);
  
  score = scoreTmp;
  
  return score;
  

}
//***********************************************************************************


//Function to store the best distance
function saveBestScore()
{
   if (eval(score) > getBestScore()) {
            localStorage.bestScore = eval(score);
         }
  return eval(localStorage.bestScore);
}
//***********************************************************************************

//Function to retrieve the best distance
function getBestScore() {
      return eval(localStorage.bestScore);
}
//***********************************************************************************

//Function to test if there was a collision with an obstacle
function testCollision(){
    
    //for each obstacle (visible)
    for(i=0;i<mesObstacles.getNb();i++)
    {
      var obstacleEnCours = mesObstacles.get(i);
      var largeurObstacleEnCours = obstacleEnCours.getWidth();
      var hauteurObstacleEnCours = obstacleEnCours.getHeight();
      var xObstacleEnCours = obstacleEnCours.getPosX();
      var yObstacleEnCours = obstacleEnCours.getPosY();
      var xVaisseau = monVaisseau.getPosX();
      var yVaisseau = monVaisseau.getPosY();
      var largeurVaisseau = monVaisseau.getWidth();
      var hauteurVaisseau = monVaisseau.getHeight();
      
      //if the vessel is susceptible to have the same y-coordinate as the obstacle
      if(yObstacleEnCours >= (yVaisseau - hauteurObstacleEnCours - 5) && yObstacleEnCours <= (yVaisseau + hauteurVaisseau - 5))
      {
        //if the vessel is susceptible to have the same x-coordinate as the obstacle
        if(xObstacleEnCours >= (xVaisseau - largeurObstacleEnCours - 5) && xObstacleEnCours <= (xVaisseau + largeurVaisseau - 5))
        {
          collision = true;
          boom.play();
          return collision;
        }
        else
        {
          collision = false;
        }
      
      }
      //if the vessel is susceptible to have the same x-coordinate as the obstacle
      else if(xObstacleEnCours >= (xVaisseau - largeurObstacleEnCours - 5) && xObstacleEnCours <= (xVaisseau + largeurVaisseau - 5))
      {
        //if the vessel is susceptible to have the same y-coordinate as the obstacle
        if(yObstacleEnCours >= (yVaisseau - hauteurObstacleEnCours - 5) && yObstacleEnCours <= (yVaisseau + hauteurVaisseau - 5))
        {
          collision = true;
          boom.play();
          return collision;
        }
        else
        {
          collision = false;
        }
      
      
      }
      else
      {
        collision = false;
      }
    
    
    }

    return collision;
}
//***********************************************************************************

//Function to test if there was a collision with a Bonus
function testCollisionBonus(){
    
    //for each canvas(visible)
    for(i=0;i<mesBonus.getNb();i++)
    {
      var bonusEnCours = mesBonus.get(i);
      var largeurBonusEnCours = bonusEnCours.getWidth();
      var hauteurBonusEnCours = bonusEnCours.getHeight();
      var xBonusEnCours = bonusEnCours.getPosX();
      var yBonusEnCours = bonusEnCours.getPosY();
      var xVaisseau = monVaisseau.getPosX();
      var yVaisseau = monVaisseau.getPosY();
      var largeurVaisseau = monVaisseau.getWidth();
      var hauteurVaisseau = monVaisseau.getHeight();
      
      //if the vessel is susceptible to have the same y-coordinate as the obstacle
      if(yBonusEnCours >= (yVaisseau - hauteurBonusEnCours - 5) && yBonusEnCours <= (yVaisseau + hauteurVaisseau - 5))
      {
        //if the vessel is susceptible to have the same x-coordinate as the obstacle
        if(xBonusEnCours >= (xVaisseau - largeurBonusEnCours - 5) && xBonusEnCours <= (xVaisseau + largeurVaisseau - 5))
        {
          collisionBonus = true;
          mesBonus.array.splice(i,1);
          scoreBonus++;
          piece.play();
          return collisionBonus;
        }
        else
        {
          collisionBonus = false;
        }
      
      }
      //if the vessel is susceptible to have the same x-coordinate as the obstacle
      else if(xBonusEnCours >= (xVaisseau - largeurBonusEnCours - 5) && xBonusEnCours <= (xVaisseau + largeurVaisseau - 5))
      {
        //if the vessel is susceptible to have the same y-coordinate as the obstacle
        if(yBonusEnCours >= (yVaisseau - hauteurBonusEnCours - 5) && yBonusEnCours <= (yVaisseau + hauteurVaisseau - 5))
        {
          collisionBonus = true;
          mesBonus.array.splice(i,1);
          scoreBonus++;
          
          if(etatSon)
          {
            piece.play();
          }
          
          return collisionBonus;
        }
        else
        {
          collisionBonus = false;
        }
      
      
      }
      else
      {
        collisionBonus = false;
      }
    
    
    }//fin pour

      
    return collisionBonus;
}
//***********************************************************************************


//Function to manage the break
function pauseJeu()
{
  
  if(pause==1)
  {
    play = 0;
    
    reactor.pause();
    reactor.currentTime = 0;
    
    //freeze all objects
    monVaisseau.setPosY(monVaisseau.getPosY());
  
    for(var i = 0 ; i < mesObstacles.getNb() ; i++){
      mesObstacles.get(i).setPosX(mesObstacles.get(i).getPosX());
    }
  
    //add a gray canvas with reduced opacity
    creerTerrain();
    contextJeu.fillStyle = "rgba(50, 50, 50, 0.8)";
    contextJeu.fillRect(0,0,canvasJeu.width, canvasJeu.height);
    
    var px = grandCaractere*3;
    contextJeu.font=px+"px gameOver";
    contextJeu.fillStyle="white";
    contextJeu.fillText("Pause",(canvasJeu.width/2)-emplacementDynamique(25),(canvasJeu.height/2)+emplacementDynamique(5));// sera remplacé par un bouton pause
  }
  else if(pause==0)
  {
    play = 1;
    creerTerrain();
  
  }

}
//***********************************************************************************


//Function adapting the font size Wallpapers
function taillePolice()
{

  //SETTING coefs size
  var coefWidth = canvasJeu.width;
  var coefHeight = canvasJeu.height;
  
  //pour coef width
  if(coefWidth > 480)
  {
    coefWidth = 5;
  }
  else if(coefWidth > 320)
  {
    coefWidth = 4
  }
  else if(coefWidth > 240)
  {
    coefWidth = 3;
  }
  else
  {
    coefWidth = 2;
  }
  
  //SETTING coeffs hight
  if(coefHeight > 480)
  {
    coefHeight = 5;
  }
  else if(coefHeight > 320)
  {
    coefHeight = 4
  }
  else if(coefHeight > 240)
  {
    coefHeight = 3;
  }
  else
  {
    coefHeight = 2;
  }
  
  //SETTING sizes
  grandCaractere = coefWidth*coefHeight;
  
  //SETTING sizes
  petitCaractere = grandCaractere - 2;

}
//***********************************************************************************

//A function to using the font size to return a dynamic location
function emplacementDynamique(x)
{
  var emplacement;
  
  emplacement = Math.floor(x *(petitCaractere / 2));
  
  return emplacement;
}
//***********************************************************************************