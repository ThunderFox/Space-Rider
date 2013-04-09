//Obstacle object creation
function Obstacle(x,y,w,h){
 
    this.posX =  x;
	this.posY =  y;
	this.width =  w;
	this.height =  h;
	this.imgVie = "";
	this.imgCrash = "";
	this.phase=0;
	
}

    Obstacle.prototype.setPosX = function(x) { 
		this.posX=x;
    }
	
    Obstacle.prototype.setPosY = function(y) { 
		this.posY=y;
    }
	
    Obstacle.prototype.getPosX = function() { 
		return this.posX;
    }
	
	Obstacle.prototype.getPosY = function() { 
		return this.posY;
    }
	
	Obstacle.prototype.getWidth = function() { 
		return this.width;
    }
	
	Obstacle.prototype.getHeight = function() { 
		return this.height;
    }
	
