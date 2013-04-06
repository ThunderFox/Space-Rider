/* global variables */
var compteurImagesChargees = 0;
var compteurImagesTotales = 0;
var canvas;
var contextJeu;
//determines the position of the element in the canvas
var canvasLeft;
var canvasTop;
var imageback=new Image(); //menu background
var bplay=new Image();//play button
var bOption=new Image();//option button
var bEasy=new Image();//easy button
var bMedium=new Image();//medium button
var bHard=new Image();//hard button
var bBack=new Image();//back button
var bOn=new Image();//button On sound
var bOff=new Image();//button Off sound
var titre = new Image();//title image
var title_settings = new Image();//title image options
var image_on = new Image();//image sound on
var image_off = new Image();//image sound off
var sound = new Image();//image sound
var mode_select = new Image();//image selection mode
var ship_selection = new Image();//image title ships
var button_ship_1 = new Image();//icons for select his ship
var button_ship_2 = new Image();
var button_ship_3 = new Image();
var button_ship_4 = new Image();

//Defining sizes and positions
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var baseRatio = 600;
//Ratio to adapt the size of the game screen resolution
var ratioSize = ((windowWidth/2)/baseRatio)+0.6; 
if(ratioSize <= 0.8){ratioSize = 0.8} //Minimum ratio in case of small screen resolution
else if(ratioSize >= 2){ratioSize = 2} //Maximum ratio
var canvasWidth = 600*ratioSize;
var canvasHeight = 400*ratioSize;
var TimageLong=230*ratioSize;
var TimageLarg=40*ratioSize, TimageLargBack=30*ratioSize;//size main menu buttons
var ModLong=160*ratioSize;
var ModLarg=50*ratioSize;
var music = document.getElementById('music');//menu music
//coordinates back button
var bBackCoordsY=330*ratioSize, bBackCoordsX=180*ratioSize;
//position of the main menu buttons
var titleSizeX=440*ratioSize, titleSizeY=50*ratioSize;
var titreCoordsY=90*ratioSize , titreCoordsX=75*ratioSize;
var bPlayCoordsY=210*ratioSize, bPlayCoordsX=180*ratioSize;
var b0ptionCoordsY=290*ratioSize,bOptionsCoordsX=180*ratioSize;
//position of menu buttons difficulty
var modeSizeX=300*ratioSize, modeSizeY=32*ratioSize;
var modeSelectX=150*ratioSize, modeSelectY=60*ratioSize;
var bEasyCoordsY=120*ratioSize, bEasyCoordsX=220*ratioSize;
var bMediumCoordsY=180*ratioSize, bMediumCoordsX=220*ratioSize;
var bHardCoordsY=240*ratioSize, bHardCoordsX=220*ratioSize;
//position des boutons menu setting
var settingSizeX=300*ratioSize, settingSizeY=32*ratioSize;
var settingsX=155*ratioSize, settingsY=60*ratioSize;
var soundSizeX=110*ratioSize, soundSizeY=28*ratioSize;
var settingSoundX=250*ratioSize, settingSoundY=130*ratioSize;
var bOnCoordsY=170*ratioSize, bOnCoordsX=265*ratioSize;
var bOffCoordsY=240*ratioSize, bOffCoordsX=265*ratioSize;
var TSoundImageLong=80*ratioSize, TSoundImageLarg=60*ratioSize;
//position setting menu buttons
var shipTitleCoordX=140*ratioSize,shipTitleCoordY=65*ratioSize;
var shipTitleSizeX=330*ratioSize, shipTitleSizeY=35*ratioSize;
var ship1CoordsY=135*ratioSize, ship1CoordsX=20*ratioSize;
var ship2CoordsY=135*ratioSize, ship2CoordsX=165*ratioSize;
var ship3CoordsY=135*ratioSize, ship3CoordsX=305*ratioSize;
var ship4CoordsY=135*ratioSize, ship4CoordsX=450*ratioSize;
var TShipImageLong=140*ratioSize, TShipImageLarg=150*ratioSize;//thumbnail size "ship"

var selectSong= 0; //can manage the sound

//differents states of the menu
var stateMenu = {
  menuPrincipal : 0,
  menuDifficultes : 1,
  menuSettings : 2,
  menuChoiceShip :3
}

var stateMenuSelected = 0;//allows to select the menu

/**********************************
uploading images  
**********************************/

bplay.src='./img/menus/button_play.png';
compteurImagesTotales++;
bplay.onload = function(){
  compteurImagesChargees++;
};

bOption.src='./img/menus/button_settings.png';
compteurImagesTotales++;
bOption.onload = function(){
  compteurImagesChargees++;
};

titre.src = './img/menus/title.png';
compteurImagesTotales++;
titre.onload = function(){
  compteurImagesChargees++;
};

mode_select.src = './img/menus/mode_select.png';
compteurImagesTotales++;
mode_select.onload = function(){
  compteurImagesChargees++;
};

bEasy.src='./img/menus/easy.png';
compteurImagesTotales++;
bEasy.onload = function(){
  compteurImagesChargees++;
};

bMedium.src='./img/menus/medium.png';
compteurImagesTotales++;
bMedium.onload = function(){
  compteurImagesChargees++;
};

bHard.src='./img/menus/hard.png';
compteurImagesTotales++;
bHard.onload = function(){
  compteurImagesChargees++;
};

bBack.src='./img/menus/button_back.png';
compteurImagesTotales++;
bBack.onload = function(){
  compteurImagesChargees++;
};  

bOn.src='./img/menus/button_on.png';
compteurImagesTotales++;
bOn.onload = function(){
  compteurImagesChargees++;
};

bOff.src='./img/menus/button_off.png';
compteurImagesTotales++;
bOff.onload = function(){
  compteurImagesChargees++;
};

imageback.src = './img/menus/back.png';
compteurImagesTotales++;
imageback.onload = function(){
  compteurImagesChargees++;
};

title_settings.src = './img/menus/title_settings.png';
compteurImagesTotales++;
title_settings.onload = function(){
  compteurImagesChargees++;
};

sound.src = './img/menus/sound.png';
compteurImagesTotales++;
sound.onload = function(){
  compteurImagesChargees++;
};

ship_selection.src = './img/menus/ship_selection.png';
compteurImagesTotales++;
ship_selection.onload = function(){
  compteurImagesChargees++;
};

button_ship_1.src = './img/menus/button_ship_1.png';
compteurImagesTotales++;
button_ship_1.onload = function(){
  compteurImagesChargees++;
};

button_ship_2.src = './img/menus/button_ship_2.png';
compteurImagesTotales++;
button_ship_2.onload = function(){
  compteurImagesChargees++;
};

button_ship_3.src = './img/menus/button_ship_3.png';
compteurImagesTotales++;
button_ship_3.onload = function(){
  compteurImagesChargees++;
};

button_ship_4.src = './img/menus/button_ship_4.png';
compteurImagesTotales++;
button_ship_4.onload = function(){
  compteurImagesChargees++;
}


/*browser compatibility checks*/
var myInterval = (function() {
  return window.requestAnimationFrame ||
     window.mozRequestAnimationFrame ||
       window.webkitRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(callback) {
    window.setTimeout(callback, 1000/60);
     };
})();

window.requestAnimationFrame = myInterval;

/*initialize the position of the buttons on the canvas*/
function init_posBouton(){

  //main menu
  bplay.width=bPlayCoordsX; 
  bplay.height=bPlayCoordsY;
  bOption.width=bOptionsCoordsX;
  bOption.height=b0ptionCoordsY;

  //level menu
  bEasy.width=bEasyCoordsX; 
  bEasy.height=bEasyCoordsY;
  bMedium.width=bMediumCoordsX;
  bMedium.height=bMediumCoordsY;
  bHard.width=bHardCoordsX;
  bHard.height=bHardCoordsY;

  //settings menu
  bOn.width=bOnCoordsX;
  bOn.height=bOnCoordsY;
  bOff.width=bOffCoordsX;
  bOff.height=bOffCoordsY;

  //ship menu
  button_ship_1.width=ship1CoordsX;
  button_ship_1.height=ship1CoordsY;
  button_ship_2.width=ship2CoordsX;
  button_ship_2.height=ship2CoordsY;
  button_ship_3.width=ship3CoordsX;
  button_ship_3.height=ship3CoordsY;
  button_ship_4.width=ship4CoordsX;
  button_ship_4.height=ship4CoordsY;

  //button back
  bBack.width=bBackCoordsX;
  bBack.height=bBackCoordsY;

  canvasLeft=canvasJeu.offsetLeft;
  canvasTop=canvasJeu.offsetTop;
}

/*Canvas propriete - preparation of canvas*/
function canvas_propriete() {

  canvasJeu = document.getElementById('myCanvas');
  contextJeu= canvasJeu.getContext('2d');
  canvasJeu.width = canvasWidth;
  canvasJeu.height = canvasHeight;
  init_posBouton();
  contextJeu.drawImage(imageback, 0, 0, canvasWidth, canvasHeight);

  }

/*Main menu*/
function menu_principal(){

  canvas_propriete();

  contextJeu.drawImage(titre, titreCoordsX, titreCoordsY, titleSizeX, titleSizeY);

  contextJeu.drawImage(bplay, bPlayCoordsX, bPlayCoordsY,TimageLong,TimageLarg);
  contextJeu.drawImage(bOption, bOptionsCoordsX, b0ptionCoordsY,TimageLong,TimageLarg);

  window.removeEventListener('click', listenerMenuSetting, false);
  window.removeEventListener("touchstart", listenerMenuSetting, false);
  window.removeEventListener('click', listenerMenuDifficulte, false);
  window.removeEventListener("touchstart", listenerMenuDifficulte, false);
  window.removeEventListener('click', listenerMenuChoiceShip, false);
  window.removeEventListener("touchstart", listenerMenuChoiceShip, false);
  window.addEventListener('click',listenerMenuPrincipal,false);
  window.addEventListener("touchstart", listenerMenuPrincipal, false);
  
}

/*Level difficulty menu*/
function menu_difficulte(){

  canvas_propriete();

  contextJeu.drawImage(mode_select, modeSelectX, modeSelectY, modeSizeX, modeSizeY);

  contextJeu.drawImage(bEasy, bEasyCoordsX, bEasyCoordsY,ModLong,ModLarg);
  contextJeu.drawImage(bMedium, bMediumCoordsX, bMediumCoordsY,ModLong,ModLarg);
  contextJeu.drawImage(bHard, bHardCoordsX, bHardCoordsY,ModLong,ModLarg);
  contextJeu.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);

  window.removeEventListener('click', listenerMenuPrincipal, false);
  window.removeEventListener("touchstart", listenerMenuPrincipal, false);
  window.removeEventListener('click', listenerMenuSetting, false);
  window.removeEventListener("touchstart", listenerMenuSetting, false);
  window.removeEventListener('click', listenerMenuChoiceShip, false);
  window.removeEventListener("touchstart", listenerMenuChoiceShip, false);
  window.addEventListener('click', listenerMenuDifficulte,false);
  window.addEventListener("touchstart", listenerMenuDifficulte, false);

}

/*Settings menu*/
function menu_setting() {

  canvas_propriete();

  contextJeu.drawImage(title_settings, settingsX, settingsY, settingSizeX, settingSizeY);
  contextJeu.drawImage(sound, settingSoundX,settingSoundY, soundSizeX, soundSizeY);

  contextJeu.drawImage(bOn, bOnCoordsX, bOnCoordsY,TSoundImageLong,TSoundImageLarg);
  contextJeu.drawImage(bOff, bOffCoordsX, bOffCoordsY,TSoundImageLong,TSoundImageLarg);
  contextJeu.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);

  window.removeEventListener('click', listenerMenuPrincipal, false);
  window.removeEventListener("touchstart", listenerMenuPrincipal, false);
  window.removeEventListener('click', listenerMenuDifficulte, false);
  window.removeEventListener("touchstart", listenerMenuDifficulte, false);  
  window.removeEventListener('click', listenerMenuChoiceShip, false);
  window.removeEventListener("touchstart", listenerMenuChoiceShip, false);
  window.addEventListener('click',listenerMenuSetting,false);
  window.addEventListener("touchstart", listenerMenuSetting, false);
  
}

/*Ship menu - allows the player to choose a ship*/
function menuChoiceShip() {

  canvas_propriete();

  contextJeu.drawImage(ship_selection,shipTitleCoordX,shipTitleCoordY,shipTitleSizeX,shipTitleSizeY);

  contextJeu.drawImage(button_ship_1,ship1CoordsX,ship1CoordsY,TShipImageLong,TShipImageLarg);
  contextJeu.drawImage(button_ship_2,ship2CoordsX,ship2CoordsY,TShipImageLong,TShipImageLarg);
  contextJeu.drawImage(button_ship_3,ship3CoordsX,ship3CoordsY,TShipImageLong,TShipImageLarg);
  contextJeu.drawImage(button_ship_4,ship4CoordsX,ship4CoordsY,TShipImageLong,TShipImageLarg);

  contextJeu.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);

  window.removeEventListener('click', listenerMenuPrincipal, false);
  window.removeEventListener("touchstart", listenerMenuPrincipal, false);
  window.removeEventListener('click', listenerMenuDifficulte, false);
  window.removeEventListener("touchstart", listenerMenuDifficulte, false);
  window.removeEventListener('click',listenerMenuSetting,false);
  window.removeEventListener("touchstart", listenerMenuSetting, false);
  window.addEventListener('click',listenerMenuChoiceShip,false);
  window.addEventListener("touchstart", listenerMenuChoiceShip, false);
  
}

/*Adding listener on the main menu*/
function listenerMenuPrincipal(event){

  var x=event.pageX - canvasLeft,
  y=event.pageY - canvasTop;

  /*************************
  Main menu buttons
  **************************/

  if( (bplay.width <= x &&  x <= bplay.width+TimageLong ) && 
  (bplay.height <= y && y <= bplay.height+TimageLarg)) {

  stateMenuSelected = 1;
  console.log("play clicke");

  }

  if( (bOption.width <= x &&  x <= bOption.width+TimageLong ) && 
  (bOption.height <= y && y <= bOption.height+TimageLarg )){

  stateMenuSelected = 2;
  console.log("option clicke");


  }
}

/*Adding listener on the difficulty menu*/
function listenerMenuDifficulte(event){

  var x=event.pageX - canvasLeft,
  y=event.pageY - canvasTop;

  /*************************
  Difficulty menu buttons
  **************************/

  if( (bEasy.width <= x &&  x <= bEasy.width+TimageLong ) && 
  (bEasy.height <= y && y <= bEasy.height+TimageLarg)) {

    console.log("easy clicke");
    stateMenuSelected = 3;

  }

  if( (bMedium.width <= x &&  x <= bMedium.width+TimageLong ) && 
    (bMedium.height <= y && y <= bMedium.height+TimageLarg )){

    console.log("medium clicke");
    stateMenuSelected = 3;

  }

  if( (bHard.width <= x &&  x <= bHard.width+TimageLong ) && 
    (bHard.height <= y && y <= bHard.height+TimageLarg )){

    console.log("hard clicke");
    stateMenuSelected = 3;

  }

  if( (bBack.width <= x &&  x <= bBack.width+TimageLong ) && 
    (bBack.height <= y && y <= bBack.height+TimageLarg )){

    stateMenuSelected = 0;
    console.log("back clicke");
    
  }
}

/*Adding listener on the settings menu*/
function listenerMenuSetting(event){

  var x=event.pageX - canvasLeft,
  y=event.pageY - canvasTop;

  /*************************
  Settings menu buttons
  **************************/

  if( (bOn.width <= x &&  x <= bOn.width+TimageLong ) && 
  (bOn.height <= y && y <= bOn.height+TimageLarg )){

    console.log("on clicke");
    selectSong=0;
  }

  if( (bOff.width <= x &&  x <= bOff.width+TimageLong ) && 
    (bOff.height <= y && y <= bOff.height+TimageLarg )){

    console.log("off clicke");
    selectSong=1;
  }

  if( (bBack.width <= x &&  x <= bBack.width+TimageLong ) && 
    (bBack.height <= y && y <= bBack.height+TimageLarg )){

    console.log("back2 clicke");
    stateMenuSelected = 0;

  }
  
}

/*Adding listener on the ship selection menu*/
function listenerMenuChoiceShip(event){

  var x=event.pageX - canvasLeft,
  y=event.pageY - canvasTop;

  /*************************
  Ship selection menu buttons 
  **************************/


  if( (bBack.width <= x &&  x <= bBack.width+TimageLong ) && 
    (bBack.height <= y && y <= bBack.height+TimageLarg )){

    console.log("back3 clicke");
    stateMenuSelected = 1;
  }

  if( (button_ship_1.width <= x &&  x <= button_ship_1.width+TShipImageLong ) && 
    (button_ship_1.height <= y && y <= button_ship_1.height+TShipImageLarg )){

    console.log("vaisseau button_ship_1 clike");
    selectSong=1;
    launchGame(1);

  }

  if( (button_ship_2.width <= x &&  x <= button_ship_2.width+TShipImageLong ) && 
    (button_ship_2.height <= y && y <= button_ship_2.height+TShipImageLarg )){

    console.log("vaisseau button_ship_2 clike");
    selectSong=1;
    launchGame(2);

  }

  if( (button_ship_3.width <= x &&  x <= button_ship_3.width+TShipImageLong ) && 
    (button_ship_3.height <= y && y <= button_ship_3.height+TShipImageLarg )){

    console.log("vaisseau button_ship_3 clike");
    selectSong=1;
    launchGame(3);

  }

  if( (button_ship_4.width <= x &&  x <= button_ship_4.width+TShipImageLong ) && 
    (button_ship_4.height <= y && y <= button_ship_4.height+TShipImageLarg )){

    console.log("vaisseau button_ship_4 clike");
    selectSong=1;
    launchGame(4);

  }

}

//allow to removes all listeners
function removeAllListener(){

  window.removeEventListener('click',listenerMenuPrincipal,false);
  window.removeEventListener('click', listenerMenuPrincipal, false);
  window.removeEventListener('click', listenerMenuSetting, false);
  window.removeEventListener('click', listenerMenuSetting, false);
  window.removeEventListener('click', listenerMenuDifficulte, false);
  window.removeEventListener('click', listenerMenuDifficulte, false);
  window.removeEventListener('click', listenerMenuChoiceShip, false);
  window.removeEventListener('click', listenerMenuChoiceShip, false);

}

/* Mainframe : main function */
function fenetre(){

  if(compteurImagesTotales==compteurImagesChargees){
    switch(stateMenuSelected){
    case 0 : menu_principal();
       break;
    case 1 : menu_difficulte();
       break;
    case 2 : menu_setting();
       break;
    case 3 : menuChoiceShip();
       break;
    }
    switch(selectSong){
    case 0 : music.play();
       break;
    case 1 : music.pause();
       music.currentTime = 0;
       break;
    }
  }
  requestAnimationFrame(fenetre);

}

fenetre();
