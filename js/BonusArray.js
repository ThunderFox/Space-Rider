//BonusArray creation
function BonusArray(){
 
	this.array = new Array();
	
}

		
    BonusArray.prototype.add = function(o) { 
		this.array.push(o);
    }
	
    BonusArray.prototype.removeObject = function(o){
		var index = this.array.indexOf(o);
		if(index != -1)
		{
			this.array.splice(i, 1);
		}
	}
	
	BonusArray.prototype.removeFirst = function(){
		this.array.shift();
	}
	
	BonusArray.prototype.removeAll = function(){
		this.array.splice(0, this.getNb());
	}
	
	BonusArray.prototype.get = function(i){
		if(i<this.getNb())
		{	
			var object = this.array[i];
		}
		return object;	
	}
	
	BonusArray.prototype.getNb = function(){
		return this.array.length;
	}
	

	

	

	
	
	
