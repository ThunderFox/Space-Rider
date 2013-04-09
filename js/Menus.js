/* variables globales*/
var compteurImagesChargees = 0;
var compteurImagesTotales = 0;
var canvasJeu = document.getElementById('myCanvas');
var contextJeu = contextJeu= canvasJeu.getContext('2d');
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
var difficulty;
var num_ship;

var TimageLong;
var TimageLarg, TimageLargBack=30;//main menu size buttons
var ModLong=160;
var ModLarg=50;
var music = document.getElementById('music');//menu music

//coordinates back button
var bBackCoordsY, bBackCoordsX;

//position of the main menu buttons
var titleSizeX, titleSizeY;
var titreCoordsY, titreCoordsX;
var bPlayCoordsY, bPlayCoordsX;
var b0ptionCoordsY,bOptionsCoordsX;

//position of menu buttons difficulty
var modeSizeX, modeSizeY;
var modeSelectX, modeSelectY;
var bEasyCoordsY, bEasyCoordsX;
var bMediumCoordsY, bMediumCoordsX;
var bHardCoordsY, bHardCoordsX;

//position des boutons menu setting
var settingSizeX, settingSizeY;
var settingsX, settingsY;
var soundSizeX, soundSizeY;
var settingSoundX, settingSoundY;
var bOnCoordsY, bOnCoordsX;
var bOffCoordsY, bOffCoordsX;
var TSoundImageLong, TSoundImageLarg;

//position ships menu buttons
var shipTitleCoordX=140,shipTitleCoordY=65;
var shipTitleSizeX=330, shipTitleSizeY=35;
var ship1CoordsY=135, ship1CoordsX=20;
var ship2CoordsY=135, ship2CoordsX=165;
var ship3CoordsY=135, ship3CoordsX=305;
var ship4CoordsY=135, ship4CoordsX=450;
var TShipImageLong=140, TShipImageLarg=150;//thumbnail size "ship"



var selectSong= 0; // can manage the sound

//differents states of the menu
var stateMenu = {
  menuPrincipal : 0,
  menuDifficultes : 1,
  menuSettings : 2,
  menuChoiceShip :3
  }

var stateMenuSelected = 0;//allows to select the menu

/**********************************
ajout des images  
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

  canvasJeu.width = window.innerWidth;
  canvasJeu.height = window.innerHeight;

  init_posBouton();

  contextJeu.drawImage(imageback, 0, 0, canvasJeu.width, canvasJeu.height);

}

/*Main menu*/
function menu_principal(){
  
  canvas_propriete();
  
  //adaptation images according to the size of the canvas
  titleSizeX = Math.floor(canvasJeu.width  - 100);
  titleSizeY = Math.floor(canvasJeu.height / 8);
  
  TimageLong = Math.floor(canvasJeu.width / 3);
  TimageLarg = Math.floor(canvasJeu.height / 10);
  
  //Space Rider coordinates
  titreCoordsX=Math.floor((canvasJeu.width / 2) - (titleSizeX / 2) );
  titreCoordsY=Math.floor(20);
  
  //Play button coordinates
  bPlayCoordsX=Math.floor((canvasJeu.width / 2) - (TimageLong / 2) );
  bPlayCoordsY=Math.floor((canvasJeu.height / 2) - TimageLarg);
  
  //Settings button coordinates
  bOptionsCoordsX=Math.floor((canvasJeu.width / 2) - (TimageLong / 2) );
  b0ptionCoordsY=Math.floor((canvasJeu.height / 2) + TimageLarg);
  
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
  
  //size of the elements
  TimageLong = Math.floor(canvasJeu.width / 3);
  TimageLargBack = Math.floor(canvasJeu.height / 10);
  
  ModLong = Math.floor(canvasJeu.width / 3);
  ModLarg = Math.floor(canvasJeu.height / 10);
  
  modeSizeX = Math.floor(canvasJeu.width / 2);
  modeSizeY = Math.floor(canvasJeu.height / 8);
  
  
  //Select button coordinates
  modeSelectX=Math.floor((canvasJeu.width / 2) - (modeSizeX / 2) );
  modeSelectY=Math.floor(10);
  
  //bEasy button coordinates 
  bEasyCoordsX=Math.floor((canvasJeu.width / 2) - (ModLong / 2) );
  bEasyCoordsY=Math.floor(modeSelectY + modeSizeY + 20);
  
  //bMedium button coordinates
  bMediumCoordsX=Math.floor((canvasJeu.width / 2) - (ModLong / 2) );
  bMediumCoordsY=Math.floor(bEasyCoordsY + ModLarg + 10);
  
  //bHard button coordinates
  bHardCoordsX=Math.floor((canvasJeu.width / 2) - (ModLong / 2) );
  bHardCoordsY=Math.floor(bMediumCoordsY + ModLarg + 10);
  
  //back button coordinates
  bBackCoordsX=Math.floor((canvasJeu.width / 2) - (TimageLong / 2) );
  bBackCoordsY=Math.floor(canvasJeu.height - 100);
  if(bBackCoordsY < bHardCoordsY + ModLarg + 30)
  {
    bBackCoordsY=Math.floor(bHardCoordsY + ModLarg + 30);
  }
  


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
  
  //Elements size
  TimageLong = Math.floor(canvasJeu.width / 3);
  TimageLargBack = Math.floor(canvasJeu.height / 10);
  
  TSoundImageLong = Math.floor(canvasJeu.width / 6);
  TSoundImageLarg = Math.floor(canvasJeu.height / 7);
  
  settingSizeX = Math.floor((canvasJeu.width / 2) + 100);
  settingSizeY = Math.floor(canvasJeu.height / 8);
  
  soundSizeX = Math.floor(canvasJeu.width / 3);
  soundSizeY = Math.floor(canvasJeu.height / 10);
  
  //Settings button coordinates
  settingsX=Math.floor((canvasJeu.width / 2) - (settingSizeX / 2) );
  settingsY=Math.floor(30);
  
  //Sound button coordinates
  settingSoundX=Math.floor((canvasJeu.width / 2) - (soundSizeX / 2) );
  settingSoundY=Math.floor(50 + settingSizeY);
  
  //bouton On button coordinates
  bOnCoordsX=Math.floor((canvasJeu.width / 2) - (TSoundImageLong / 2) );
  bOnCoordsY=Math.floor(10 + settingSoundY + soundSizeY);
  
  //Off button coordinates
  bOffCoordsX=Math.floor((canvasJeu.width / 2) - (TSoundImageLong / 2) );
  bOffCoordsY=Math.floor(bOnCoordsY + TSoundImageLarg + 10);
  
  //back button coordinates
  bBackCoordsX=Math.floor((canvasJeu.width / 2) - (TimageLong / 2) );
  //bBackCoordsY=Math.floor((canvasJeu.height / 2) + 100 - TimageLarg);
  bBackCoordsY=Math.floor(canvasJeu.height - 100);
  if(bBackCoordsY < bOffCoordsY + TSoundImageLarg + 30)
  {
    bBackCoordsY=Math.floor(bOffCoordsY + TSoundImageLarg + 30);
  }
  
  
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
  
  //Elements size
  shipTitleSizeX = Math.floor(canvasJeu.width / 2);
  shipTitleSizeY = Math.floor(canvasJeu.height / 8);
  
  TShipImageLong = Math.floor(canvasJeu.width / 4);
  TShipImageLarg = Math.floor(canvasJeu.height / 3);
  
  TimageLong = Math.floor(canvasJeu.width / 3);
  TimageLargBack = Math.floor(canvasJeu.height / 10);
  
  //Selection coordinates
  shipTitleCoordX=Math.floor((canvasJeu.width / 2) - (shipTitleSizeX / 2) );
  shipTitleCoordY=Math.floor(10);
  
  //Ship 1 button coordinates
  ship1CoordsX=Math.floor(1);
  ship1CoordsY=Math.floor((canvasJeu.height / 2) - TShipImageLarg + 10);
  
  //Ship 2 button coordinates
  ship2CoordsX=Math.floor(1 + TShipImageLong);
  ship2CoordsY=Math.floor((canvasJeu.height / 2) - TShipImageLarg + 10);
  
  //Ship 3 button coordinates
  ship3CoordsX=Math.floor((canvasJeu.width / 2) + 1);
  ship3CoordsY=Math.floor((canvasJeu.height / 2) - TShipImageLarg + 10);
  
  //Ship 4 button coordinates
  ship4CoordsX=Math.floor((canvasJeu.width / 2) + 1 + TShipImageLong);
  ship4CoordsY=Math.floor((canvasJeu.height / 2) - TShipImageLarg + 10);
  
  //back button coordinates
  bBackCoordsX=Math.floor((canvasJeu.width / 2) - (TimageLong / 2) );
  //bBackCoordsY=Math.floor((canvasJeu.height / 2) + 100 - TimageLarg);
  bBackCoordsY=Math.floor(canvasJeu.height - 100);
  if(bBackCoordsY < ship4CoordsY + TShipImageLarg + 30)
  {
    bBackCoordsY=Math.floor(ship4CoordsY + TShipImageLarg + 30);
  }
  
  
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
    
    }

    if( (bOption.width <= x &&  x <= bOption.width+TimageLong ) && 
      (bOption.height <= y && y <= bOption.height+TimageLarg )){
      
      stateMenuSelected = 2;

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
    
      difficulty = 1;
      stateMenuSelected = 3;
  
    }

    if( (bMedium.width <= x &&  x <= bMedium.width+TimageLong ) && 
      (bMedium.height <= y && y <= bMedium.height+TimageLarg )){
    
      difficulty = 2;
      stateMenuSelected = 3;

    }

    if( (bHard.width <= x &&  x <= bHard.width+TimageLong ) && 
      (bHard.height <= y && y <= bHard.height+TimageLarg )){
    
      difficulty = 3;
      stateMenuSelected = 3;

    }
    
    if( (bBack.width <= x &&  x <= bBack.width+TimageLong ) && 
      (bBack.height <= y && y <= bBack.height+TimageLarg )){
    
       stateMenuSelected = 0;
   
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
    
      selectSong=0;
    }

    if( (bOff.width <= x &&  x <= bOff.width+TimageLong ) && 
      (bOff.height <= y && y <= bOff.height+TimageLarg )){
    
      selectSong=1;
    }

    if( (bBack.width <= x &&  x <= bBack.width+TimageLong ) && 
      (bBack.height <= y && y <= bBack.height+TimageLarg )){
    
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
    
      stateMenuSelected = 1;
    }
    
    if( (button_ship_1.width <= x &&  x <= button_ship_1.width+TShipImageLong ) && 
      (button_ship_1.height <= y && y <= button_ship_1.height+TShipImageLarg )){
  
      num_ship = 1;

    }
    
    if( (button_ship_2.width <= x &&  x <= button_ship_2.width+TShipImageLong ) && 
      (button_ship_2.height <= y && y <= button_ship_2.height+TShipImageLarg )){

      num_ship = 2;
    
    }
    
    if( (button_ship_3.width <= x &&  x <= button_ship_3.width+TShipImageLong ) && 
      (button_ship_3.height <= y && y <= button_ship_3.height+TShipImageLarg )){
    
      num_ship = 3;

    }
    
    if( (button_ship_4.width <= x &&  x <= button_ship_4.width+TShipImageLong ) && 
      (button_ship_4.height <= y && y <= button_ship_4.height+TShipImageLarg )){
    
      console.log("vaisseau button_ship_4 clike");

      num_ship = 4;
  
    }
    
    launchGame(selectSong,difficulty,num_ship);
}

//allow to removes all listeners
function removeAllListener() {

  window.removeEventListener('click',listenerMenuPrincipal,false);
  window.removeEventListener('click', listenerMenuPrincipal, false);
  window.removeEventListener('click', listenerMenuSetting, false);
  window.removeEventListener('click', listenerMenuSetting, false);
  window.removeEventListener('click', listenerMenuDifficulte, false);
  window.removeEventListener('click', listenerMenuDifficulte, false);
  window.removeEventListener('click', listenerMenuChoiceShip, false);
  window.removeEventListener('click', listenerMenuChoiceShip, false);
  
}

/* Mainframe : main function  */
function fenetre(){

  supprimerListener();
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
