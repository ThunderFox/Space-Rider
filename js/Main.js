var canvasJeu; //mon canvas
var contextJeu; //le context du canvas
var monVaisseau; //le vaisseau avec le quel je joue
var scoreBarre; //la barre contenant les infos comme le score
var mesObstacles; // la collection d'obstacles
var unObstacle; //un obstacle de la liste
var mesBonus;
var unBonus;
var myInterval; //l'interval permettant de gerer la boucle principale
var tempsJeu; //permet de savoir cb de secondes la partie dure
var play; //si je jeu est en route
var pause;//si la pause est active
var stop;//si le jeu est fini
var positionObstacle = 0;//permet d'avoir la position de l'obstacle dans la liste
var vitesse;//vitesse de deplacement des obstacles
var collisionVaisseau;//permet de savoir si une collision est survenue
var nbToursStart;//compte le nombre d'appels de la fonction start
var limiteTop;//limite du terrain en haut
var limiteDown;//limite du terrain en bas
var niveauFini;//pour savoir si le niveau est fini ou non
var score;//variable de score
var collision;//variable de collision
var collisionBonus;
var cptBackground;
var cadreTerrainDroit;
var cadreTerrainGauche;
var myReq;
var appearTimer;//gere la frequence d'apparition d'obstacles
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


var typeImages = {
	"vaisseau":new Image(),
	"obstacle":new Image(),
	"bonusRing1":new Image()
};
var imgTerrain = {
	"play":new Image(),
	"fini":new Image(),
	"perdu":new Image(),
	"crash":new Image(),
};

function launchGame(num_ship)
{
	vaisseauChoisi = num_ship;
	typeImages.vaisseau.src='img/main_ship_'+num_ship+'.png';
	init();
	//sleep(2000);
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
		//contextJeu.drawImage(typeImages.vaisseau, 152, 323, 100, 100, x, y, 80, 60); // il faut modifier la taille du vaisseau en accord avec limage utilisée
		contextJeu.drawImage(typeImages.vaisseau, x, y, w+10, h+10); // il faut modifier la taille du vaisseau en accord avec limage utilisée
	}
	else if(type=="obstacle1")
	{
		contextJeu.drawImage(typeImages.obstacle, 0, 0, 40, 40, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="obstacle2")
	{
		contextJeu.drawImage(typeImages.obstacle, 40, 0, 35, 40, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="obstacle3")
	{
		contextJeu.drawImage(typeImages.obstacle, 75, 0, 35, 40, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="obstacle4")
	{
		contextJeu.drawImage(typeImages.obstacle, 110, 0, 35, 40, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="obstacle5")
	{
		contextJeu.drawImage(typeImages.obstacle, 145, 0, 33, 40, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="obstacle6")
	{
		contextJeu.drawImage(typeImages.obstacle, 178, 0, 35, 40, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="bonus1")
	{
		contextJeu.drawImage(typeImages.bonusRing1, 0, 95, 62, 62, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="bonus2")
	{
		contextJeu.drawImage(typeImages.bonusRing1, 70, 95, 62, 62, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="bonus3")
	{
		contextJeu.drawImage(typeImages.bonusRing1, 140, 95, 62, 62, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="bonus4")
	{
		contextJeu.drawImage(typeImages.bonusRing1, 210, 95, 62, 62, x, y, w+10, h+10); // il faut modifier la taille de l'obstacle en accord avec limage utilisée
	}
	else if(type=="scoreBarre")
	{
		contextJeu.fillStyle="black";
		contextJeu.fillRect(x,y,w,h);
		contextJeu.strokeStyle="red";
		contextJeu.strokeRect(x,y,w,h);
	}
	else if(type=="score")
	{
		contextJeu.fillStyle="white";
		contextJeu.font="20px gameOver";
		contextJeu.fillText(gererScore(),x,y);
	}
	else if(type=="scoreBonus")
	{
		contextJeu.drawImage(typeImages.bonusRing1, 0, 95, 62, 62, x, y, w, h);
		contextJeu.fillStyle="gold";
		contextJeu.font="20px gameOver";
		contextJeu.fillText(scoreBonus,x+50,y+20);
	}
	else if(type=="bestScore")
	{
		contextJeu.fillStyle="red";
		contextJeu.font="18px gameOver";
		contextJeu.fillText("Best : ",x,y);
		contextJeu.fillStyle="white";
		contextJeu.font="20px gameOver";+
		contextJeu.fillText(""+saveBestScore(),x+140,y);
	}
	
	
	return true;

}
//***********************************************************************************

//Fonction d'initialisation du jeu
function init(){
	
	//initialisation des variables de jeu
	score=0;
	niveauFini=false;
	collision=false;
	
	cptBackground = 0;
	cadreTerrainDroit = 300;
	cadreTerrainGauche = 0;
	
	tempsJeu = 0; //permet de savoir cb de secondes la partie dure
	play = 0; //si je jeu est en route
	pause = 0;//si la pause est active
	stop = 0;
	
	nbToursStart=0;
	appearTimerObstacle = 10;
	appearTimerBonus = 30;
	appearTimer=0;
	//*************************************
	
	//initialisation du localStorage
	if(!localStorage){
		console.error("Votre navigateur ne supporte pas locaStorage");
	}else if (localStorage.bestScore === undefined){
		localStorage.bestScore = 0;
	}
	//***********************************
	
	
	
	
	//initialisation du niveau et de la difficulté
	if(niveau==1)
	{
		appearTimer = 25; //meteor frequency (decrease to add dificulty)
		scoreRequis = 20;
		vitesse = 20;//meteor speed (increase to add difficulty)
		gravite = 5;
		imgTerrain.play.src='img/spaceBackground2.png';
		tailleBackgroundMax = 480;
	}
	else if(niveau==2)
	{
		appearTimer = 20;
		scoreRequis = 40;
		vitesse = 22;
		gravite = 5;
		imgTerrain.play.src='img/tn_spaceBackground4.png';
		tailleBackgroundMax = 840;
	}
	else if(niveau==3)
	{
		appearTimer = 15;
		scoreRequis = 50;
		vitesse = 24;
		gravite = 6;
		imgTerrain.play.src='img/tn_spaceBackground4.png';
		tailleBackgroundMax = 840;
	}
	else if(niveau==4)
	{
		appearTimer = 10;
		scoreRequis = 10;
		vitesse = 24;
		gravite = 7;
		imgTerrain.play.src='img/spaceBackground5.png';
		tailleBackgroundMax = 480;
	}
	//***********************************
	
	
	//initialisation des images
	//imgTerrain.play.src='img/spaceBackground5.png';
	imgTerrain.fini.src='img/StarWarsBackground.jpg';
	imgTerrain.perdu.src='';
	imgTerrain.crash.src='';
	
	//typeImages.vaisseau.src='../img/vaisseaux.png';
	typeImages.obstacle.src='img/meteorites.png';
	typeImages.bonusRing1.src='img/rings2.png';

	
	//get the canvas from html
	canvasJeu = document.getElementById("myCanvas");
	canvasJeu.width = 600;
	canvasJeu.height = 400;
	
	//context creation
	contextJeu = canvasJeu.getContext("2d");
	
	//score bar creation
	scoreBarre = new ScoreBarre(0,0,canvasJeu.width,40,1); 
	
	//limite top et down representent les limites de generation d'obstacles et de navigation du vaisseau
	limiteTop = scoreBarre.getHeight();
	limiteDown = canvasJeu.height-30;
	
	monVaisseau = new Vaisseau(50, limiteTop+100, 70, 50); //creation du vaisseau
	
	//initialisation de la liste d'obstacles
	mesObstacles = new Obstacles();
	
	//initialisation de la liste de bonus
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
	
	//on récupère le bruitage du reacteur du vaisseau
	reactor = document.getElementById('reactor');
	piece = document.getElementById('piece');
	boom = document.getElementById('boom');
	
}
//***********************************************************************************


//Fonction qui marque le debut du jeu
function start(){
	
	removeAllListener();
	//on ajoute le listener
	ajoutListener();

	//GERER LE TEMPS DE JEU
	if(play)
	{
		nbToursStart++;
		if(nbToursStart==20)
		{
			tempsJeu++;
			nbToursStart=0;
			//mesObstacles.add(generateObstacle(canvasJeu.height-30,10)); // AJOUTER UN OBSTACLE A LA LISTE TOUTES LES SECONDES
		}
		
		//GERER LE DEFILLEMENT DU TERRAIN
		cptBackground++;
		if(cptBackground==3)
		{
			if(cadreTerrainGauche+cadreTerrainDroit<tailleBackgroundMax) //remplacer 480 par tailleBackgroundMax
			{
				cadreTerrainGauche = cadreTerrainGauche + 1;
			}
		cptBackground=0;
		}
	}
	
	
	
	
	
	contextJeu.clearRect(0, 0, 600, 400);//on rafraichi notre canvas
	
	creerTerrain();//appel a la création du terrain et du vaisseau

	
	//dessiner("obstacle",mesObstacles.get(0).getPosX(), mesObstacles.get(0).getPosY(), mesObstacles.get(0).getWidth(), mesObstacles.get(0).getHeight());
		/*if(niveauFini)
		{
			console.log("rentre dans niveauFini");
			
			niveauFini = false;
			stop=0;
			
			sleep(10000);
		}*/
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
			//clearInterval(myInterval);
			stopJeu();
			supprimerListener();
		}
		else if(stop!=1 && pause!=1)//si le jeu n'est pas en pause ou stopé
		{
			//mesObstacles.add(generateObstacle(canvasJeu.height-30,10));
			mooveObstacle();
			mooveBonus();
			
			//gestion des apparitions de bonus
			if(appearTimerBonus--<0){
				mesBonus.add(generateBonus(limiteDown-30,limiteTop));
				//appearTimer=10+Math.floor(Math.random() * 30);
				appearTimerBonus=appearTimer+40;
			}
			
			//gestion des apparitions d'obstacles
			if(appearTimerObstacle--<0 && score<scoreRequis+1){
				mesObstacles.add(generateObstacle(limiteDown-30,limiteTop));
				//appearTimer=10+Math.floor(Math.random() * 30);
				appearTimerObstacle=appearTimer;
			}
			else if(score>=scoreRequis && mesObstacles.getNb()==0)
			{
				console.log("rentre dans la condition niveau fini");
				niveauFini = true;
				stop = 1;
				play = 0;
			}
			
			attractionTerrestre();
				
			//on test la collision
			testCollision();
			testCollisionBonus();
	
			reactor.play();
		}
		else if(stop==1)
		{
			reactor.pause();
			reactor.currentTime = 0;
			//clearInterval(myInterval);
			stopJeu();
			
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
	var w = 40;//typeImages.obstacle.width;
	var h = 40;//typeImages.obstacle.height;
	
	obstacle = new Obstacle(x,y,w,h);

	return obstacle;
}
//***********************************************************************************


//Fonction pour bouger les obstacles
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

//Fonction permettant de retourner un nouveau bonus avec des parametres randoms
function generateBonus(max,min)
{
	
	var bonus;
	var x = 600
	var y = Math.floor(Math.random() * (max - min +1)) + min
	var w = 20;//typeImages.obstacle.width;
	var h = 20;//typeImages.obstacle.height;
	
	bonus = new Bonus(x,y,w,h);

	return bonus;
}
//***********************************************************************************


//Fonction permettant de gerer le mouvement des bonus
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
	contextJeu.drawImage(imgTerrain.play, cadreTerrainGauche, 0, cadreTerrainDroit, imgTerrain.play.height, 0, 0, canvasJeu.width, canvasJeu.height);//arriere plan
	
	dessiner("scoreBarre",scoreBarre.getPosX(),scoreBarre.getPosY(),scoreBarre.getWidth(),scoreBarre.getHeight());//barre de score
	
	contextJeu.font="18px gameOver";
	contextJeu.fillStyle="red";
	contextJeu.fillText("Score : ",scoreBarre.getWidth()-340,scoreBarre.getPosY()+30);// sera remplacé par un bouton pause
	
	dessiner("score",scoreBarre.getWidth()-180,scoreBarre.getPosY()+30,"","");//score
	dessiner("bestScore",5,scoreBarre.getPosY()+30,"","");//meilleur score
	
	dessiner("scoreBonus",scoreBarre.getWidth()-100,scoreBarre.getPosY()+10,30,25);//scoreBonus
	
	
	
	/*playPause = new Image();
	playPause.src = 'img/PlayPauseStop.png';
	contextJeu.drawImage(playPause, 0, 0, playPause.width/3, playPause.height, 250, 5, 35, 32);//image, pointDecoupeX, pointDecoupeY, widthDecoupe, heightDecoupe, pointCibleX, pointCibleY, widthCible, heightCible
	*/
	
	/*contextJeu.shadowColor = "gold"
	//contextJeu.shadowOffsetX = 0;
	//contextJeu.shadowOffsetY = 0;
	//contextJeu.shadowBlur = 15;
	//contextJeu.strokeStyle="gold";
	//contextJeu.strokeText("pause",250,30);*/
	
	contextJeu.strokeStyle="black";
	contextJeu.strokeRect(0,0,canvasJeu.width, canvasJeu.height);
	
	for (var i = 0 ; i < mesObstacles.getNb() ; i++){
		dessiner("obstacle",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
		
		if(mesObstacles.get(i).phase<6)
		{
			dessiner("obstacle1",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
			mesObstacles.get(i).phase++;
		}
		else if(mesObstacles.get(i).phase>5 && mesObstacles.get(i).phase<12)
		{
			dessiner("obstacle2",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
			mesObstacles.get(i).phase++;
		}
		else if(mesObstacles.get(i).phase>11 && mesObstacles.get(i).phase<18)
		{
			dessiner("obstacle3",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
			mesObstacles.get(i).phase++;
		}
		else if(mesObstacles.get(i).phase>17 && mesObstacles.get(i).phase<24)
		{
			dessiner("obstacle4",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
			mesObstacles.get(i).phase++;
		}
		else if(mesObstacles.get(i).phase>23 && mesObstacles.get(i).phase<30)
		{
			dessiner("obstacle5",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
			mesObstacles.get(i).phase++;
		}
		else if(mesObstacles.get(i).phase>29)
		{
			dessiner("obstacle6",mesObstacles.get(i).getPosX(),mesObstacles.get(i).getPosY(),mesObstacles.get(i).getWidth(),mesObstacles.get(i).getHeight());
			mesObstacles.get(i).phase=0;
		}
		
	}
	
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
	
	dessiner("vaisseau",monVaisseau.getPosX(),monVaisseau.getPosY(),monVaisseau.getWidth(),monVaisseau.getHeight());
	
	//Bouton pause
	contextJeu.font="20px gameOver";
	contextJeu.fillStyle="red";
	contextJeu.fillText("Pause",canvasJeu.width-150,limiteDown);// sera remplacé par un bouton pause
	//contextJeu.strokeStyle="black";
	//contextJeu.strokeText("Pause",canvasJeu.width-150,limiteDown);

}
//***********************************************************************************

//Fonction permettant de stoper le jeu
function stopJeu()
{
	mesObstacles.removeAll();
	
	if(niveauFini)
	{	
		contextJeu.drawImage(imgTerrain.fini, 0, 0, canvasJeu.width, canvasJeu.height);//arriere plan
		contextJeu.fillStyle=randomColor();
		contextJeu.font="30px gameOver";
		contextJeu.fillText("LEVEL "+niveau+" CLEAR",58,160);
		if(niveau+1<5)
		{
			contextJeu.fillStyle="white";
			contextJeu.font="12px gameOver";
			contextJeu.fillText("Touch the screen to play the next level",26,260);
		}
		else
		{
			contextJeu.fillStyle="white";
			contextJeu.font="12px gameOver";
			contextJeu.fillText("CONGRATULATION, you won this game!!!",40,260);
		}
	}
	
	else if(collision)
	{
		contextJeu.fillStyle="yellow";
		contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
		contextJeu.fillStyle="black";
		contextJeu.font="50px gameOver";
		contextJeu.fillText("CRASH",118,210);
		contextJeu.font="20px gameOver";
		contextJeu.fillText("menu",100,220);
		contextJeu.font="20px gameOver";
		contextJeu.fillText("rejouer",300,220);
		stop=1;
		play = 0;
	}
	else if(stop)
	{
		contextJeu.save();
		contextJeu.fillStyle="black";
		contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
		contextJeu.fillStyle="red";
		contextJeu.font="35px gameOver";
		contextJeu.fillText("GAME OVER",88,210);
		contextJeu.restore();
		stop=1;
		play = 0;
		supprimerListener();
	}
	
	
	//collision = false;
	

}
//***********************************************************************************

//Fonction qui simule l'attraction Terrestre
function attractionTerrestre()
{
	var bool;
	var tailleVaisseau = monVaisseau.getHeight();
	var tailleTerrain = canvasJeu.height;
	var endroitCle = (tailleTerrain-tailleVaisseau);
	
	if(monVaisseau.getPosY()>=endroitCle || monVaisseau.getPosY()<=limiteTop-10)
	{
		bool=false;
		
		monVaisseau.setVivant(false);
		stop=1;
		play=0;
	}
	else
	{
		var nb = monVaisseau.getPosY();
		nb = nb + gravite;
		
		monVaisseau.setPosY(nb);
		//dessiner("vaisseau",monVaisseau.getPosX(),monVaisseau.getPosY(),monVaisseau.getWidth(),monVaisseau.getHeight());
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
function eventAction(e)
{
	var event = e;
	var x=event.pageX;
		y=event.pageY;
		
	if(!niveauFini && !pause)
	{
		if( (x >= canvasJeu.width-160 &&  x <= canvasJeu.width ) && (y >= limiteDown-30 && y <= canvasJeu.height ))
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
				y = y-4;
				monVaisseau.setPosY(y);
				i++;
			}
		}
	}
	else if(pause) //action si le jeu est en pause
	{
		pause = 0;
		pauseJeu();
	}
	else if(niveauFini) //action si le jeu est fini
	{
		console.log("action niveau fini");
		
		if(niveau+1<5)
		{
			stop=0;
			play=1;
			niveau++;
			niveauFini=false;
			init();
			sleep(1000);
		}
		else
		{
			stop=0;
			play=1;
			niveau=1;
			niveauFini=false;
			init();
			sleep(1000);
			console.log("fin de jeu");
		}
	
	}

}
//***********************************************************************************

//Fonction qui gere le calcul du score
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


//Fonction permettant de stocker la meilleure distance
function saveBestScore()
{
	 if (eval(score) > getBestScore()) {
            localStorage.bestScore = eval(score);
         }
	return eval(localStorage.bestScore);
}
//***********************************************************************************

//Fonction qui permet de recuperer la meilleure distance
function getBestScore() {
      return eval(localStorage.bestScore);
}
//***********************************************************************************

//Fonction permettant de tester si il y a eu une collision avec un Obstacle
function testCollision(){
		
		//pour chaque obstacle (visible)
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
			
			//si le vaisseau est suceptible d'avoir les memes coordonnées y que l'obstacle
			if(yObstacleEnCours >= (yVaisseau - hauteurObstacleEnCours - 5) && yObstacleEnCours <= (yVaisseau + hauteurVaisseau - 5))
			{
				//si le vaisseau est suceptible d'avoir les memes coordonnées x que l'obstacle
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
			//si le vaisseau est suceptible d'avoir les memes coordonnées x que l'obstacle
			else if(xObstacleEnCours >= (xVaisseau - largeurObstacleEnCours - 5) && xObstacleEnCours <= (xVaisseau + largeurVaisseau - 5))
			{
				//si le vaisseau est suceptible d'avoir les memes coordonnées y que l'obstacle
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
		
		
		}//fin pour

			
		return collision;
}
//***********************************************************************************

//Fonction permettant de tester si il y a eu une collision avec un Bonus
function testCollisionBonus(){
		
		//pour chaque obstacle (visible)
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
			
			//si le vaisseau est suceptible d'avoir les memes coordonnées y que l'obstacle
			if(yBonusEnCours >= (yVaisseau - hauteurBonusEnCours - 5) && yBonusEnCours <= (yVaisseau + hauteurVaisseau - 5))
			{
				//si le vaisseau est suceptible d'avoir les memes coordonnées x que l'obstacle
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
			//si le vaisseau est suceptible d'avoir les memes coordonnées x que l'obstacle
			else if(xBonusEnCours >= (xVaisseau - largeurBonusEnCours - 5) && xBonusEnCours <= (xVaisseau + largeurVaisseau - 5))
			{
				//si le vaisseau est suceptible d'avoir les memes coordonnées y que l'obstacle
				if(yBonusEnCours >= (yVaisseau - hauteurBonusEnCours - 5) && yBonusEnCours <= (yVaisseau + hauteurVaisseau - 5))
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
			else
			{
				collisionBonus = false;
			}
		
		
		}//fin pour

			
		return collisionBonus;
}
//***********************************************************************************


//Fonction permettant de gerer la pause
function pauseJeu()
{
	console.log("rentre dans pause jeu");
	
	if(pause==1)
	{
		play = 0;
		
		reactor.pause();
		reactor.currentTime = 0;
		
		//figer tous les objets
		monVaisseau.setPosY(monVaisseau.getPosY());
	
		for(var i = 0 ; i < mesObstacles.getNb() ; i++){
			mesObstacles.get(i).setPosX(mesObstacles.get(i).getPosX());
		}
	
		//ajouter un canvas gris avec opacité reduite
		creerTerrain();
		contextJeu.fillStyle = "rgba(50, 50, 50, 0.8)";
		contextJeu.fillRect(0,0,canvasJeu.width, canvasJeu.height);
		
		contextJeu.font="60px gameOver";
		contextJeu.fillStyle="white";
		contextJeu.fillText("Pause",90,210);// sera remplacé par un bouton pause
	}
	else if(pause==0)
	{
		play = 1;
		creerTerrain();
	
	}

}
//***********************************************************************************

//Fonction permettant de gerer le passage au niveau suivant NE SERT A RIEN POUR L'INSTANT
function nextLevel()
{
	console.log("rentre dans nextLevel");
	
	if(niveau++!=null)
	{
		console.log("nextLevel >>> rentre dans premier if");
		//on stop le jeu avec lecran niveau n fini
		stopJeu();
				
		//on coupe les sons
		reactor.pause();
		reactor.currentTime = 0;
		
		//
	
	
	}
	else
	{	
		console.log("nextLevel >>> rentre dans else");
	
	}


}
//***********************************************************************************

