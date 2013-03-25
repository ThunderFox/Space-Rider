/* variables globales*/
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



/*permet d'initaliser la position des boutons dans la canvas*/
function init_posBouton(){
	//menu principal
	this.bplay.width=this.bPlayCoordsX; 
	this.bplay.height=this.bPlayCoordsY;
	this.bOption.width=this.bOptionsCoordsX;
	this.bOption.height=this.b0ptionCoordsY;
	
	//menu difficulte
	this.bEasy.width=this.bEasyCoordsX; 
	this.bEasy.height=this.bEasyCoordsY;
	this.bMedium.width=this.bMediumCoordsX;
	this.bMedium.height=this.bMediumCoordsY;
	this.bHard.width=this.bHardCoordsX;
	this.bHard.height=this.bHardCoordsY;
	
	//menu setting
	this.bOn.width=this.bOnCoordsX;
	this.bOn.height=this.bOnCoordsY;
	this.bOff.width=this.bOffCoordsX;
	this.bOff.height=this.bOffCoordsY;
	
	//bouton back
	this.bBack.width=this.bBackCoordsX;
	this.bBack.height=this.bBackCoordsY;
	
	this.canvasLeft=this.canvas.offsetLeft;
	this.canvasTop=this.canvas.offsetTop;
}

/*Canvas propriete - preparation du canvas*/
function canvas_propriete() {
	this.canvas = document.getElementById('myCanvas');
	this.context= this.canvas.getContext('2d');
	this.canvas.width = 600;
	this.canvas.height = 400;
	this.imageback.src = 'back.png';//image background
	this.init_posBouton();
	this.context.drawImage(this.imageback, 0, 0);
}

/*Menu principal*/
function menu_principal(){
	
	titre = new Image();
	titre.src = 'title.png';

	this.canvas_propriete();
	this.bplay.src='button_play.png';
	this.bOption.src='button_settings.png';
	
	this.context.font = "50pt Calibri,Geneva,Arial";
	this.context.fillStyle = "#FFFF00";
	//this.context.fillText("Space Rider", 130, 90);
	this.context.drawImage(titre, 80, 60);

	this.context.drawImage(this.bplay, this.bPlayCoordsX, this.bPlayCoordsY,this.TimageLong,this.TimageLarg);
	this.context.drawImage(this.bOption, this.bOptionsCoordsX, this.b0ptionCoordsY,this.TimageLong,this.TimageLarg);
	
	window.removeEventListener('click', listenerMenuSetting, false);
	window.removeEventListener('click', listenerMenuDifficulte, false);
	window.addEventListener('click',listenerMenuPrincipal,false);

}

/*Menu difficulte*/
function menu_difficulte(){
	mode_select = new Image();
	mode_select.src = 'mode_select.png';

	this.canvas_propriete();
	
	this.bEasy.src='easy.png';
	this.bMedium.src='medium.png';
	this.bHard.src='hard.png';
	this.bBack.src='button_back.png';
	
	this.context.font = "25pt Calibri,Geneva,Arial";
	this.context.fillStyle = "#FFFF00";
	//this.context.fillText("Mode select", 200, 60);
	this.context.drawImage(mode_select, 150, 60);

	this.context.drawImage(this.bEasy, this.bEasyCoordsX, this.bEasyCoordsY,this.ModLong,this.ModLarg);
	this.context.drawImage(this.bMedium, this.bMediumCoordsX, this.bMediumCoordsY,this.ModLong,this.ModLarg);
	this.context.drawImage(this.bHard, this.bHardCoordsX, this.bHardCoordsY,this.ModLong,this.ModLarg);
	this.context.drawImage(this.bBack, this.bBackCoordsX, this.bBackCoordsY,this.TimageLong,this.TimageLargBack);
	
	window.removeEventListener('click', listenerMenuPrincipal, false);
	window.removeEventListener('click', listenerMenuSetting, false);
	window.addEventListener('click', listenerMenuDifficulte,false);
	
}

/*Menu parametre*/
function menu_setting() {
	canvas_propriete();
	
	this.bOn.src='play.jpg';
	this.bOff.src='option.jpg';
	this.bBack.src='button_back.png';
	
	this.context.font = "25pt Calibri,Geneva,Arial";
	this.context.fillStyle = "#FFFF00";
	this.context.fillText("Sound On/Off", 200, 60);

	this.context.drawImage(this.bOn, this.bOnCoordsX, this.bOnCoordsY,this.TimageLong,this.TimageLarg);
	this.context.drawImage(this.bOff, this.bOffCoordsX, this.bOffCoordsY,this.TimageLong,this.TimageLarg);
	this.context.drawImage(this.bBack, this.bBackCoordsX, this.bBackCoordsY,this.TimageLong,this.TimageLargBack);
	
	window.removeEventListener('click', listenerMenuPrincipal, false);
	window.removeEventListener('click', listenerMenuDifficulte, false);
	window.addEventListener('click',listenerMenuSetting,false);
}

/*ajout du listener sur le menu principal*/
function listenerMenuPrincipal(event){

	var x=event.pageX - canvasLeft,
		y=event.pageY - canvasTop;

	/*************************
	//boutons du menu principal
	**************************/
		
		if( (this.bplay.width <= x &&  x <= this.bplay.width+this.TimageLong ) && 
			(this.bplay.height <= y && y <= this.bplay.height+this.TimageLarg)) {
			
		console.log("play clicke");
		this.menu_difficulte();

		}//if

		if( (this.bOption.width <= x &&  x <= this.bOption.width+this.TimageLong ) && 
			(this.bOption.height <= y && y <= this.bOption.height+this.TimageLarg )){

		console.log("option clicke");
		this.menu_setting();

		}//if
}

/*ajout du listener sur le menu difficulte*/
function listenerMenuDifficulte(event){

	var x=event.pageX - canvasLeft,
		y=event.pageY - canvasTop;

		/*************************
		//boutons du menu difficulte
		**************************/

		if( (this.bEasy.width <= x &&  x <= this.bEasy.width+this.TimageLong ) && 
		(this.bEasy.height <= y && y <= this.bEasy.height+this.TimageLarg)) {
		
		console.log("easy clicke");
	
		
		}//if

		if( (this.bMedium.width <= x &&  x <= this.bMedium.width+this.TimageLong ) && 
			(this.bMedium.height <= y && y <= this.bMedium.height+this.TimageLarg )){
		
		console.log("medium clicke");


		}//if

		if( (this.bHard.width <= x &&  x <= this.bHard.width+this.TimageLong ) && 
			(this.bHard.height <= y && y <= this.bHard.height+this.TimageLarg )){
		
		console.log("hard clicke");


		}//if
		
		if( (this.bBack.width <= x &&  x <= this.bBack.width+this.TimageLong ) && 
			(this.bBack.height <= y && y <= this.bBack.height+this.TimageLarg )){
		
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

		if( (this.bOn.width <= x &&  x <= this.bOn.width+this.TimageLong ) && 
		(this.bOn.height <= y && y <= this.bOn.height+this.TimageLarg )){
		
		console.log("on clicke");
	

		}//if

		if( (this.bOff.width <= x &&  x <= this.bOff.width+this.TimageLong ) && 
			(this.bOff.height <= y && y <= this.bOff.height+this.TimageLarg )){
		
		console.log("off clicke");


		}//if

		if( (this.bBack.width <= x &&  x <= this.bBack.width+this.TimageLong ) && 
			(this.bBack.height <= y && y <= this.bBack.height+this.TimageLarg )){
		
		console.log("back2 clicke");


		}//if
}
