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
		this.borderLeftImg = new Image;
		this.borderLeftImg.src = "assets/border_left.jpg";
		this.borderRightImg = new Image;
		this.borderRightImg.src = "assets/border_right.jpg";
		this.borderTopImg = new Image;
		this.borderTopImg.src = "assets/border_top.jpg";
		this.borderBottomImg = new Image;
		this.borderBottomImg.src = "assets/border_bottom.jpg";
	},

	update: function() {
		this.draw();
	},

	drawBorders: function() {
		//this.ctx.beginPath();
		//this.ctx.lineWidth="6";
		//this.ctx.strokeStyle="red";
		//this.ctx.rect(this.origin.x, this.origin.y,this.width,this.height);

		// Left border
		this.ctx.drawImage(this.borderLeftImg, 0, 0, this.borderLeftImg.width, this.borderLeftImg.height, 
										    this.origin.x, this.origin.y, this.borderLeftImg.width, this.height);

		// Right border
		this.ctx.drawImage(this.borderRightImg, 0, 0, this.borderRightImg.width, this.borderRightImg.height, 
										    this.origin.x+this.width-this.borderRightImg.width, this.origin.y, this.borderRightImg.width, this.height);

		// Top border
		this.ctx.drawImage(this.borderTopImg, 0, 0, this.borderTopImg.width, this.borderTopImg.height, 
										    this.origin.x, this.origin.y, this.width, this.borderBottomImg.height);

		// Bottom border
		this.ctx.drawImage(this.borderBottomImg, 0, 0, this.borderBottomImg.width, this.borderBottomImg.height, 
										    this.origin.x, this.origin.y+this.height-this.borderBottomImg.height, this.width, this.borderBottomImg.height);

		
		
		//this.ctx.stroke();
	},

	draw: function(ctx) {
		this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.origin.x, this.origin.y, this.width, this.height);
		this.drawBorders(ctx);
	},
}
