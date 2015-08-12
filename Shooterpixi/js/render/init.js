var Init = function Init() {
    requestAnimationFrame(animate);

    this.stage = new PIXI.Container();
    this.space_movie = new PIXI.Container();
    this.enemy = new PIXI.Container();
    this.shot = new PIXI.Container();

    this.score = new PIXI.Text("SCORE: " + player.PLAYER_SCORE, {font: "14px Helvetica", fill: "white"});
    this.money = new PIXI.Text("MONEY: " + player.PLAYER_MONEY + "$", {font: "14px Helvetica", fill: "white"});

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

    this.spacebg = PIXI.Texture.fromImage("imgs/stars.gif");

    this.space = new PIXI.extras.TilingSprite(this.spacebg, window.innerWidth, window.innerHeight);

    this.stage.addChild(this.space);
    this.stage.addChild(this.enemy);
    this.stage.addChild(this.shot);
    this.stage.addChild(this.space_movie);

    this.score.x = 0;
    this.score.y = 10;

    this.money.x = 0;
    this.money.y = 30;

    this.stage.addChild(this.score);
    this.stage.addChild(this.money);

    document.body.appendChild(this.renderer.view);

    collided = false;
    self = this;

    function animate() {
        requestAnimationFrame(animate);

        init.space.tilePosition.y += 1;

        /**
         * for clear bullets
         */
        init.shot.children.forEach(function (child) {
            child.y -= player.PLAYER_SPEED_SHIP_BULLET;
            if (child.y < -25)
                init.shot.removeChild(child);
        });

        init.enemy.children.forEach(function (child) {
            child.y += child.speedEnemy;
            /**
             * for new ship
             */
            if (child.y >= window.innerHeight + 50) {

                init.enemy.removeChild(child);
                if (init.enemy.children.length < player.ENEMY_COUNT*2) {
                    init.addEnemy();

                }
            }
            /**
             * GAME OVER
             */
            if (child.getBounds().contains(ship.ship.x + 30, ship.ship.y) || child.getBounds().contains(ship.ship.x, ship.ship.y)) {
                //collided = true;
            }

            /**
             * Find collidions
             */
            init.shot.children.forEach(function (bullet) {
                if (child.getBounds().contains(bullet.x, bullet.y)) {
                    child.health -= bullet.damage;
                    init.shot.removeChild(bullet);
                    /**
                     * enemy dead
                     */
                    if (child.health <= 0) {
                        player.PLAYER_SCORE += child.score;
                        player.PLAYER_MONEY += child.money;

                        init.animateDropEnemy(child);

                        init.enemy.removeChild(child);

                        init.score.text = "SCORE: " + player.PLAYER_SCORE;
                        init.money.text = "MONEY: " + player.PLAYER_MONEY + "$";
                        init.addEnemy();
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


/**
 * progress loading
 *
 * @param loader
 * @param resource
 */
Init.prototype.loadProgressHandler = function (loader, resource) {
    $('#pb_loader').text('LOADING...' + ' ' + loader.progress + '%');
};


/**
 * Start game
 */
Init.prototype.start = function () {
    $('#pb_loader').remove();
    ship = new Ship();

    ship.addShip();
    ship.controls();

    for(i=0;i<player.ENEMY_COUNT;i++){
        init.addEnemy();
    }
};

/**
 * Add enemy
 */
Init.prototype.addEnemy = function () {
    enemy = new Enemy(player.SHIPS[Math.floor(Math.random()*player.SHIPS.length)]);
};


/**
 * add animate after crash enemy
 *
 * @param enemy
 */
Init.prototype.animateDropEnemy = function (enemy) {
    init.space.tilePosition.x -= 7;
    setTimeout(function(){
        init.space.tilePosition.x += 7;
    },25);

    boom = new Boom(enemy);
};