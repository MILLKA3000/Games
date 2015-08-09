jQuery(document).ready(function($) {
    "use strict";


    /**
     * Constructor Init
     * @constructor
     */
    var Init = function Init() {
        this.canvas = document.getElementById('main');
        this.ctx = this.canvas.getContext('2d');
        this.settings = {
            center:{
                x: this.canvas.width / 2,
                y: this.canvas.height / 2
            },
        };
        this.star = [{x:100,y:100},{x:200,y:100}];

        this.animate();
    };

    Init.prototype.animate = function() {
        for(var i=0;i<this.star.length;i++){
            if(this.star[i].y>600){
                this.star[i].y +=10;
                this.drawStar(this.star[i].x,this.star[i].y);
            }else{
                this.ctx.clearRect(this.star[i].x,this.star[i].y,this.star[i].x+5,this.star[i].y+20);
                this.star.splice(i,1);
            }
        }

        if(this.star.length>0) this.star.timer = setTimeout(function(){Init.animate()},50);

    };

    /**
     * Constructor Ship
     * @constructor
     */
    var Ship = function Ship(init) {
        this.canvas = document.getElementById('ship');
        this.ctx = this.canvas.getContext('2d');
        this.img = new Image();
        this.img.src = 'img/ship.png';
        this.ship = {
            x:init.settings.center.x,
            y:init.canvas.height-50,
            facing:0,
            drift:28
        };

    };


    /**
     * Constructor Shot
     * @constructor
     */
    var Shot = function Shot() {
        this.canvas = document.getElementById('background');
        this.ctx = this.canvas.getContext('2d');
        this.setting = {
            x:0,
            y:0,
        };

        this.bullet = [];
    };



    /**
     * Draw ship
     */
    Init.prototype.drawStar = function(x,y) {
        var ctx = this.ctx;
        var shot = new Path2D();
        ctx.save(shot);
        ctx.clearRect(x,y,x+5,y+20);
        ctx.beginPath();
        shot.lineTo(x+5,y+20);
        shot.lineTo(x+5, y);
        ctx.closePath();
        ctx.stroke(shot);
        ctx.restore(shot);
    };

    /**
     * Draw ship
     */
    Ship.prototype.drawShip = function() {
        var ship = this.ctx;
        ship.save();
        ship.clearRect(0,0,this.canvas.width,this.canvas.height);
        ship.translate(this.ship.x-45, this.ship.y);
        ship.rotate(this.ship.facing);
        ship.drawImage(this.img, 0, 0);
        ship.stroke();
        ship.restore();
    };

    /**
     * Draw shoot
     */
    Shot.prototype.drawShoot = function(x,y) {
        var ctx = this.ctx;
        var shot = new Path2D();
        ctx.save(shot);
        ctx.clearRect(x,y,x+5,y+20);
        ctx.beginPath();
        shot.lineTo(x+5,y+20);
        shot.lineTo(x+5, y);
        ctx.closePath();
        ctx.stroke(shot);
        ctx.restore(shot);

    };

    /**
     *  Get coords for ship from position mouse
     * @param e
     */
    Ship.prototype.coordinateShip = function(e) {
        if (this.ship.x < e.clientX){
            // animate right
        } else if(this.ship.x > e.clientX){
            // animate left
        } else {
            // animate default
        }
        this.ship.x = e.clientX;
        this.ship.y = e.clientY;
        animate();

    };

    /**
     * event for shoot
     * @param e
     */
    Shot.prototype.shipShoot = function(e) {
        Shot.bullet.push({
            x: e.clientX,
            y: e.clientY,
        });
        clearTimeout(Shot.bullet.timer);
        this.animate();
    };

    Shot.prototype.animate = function() {
        for(var i=0;i<Shot.bullet.length;i++){
            if(Shot.bullet[i].y>20){
                Shot.bullet[i].y -=10;
                Shot.drawShoot(Shot.bullet[i].x,Shot.bullet[i].y);
            }else{
                this.ctx.clearRect(Shot.bullet[i].x,Shot.bullet[i].y,Shot.bullet[i].x+5,Shot.bullet[i].y+20);
                Shot.bullet.splice(i,1);
            }
        }

        if(Shot.bullet.length>0) Shot.bullet.timer = setTimeout(function(){Shot.animate()},50);
    };






    var init = new Init();
    var Ship = new Ship(init);
    var Shot = new Shot();

    animate();

    $('#main').mousemove(function(e){
        Ship.coordinateShip(e);
    });



    $('#main').mousedown(function(e){
        Shot.shipShoot(e);
        e.preventDefault();
    });




    function animate() {
        document.getElementById('score').innerHTML = 0;
        requestAnimFrame(animate);
        Ship.drawShip();

    };

    function requestAnimFrame() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    }

});