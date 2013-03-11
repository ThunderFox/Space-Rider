var canvasJeu;
var contextJeu;
var monVaisseau;
var mesObstacles;
var unObstacle;
var myInterval;
var play = 0;
var pause = 0;
var stop = 0;
var positionObstacle = 0;
var obsEntrant = null
var obsEx = null;
var vitesse = 20;
var collisionVaisseau;
 

init();
ajoutListener();
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

	console.log("rentre dans dessiner");
	
	if(type=="vaisseau")
	{
		this.contextJeu.fillStyle="black";
		this.contextJeu.fillRect(x,y,w,h);
	}
	else if(type=="obstacle")
	{
		//this.contextJeu.fillStyle=this.randomColor();
		this.contextJeu.fillStyle="red";
		this.contextJeu.fillRect(x,y,w,h);
	}
	
	return true;

}
//***********************************************************************************

//Fonction d'initialisation du jeu
function init(){

	console.log("init");
	
	canvasJeu = document.getElementById("canvasGame");
	canvasJeu.width = 600;
	canvasJeu.height = 400;
	
	contextJeu = canvasJeu.getContext("2d");
	
	monVaisseau = new Vaisseau(10, 30, 25, 20); //creation du vaisseau
	
	//initialisation de la liste d'obstacles
	mesObstacles = new Obstacles();
	
	
	mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
	mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
	mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
	mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
	mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
	mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
	
	
	/*mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));
	mesObstacles.add(this.generateObstacle(350,10));*/
	
	myInterval = setInterval(start, 1000/30);
	
}
//***********************************************************************************


//Fonction qui marque le debut du jeu
function start(){
	
	//monVaisseau = new Vaisseau(10, 30, 25, 20); //creation du vaisseau
	
	//this.stop=0;
	this.pause = 0;
	this.play = 1;
	
	this.contextJeu.clearRect(0, 0, 600, 400);//on rafraichi notre canvas
	
	this.creerTerrain();//appel a la cr�ation du terrain et du vaisseau

	
	console.log("nb obstacles : "+mesObstacles.getNb());
	//dessiner("obstacle",mesObstacles.get(0).getPosX(), mesObstacles.get(0).getPosY(), mesObstacles.get(0).getWidth(), mesObstacles.get(0).getHeight());
	
	

		if(stop!=1 && pause!=1)//si le jeu n'est pas en pause ou stop�
		{
			//mesObstacles.add(this.generateObstacle(canvasJeu.height-30,10));
			this.mooveObstacle();
			this.attractionTerrestre();
		}
		else
		{
			clearInterval(this.myInterval);
			this.stopJeu();
		}

	
}
//***********************************************************************************


//Fonction permettant d'avoir un sleep
function sleep(time)
{
	console.log("sleep");
	
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
	console.log("generate");
	
	var obstacle;
	var x = 600
	var y = Math.floor(Math.random() * (max - min +1)) + min
	var w = 25;
	var h = 20;
	
	obstacle = new Obstacle(x,y,w,h);

	return obstacle;
}
//***********************************************************************************


//Fonction pour bouger les obstacles
function mooveObstacle()
{
	console.log("mooveObstacle, rentre dans la fonction");
	var obsExPrecedent;
	
	if(obsEntrant==null && stop!=1)//si obsEntrant n'a pas �t� initialis�
	{
		obsEntrant = this.mesObstacles.get(this.positionObstacle);
		obsEx = this.mesObstacles.get(this.positionObstacle-1);
	}
	
	
	if(obsEx!=null)//si obs a �t� initialis�
	{
		obsExPrecedent = true;
		console.log("obsEx est l'obstacle precedent obsEntrant");
	}
	else//si obsEx n'existe pas (si lobjet precedent de la liste a �t� remove ou qu'on se trouve au debut de la liste)
	{
		obsExPrecedent = false;
		console.log("obsEx est le meme obstacle que obsEntrant");
		obsEx = this.mesObstacles.get(this.positionObstacle);
		console.log("position obstacle actuel = "+positionObstacle);
	}

	if(stop!=1)
	{
		this.contextJeu.clearRect(0,0,canvasJeu.width,canvasJeu.height);
		this.creerTerrain();
	}
	
	if(obsEntrant!=null)
	{
		this.dessiner("obstacle",obsEntrant.getPosX(),obsEntrant.getPosY(),obsEntrant.getWidth(),obsEntrant.getHeight());

	
		if(obsEntrant.getPosX() >= -24)//on teste si le premier obstacle est dans le canvas
		{
			console.log("mooveObstacle, rentre dans le premier if");
			
			if(obsEntrant.getPosX() >= (this.canvasJeu.width/2))//si il est du cot� droit du canvas
			{	
				console.log("mooveObstacle, rentre dans le deuxieme if");
				dessiner("obstacle",obsEx.getPosX(),obsEx.getPosY(),obsEx.getWidth(),obsEx.getHeight());//dessiner obsEx
				console.log("vitesse � droite = "+this.vitesse);
				obsEntrant.setPosX(obsEntrant.getPosX()-this.vitesse);//on deplace obsEntrant vers la gauche (-10)
				
				if(obsExPrecedent)//si obsEx est precedent de obsEntrant
				{
					console.log("rentre dans obsExPrecedent");
					obsEx.setPosX(obsEx.getPosX()-this.vitesse);//on deplace obsEx vers la gauche
				}
				
				console.log("deuxieme if : obsEntrant (new) = "+obsEntrant.getPosX());
				console.log("deuxieme if : obsEx (entrant) = "+obsEx.getPosX());
				
			}
			else if(obsEntrant.getPosX() <= (canvasJeu.width/2))//si il est du cot� gauche du canvas
			{
				positionObstacle++;
				console.log("mooveObstacle, rentre dans le troisieme if, position = "+this.positionObstacle);
				obsTMP = mesObstacles.get(this.positionObstacle);// obsTMP recoit l'objet d'apres dans la liste
				
				
				if(obsTMP!=null)//si obsTMP existe 
				{
					console.log("mooveObstacle, rentre dans le quatrieme if");
					
					if(obsEntrant==obsEx)//si obsEx = obsEntrant
					{
						console.log("mooveObstacle, rentre dans le cinquieme if");
					
						obsEntrant = obsTMP;//obsEntrant recoi obsTMP
						obsEntrant.setPosX(obsEntrant.getPosX()-this.vitesse);//on deplace obsEntrant vers la gauche
						obsEx.setPosX(obsEx.getPosX()-this.vitesse);//on deplace obsEx vers la gauche
						console.log("cinquieme if : obsEntrant (new) = "+obsEntrant.getPosX());
						console.log("cinquieme if : obsEx (entrant) = "+obsEx.getPosX());
						dessiner("obstacle",obsEx.getPosX(),obsEx.getPosY(),obsEx.getWidth(),obsEx.getHeight());
						dessiner("obstacle",obsEntrant.getPosX(),obsEntrant.getPosY(),obsEntrant.getWidth(),obsEntrant.getHeight());
						obsTMP = null;// on remet obsTMP a null
					}
					else
					{
						console.log("mooveObstacle, rentre dans le cinquieme if ELSE");
						
						obsTMP.setPosX(obsTMP.getPosX()-this.vitesse);//on deplace obsTMP vers la gauche
						obsEntrant.setPosX(obsEntrant.getPosX()-this.vitesse);//on deplace obsEntrant vers la gauche
						obsEx.setPosX(obsEx.getPosX()-this.vitesse);//on deplace obsEx vers la gauche
						console.log("cinquieme if : obsTMP (new) = "+obsTMP.getPosX());
						console.log("cinquieme if : obsEntrant (courant) = "+obsEntrant.getPosX());
						console.log("cinquieme if : obsEx (precedent) = "+obsEx.getPosX());
						dessiner("obstacle",obsEx.getPosX(),obsEx.getPosY(),obsEx.getWidth(),obsEx.getHeight());
						dessiner("obstacle",obsEntrant.getPosX(),obsEntrant.getPosY(),obsEntrant.getWidth(),obsEntrant.getHeight());
						dessiner("obstacle",obsTMP.getPosX(),obsTMP.getPosY(),obsTMP.getWidth(),obsTMP.getHeight());
					}
				}
				else
				{
					console.log("mooveObstacle, rentre dans le quatrieme if ELSE");
					obsEntrant.setPosX(obsEntrant.getPosX()-this.vitesse);//on deplace obsEntrant vers la gauche
					if(obsEx!=null)
					{
						obsEx.setPosX(obsEx.getPosX()-this.vitesse);//on deplace obsEx vers la gauche
						console.log("quatrieme if ELSE : obsEx (entrant) = "+obsEx.getPosX());
						dessiner("obstacle",obsEx.getPosX(),obsEx.getPosY(),obsEx.getWidth(),obsEx.getHeight());
					}
					console.log("quatrieme if ELSE : obsEntrant (new) = "+obsEntrant.getPosX());
					
					
					dessiner("obstacle",obsEntrant.getPosX(),obsEntrant.getPosY(),obsEntrant.getWidth(),obsEntrant.getHeight());
				
				
				}
				
				
				if( obsEx!=null && obsEx.getPosX() <= -25)//si obsEx n'est plus visible alors qu'il existe
				{
					console.log("---------------------------------obsEx nest plus visible = "+positionObstacle);
					
					if(obsTMP!=null)//si obsTMP contient un objet
					{
						console.log("------>>> obsTMP existe");
						this.mesObstacles.removeFirst();
						this.obsEx = obsEntrant;
						this.obsEntrant = obsTMP;
						this.positionObstacle--;
					}
					else
					{
						console.log("------>>> obsTMP est null");
						if(mesObstacles.get(this.positionObstacle+1)!=null)
						{
							mesObstacles.removeFirst();
							obsEx = obsEntrant;
							obsEntrant = mesObstacles.get(this.positionObstacle+1);
						}
						else
						{
							mesObstacles.removeFirst();
							obsEx = null;
						
						}
					
					}
				}
			}
			
		}
		else
		{
			console.log("mooveObstacle, va direct dans le else");
			
			//supprimer obsEntrant de la liste
			
			
			this.stop=1;
			
			
			
		
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
	
	this.contextJeu.fillStyle="yellow";
	this.contextJeu.fillRect(0,0,canvasJeu.width, canvasJeu.height);
	this.contextJeu.strokeStyle="black";
	this.contextJeu.strokeRect(0,0,canvasJeu.width, canvasJeu.height);

}
//***********************************************************************************

//Fonction permettant de stoper le jeu
function stopJeu()
{
	this.mesObstacles.removeAll();
			
	this.obsEx = null;
	this.obsEntrant = null;
			
	this.contextJeu.fillStyle="black";
	this.contextJeu.fillRect(0,0,canvasJeu.width,canvasJeu.height);
	this.contextJeu.fillStyle="white";
	this.contextJeu.font="40px Arial";
	this.contextJeu.fillText("NIVEAU TERMINE",120,200);
			
	this.stop=1;

}
//***********************************************************************************

//Fonction qui simule l'attraction Terrestre
function attractionTerrestre()
{
	var bool;
	
	if(this.monVaisseau.getPosY()>=this.canvasJeu.height)
	{
		console.log("vaisseau mort");
		bool=false;
		this.monVaisseau.setVivant(false);
		this.stop=1;
	}
	else
	{
		console.log(">>>> rentre dans attractionTerrestre");
		var nb = this.monVaisseau.getPosY();
		nb = nb + 5;
		console.log("nouveau posY nb = "+nb);
		this.monVaisseau.setPosY(nb);
		console.log(">>>> rentre dans attractionTerrestre, posY = "+this.monVaisseau.getPosY());
		this.dessiner("vaisseau",monVaisseau.getPosX(),monVaisseau.getPosY(),monVaisseau.getWidth(),monVaisseau.getHeight());
	}

}
//***********************************************************************************

//Fonction qui definie le listener sur le canvas
function ajoutListener()
{
	console.log("ajoutListener");
	this.canvasJeu.addEventListener("mouseup", eventAction(), false);

}
//***********************************************************************************

function eventAction()
{
	console.log("----------------------------------->>>> rentre blabla");
	this.monVaisseau.setPosY(this.monVaisseau.getPosY()-10);

}