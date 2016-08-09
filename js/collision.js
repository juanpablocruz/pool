Bola.prototype.checkCollision = function() {
	return this.collideWhitBola();
}

Bola.prototype.checkCircle = function(Circle1, Circle2) {
	//(x2-x1)^2 + (y1-y2)^2 <= (r1+r2)^2
	if(((Circle2.Position.x - Circle1.Position.x)*(Circle2.Position.x - Circle1.Position.x) +
		(Circle2.Position.y - Circle1.Position.y)*(Circle2.Position.y - Circle1.Position.y)) <= 
		((Circle1.radio+Circle2.radio)*(Circle1.radio+Circle2.radio)))
	{
		var b = Math.abs(Circle2.Position.y - Circle1.Position.y);
		var a = Circle2.radio * (Math.abs(Circle2.Position.x - Circle1.Position.x) / (Circle2.radio + Circle1.radio));

		return colPoint = {x:Circle2.Position.x + a, y:Circle2.Position.y + b};
	}	
	return false;
}

Bola.prototype.collideWhitBola = function() {
	//console.log(this.listaBolas);
	for(var i = 0; i < this.listaBolas.length; i++) {
		if (this.listaBolas[i].id != this.id){
			var col = this.checkCircle(this, this.listaBolas[i]);
			if(col){
				//console.log("Choca con: ", i, " en: ", col);
				return col;
			}
		}
	}
	return false;
}

Bola.prototype.checkCollisionHole = function() {
	for(var i = 0; i < escenario.holesList.length; i++) {
		var col = this.checkCircle(this, escenario.holesList[i]);
		if(col){
			//console.log("Choca con: ", i, " en: ", col);
			return escenario.holesList[i];
		}
	}
}

Bola.prototype.collide = function() {
	this.direction = this.direction.multEsc(-1);
}