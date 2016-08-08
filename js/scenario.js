var Scenario = function(strDataURI,ctx) {
	this.drag = 0.8;

	this.img = new Image;
	
	this.background = 0;
	this.width = 0;
	this.height = 0;
	this.ctx = ctx;
	this.img.src = strDataURI;
};

Scenario.prototype = {
	update: function() {
		this.draw();
	},

	drawBorders: function() {
		this.ctx.beginPath();
		this.ctx.lineWidth="6";
		this.ctx.strokeStyle="red";
		this.ctx.rect(0,0,this.width,this.height); 
		this.ctx.stroke();
	},

	draw: function(ctx) {
		this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.width, this.height);
		this.drawBorders(ctx);
	},
}
