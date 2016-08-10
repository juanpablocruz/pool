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
	getCursorXY: function(e) {
	    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
		Cursor.x = CurX;
		Cursor.y = CurY;
	},
	getMouse: function(){
		document.captureEvents(Event.MOUSEMOVE);
		document.onmousemove = this.getCursorXY;
	},
	update: function() {
		switch(this.status) {
			case "alive":
			{
				// Get pointer
				this.getMouse();
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