/* variables globales*/
var compteurImagesChargees = 0;
var compteurImagesTotales = 0;
var canvas;
var contextJeu;
//permet de déterminer la position de l'élément dans le canvas
var canvasLeft;
var canvasTop;
var imageback=new Image(); //background du menu
var bplay=new Image();//bouton play
var bOption=new Image();//bouton option
var bEasy=new Image();//bouton easy
var bMedium=new Image();//bouton meduim
var bHard=new Image();//bouton hard
var bBack=new Image();//bouton back
var bOn=new Image();//bouton On sound
var bOff=new Image();//bouton Off sound
var titre = new Image();//image titre
var title_settings = new Image();//image titre options
var image_on = new Image();//image sound on
var image_off = new Image();//image sound off
var sound = new Image();//image sound
var mode_select = new Image();//image selection mode
var ship_selection = new Image();//image titre vaisseaux
var button_ship_1 = new Image();//icones servant à sélectionner son vaisseau
var button_ship_2 = new Image();
var button_ship_3 = new Image();
var button_ship_4 = new Image();
var TimageLong=230;
var TimageLarg=40, TimageLargBack=30;//taille image 
var ModLong=160;
var ModLarg=50;
var music = document.getElementById('music');//musique du menu
//coordonnées du bouton back
var bBackCoordsY=330, bBackCoordsX=180;
//position des boutons menu principal
var titreCoordsY=90 , titreCoordsX=75;
var bPlayCoordsY=210, bPlayCoordsX=180;
var b0ptionCoordsY=290,bOptionsCoordsX=180;
//position des boutons menu difficulte
var bEasyCoordsY=120, bEasyCoordsX=220;
var bMediumCoordsY=180, bMediumCoordsX=220;
var bHardCoordsY=240, bHardCoordsX=220;
//position des boutons menu setting
var bOnCoordsY=170, bOnCoordsX=265;
var bOffCoordsY=240, bOffCoordsX=265;
var TSoundImageLong=80, TSoundImageLarg=60;
//position des boutons menu vaisseaux
var shipTitleCoordX=140,shipTitleCoordY=65;
var ship1CoordsY=175, ship1CoordsX=20;
var ship2CoordsY=175, ship2CoordsX=165;
var ship3CoordsY=175, ship3CoordsX=305;
var ship4CoordsY=175, ship4CoordsX=450;
var TShipImageLong=140, TShipImageLarg=95;// taille des vignettes "vaisseau"

var selectSong= 0; // permet de gerer le son
//different etat du menu
var stateMenu = {
	menuPrincipal : 0,
	menuDifficultes : 1,
	menuSettings : 2,
	menuChoiceShip :3
	}

var stateMenuSelected = 0;//permet de selectionner le menu

/**********************************
ajout des images	
**********************************/

	bplay.src='./img_menu/button_play.png';
	compteurImagesTotales++;
	bplay.onload = function(){
		compteurImagesChargees++;
	};

	bOption.src='./img_menu/button_settings.png';
	compteurImagesTotales++;
	bOption.onload = function(){
		compteurImagesChargees++;
	};
	
	titre.src = './img_menu/title.png';
	compteurImagesTotales++;
	titre.onload = function(){
		compteurImagesChargees++;
	};

	mode_select.src = './img_menu/mode_select.png';
	compteurImagesTotales++;
	mode_select.onload = function(){
		compteurImagesChargees++;
	};
	
	bEasy.src='./img_menu/easy.png';
	compteurImagesTotales++;
	bEasy.onload = function(){
		compteurImagesChargees++;
	};
	
	bMedium.src='./img_menu/medium.png';
	compteurImagesTotales++;
	bMedium.onload = function(){
		compteurImagesChargees++;
	};
	
	bHard.src='./img_menu/hard.png';
	compteurImagesTotales++;
	bHard.onload = function(){
		compteurImagesChargees++;
	};
	
	bBack.src='./img_menu/button_back.png';
	compteurImagesTotales++;
	bBack.onload = function(){
		compteurImagesChargees++;
	};	
	
	bOn.src='./img_menu/button_on.png';
	compteurImagesTotales++;
	bOn.onload = function(){
		compteurImagesChargees++;
	};
	
	bOff.src='./img_menu/button_off.png';
	compteurImagesTotales++;
	bOff.onload = function(){
		compteurImagesChargees++;
	};

	imageback.src = './img_menu/back.png';
	compteurImagesTotales++;
	imageback.onload = function(){
		compteurImagesChargees++;
	};

	title_settings.src = './img_menu/title_settings.png';
	compteurImagesTotales++;
	title_settings.onload = function(){
		compteurImagesChargees++;
	};
	
	sound.src = './img_menu/sound.png';
	compteurImagesTotales++;
	sound.onload = function(){
		compteurImagesChargees++;
	};
	
	ship_selection.src = './img_menu/ship_selection.png';
	compteurImagesTotales++;
	ship_selection.onload = function(){
		compteurImagesChargees++;
	};

	button_ship_1.src = './img_menu/button_ship_1.png';
	compteurImagesTotales++;
	button_ship_1.onload = function(){
		compteurImagesChargees++;
	};
	
	button_ship_2.src = './img_menu/button_ship_2.png';
	compteurImagesTotales++;
	button_ship_2.onload = function(){
		compteurImagesChargees++;
	};
	
	button_ship_3.src = './img_menu/button_ship_3.png';
	compteurImagesTotales++;
	button_ship_3.onload = function(){
		compteurImagesChargees++;
	};
	
	button_ship_4.src = './img_menu/button_ship_4.png';
	compteurImagesTotales++;
	button_ship_4.onload = function(){
		compteurImagesChargees++;
	}

	
/*vérifie la compatibilité du navigateur*/
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

/*permet d'initaliser la position des boutons dans la canvas*/
function init_posBouton(){
	//menu principal
	bplay.width=bPlayCoordsX; 
	bplay.height=bPlayCoordsY;
	bOption.width=bOptionsCoordsX;
	bOption.height=b0ptionCoordsY;
	
	//menu difficulte
	bEasy.width=bEasyCoordsX; 
	bEasy.height=bEasyCoordsY;
	bMedium.width=bMediumCoordsX;
	bMedium.height=bMediumCoordsY;
	bHard.width=bHardCoordsX;
	bHard.height=bHardCoordsY;
	
	//menu setting
	bOn.width=bOnCoordsX;
	bOn.height=bOnCoordsY;
	bOff.width=bOffCoordsX;
	bOff.height=bOffCoordsY;
	
	//menu choix vaisseau
	button_ship_1.width=ship1CoordsX;
	button_ship_1.height=ship1CoordsY;
	button_ship_2.width=ship2CoordsX;
	button_ship_2.height=ship2CoordsY;
	button_ship_3.width=ship3CoordsX;
	button_ship_3.height=ship3CoordsY;
	button_ship_4.width=ship4CoordsX;
	button_ship_4.height=ship4CoordsY;
	
	//bouton back
	bBack.width=bBackCoordsX;
	bBack.height=bBackCoordsY;
	
	canvasLeft=canvasJeu.offsetLeft;
	canvasTop=canvasJeu.offsetTop;
}

/*Canvas propriete - preparation du canvas*/
function canvas_propriete() {

	canvasJeu = document.getElementById('myCanvas');
	contextJeu= canvasJeu.getContext('2d');
	canvasJeu.width = 600;
	canvasJeu.height = 400;
	init_posBouton();
	contextJeu.drawImage(imageback, 0, 0);

}

/*Menu principal*/
function menu_principal(){
	
	canvas_propriete();
	
	contextJeu.drawImage(titre, titreCoordsX, titreCoordsY);

	contextJeu.drawImage(bplay, bPlayCoordsX, bPlayCoordsY,TimageLong,TimageLarg);
	contextJeu.drawImage(bOption, bOptionsCoordsX, b0ptionCoordsY,TimageLong,TimageLarg);
	
	window.removeEventListener('click', listenerMenuSetting, false);
	window.removeEventListener('click', listenerMenuDifficulte, false);
	window.removeEventListener('click', listenerMenuChoiceShip, false);
	window.addEventListener('click',listenerMenuPrincipal,false);
}

/*Menu difficulte*/
function menu_difficulte(){

	canvas_propriete();
	
	contextJeu.drawImage(mode_select, 150, 60);

	contextJeu.drawImage(bEasy, bEasyCoordsX, bEasyCoordsY,ModLong,ModLarg);
	contextJeu.drawImage(bMedium, bMediumCoordsX, bMediumCoordsY,ModLong,ModLarg);
	contextJeu.drawImage(bHard, bHardCoordsX, bHardCoordsY,ModLong,ModLarg);
	contextJeu.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);
	
	window.removeEventListener('click', listenerMenuPrincipal, false);
	window.removeEventListener('click', listenerMenuSetting, false);
	window.removeEventListener('click', listenerMenuChoiceShip, false);
	window.addEventListener('click', listenerMenuDifficulte,false);
	
}

/*Menu parametre*/
function menu_setting() {

	canvas_propriete();
	
	contextJeu.drawImage(title_settings, 155, 60);
	contextJeu.drawImage(sound, 250,130);
	
	contextJeu.drawImage(bOn, bOnCoordsX, bOnCoordsY,TSoundImageLong,TSoundImageLarg);
	contextJeu.drawImage(bOff, bOffCoordsX, bOffCoordsY,TSoundImageLong,TSoundImageLarg);
	contextJeu.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);
	
	window.removeEventListener('click', listenerMenuPrincipal, false);
	window.removeEventListener('click', listenerMenuDifficulte, false);	
	window.removeEventListener('click', listenerMenuChoiceShip, false);
	window.addEventListener('click',listenerMenuSetting,false);
}

/*Menu choix vaisseau - permet au joueur de choisir un vaiseau*/
function menuChoiceShip() {

	canvas_propriete();
	
	contextJeu.drawImage(ship_selection, shipTitleCoordX,shipTitleCoordY);
	
	contextJeu.drawImage(button_ship_1,ship1CoordsX,ship1CoordsY,TShipImageLong,TShipImageLarg);
	contextJeu.drawImage(button_ship_2,ship2CoordsX,ship2CoordsY,TShipImageLong,TShipImageLarg);
	contextJeu.drawImage(button_ship_3,ship3CoordsX,ship3CoordsY,TShipImageLong,TShipImageLarg);
	contextJeu.drawImage(button_ship_4,ship4CoordsX,ship4CoordsY,TShipImageLong,TShipImageLarg);
	
	contextJeu.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);
	
	window.removeEventListener('click', listenerMenuPrincipal, false);
	window.removeEventListener('click', listenerMenuDifficulte, false);
	window.removeEventListener('click',listenerMenuSetting,false);
	window.addEventListener('click',listenerMenuChoiceShip,false);
}

/*ajout du listener sur le menu principal*/
function listenerMenuPrincipal(event){
	var x=event.pageX - canvasLeft,
		y=event.pageY - canvasTop;

	/*************************
	//boutons du menu principal
	**************************/
		
		if( (bplay.width <= x &&  x <= bplay.width+TimageLong ) && 
			(bplay.height <= y && y <= bplay.height+TimageLarg)) {

			stateMenuSelected = 1;
			console.log("play clicke");

		}//if

		if( (bOption.width <= x &&  x <= bOption.width+TimageLong ) && 
			(bOption.height <= y && y <= bOption.height+TimageLarg )){
			
			stateMenuSelected = 2;
			console.log("option clicke");


		}//if
}

/*ajout du listener sur le menu difficulte*/
function listenerMenuDifficulte(event){
	
	var x=event.pageX - canvasLeft,
		y=event.pageY - canvasTop;

		/*************************
		//boutons du menu difficulte
		**************************/

		if( (bEasy.width <= x &&  x <= bEasy.width+TimageLong ) && 
		(bEasy.height <= y && y <= bEasy.height+TimageLarg)) {
		
			console.log("easy clicke");
			stateMenuSelected = 3;
	
		}//if

		if( (bMedium.width <= x &&  x <= bMedium.width+TimageLong ) && 
			(bMedium.height <= y && y <= bMedium.height+TimageLarg )){
		
			console.log("medium clicke");
			stateMenuSelected = 3;

		}//if

		if( (bHard.width <= x &&  x <= bHard.width+TimageLong ) && 
			(bHard.height <= y && y <= bHard.height+TimageLarg )){
		
			console.log("hard clicke");
			stateMenuSelected = 3;

		}//if
		
		if( (bBack.width <= x &&  x <= bBack.width+TimageLong ) && 
			(bBack.height <= y && y <= bBack.height+TimageLarg )){
		
				stateMenuSelected = 0;
				console.log("back clicke");
				
		}//if
}

/*ajout du listener sur le menu setting*/
function listenerMenuSetting(event){
	
	var x=event.pageX - canvasLeft,
		y=event.pageY - canvasTop;

		/*************************
		//boutons du menu setting
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

/*ajout du listener sur le menu choix vaisseau*/
function listenerMenuChoiceShip(event){
	
	var x=event.pageX - canvasLeft,
		y=event.pageY - canvasTop;

		/*************************
		//boutons du menu choice ship
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

/*Mainframe : fonction principale */
function fenetre()
{
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

}//if
	requestAnimationFrame(fenetre);
}

fenetre();