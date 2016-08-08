var Hole = function(x, y) {
	this.pos = V(x,y);
	this.radio = 1;
	this.grow = 0.25;
	this.ticks = 1000;
}

Hole.prototype = {
	update: function() {
		this.radio+= this.grow;
		this.ticks--;
		if(this.radio > 40) this.grow*= -1;
		if(this.grow < 0 && this.radio < 10) this.grow*= -1;
	},

}