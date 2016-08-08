Bola.prototype.movement = function() {
	

	var x = this.Position.x + (this.speed.x - escenario.drag)*this.direction.x;
	var y = this.Position.y + (this.speed.y - escenario.drag)*this.direction.y;

	var pos = V(0,0);
	pos = this.Position.add(this.speed.substract(escenario.drag).Hadamard(this.direction));


	if (this.speed.x - escenario.drag < 1) {
		this.Position.x = x;
	}
	if (this.speed.y - escenario.drag < 1) {
		this.Position.y = y;
	}

	if (x-this.radio <= 0) {
		this.direction.x *= (-1);
		this.Position.x = this.radio;
	} else if (x+this.radio >= escenario.width) {
		this.direction.x *= (-1);
		this.Position.x = escenario.width-this.radio;		
	} else {
		this.Position.x = x;
	}


	if (y-this.radio < 0) {
		this.direction.y *= (-1);
		this.Position.y = this.radio;
	} else if (y+this.radio > escenario.height) {
		this.direction.y *= (-1);
		this.Position.y = escenario.height-this.radio;		
	} else {
		this.Position.y = y;
	}



	this.checkCollision();

	//console.log(Math.floor(this.speed.x), Math.floor(this.speed.y));
}

Bola.prototype.shoot = function() {
	if (this.speed.x == 0 && this.speed.y ==0) {
		this.speed.x = (Cursor.x - this.Position.x)/20;
		this.speed.y = (Cursor.y - this.Position.y)/20;
	}
	this.tiempo = 0;
	/* else {
		this.speed.x = 0;
		this.speed.y = 0;
	}*/
}
