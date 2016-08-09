function NPC(algorithm) {
	this.idleTimeConst = 100;
	this.waitingTime = this.idleTimeConst;
	
	this.targetAlgorithm = algorithm;

	Bola.call(this);

}

NPC.prototype = Object.create(Bola.prototype);
NPC.prototype.constructor = NPC;


NPC.prototype.update= function() {

	switch(this.targetAlgorithm) {
		case "chase":
		if(this.speed.x == 0 && this.speed.y == 0) {
			if(!(--this.waitingTime)){
				var dest = userBall.Position;
				this.speed = dest.substract(this.Position).multEsc(0.08);
				this.waitingTime = this.idleTimeConst/2;
			}
		}
		break;

		case "wander":
		if(this.speed.x == 0 && this.speed.y == 0) {
			if(!(--this.waitingTime)){
				var dest = escenario.getRandomPos();
				destDirection = dest.substract(this.Position);
				dest = dest.normalize().multEsc(destDirection.Length());
				// dest = dest.normalize().multEsc(2);
				this.speed = dest.substract(this.Position).multEsc(0.1);
				this.waitingTime = this.idleTimeConst;
			}
		}
		break;
	}
		
		this.movement();
};
