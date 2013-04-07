//création de l'objet vaisseau
function Vaisseau(x,y,w,h){
 
    this.posX =  x;
	this.posY =  y;
	this.width =  w;
	this.height =  h;
	this.imgVie = new Image();
	this.vivant = false;
	
}

    Vaisseau.prototype.setPosX = function(x) { 
		this.posX=x;
    }
	
    Vaisseau.prototype.setPosY = function(y) { 
		this.posY=y;
		console.log("rentre dans set pos Y");
    }
	
    Vaisseau.prototype.getPosX = function() { 
		return this.posX;
    }
	
	Vaisseau.prototype.getPosY = function() { 
		return this.posY;
    }
	
	Vaisseau.prototype.getWidth = function() { 
		return this.width;
    }
	
	Vaisseau.prototype.getHeight = function() { 
		return this.height;
    }
	
	 Vaisseau.prototype.setVivant = function(b) { 
		this.vivant=b;
    }
	
    Vaisseau.prototype.isVivant = function() { 
		return this.vivant;
    }
	
	Vaisseau.prototype.getVaisseau = function(ctx) {
		console.log("rentre dans getVaisseau");
		//img = new Image();
		//img.src = 'img/spatiale.png';
		ctx.fillStyle="black";
		ctx.fillRect(this.PosX,this.posY,this.width,this.height);
    }
	

	

	
