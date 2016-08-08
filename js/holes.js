var Hole = function(x, y) {
	this.pos = V(x,y);
	this.radio = 10;
	this.grow = 0.5;
	this.ticks = 1000;
}

Hole.prototype = {
	update: function() {
		this.radio+= this.grow;
		this.ticks--;
		if(this.radio > 120) this.grow*= -1;
		if(this.grow < 0 && this.radio < 60) this.grow*= -1;
	},

}