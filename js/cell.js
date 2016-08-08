var modules = [];    // Lista de modulos disponibles
var error = [""];
var Cursor = {x: 0, y: 0};

var fondo = "http://www.awf.org/sites/default/files/media/gallery/wildlife/Porcupine/Porcupine4.jpg?itok=AClNQ9yc";
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
            element.update();
            this.drawCircle(element.Position.x,
                      element.Position.y,
                      element.radio,
                      element.color);
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
        this.drawCircle(userBall.Position.x,
                  userBall.Position.y,
                  userBall.radio,
                  userBall.color);

        this.updateBalls();
        if(arrow.show) {
            console.log(arrow.show,arrow.startPos);
            arrow.draw(this.canvas, this.ctx);
        }
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
        userBall.listaBolas = this.pelotas;
        var colBola = new Bola();
        colBola.Position.x = this.ctx.canvas.width/2;
        colBola.Position.y = this.ctx.canvas.height/2;
        colBola.color = "red";
        colBola.radio = 70;
        this.pelotas.push(colBola);

        var colBola2 = new Bola();
        colBola2.Position.x = -230 + this.ctx.canvas.width/2;
        colBola2.Position.y = this.ctx.canvas.height/2;
        colBola2.color = "purple";
        colBola2.radio = 30;
        this.pelotas.push(colBola2);
        
        this.canvas.addEventListener("mouseup", this.shootBallEvent);
        this.canvas.addEventListener("mousedown", this.createArrow);
        this.canvas.addEventListener("mousemove", this.updateArrow);

        escenario = new Scenario(fondo,this.ctx);
        escenario.width = this.ctx.canvas.width;
        escenario.height = this.ctx.canvas.height;

        setInterval(this.update.bind(this), 33);
    },

};