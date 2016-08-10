var HolesTypes = Array("Vortex");

var Hole = function(x, y) {
	this.Position = V(x,y);
	this.radio = 10;
	this.grow = 0.5;
	this.ticks = 1000;
	this.type = HolesTypes[Math.floor(Math.random()*HolesTypes.length)];
}

Hole.prototype = {
	update: function() {
		this.radio+= this.grow;
		this.ticks--;
		if(this.radio > 70) this.grow*= -1;
		if(this.grow < 0 && this.radio < 30) this.grow*= -1;
	},

	absorve: function(bola) {
		switch(this.type) {
			case "Vortex":
				this.vortexAbsorve(bola);
				break;
		}
	},

	draw: function(ctx, origin, holeImage) {
        //this.ctx.putImageData(this.holeImage, this.pos.x, this.pos.y, this.pos.x, this.pos.y, this.pos.x+this.radio, this.pos.y+this.radio);
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.translate(origin.x-(this.radio/2),origin.y-(this.radio/2))
        ctx.drawImage(holeImage, this.Position.x-(this.radio), this.Position.y-(this.radio), 
        					this.radio*2, this.radio*2);

        ctx.beginPath();
        //ctx.arc(this.Position.x, this.Position.y, this.radio, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.lineWidth = 5;
        //ctx.rotate(-Math.PI/4);
        ctx.translate(-(origin.x-(this.radio/2)),-(origin.y-(this.radio/2)))
		ctx.restore();
	},

	vortexAbsorve: function(bola) {
		log.Show("Te trago!")

	}

}