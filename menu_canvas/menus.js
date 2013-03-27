/* variables globales*/
var compteurImagesChargees = 0;
var compteurImagesTotales = 0;
var canvas;
var context;
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
var mode_select = new Image();//image selection mode
var TimageLong=230;
var TimageLarg=40, TimageLargBack=30;
var ModLong=160;
var ModLarg=50;
//coordonnées du bouton back
var bBackCoordsY=330, bBackCoordsX=180;
//position des boutons menu principal
var bPlayCoordsY=180, bPlayCoordsX=180;
var b0ptionCoordsY=260,bOptionsCoordsX=180;
//position des boutons menu difficulte
var bEasyCoordsY=120, bEasyCoordsX=220;
var bMediumCoordsY=180, bMediumCoordsX=220;
var bHardCoordsY=240, bHardCoordsX=220;
//position des boutons menu setting
var bOnCoordsY=80, bOnCoordsX=210;
var bOffCoordsY=170, bOffCoordsX=210;
//different etat du menu
var stateMenu = {
	menuPrincipal : 0,
	menuDifficultes : 1,
	menuSettings : 2,
	menuChoiceShip :3 
	
	}

var stateMenuSelected = 0;

/**********************************
ajout des images	
**********************************/

	bplay.src='button_play.png';
	compteurImagesTotales++;
	bplay.onload = function(){
		compteurImagesChargees++;
	};

	bOption.src='button_settings.png';
	compteurImagesTotales++;
	bOption.onload = function(){
		compteurImagesChargees++;
	};
	
	titre.src = 'title.png';
	compteurImagesTotales++;
	titre.onload = function(){
		compteurImagesChargees++;
	};

	mode_select.src = 'mode_select.png';
	compteurImagesTotales++;
	mode_select.onload = function(){
		compteurImagesChargees++;
	};
	bEasy.src='easy.png';
	compteurImagesTotales++;
	bEasy.onload = function(){
		compteurImagesChargees++;
	};
	bMedium.src='medium.png';
	compteurImagesTotales++;
	bMedium.onload = function(){
		compteurImagesChargees++;
	};
	bHard.src='hard.png';
	compteurImagesTotales++;
	bHard.onload = function(){
		compteurImagesChargees++;
	};
	bBack.src='button_back.png';
	compteurImagesTotales++;
	bBack.onload = function(){
		compteurImagesChargees++;
	};	
	
	bOn.src='play.jpg';
	compteurImagesTotales++;
	bOn.onload = function(){
		compteurImagesChargees++;
	};
	bOff.src='option.jpg';
	compteurImagesTotales++;
	bOff.onload = function(){
		compteurImagesChargees++;
	};

	imageback.src = 'back.png';
	compteurImagesTotales++;
	imageback.onload = function(){
		compteurImagesChargees++;
	};


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
	
	//bouton back
	bBack.width=bBackCoordsX;
	bBack.height=bBackCoordsY;
	
	canvasLeft=canvas.offsetLeft;
	canvasTop=canvas.offsetTop;
}

/*Canvas propriete - preparation du canvas*/
function canvas_propriete() {

	this.canvas = document.getElementById('myCanvas');
	this.context= this.canvas.getContext('2d');
	this.canvas.width = 600;
	this.canvas.height = 400;
	this.imageback.src = './img_menu/back.png';//image background
	this.init_posBouton();
	this.context.drawImage(this.imageback, 0, 0);

}

/*Menu principal*/
function menu_principal(){

	titre = new Image();
	titre.src = './img_menu/title.png';

	this.canvas_propriete();
	this.bplay.src='./img_menu/button_play.png';
	this.bOption.src='./img_menu/button_settings.png';

	
	context.drawImage(titre, 80, 60);

	context.drawImage(bplay, bPlayCoordsX, bPlayCoordsY,TimageLong,TimageLarg);
	context.drawImage(bOption, bOptionsCoordsX, b0ptionCoordsY,TimageLong,TimageLarg);
	
	window.removeEventListener('click', listenerMenuSetting, false);
	window.removeEventListener('click', listenerMenuDifficulte, false);
	window.removeEventListener('click', listenerMenuChoiceShip, false);
	window.addEventListener('click',listenerMenuPrincipal,false);

}


/*Menu difficulte*/
function menu_difficulte(){

	mode_select = new Image();
	mode_select.src = './img_menu/mode_select.png';

	this.canvas_propriete();
	
	this.bEasy.src='./img_menu/easy.png';
	this.bMedium.src='./img_menu/medium.png';
	this.bHard.src='./img_menu/hard.png';
	this.bBack.src='./img_menu/button_back.png';
	
	context.drawImage(mode_select, 150, 60);

	context.drawImage(bEasy, bEasyCoordsX, bEasyCoordsY,ModLong,ModLarg);
	context.drawImage(bMedium, bMediumCoordsX, bMediumCoordsY,ModLong,ModLarg);
	context.drawImage(bHard, bHardCoordsX, bHardCoordsY,ModLong,ModLarg);
	context.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);
	
	window.removeEventListener('click', listenerMenuPrincipal, false);
	window.removeEventListener('click', listenerMenuSetting, false);
	window.removeEventListener('click', listenerMenuChoiceShip, false);
	window.addEventListener('click', listenerMenuDifficulte,false);
	
}

/*Menu parametre*/
function menu_setting() {

	canvas_propriete();
	
	this.bOn.src='./img_menu/play.jpg';
	this.bOff.src='./img_menu/option.jpg';
	this.bBack.src='./img_menu/button_back.png';

	context.font = "25pt Calibri,Geneva,Arial";
	context.fillStyle = "#FFFF00";
	context.fillText("Sound On/Off", 200, 60);

	context.drawImage(bOn, bOnCoordsX, bOnCoordsY,TimageLong,TimageLarg);
	context.drawImage(bOff, bOffCoordsX, bOffCoordsY,TimageLong,TimageLarg);
	context.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);
	
	window.removeEventListener('click', listenerMenuPrincipal, false);
	window.removeEventListener('click', listenerMenuDifficulte, false);	
	window.removeEventListener('click', listenerMenuChoiceShip, false);
	window.addEventListener('click',listenerMenuSetting,false);
}

/*Menu choix vaisseau - permet au joueur de choisir un vaiseau*/
function menuChoiceShip() {

	canvas_propriete();
	
	context.font = "25pt Calibri,Geneva,Arial";
	context.fillStyle = "#FFFF00";
	context.fillText("vaisseau", 200, 60);
/****************************************************************
code vaisseau à placer ici

*********************************************************************/
	
	context.drawImage(bBack, bBackCoordsX, bBackCoordsY,TimageLong,TimageLargBack);
	
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
	

		}//if

		if( (bOff.width <= x &&  x <= bOff.width+TimageLong ) && 
			(bOff.height <= y && y <= bOff.height+TimageLarg )){
		
		console.log("off clicke");


		}//if

		if( (bBack.width <= x &&  x <= bBack.width+TimageLong ) && 
			(bBack.height <= y && y <= bBack.height+TimageLarg )){
		
			console.log("back2 clicke");
			stateMenuSelected = 0;


		}//if
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


		}//if
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
}//if
	requestAnimationFrame(fenetre);
}

fenetre();
