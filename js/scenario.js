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

		console.log(this.img.src);
		var self = this;
		this.img.onload = function() {
			self.backgroundPattern = self.ctx.createPattern(self.img,"repeat");
		}
		this.prepareHoleImage();
		
	},

	prepareHoleImage: function() {
		var src = "assets/vortex.png";
		var tempImg = new Image();
		
		tempImg.src = src;
		this.holeImage = tempImg;
		/*var self = this;
		tempImg.onload = function() {
			self.ctx.drawImage(tempImg, 0, 0);
			var image = self.ctx.getImageData(0, 0, tempImg.width, tempImg.height);
			var imageData = image.data;
			for(var i = 0; i < imageData.length; i += 4) {
				if((imageData[i] == 0) && (imageData[i+1] == 0) && (imageData[i+2] == 0)) {
					imageData[i+3] = 255;
				}
			}
			image.data = imageData;
			self.holeImage = image;
		}*/
		
	},

	update: function() {
		this.updateHoles();
		this.draw();
	},

	resize: function(w, h) {
		this.width = w;
		this.height = h;
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
        //this.ctx.putImageData(this.holeImage, elem.pos.x, elem.pos.y, elem.pos.x, elem.pos.y, elem.pos.x+elem.radio, elem.pos.y+elem.radio);
        //this.ctx.translate(this.origin.x,this.origin.y)
        //this.ctx.rotate(Math.PI/4);
        this.ctx.drawImage(this.holeImage, elem.pos.x, elem.pos.y, 
        					elem.radio, elem.radio);
        //this.ctx.rotate(-Math.PI/4);
        //this.ctx.translate(-this.origin.x,-this.origin.y)
	},

	drawHoles: function() {
		for(var i = 0; i < this.holesList.length; i++){
			this.drawHolesFunc(this.holesList[i]);
		}
		
	},

	draw: function() {
		//this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.origin.x, this.origin.y, this.width, this.height);
		
		this.ctx.rect(this.origin.x, this.origin.y,this.width, this.height);
		this.ctx.fillStyle=this.backgroundPattern;
		this.ctx.fill();
		this.drawBorders();
		this.drawHoles();
	},
}
