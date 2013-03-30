var canvasJeu; //mon canvas
var contextJeu; //le context du canvas
var monVaisseau; //le vaisseau avec le quel je joue
var scoreBarre; //la barre contenant les infos comme le score
var mesObstacles; // la collection d'obstacles
var unObstacle; //un obstacle de la liste
var myInterval; //l'interval permettant de gerer la boucle principale
var tempsJeu = 0; //permet de savoir cb de secondes la partie dure
var play = 0; //si je jeu est en route
var pause = 0;//si la pause est active
var stop = 0;//si le jeu est fini
var positionObstacle = 0;//permet d'avoir la position de l'obstacle dans la liste
var vitesse;//vitesse de deplacement des obstacles
var collisionVaisseau;//permet de savoir si une collision est survenue
var nbToursStart=0;//compte le nombre d'appels de la fonction start
var limiteTop;//limite du terrain en haut
var limiteDown;//limite du terrain en bas
var niveauFini = false;//pour savoir si le niveau est fini ou non
var score = 0;//variable de score
var collision = false;//variable de collision
var cptBackground = 0;
var cadreTerrainDroit = 300;
var cadreTerrainGauche = 0;
var myReq;
var appearTimer;//gere la frequence d'apparition d'obstacles
var appearTimerObstacle = 10;
var scoreRequis;
var gravite;
var niveau = 1;


var typeImages = {
	"vaisseau":new Image(),
	"obstacle":new Image()
};
var imgTerrain = {
	"play":new Image(),
	"fini":new Image(),
	"perdu":new Image(),
	"crash":new Image()
};

function launchGame(num_ship){
	typeImages.vaisseau.src='img/main_ship_'+num_ship+'.png';
	init();
	start();
	//sleep(1000);
	if(stop!=1)
	{
		requestAnimationFrame(start);
	}
	else
	{
		alert("sorti du jeu");

	}
}


//Fonction permettant de dessiner un rectangle en lui passant les parametres requis
function dessiner(type,x,y,w,h){


	
	if(type=="vaisseau")
	{
		//this.contextJeu.drawImage(typeImages.vaisseau, 152, 323, 100, 100, x, y, 80, 60); // il faut modifier la taille du vaisseau en accord avec limage utilisée
		this.contextJeu.drawImage(typeImages.vaisseau, x, y, 100, 60);
	}
	else if(type=="obstacle")
	{
		this.contextJeu.drawImage(typeImages.obstacle, 0, 0, 40, 40, x, y, 50, 50); // il faut modifier la taille de l'obstacle en accord avec l'image utilisée
	}
	else if(type=="scoreBarre")
	{
		this.contextJeu.fillStyle="black";
		this.contextJeu.fillRect(x,y,w,h);
		this.contextJeu.strokeStyle="red";
		this.contextJeu.strokeRect(x,y,w,h);
	}
	else if(type=="score")
	{
		this.contextJeu.fillStyle=this.randomColor();
		this.contextJeu.font="20px gameOver";
		this.contextJeu.fillText(this.gererScore(),x,y);
	}
	else if(type=="bestScore")
	{
		this.contextJeu.fillStyle="white";
		this.contextJeu.font="14px gameOver";
		this.contextJeu.fillText("Best : "+this.saveBestScore(),x,y);
	}
	
	
	return true;

}
//***********************************************************************************

//Fonction d'initialisation du jeu
function init(){

	//initialisation du localStorage
	if(!localStorage){
		console.error("Votre navigateur ne supporte pas locaStorage");
	}else if (localStorage.bestScore === undefined){
		localStorage.bestScore = 0;
	}
	
	
	this.appearTimer=0;
	
	//initialisation du niveau et de la difficulté
	if(this.niveau==1)
	{
		this.appearTimer = 25;
		this.scoreRequis = 20;
		this.vitesse = 20;
		this.gravite = 5;
		imgTerrain.play.src='img/spaceBackground2.png';
	}
	else if(this.niveau==2)
	{
		this.appearTimer = 20;
		this.scoreRequis = 40;
		this.vitesse = 22;
		this.gravite = 5;
		imgTerrain.play.src='img/spaceBackground4.png';
	}
	else if(this.niveau==3)
	{
		this.appearTimer = 15;
		this.scoreRequis = 50;
		this.vitesse = 24;
		this.gravite = 6;
		imgTerrain.play.src='img/spaceBackground4.png';
	}
	else if(this.niveau==4)
	{
		this.appearTimer = 10;
		this.scoreRequis = 50;
		this.vitesse = 24;
		this.gravite = 7;
		imgTerrain.play.src='img/spaceBackground5.png';
	}
	
	
	//initialisation des images
	//imgTerrain.play.src='img/spaceBackground5.png';
	imgTerrain.fini.src='img/StarWarsBackground.jpg';
	imgTerrain.perdu.src='';
	imgTerrain.crash.src='';
	
	//typeImages.vaisseau.src='img/vaisseaux.png';
	typeImages.obstacle.src='img/meteorites.png';
	
	this.canvasJeu = document.getElementById("myCanvas");
	this.contextJeu = canvasJeu.getContext("2d");
	this.canvasJeu.width = 600;
	this.canvasJeu.height = 400;
	

	
	this.scoreBarre = new ScoreBarre(0,0,this.canvasJeu.width,40,1); //creation de la barre de scores
	
	//limite top et down representent les limites de generation d'obstacles et de navigation du vaisseau
	this.limiteTop = this.scoreBarre.getHeight();
	this.limiteDown = this.canvasJeu.height;
	
	this.monVaisseau = new Vaisseau(50, this.limiteTop+100, 25, 20); //creation du vaisseau
	
	//initialisation de la liste d'obstacles
	mesObstacles = new Obstacles();
	
	
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


	//this.stop=0;
	this.pause = 0;
	this.play = 1;
	
}
//***********************************************************************************

//Fonction qui marque le debut du jeu
function start(){
	
	
	//on ajoute le listener
	ajoutListener();
	
	
	//on récupère le bruitage du reacteur du vaisseau
	var reactor = document.getElementById('reactor');
	
	//GERER LE TEMPS DE JEU
	if(play)
	{
		this.nbToursStart++;
		if(this.nbToursStart==20)
		{
			this.tempsJeu++;
			this.nbToursStart=0;
			//mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10)); // AJOUTER UN OBSTACLE A LA LISTE TOUTES LES SECONDES
		}
		
		this.cptBackground++;
		if(this.cptBackground==3)
		{
			if(this.cadreTerrainGauche+this.cadreTerrainDroit<480)
			{
				this.cadreTerrainGauche = this.cadreTerrainGauche + 1;
			}
		this.cptBackground=0;
		}
	}
	
	
	
	this.contextJeu.clearRect(0, 0, 600, 400);//on rafraichi notre canvas
	
	this.creerTerrain();//appel a la création du terrain et du vaisseau

	
	//dessiner("obstacle",mesObstacles.get(0).getPosX(), mesObstacles.get(0).getPosY(), mesObstacles.get(0).getWidth(), mesObstacles.get(0).getHeight());
		/*if(niveauFini)
		{
			console.log("rentre dans niveauFini");
			
			this.niveauFini = false;
			this.stop=0;
			
			this.sleep(10000);
		}*/
		if(pause)
		{
			this.play = 0;
			this.pauseJeu();
		}
		if(collision)
		{
			this.play=0;
			this.stop=1;
			this.niveauFini = false;
			reactor.pause();
			reactor.currentTime = 0;
			//clearInterval(this.myInterval);
			this.stopJeu();
			this.supprimerListener();
		}
		else if(stop!=1 && pause!=1)//si le jeu n'est pas en pause ou stopé
		{
			//mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
			this.mooveObstacle();
			
			//gestion des apparitions d'obstacles
			if(this.appearTimerObstacle--<0 && this.score<scoreRequis+1){
				mesObstacles.add(this.generateObstacle(this.limiteDown-30,this.limiteTop));
				//this.appearTimer=10+Math.floor(Math.random() * 30);
				this.appearTimerObstacle=this.appearTimer;
			}
			else if(this.score>=this.scoreRequis && this.mesObstacles.getNb()==0)
			{
				console.log("rentre dans la condition niveau fini");
				this.niveauFini = true;
				this.stop = 1;
				this.play = 0;
			
			}
			
			this.attractionTerrestre();
				
			//on test la collision
			this.testCollision();
	
			reactor.play();
		}
		else if(stop==1)
		{
			reactor.pause();
			reactor.currentTime = 0;
			//clearInterval(this.myInterval);
			this.stopJeu();
			this.supprimerListener();
			console.log("le jeu est stopé");
		}
		
		
	

	requestAnimationFrame(start);
	
}
//***********************************************************************************

//Fonction permettant d'avoir un sleep
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

//Fonction permettant de retourner un nouvel obstacle avec des parametres randoms
function generateObstacle(max,min)
{
	
	var obstacle;
	var x = 600
	var y = Math.floor(Math.random() * (max - min +1)) + min
	var w = 50;//typeImages.obstacle.width;
	var h = 50;//typeImages.obstacle.height;
	
	obstacle = new Obstacle(x,y,w,h);

	return obstacle;
}
//***********************************************************************************

//Fonction pour bouger les obstacles
function mooveObstacle()
{
	for(var i = 0 ; i < mesObstacles.getNb() ; i++){
		mesObstacles.get(i).posX-=this.vitesse;
		if(mesObstacles.get(i).posX<-50){
			mesObstacles.array.splice(i, 1);
		}
	}
}
//***********************************************************************************

//Fonction pour avoir une couleur alternative
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

//Fonction qui creer le terrain et le vaisseau
function creerTerrain()
{
	
	
	this.contextJeu.drawImage(imgTerrain.play, this.cadreTerrainGauche, 0, this.cadreTerrainDroit, imgTerrain.play.height, 0, 0, 600, 400);//arriere plan
	
	this.dessiner("scoreBarre",this.scoreBarre.getPosX(),this.scoreBarre.getPosY(),this.scoreBarre.getWidth(),this.scoreBarre.getHeight());//barre de score
	
	this.dessiner("score",this.scoreBarre.getWidth()-60,this.scoreBarre.getPosY()+30,"","");//score
	this.dessiner("bestScore",5,this.scoreBarre.getPosY()+30,"","");//meilleur score
	
	this.contextJeu.font="20px gameOver";
	this.contextJeu.fillStyle="red";
	//this.contextJeu.drawImage(bOn, bOnCoordsX, bOnCoordsY,80,60);
	//this.contextJeu.fillText("Pause",220,30);// sera remplacé par un bouton pause
	
	/*playPause = new Image();
	playPause.src = 'img/PlayPauseStop.png';
	this.contextJeu.drawImage(playPause, 0, 0, playPause.width/3, playPause.height, 250, 5, 35, 32);//image, pointDecoupeX, pointDecoupeY, widthDecoupe, heightDecoupe, pointCibleX, pointCibleY, widthCible, heightCible
	*/
	
	/*this.contextJeu.shadowColor = "gold"
	//this.contextJeu.shadowOffsetX = 0;
	//this.contextJeu.shadowOffsetY = 0;
	//this.contextJeu.shadowBlur = 15;
	//this.contextJeu.strokeStyle="gold";
	//this.contextJeu.strokeText("pause",250,30);*/
	
	this.contextJeu.strokeStyle="black";
	this.contextJeu.strokeRect(0,0,canvasJeu.width, canvasJeu.height);
	
	for (var i = 0 ; i < mesObstacles.getNb() ; i++){
		this.dessiner("obstacle",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
	}
	
	this.dessiner("vaisseau",monVaisseau.getPosX(),monVaisseau.getPosY(),monVaisseau.getWidth(),monVaisseau.getHeight());

}
//***********************************************************************************

//Fonction permettant de stoper le jeu
function stopJeu()
{
	this.mesObstacles.removeAll();
	
	if(niveauFini)
	{	
		console.log("tessssssssssst");
		this.contextJeu.drawImage(imgTerrain.fini, 0, 0, canvasJeu.width, canvasJeu.height);//arriere plan
		this.contextJeu.fillStyle=this.randomColor();
		this.contextJeu.font="30px gameOver";
		this.contextJeu.fillText("LEVEL "+this.niveau+" CLEAR",58,210);
	}
	else if(collision)
	{
		this.contextJeu.fillStyle="yellow";
		this.contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
		this.contextJeu.fillStyle="black";
		this.contextJeu.font="50px gameOver";
		this.contextJeu.fillText("CRASH",118,210);
		this.stop=1;
		this.play = 0;
	}
	else if(stop)
	{
		this.contextJeu.save();
		this.contextJeu.fillStyle="black";
		this.contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
		this.contextJeu.fillStyle="red";
		this.contextJeu.font="35px gameOver";
		this.contextJeu.fillText("GAME OVER",88,210);
		this.contextJeu.restore();
		this.stop=1;
		this.play = 0;
	}
	
	
	//this.collision = false;
	

}
//***********************************************************************************

//Fonction qui simule l'attraction Terrestre
function attractionTerrestre()
{
	var bool;
	var tailleVaisseau = this.monVaisseau.getHeight();
	var tailleTerrain = this.canvasJeu.height;
	var endroitCle = (tailleTerrain-tailleVaisseau);
	
	if(this.monVaisseau.getPosY()>=endroitCle || this.monVaisseau.getPosY()<=this.limiteTop-10)
	{
		bool=false;
		
		this.monVaisseau.setVivant(false);
		this.stop=1;
		this.play=0;
	}
	else
	{
		var nb = this.monVaisseau.getPosY();
		nb = nb + this.gravite;
		
		this.monVaisseau.setPosY(nb);
		//this.dessiner("vaisseau",monVaisseau.getPosX(),monVaisseau.getPosY(),monVaisseau.getWidth(),monVaisseau.getHeight());
	}

}
//***********************************************************************************

//Fonction qui definie le listener sur le canvas
function ajoutListener()
{
	window.addEventListener("mousedown", eventAction, false);
	window.addEventListener("touchstart", eventAction, false);

}
//***********************************************************************************

//Fonction qui supprime le listener sur le canvas
function supprimerListener()
{
	window.removeEventListener("mousedown", eventAction, false);
	window.removeEventListener("touchstart", eventAction, false);

}
//***********************************************************************************

//Fonction qui definie le comportement suite à l'execution d'un listener sur le canvas
function eventAction()
{
	var i=0;
	while(i<=10)
	{
		var y = this.monVaisseau.getPosY();
		y = y-4;
		this.monVaisseau.setPosY(y);
		i++;
	}

}
//***********************************************************************************

//Fonction qui gere le calcul du score
function gererScore()
{
	var temps = 0;
	var coefficient = this.scoreBarre.getCoeff();
	var scoreTmp;
	
	temps=this.tempsJeu;
	scoreTmp=Math.floor(temps*coefficient);
	
	this.score = scoreTmp;
	return score;
	

}
//***********************************************************************************

//Fonction permettant de stocker la meilleure distance
function saveBestScore()
{
	 if (eval(this.score) > getBestScore()) {
            localStorage.bestScore = eval(this.score);
         }
	return eval(localStorage.bestScore);
}
//***********************************************************************************

//Fonction qui permet de recuperer la meilleure distance
function getBestScore() {
      return eval(localStorage.bestScore);
}
//***********************************************************************************

//Fonction permettant de tester si il y a eu une collision (A AMELIORER)
function testCollision(){
		
		//pour chaque obstacle (visible)
		for(i=0;i<this.mesObstacles.getNb();i++)
		{
			var obstacleEnCours = this.mesObstacles.get(i);
			var largeurObstacleEnCours = obstacleEnCours.getWidth();
			var hauteurObstacleEnCours = obstacleEnCours.getHeight();
			var xObstacleEnCours = obstacleEnCours.getPosX();
			var yObstacleEnCours = obstacleEnCours.getPosY();
			var xVaisseau = monVaisseau.getPosX();
			var yVaisseau = monVaisseau.getPosY();
			var largeurVaisseau = monVaisseau.getWidth();
			var hauteurVaisseau = monVaisseau.getHeight();
			
			//si le vaisseau est suceptible d'avoir les memes coordonnées y que l'obstacle
			if(yObstacleEnCours >= (yVaisseau - hauteurObstacleEnCours) && yObstacleEnCours <= (yVaisseau + hauteurVaisseau))
			{
				//si le vaisseau est suceptible d'avoir les memes coordonnées x que l'obstacle
				if(xObstacleEnCours >= (xVaisseau - largeurObstacleEnCours) && xObstacleEnCours <= (xVaisseau + largeurVaisseau))
				{
					this.collision = true;
					return this.collision;
				}
				else
				{
					this.collision = false;
				}
			
			}
			//si le vaisseau est suceptible d'avoir les memes coordonnées x que l'obstacle
			else if(xObstacleEnCours >= (xVaisseau - largeurObstacleEnCours) && xObstacleEnCours <= (xVaisseau + largeurVaisseau))
			{
				//si le vaisseau est suceptible d'avoir les memes coordonnées y que l'obstacle
				if(yObstacleEnCours >= (yVaisseau - hauteurObstacleEnCours) && yObstacleEnCours <= (yVaisseau + hauteurVaisseau))
				{
					this.collision = true;
					return this.collision;
				}
				else
				{
					this.collision = false;
				}
			
			
			}
			else
			{
				this.collision = false;
			}
		
		
		}//fin pour

			
		return this.collision;
}
//***********************************************************************************

//Fonction permettant de gerer la pause
function pauseJeu()
{
	if(this.pause==1)
	{
		this.play = 0;
		
		
		//figer tous les objets
		this.monVaisseau.setPosY(this.monVaisseau.getPosY());
	
		for(var i = 0 ; i < mesObstacles.getNb() ; i++){
			mesObstacles.get(i).setPosX(mesObstacles.get(i).getPosX());
		}
	
		//ajouter un canvas gris avec opacité reduite
		this.creerTerrain();
		this.contextJeu.fillStyle = "rgba(52, 52, 52, 0.5)";
		this.contextJeu.fillRect(0,0,this.canvasJeu.width, this.canvasJeu.height);
	}

}
//***********************************************************************************

//Fonction permettant de gerer le passage au niveau suivant
function nextLevel()
{
	console.log("rentre dans nextLevel");
	
	if(this.niveau++!=null)
	{
		console.log("nextLevel >>> rentre dans premier if");
		//on stop le jeu avec lecran niveau n fini
		this.stopJeu();
				
		//on coupe les sons
		reactor.pause();
		reactor.currentTime = 0;
		
		//
	
	
	}


}
//***********************************************************************************