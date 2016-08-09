var Log = function(ctx) {
    this.ctx = ctx;
    this.ctx.font = "12px Arial";
    this.carret = 50;
    this.memory = [];
    this.show = true;
}

Log.prototype = {
    show: function() {
        var str = "";
        for(var i=0; i < arguments.length; i++){
            str += arguments[i]+" ";
        }
        this.memory.push(str);
        if(this.memory.length >= 10) {
            this.memory.shift();
        }
        //this.update();
    },
    update: function() {
        this.carret = 50;
        for (var i = 0; i < this.memory.length; i++) {
            this.ctx.fillText(this.memory[i],10,this.carret);
            this.carret += 16;
        }
    }
}