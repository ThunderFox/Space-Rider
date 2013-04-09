//Bonus object creation
function Bonus(x,y,w,h){
 
    this.posX =  x;
	this.posY =  y;
	this.width =  w;
	this.height =  h;
	this.imgVie = "";
	this.imgCrash = "";
	this.phase = 1;
	
}

    Bonus.prototype.setPosX = function(x) { 
		this.posX=x;
    }
	
    Bonus.prototype.setPosY = function(y) { 
		this.posY=y;
    }
	
    Bonus.prototype.getPosX = function() { 
		return this.posX;
    }
	
	Bonus.prototype.getPosY = function() { 
		return this.posY;
    }
	
	Bonus.prototype.getWidth = function() { 
		return this.width;
    }
	
	Bonus.prototype.getHeight = function() { 
		return this.height;
    }
	
