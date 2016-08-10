var Bola = function() {
	this.id = 0;
	this.Position = V(250,200);
	this.radio = 25;
	this.mass = 2;
	this.color = "green";
	this.speed = V(0,0);
	this.direction = V(1,1);
	this.listaBolas = [];
	this.status = "innactive";
	this.colliding = false;
	this.restitution = 0.85;
};

Bola.prototype = {
	init: function(pos, radio, color, id) {
		this.Position = pos;
		this.radio = radio;
		this.color = color;
		this.status = "alive";
		this.id = id;
	},
	update: function() {
		switch(this.status) {
			case "alive":
			{
				// move
				this.movement();
				// Draw
			}
			break;

			case "dying":
			{
				this.radio -= 0.25;
				console.log("dying");
				// Get pointer
				this.getMouse();
				// move
				this.movement();
				// Draw
				if(this.radio <= 0){
					this.status = "dead";
				}
			} break;

			default:
			break;
		}


	},
};