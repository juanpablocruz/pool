var Bola = function() {
	this.Position = V(250,200);
	this.radio = 25;
	this.color = "green";
	this.speed = V(0,0);
	this.direction = V(1,1);
	this.listaBolas = [];
};

Bola.prototype = {
	init: function(pos, radio, color) {
		this.Position = pos;
		this.radio = radio;
		this.color = color;
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
		// Get pointer
		this.getMouse();
		// move
		this.movement();
		// Draw

	},
};