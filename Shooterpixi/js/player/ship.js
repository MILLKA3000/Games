var Ship = function Ship() {

    this.ship = new PIXI.Sprite.fromImage('imgs/ship1.gif');
    this.ship.x = 0;
    this.ship.y = 0;

};

/**
 * add ship to
 */
Ship.prototype.addShip = function() {
    init.stage.addChild(this.ship);
};

/**
 *  Get coords for ship from position mouse
 * @param e
 */
Ship.prototype.coordinateShip = function(e) {
    if (ship.ship.x < e.clientX-15){
        init.space.tilePosition.x -= 1;
    } else if(ship.ship.x > e.clientX-15){
        init.space.tilePosition.x += 1;
    } else if(ship.ship.x == e.clientX-15) {

    }
    this.ship.x = e.clientX-15;
    this.ship.y = e.clientY;
};


Ship.prototype.controls = function(){
    self = this;
    var interval;
    var cursorX;
    var cursorY;
    document.onmousemove = function(e) {
        self.coordinateShip(e)
        cursorX = e.pageX;
        cursorY = e.pageY;
    };

    document.onmousedown = function(e) {
        interval = setInterval(checkCursor, player.PLAYER_SPEED_SHIP_SHOT);
    };

    document.onmouseup = function() {
        clearInterval(interval);
    };

    function checkCursor(){
        s = new Shot();
        s.shot.x = cursorX;
        s.shot.y = cursorY;
    }
};