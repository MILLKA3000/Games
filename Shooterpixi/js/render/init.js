var Init;
Init = function Init() {
    requestAnimationFrame( animate );

    this.stage = new PIXI.Container();
    this.enemy =  new PIXI.Container();
    this.shot =  new PIXI.Container();

    this.score = new PIXI.Text("SCORE: "+SCORE, {font: "14px Helvetica", fill: "white"});
    this.money = new PIXI.Text("MONEY: "+MONEY+"$", {font: "14px Helvetica", fill: "white"});

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

    this.spacebg = PIXI.Texture.fromImage("imgs/stars.gif");

    this.space = new PIXI.extras.TilingSprite(this.spacebg, window.innerWidth, window.innerHeight);

    this.stage.addChild(this.space);
    this.stage.addChild(this.enemy);
    this.stage.addChild(this.shot);

    this.score.x = 0;
    this.score.y = 10;

    this.money.x = 0;
    this.money.y = 30;

    this.stage.addChild(this.score);
    this.stage.addChild(this.money);

    document.body.appendChild(this.renderer.view);

    collided = false;
    self = this;
    function animate(){
        requestAnimationFrame( animate );

        init.space.tilePosition.y += 1;

        init.shot.children.forEach(function(child) {
            child.y -= SPEED_SHIP_BULLET;
            if (child.y < -child.height)
                init.shot.removeChild(child);


        });

        init.enemy.children.forEach(function(child) {
            child.y += SPEED_SHIP_BULLET;
            if (child.y > window.innerHeight) {

                init.enemy.removeChild(child);
                init.enemy.removeChild(child.bar);

                enemy = new Enemy();
            }

            if (child.getBounds().contains(ship.ship.x+30, ship.ship.y) || child.getBounds().contains(ship.ship.x, ship.ship.y))
            {
                //collided = true;
            }

            init.shot.children.forEach(function(bullet) {
                if (child.getBounds().contains(bullet.x, bullet.y) || child.getBounds().contains(bullet.x-30, bullet.y)){
                    child.health -= bullet.damage;
                    init.shot.removeChild(bullet);
                    init.enemy.bar.x=20;
                    if(child.health <= 0) {
                        SCORE +=100;
                        MONEY +=5;
                        init.enemy.removeChild(child);
                        init.enemy.removeChild(child.bar);

                        init.score.text = "SCORE: "+SCORE;
                        init.money.text = "MONEY: "+MONEY+"$";
                        enemy = new Enemy();

                    }
                }

            });

        });

        if (collided) {
            // Create and display the "Game Over" caption
            var caption = new PIXI.Text("Game Over", {
                font: "50px Helvetica", fill: "red"
            });

            caption.x = 500;
            caption.y = 200;

            init.space.addChild(caption);

            // Render the frame and call return so that the rest of
            // the elements of the scene remain static
            return init.renderer.render(init.stage);
        }

        init.renderer.render(init.stage);
    }
};

Init.prototype.loadProgressHandler = function (loader, resource) {
    $('#pb_loader').text('LOADING...' + ' '+loader.progress+'%');
};

Init.prototype.start = function () {
    $('#pb_loader').remove();
    ship = new Ship();

    ship.addShip();
    ship.controls();


    init.addEnemy();
    init.addEnemy();
    init.addEnemy();

};

Init.prototype.addEnemy = function () {
    enemy = new Enemy();
};