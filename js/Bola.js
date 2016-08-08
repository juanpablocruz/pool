var Bola = function() {
	this.Position = V(250,200);
	this.radio = 25;
	this.color = "green";
	this.speed = V(0,0);
	this.direction = V(1,1);
	this.listaBolas = [];
	this.status = "innactive";
};

Bola.prototype = {
	init: function(pos, radio, color) {
		this.Position = pos;
		this.radio = radio;
		this.color = color;
		this.status = "alive";
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