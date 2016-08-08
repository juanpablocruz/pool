var arrowColors = ["#00cc00","#cccc00","#cc0000"];

var Arrow = function() {
	this.startPos = {x: 0, y: 0};
	this.endPos = {x: 0, y: 0};
	this.show = false;
	this.color = "green";
};

Arrow.prototype = {
	draw: function(canvas, ctx) {
		var headlen = 10;   // length of head in pixels
	    var angle = Math.atan2(this.endPos.y-this.startPos.y,
	    						this.endPos.x-this.startPos.x);
	  	var size = Math.sqrt((this.endPos.y-this.startPos.y)*(this.endPos.y-this.startPos.y)+
	    					 (this.endPos.x-this.startPos.x)*(this.endPos.x-this.startPos.x));

	  	if(size > 400) {
	  		size = 400;
	  		this.endPos.x = Math.cos(angle)*size;
	  		this.endPos.y = Math.sin(angle)*size;
	  	}
	  	var fill = arrowColors[0];
	  	if(size >= 200) {
	  		fill = arrowColors[2];
	  	} else if(size >= 60) {
	  		fill = arrowColors[1];
	  	}



	    ctx.beginPath();
	    ctx.moveTo(this.startPos.x, this.startPos.y);
	    ctx.lineTo(this.endPos.x, this.endPos.y);
	    ctx.strokeStyle = fill;
	    ctx.lineWidth = 11;
	    ctx.stroke();

	    //starting a new path from the head of the arrow to one of the sides of the point
	    ctx.beginPath();
	    ctx.moveTo(this.endPos.x, this.endPos.y);
	    ctx.lineTo(this.endPos.x-headlen*Math.cos(angle-Math.PI/7),this.endPos.y-headlen*Math.sin(angle-Math.PI/7));

	    //path from the side point of the arrow, to the other side point
	    ctx.lineTo(this.endPos.x-headlen*Math.cos(angle+Math.PI/7),this.endPos.y-headlen*Math.sin(angle+Math.PI/7));

	    //path from the side point back to the tip of the arrow, and then again to the opposite side point
	    ctx.lineTo(this.endPos.x, this.endPos.y);
	    ctx.lineTo(this.endPos.x-headlen*Math.cos(angle-Math.PI/7),this.endPos.y-headlen*Math.sin(angle-Math.PI/7));

	    //draws the paths created above
	    ctx.strokeStyle = fill;
	    ctx.lineWidth = 11;
	    ctx.stroke();
	    ctx.fillStyle = fill;
	    ctx.fill();
	},
}