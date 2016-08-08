var Scenario = function(strDataURI,ctx,w,h) {
	this.drag = 0.8;
	this.img = new Image;
	this.background = 0;
	this.width = w;
	this.height = h;
	this.ctx = ctx;
	this.img.src = strDataURI;
	this.origin = V(0,0);
	this.holesList = [];
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
		console.log(this.holesList);
		this.updateHoles();
		this.draw();
	},

	drawBorders: function() {
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

	},

	getRandomPos: function() {
		return V((Math.random() * this.width) + this.origin.x,(Math.random() * this.height) + this.origin.y);
	},

	generateHoles: function() {
		if(this.holesList.length < 2) {
			var pos = this.getRandomPos();
			this.holesList.push(new Hole(pos.x, pos.y));
		}
	},

	updateHoles: function() {
		this.generateHoles();
		for(var i = 0; i < this.holesList.length; i++) {
			if(this.holesList[i].ticks <= 0) {
				this.holesList.splice(i,1);
			}
			this.holesList[i].update();
		}
	},

	drawHolesFunc: function(elem) {
		this.ctx.beginPath();
        this.ctx.arc(elem.pos.x, elem.pos.y, elem.radio, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "#FF4400";
        this.ctx.fill();
        this.ctx.lineWidth = 5;
	},

	drawHoles: function() {
		for(var i = 0; i < this.holesList.length; i++){
			this.drawHolesFunc(this.holesList[i]);
		}
		
	},

	draw: function() {
		this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.origin.x, this.origin.y, this.width, this.height);
		this.drawBorders();
		this.drawHoles();
	},
}
