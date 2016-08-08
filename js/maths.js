var Vector = function(x, y) {
	this.x = x;	
	this.y = y;	
}

var V = function(a, b) {
    return new Vector(a, b);
};

Vector.prototype = {
	add: function(vector2) {
		if(typeof vector2 == "object"){
			return V(this.x + vector2.x, this.y + vector2.y); 
		}
		if(typeof vector2 == "number"){
			return V(this.x + vector2, this.y + vector2); 
		}
	},

	substract: function(vector2) {
		if(typeof vector2 == "object"){
			return V(this.x - vector2.x, this.y - vector2.y); 
		}
		if(typeof vector2 === "number"){
			return V(this.x - vector2, this.y - vector2); 
		}
		
	},

	argumento: function() {
		return Math.atan2(this.y,this.x);
	},

	getValues: function() {
		return {x: this.x, y: this.y};
	},

	Perp: function() {
		return V(-this.y, this.x);
	},

	multEsc: function(A) {
		return V(A*this.x, A*this.y);
	},

	Hadamard: function(vector2) {
		return V(this.x*vector2.x, this.y*vector2.y);
	},

	Inner: function(vector2) {
		return this.x*vector2.x + this.y*vector2.y;
	},

	LengthSq: function() {
		return this.Inner(this);
	},

	Length: function() {
		return Math.sqrt(this.LengthSq()); 
	},

	Clamp: function(min, val, max) {
		var res = val;
		if(res < min) res = min;
		else if ( res > max) res = max;

		return res;
	},

	Clamp01: function() {

		var res = V(this.x, this.y);
		res.x = Clamp(0.0, res.x, 1.0);
		res.y = Clamp(0.0, res.y, 1.0);

		return res;
	},

}

