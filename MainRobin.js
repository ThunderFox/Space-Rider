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
var obsEntrant = null;//initialise obsEntrant
var obsEx = null;//initialise obsEx
var vitesse = 20;//vitesse de deplacement des obstacles
var collisionVaisseau;//permet de savoir si une collision est survenue
var nbToursStart=0;//compte le nombre d'appels de la fonction start
var limiteTop;//limite du terrain en haut
var limiteDown;//limite du terrain en bas
var niveauFini = false;//pour savoir si le niveau est fini ou non
var score;

 var typeImages = {
	"vaisseau":new Image(),
	"obstacle":new Image()
};
var imgTerrain = new Image();

init();
sleep(1000);

if(stop!=1)
{
	start();
}
else
{
	alert("sorti du jeu");

}



//Fonction permettant de dessiner un rectangle en lui passant les parametres requis
function dessiner(type,x,y,w,h){

	// console.log("rentre dans dessiner");
	
	if(type=="vaisseau")
	{
		//this.contextJeu.fillStyle="black";
		//this.contextJeu.fillRect(x,y,w,h);
		//ship = new Image();
		//ship.src = 'img/spatiale.png';
		this.contextJeu.drawImage(typeImages.vaisseau, x, y);
	}
	else if(type=="obstacle")
	{
		//this.contextJeu.fillStyle=this.randomColor();
		//obst = new Image();
		//obst.src = 'img/obstacle.png';
		this.contextJeu.drawImage(typeImages.obstacle, x, y);
		//this.contextJeu.fillStyle="red";
		//this.contextJeu.fillRect(x,y,w,h);
	}
	else if(type=="scoreBarre")
	{
		this.contextJeu.fillStyle="black";
		this.contextJeu.fillRect(x,y,w,h);
		this.contextJeu.strokeStyle="black";
		this.contextJeu.strokeRect(x,y,w,h);
	}
	else if(type=="score")
	{
		this.contextJeu.fillStyle="white";
		this.contextJeu.font="25px Arial";
		this.contextJeu.fillText(this.gererScore(),x,y);
	}
	else if(type=="bestScore")
	{
		this.contextJeu.fillStyle="white";
		this.contextJeu.font="25px Arial";
		this.contextJeu.fillText(this.saveBestScore(),x,y);
	}
	
	
	return true;

}
//***********************************************************************************

//Fonction d'initialisation du jeu
function init(){

	// console.log("init");
	
	imgTerrain.src='img/bacMilieu.png';
	typeImages.vaisseau.src='img/spatiale.png';
	typeImages.obstacle.src='img/obstacle.png';
	
	this.appearTimer=0;
	
	this.canvasJeu = document.getElementById("canvasGame");
	this.canvasJeu.width = 600;
	this.canvasJeu.height = 400;
	
	this.contextJeu = canvasJeu.getContext("2d");
	
	this.scoreBarre = new ScoreBarre(0,0,this.canvasJeu.width,40,1); //creation de la barre de scores
	
	//limite top et down representent les limites de generation d'obstacles et de navigation du vaisseau
	this.limiteTop = this.scoreBarre.getHeight();
	this.limiteDown = this.canvasJeu.height;
	
	this.monVaisseau = new Vaisseau(50, this.limiteTop+100, 25, 20); //creation du vaisseau
	
	//initialisation de la liste d'obstacles
	mesObstacles = new Obstacles();	
	
	myInterval = setInterval(start, 1000/30);
	
}
//***********************************************************************************


//Fonction qui marque le debut du jeu
function start(){
	
	//on ajoute le listener
	ajoutListener();
	
	//on récupère le bruitage du reacteur du vaisseau
	var reactor = document.getElementById('reactor');
	
	//GERER LE TEMPS DE JEU
	this.nbToursStart++;
	if(this.nbToursStart==20)
	{
		this.tempsJeu++;
		this.nbToursStart=0;
	}
	
	
	//this.stop=0;
	this.pause = 0;
	this.play = 1;
	
	
	this.contextJeu.clearRect(0, 0, 600, 400);//on rafraichi notre canvas
	
	this.creerTerrain();//appel a la création du terrain et du vaisseau

	
	// console.log("nb obstacles : "+mesObstacles.getNb());
	//dessiner("obstacle",mesObstacles.get(0).getPosX(), mesObstacles.get(0).getPosY(), mesObstacles.get(0).getWidth(), mesObstacles.get(0).getHeight());
	
	

		if(stop!=1 && pause!=1)//si le jeu n'est pas en pause ou stopé
		{
			//mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
			moveObstacles();
			
			//gestion des apparitions d'obstacles
			if(this.appearTimer--<0){
				mesObstacles.add(this.generateObstacle(this.limiteDown-30,this.limiteTop));
				this.appearTimer=10+Math.floor(Math.random() * 30);
			}
			
			this.attractionTerrestre();
			reactor.play();
		}
		else
		{
			reactor.pause();
			reactor.currentTime = 0;
			clearInterval(this.myInterval);
			this.stopJeu();
			this.supprimerListener();
		}

	
	
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
	var w = 25;
	var h = 20;
	var s = Math.floor(Math.random() * 5)+4;
	
	obstacle = new Obstacle(x,y,w,h,s);

	return obstacle;
}
//***********************************************************************************


//Fonction pour bouger les obstacles
function moveObstacles()
{
	for(var i = 0 ; i < mesObstacles.getNb() ; i++){
		mesObstacles.get(i).posX-=mesObstacles.get(i).speed;
		if(mesObstacles.get(i).posX<0){
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
		case 8 : couleur="black"; break;
		case 9 : couleur="white"; break;
	}

	return couleur;

}
//***********************************************************************************

//Fonction qui creer le terrain et le vaisseau
function creerTerrain()
{
	this.contextJeu.drawImage(imgTerrain, 0, 0);//arriere plan
	
	//this.contextJeu.fillStyle="yellow";
	//this.contextJeu.fillRect(0,0,canvasJeu.width, canvasJeu.height);
	
	this.dessiner("scoreBarre",this.scoreBarre.getPosX(),this.scoreBarre.getPosY(),this.scoreBarre.getWidth(),this.scoreBarre.getHeight());//barre de score
	
	this.dessiner("score",this.scoreBarre.getWidth()-70,this.scoreBarre.getPosY()+30,"","");//score
	this.dessiner("bestScore",30,this.scoreBarre.getPosY()+30,"","");//meilleur score
	
	this.contextJeu.fillText("pause",250,30);// sera remplacé par un bouton pause
	
	this.contextJeu.strokeStyle="black";
	this.contextJeu.strokeRect(0,0,canvasJeu.width, canvasJeu.height);
	
	for (var i = 0 ; i < mesObstacles.getNb() ; i++){
		this.dessiner("obstacle",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
	}
}
//***********************************************************************************

//Fonction permettant de stoper le jeu
function stopJeu()
{
	this.mesObstacles.removeAll();
			
	this.obsEx = null;
	this.obsEntrant = null;
	
	if(niveauFini)
	{
		this.contextJeu.fillStyle="red";
		this.contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
		this.contextJeu.fillStyle="white";
		this.contextJeu.font="40px Arial";
		this.contextJeu.fillText("NIVEAU TERMINE",120,200);
	}
	else
	{
		this.contextJeu.fillStyle="black";
		this.contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
		this.contextJeu.fillStyle="red";
		this.contextJeu.font="40px Arial";
		this.contextJeu.fillText("GAME OVER",160,200);
	}
	
	this.stop=1;

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
		nb = nb + 5;
		
		this.monVaisseau.setPosY(nb);
		this.dessiner("vaisseau",monVaisseau.getPosX(),monVaisseau.getPosY(),monVaisseau.getWidth(),monVaisseau.getHeight());
	}

}
//***********************************************************************************

//Fonction qui definie le listener sur le canvas
function ajoutListener()
{
	// console.log("ajoutListener");
	window.addEventListener("mousedown", eventAction, false);

}
//***********************************************************************************

//Fonction qui supprime le listener sur le canvas
function supprimerListener()
{
	// console.log("supprimeListener");
	window.removeEventListener("mousedown", eventAction, false);

}
//***********************************************************************************

//Fonction qui definie le comportement suite à l'execution d'un listener sur le canvas
function eventAction()
{
	var i=0;
	while(i<=10)
	{
		var y = this.monVaisseau.getPosY();
		y = y-3;
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
	
	
	temps=this.tempsJeu;
	score=Math.floor(temps*coefficient);
	
	return score;
	

}
//***********************************************************************************

//Fonction qui gere le temps de partie (NE FONCTIONNE PAS)
function minuteur()
{
	// console.log("rentre dans minuteur");
	
	var temps=0;
	var date = new Date();
	var secA = date.getSeconds();
	var secB;
	
	if(this.play==1)
	{
		
		
		if(pause==1)
		{
			// console.log("jeu en pause");
			this.tempsJeu=this.tempsJeu;
		}
		else
		{
			secB = date.getSeconds();
			
			// console.log("rentre dans le while ELSE, secB =  "+secB);
			
			if(secA!=secB)
			{
				temps++;
				secA=secB;
			}
			
			
			
		}
		
		this.tempsJeu=temps;
	
	}
	
	this.tempsJeu=0;
	
}
//***********************************************************************************

//Fonction permettant de stocker la meilleure distance
function saveBestScore()
{	
	 if (this.score > getBestScore()) {
            localStorage.bestScore = this.score;
			alert (this.localStorage.bestScore);
         }
	return this.localStorage.bestScore;
}
//***********************************************************************************

//Fonction qui permet de recuperer la meilleure distance
function getBestScore() {
      return parseInt(localStorage.bestScore || 0, 10);
}
//***********************************************************************************