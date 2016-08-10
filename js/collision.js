Bola.prototype.checkCollision = function() {
	if (hole = this.checkCollisionHole()) {
		hole.absorve();
		return false;
	}
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
				if(!col.obj.colliding) {
					this.colliding = true;
					col.obj.colliding = true;
					return col;
				}
				else{
					col.obj.colliding = false;
					this.colliding = false;
				}
			}
		}
	}3443
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
	return false;
}

Bola.prototype.collide = function(colTarget) {
	var ball = colTarget.obj;
	var delta = this.Position.substract(ball.Position);
	var d = delta.Length();

	var mtd;

	if (d != 0) {
		mtd = delta.multEsc(((this.radio + ball.radio)-d)/d);
	} else {
		d = ball.radio - this.radio - 1;
		delta = V(ball.radio + this.radio, 0);

		mtd = delta.multEsc(((this.radio + ball.radio)-d)/d);
	}

	var im1 = 1/this.mass;	//Inverse mass quantities (1/m)
	var im2 = 1/ball.mass;

	this.Position = this.Position.add(mtd.multEsc(im1/(im1 + im2)));
	ball.Position = ball.Position.add(mtd.multEsc(im2/(im1 + im2)));

	var v = this.speed.substract(ball.speed);
	var vn = v.Inner(mtd.normalize());

	if (vn > 0) return;

	var i1 = (-(1 + this.restitution) * vn) / (im1 + im2);
	var impulse1 = mtd.multEsc(i1);

	var i2 = (-(1 + ball.restitution) * vn) / (im1 + im2);
	var impulse2 = mtd.multEsc(i2);

	this.speed = this.speed.add(impulse1.multEsc(im1));
	ball.speed = ball.speed.substract(impulse2.multEsc(im2));
}