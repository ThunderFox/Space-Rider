//Score barre creation
function ScoreBarre(x,y,w,h,c){
 
    this.posX =  x;
	this.posY =  y;
	this.width =  w;
	this.height =  h;
	this.coeff = c;
	this.score = 0;
	
}

    ScoreBarre.prototype.setPosX = function(x) { 
		this.posX=x;
    }
	
    ScoreBarre.prototype.setPosY = function(y) { 
		this.posY=y;
    }
	
    ScoreBarre.prototype.getPosX = function() { 
		return this.posX;
    }
	
	ScoreBarre.prototype.getPosY = function() { 
		return this.posY;
    }
	
	ScoreBarre.prototype.getWidth = function() { 
		return this.width;
    }
	
	ScoreBarre.prototype.getHeight = function() { 
		return this.height;
    }
	
	 ScoreBarre.prototype.setCoeff = function(c) { 
		this.coeff=c;
    }
	
    ScoreBarre.prototype.getCoeff = function() { 
		return this.coeff;
    }
	
	ScoreBarre.prototype.setScore = function(s) { 
		this.score=s;
    }
	
    ScoreBarre.prototype.getScore = function() { 
		return this.score;
    }
	
