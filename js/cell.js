var modules = [];    // Lista de modulos disponibles
var error = [""];
var Cursor = V(0,0);

var fondo = "assets/background.jpg";
var escenario;
var userBall = new Bola();
var arrow = new Arrow();

function Cell(id) {
    if (window === this) {
        return new Cell(id);
    }
    switch (typeof id) {
        case "string":
            this.id = id;
            this.pelotas = [];
            this.userBall = userBall; 
            this.canvas = document.querySelector(id);
            break;
    }
    return this;
}


Cell.prototype = {
    get: function(selector) {
          return this;
    },

    each: function(array, callback){                                        // función de iteración
        for(var i = 0; i<array.length;i++)callback.call(this,i,array);
    },

    drawCircle: function(posX, posY, radio, color) {
        this.ctx.beginPath();
        this.ctx.arc(posX, posY, radio, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 5;
        //this.ctx.stroke();
    },

    updateBalls: function() {
        for(var i = 0; i < this.pelotas.length; i++) {
            var element = this.pelotas[i];
            if(element.status == "dead") {
                this.pelotas.slice(i,1);
            } else {
                element.update();
                this.drawCircle(element.Position.x,
                          element.Position.y,
                          element.radio,
                          element.color);
            }
            
        }
    },

    shootBallEvent: function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if(e.button === 0) // right click
        {
            arrow.show = false;
            userBall.shoot();
        }
    },

    createArrow: function(e) {
        if(e.button === 0) {
            arrow.show = true;
            //arrow.startPos.x = userBall.Position.x + userBall.radio;
            //arrow.startPos.y = userBall.Position.y + userBall.radio;
            arrow.startPos = userBall.Position;
            arrow.endPos = Cursor;
        }
    },

    updateArrow: function(e) {
        arrow.endPos = Cursor;
    },
    update: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        escenario.update();

        // Update user ball
        userBall.update();
        if(userBall.speed.x == 0 && userBall.speed.y == 0) {
            this.ctx.save();
            this.ctx.globalCompositeOperation = "screen";
            this.drawCircle(userBall.Position.x,
                  userBall.Position.y,
                  userBall.radio+2,
                  "rgba(255,255,0,0.5)");
            this.ctx.restore();
        }
        this.drawCircle(userBall.Position.x,
                  userBall.Position.y,
                  userBall.radio,
                  userBall.color);

        this.updateBalls();
        if(arrow.show) {
            arrow.draw(this.canvas, this.ctx);
        }
    },

    resizeAll: function(self, e) {
        console.log("resize",e);

        var ratio = V((window.innerWidth - 3) / self.ctx.canvas.width,
                    (window.innerHeight - 3) / self.ctx.canvas.height);

        self.ctx.canvas.width  = window.innerWidth - 3;
        self.ctx.canvas.height = window.innerHeight - 3;

        var width = self.ctx.canvas.width - 300;
        var height = width*9/16;

        escenario.resize(width, height);
        userBall.Position = userBall.Position.Hadamard(ratio);
        userBall.radio *= ratio.x;
    },

    start: function() {
        var self = this;

        this.ctx = this.canvas.getContext("2d");

        this.ctx.canvas.width  = window.innerWidth - 3;
        this.ctx.canvas.height = window.innerHeight - 3;
        
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;
        var radius = 70;

        //this.drawCircle(centerX, centerY, radius, "green");
        userBall.init(V(250,200),25,"green");
        userBall.listaBolas = this.pelotas;

        var colBola = new Bola(V(0,0),0,0);
        colBola.init(V(this.ctx.canvas.width/2,this.ctx.canvas.height/2),
                     30, "red");
        this.pelotas.push(colBola);

        var colBola2 = new NPC("wander");
        colBola2.init(V(-230 + this.ctx.canvas.width/2,this.ctx.canvas.height/2),
                      30,"purple");
        this.pelotas.push(colBola2);

        var colBola2 = new NPC("chase");
        colBola2.init(V(-530 + this.ctx.canvas.width,100-this.ctx.canvas.height/2),
                      30,"yellow");
        this.pelotas.push(colBola2);
        
        this.canvas.addEventListener("mouseup", this.shootBallEvent);
        this.canvas.addEventListener("mousedown", this.createArrow);
        this.canvas.addEventListener("mousemove", this.updateArrow);

        window.addEventListener("resize", function(e) {self.resizeAll(self,e)});

        var width = this.ctx.canvas.width - 300;
        var height = width*9/16;

        escenario = new Scenario(fondo,this.ctx, width, height);
        escenario.init();

        setInterval(this.update.bind(this), 33);
    },

};