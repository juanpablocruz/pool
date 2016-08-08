var Scenario = function(strDataURI,ctx,w,h) {
	this.drag = 0.8;
	this.img = new Image;
	this.background = 0;
	this.width = w;
	this.height = h;
	this.ctx = ctx;
	this.img.src = strDataURI;
	this.origin = V(0,0);
};

Scenario.prototype = {
	init: function() {
		this.origin = V((this.ctx.canvas.width/2)-(this.width/2), (this.ctx.canvas.height/2)-(this.height/2));
	},

	update: function() {
		this.draw();
	},

	drawBorders: function() {
		this.ctx.beginPath();
		this.ctx.lineWidth="6";
		this.ctx.strokeStyle="red";
		this.ctx.rect(this.origin.x, this.origin.y,this.width,this.height); 
		this.ctx.stroke();
	},

	draw: function(ctx) {
		this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.origin.x, this.origin.y, this.width, this.height);
		this.drawBorders(ctx);
	},
}
