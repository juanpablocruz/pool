var MenuItem = function(pos, strTitle, ctx) {
	this.Position = pos;
	this.Texto = strTitle;
	this.hovering = false;
	this.ctx = ctx;
	this.width = 300;
	this.height = 50;
	this.menuFn = doNothing;
}

MenuItem.prototype = {
	update: function(cursor) {
		this.hover(cursor);
	},

	draw: function() {
		this.ctx.save();
		this.ctx.font = "12px Arial";
		if(this.hovering) {
			this.ctx.fillStyle = "rgba(170,170,255,0.7)";
		} else {
			this.ctx.fillStyle = "rgba(70,70,255,0.3)";
		}
		
		this.ctx.rect(this.Position.x, this.Position.y, 
							this.width, this.height);
		this.ctx.fill();
		this.ctx.fillStyle = "white";
		this.ctx.fillText(this.Texto ,this.Position.x +30,this.Position.y + 30);
		this.ctx.restore();

	},

	hover: function(cursor) {
		
		if((cursor.x > this.Position.x && cursor.x < (this.Position.x + this.width))
			&& (cursor.y > this.Position.y && cursor.y < (this.Position.y + this.height))) {
			this.hovering = true;
		} else {
			this.hovering = false;
		}
	},

	processClick: function(cursor) {
		if(this.hovering) {
			this.menuFn();
		}
	},
}


function doNothing() {
	log.Show("Click");
}