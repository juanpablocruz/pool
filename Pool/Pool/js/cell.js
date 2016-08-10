var modules = [];    // Lista de modulos disponibles
var error = [""];
var Cursor = V(0,0);

var fondo = "assets/background.jpg";
var escenario;
var userBall = new Bola();
var arrow = new Arrow();
var log;
var AI_ENABLED = true;
var STAGE = "menu";


function Cell(id) {
    if (window === this) {
        return new Cell(id);
    }
    switch (typeof id) {
        case "string":
            this.id = id;
            this.pelotas = [];
            this.menuItems = [];
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
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(posX, posY, radio, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 5;
        this.ctx.restore();
        //this.ctx.stroke();
    },

    updateBalls: function() {
        for(var i = 1; i < this.pelotas.length; i++) {
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
        if(log.show)
            log.update();

        switch(STAGE) {
            case "menu":
                this.showMenu();
                this.updateMenu();
            break;

            case "playing":{
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
            }
            break;
        }

        
    },

    resizeAll: function(self, e) {
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

    keyboardProcess: function(self,e) {
        switch(e.key){
            case "1":
                log.show = !log.show;
                log.Show("Log toggled");
            break;
            case "2":
            if(log.playing)
                log.Show("Log Stopped");
            log.playing = !log.playing;
            if(log.playing)
                log.Show("Log Started");
            break;
            case "3":
                log.cleanLog();
            break;
            case "4":
                if(AI_ENABLED)
                    log.Show("AI disabled");
                else
                    log.Show("AI enabled");
                AI_ENABLED = !AI_ENABLED;
            break;
        }
    },

    initBalls: function() {
        userBall.init(V(250,200),25,"green", this.pelotas.length);
        this.pelotas.push(userBall);

        var colBola = new Bola(V(0,0),0,0);
        colBola.init(V(this.ctx.canvas.width/2,this.ctx.canvas.height/2),
                     30, "red", this.pelotas.length);
        this.pelotas.push(colBola);

        var colBola2 = new NPC("wander");
        colBola2.init(V(-230 + this.ctx.canvas.width/2,this.ctx.canvas.height/2),
                      30,"purple",this.pelotas.length);
        this.pelotas.push(colBola2);

        var colBola2 = new NPC("chase");
        colBola2.init(V(-530 + this.ctx.canvas.width,100-this.ctx.canvas.height/2),
                      30,"yellow", this.pelotas.length);
        this.pelotas.push(colBola2);
    },

    init: function() {
        this.initBalls();
    },

    showMenu: function() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].draw();
        }
    },

    updateMenu: function() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].update(Cursor);
        }
    },

    mouseUpFunc: function(self, e) {
        if(STAGE == "playing") {
            self.shootBallEvent(e);
        }
    },

    mouseDownFunc: function(self, e) {
        if(STAGE == "playing") {
            self.createArrow(e);
        }
        if (STAGE == "menu") {
            for (var i = 0; i < this.menuItems.length; i++) {
                this.menuItems[i].processClick(Cursor);
            }
        }
    },

    mouseMoveFunc: function(self, e) {
        CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        Cursor.x = CurX;
        Cursor.y = CurY;

        if(STAGE == "playing") {
            self.updateArrow(e);
        }
    },

    startFunction: function () {
        STAGE = "playing";
        console.log(this);
    },

    start: function() {
        var self = this;

        this.ctx = this.canvas.getContext("2d");

        this.ctx.canvas.width  = window.innerWidth - 3;
        this.ctx.canvas.height = window.innerHeight - 3;

        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;
        var radius = 70;

        log = new Log(this.ctx);

        //this.drawCircle(centerX, centerY, radius, "green");
        

        this.canvas.addEventListener("mouseup", function(e) {self.mouseUpFunc(self,e)});
        this.canvas.addEventListener("mousedown", function(e) {self.mouseDownFunc(self,e)});
        this.canvas.addEventListener("mousemove", function(e) { self.mouseMoveFunc(self, e)});

        window.addEventListener("keypress", function(e) {self.keyboardProcess(self,e)});
        window.addEventListener("resize", function(e) {self.resizeAll(self,e)});

        var width = this.ctx.canvas.width - 300;
        var height = width*9/16;

        escenario = new Scenario(fondo,this.ctx, width, height);
        escenario.padding = V(80,0);
        escenario.init();
        escenario.listaBolas = this.pelotas;

        var startMenuItem = new MenuItem(V(200, 300), "Play", this.ctx);
        startMenuItem.menuFn = this.startFunction;

        var bogusMenuItem = new MenuItem(V(200, 370), "Otro", this.ctx);
        this.menuItems.push(startMenuItem);
        this.menuItems.push(bogusMenuItem);


        this.init();

        setInterval(this.update.bind(this), 33);
    },

};