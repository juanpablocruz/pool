var HolesTypes = Array("Vortex");

var Hole = function(x, y) {
	this.Position = V(x,y);
	this.radio = 10;
	this.grow = 0.5;
	this.ticks = 1000;
	this.type = HolesTypes[Math.floor(Math.random()*HolesTypes.length)];
}

Hole.prototype = {
	update: function() {
		this.radio+= this.grow;
		this.ticks--;
		if(this.radio > 70) this.grow*= -1;
		if(this.grow < 0 && this.radio < 30) this.grow*= -1;
	},

	absorve: function(bola) {
		switch(this.type) {
			case "Vortex":
				this.vortexAbsorve(bola);
				break;
		}
	},

	vortexAbsorve: function(bola) {
		console.log("colisiono",bola.speed)
		if(bola.Position.x > this.Position.x) {
			if(bola.direction < 0) {
				bola.speed.x -= bola.speed.x/1.2;
			} else {
				bola.speed.x -= bola.speed.x/1.2;
			}
		} else if(bola.Position.x < this.Position.x) {
			if(bola.direction > 0) {
				bola.speed.x -= bola.speed.x/1.2;
			} else {
				bola.speed.x -= bola.speed.x/1.2;
			}
		}

		if(bola.Position.y > this.Position.y) {
			if(bola.direction < 0) {
				bola.speed.y -= bola.speed.y/1.2;
			} else {
				bola.speed.y -= bola.speed.y/1.2;
			}
		} else if(bola.Position.y < this.Position.y) {
			if(bola.direction < 0) {
				bola.speed.y -= bola.speed.y/1.2;
			} else {
				bola.speed.y -= bola.speed.y/1.2;
			}
		}
		console.log(bola)

	}

}