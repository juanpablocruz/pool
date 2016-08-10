Bola.prototype.movement = function() {

	/*var x = this.Position.x + (this.speed.x)*this.direction.x;
	var y = this.Position.y + (this.speed.y)*this.direction.y;*/
	var x = this.Position.x + (this.speed.x);
	var y = this.Position.y + (this.speed.y);


	var drag = this.speed.multEsc(0.02);
	this.speed = this.speed.substract(drag);
	if (this.speed.Length() < 0.5) {
		this.speed = V(0,0);
		//this.direction = V(1,1);
	}

/*	if (x-this.radio <= escenario.origin.x) {
		this.direction.x *= -1;
		this.Position.x = escenario.origin.x + this.radio;
	} else if (x+this.radio >= (escenario.origin.x +escenario.width)) {
		this.direction.x *= -1;
		this.Position.x = escenario.origin.x + escenario.width-this.radio;		
	} else {
		this.Position.x = x;
	}


	if (y-this.radio < escenario.origin.y) {
		this.direction.y *= -1;
		this.Position.y = escenario.origin.y + this.radio;
	} else if (y+this.radio > (escenario.origin.y +escenario.height)) {
		this.direction.y *= -1;
		this.Position.y = escenario.origin.y +escenario.height-this.radio;		
	} else {
		this.Position.y = y;
	}
*/

	if (x-this.radio <= escenario.origin.x) {
		this.speed.x *= -1;
		this.Position.x = escenario.origin.x + this.radio;
	} else if (x+this.radio >= (escenario.origin.x +escenario.width)) {
		this.speed.x *= -1;
		this.Position.x = escenario.origin.x + escenario.width-this.radio;		
	} else {
		this.Position.x = x;
	}


	if (y-this.radio < escenario.origin.y) {
		this.speed.y *= -1;
		this.Position.y = escenario.origin.y + this.radio;
	} else if (y+this.radio > (escenario.origin.y +escenario.height)) {
		this.speed.y *= -1;
		this.Position.y = escenario.origin.y +escenario.height-this.radio;		
	} else {
		this.Position.y = y;
	}


	if(colTarget = this.checkCollision()) {
		this.collide(colTarget);
	}
}

Bola.prototype.shoot = function() {
	var cursor = V(Cursor.x, Cursor.y);

	if (this.speed.x == 0 && this.speed.y ==0) {
		this.speed = cursor.substract(this.Position).multEsc(0.1);
	} else {
		console.log("Espera que la bola se detenga...");
	}
}

