var Init;
Init = function Init() {
    requestAnimationFrame(animate);

    this.stage = new PIXI.Container();
    this.enemy = new PIXI.Container();
    this.shot = new PIXI.Container();

    this.score = new PIXI.Text("SCORE: " + SCORE, {font: "14px Helvetica", fill: "white"});
    this.money = new PIXI.Text("MONEY: " + MONEY + "$", {font: "14px Helvetica", fill: "white"});

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
    function animate() {
        requestAnimationFrame(animate);

        init.space.tilePosition.y += 1;

        /**
         * for clear bullets
         */
        init.shot.children.forEach(function (child) {
            child.y -= SPEED_SHIP_BULLET;
            if (child.y < -25)
                init.shot.removeChild(child);

        });

        init.enemy.children.forEach(function (child) {

            child.y += SPEED_SHIP_BULLET;

            /**
             * for new ship
             */
            if (child.y > window.innerHeight + 100) {

                init.enemy.removeChild(child.bar);
                init.enemy.removeChild(child);
                if (init.enemy.children.length < ENEMY_COUNT) {
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
                if (child.getBounds().contains(bullet.x, bullet.y) || child.getBounds().contains(bullet.x - 30, bullet.y)) {
                    child.health -= bullet.damage;
                    init.shot.removeChild(bullet);

                    /**
                     * enemy dead
                     */
                    if (child.health <= 0) {
                        SCORE += 100;
                        MONEY += 5;
                        init.animateDropEnemy(child);

                        init.enemy.removeChild(child.bar);
                        init.enemy.removeChild(child);

                        init.score.text = "SCORE: " + SCORE;
                        init.money.text = "MONEY: " + MONEY + "$";
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

Init.prototype.loadProgressHandler = function (loader, resource) {
    $('#pb_loader').text('LOADING...' + ' ' + loader.progress + '%');
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

Init.prototype.animateDropEnemy = function (enemy) {
    init.space.tilePosition.x -= 7;
    setTimeout(function(){
        init.space.tilePosition.x += 7;
    },25);

    var frames = [];

    for (var i = 0; i < 8; i++) {
        var val = i < 8 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }


    // create a MovieClip (brings back memories from the days of Flash, right ?)
    movie = new PIXI.extras.MovieClip(frames);

    movie.position.set(300);

    movie.x = enemy.x;
    movie.y = enemy.y;

    movie.anchor.set(0.5);
    movie.animationSpeed = 0.2;

    movie.play();

    init.stage.addChild(movie);

    setTimeout(function(){

        init.stage.removeChild(movie);
    },500);


};