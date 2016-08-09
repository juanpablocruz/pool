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

		return {colPoint:V(Circle2.Position.x + a, Circle2.Position.y + b), obj: Circle2};
	}	
	return false;
}

Bola.prototype.collideWhitBola = function() {
	//console.log(this.listaBolas);

	for(var i = 0; i < escenario.listaBolas.length; i++) {
		if (escenario.listaBolas[i].id != this.id){
			var col = this.checkCircle(this, escenario.listaBolas[i]);
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

Bola.prototype.collide = function(colTarget) {
	var speedModule = this.speed.Length();
	colTarget.obj.speed = colTarget.colPoint.substract(this.Position).multEsc(speedModule/colTarget.colPoint.distance(this.Position));
	this.speed = V(colTarget.obj.speed.y, colTarget.obj.speed.x);
	this.direction = this.direction.multEsc(-1);
	colTarget.obj.direction = colTarget.obj.direction.multEsc(-1);
}