//object creation obstacles
function Obstacles(){
 
  this.array = new Array();
  
}

    
Obstacles.prototype.add = function(o) { 
  this.array.push(o);
}

Obstacles.prototype.removeObject = function(o){
  var index = this.array.indexOf(o);
  if(index != -1)
  {
    this.array.splice(i, 1);
  }
}

Obstacles.prototype.removeFirst = function(){
  this.array.shift();
}

Obstacles.prototype.removeAll = function(){
  this.array.splice(0, this.getNb());
}

Obstacles.prototype.get = function(i){
  if(i<this.getNb())
  {  
    var object = this.array[i];
  }
  return object;  
}

Obstacles.prototype.getNb = function(){
  return this.array.length;
}
  

  

  

  
  
  
