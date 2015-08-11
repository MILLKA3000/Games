var Enemy = function Enemy(count) {

    this.enemy = new PIXI.Sprite.fromImage('imgs/ship2.gif');

    this.enemy.health = ENEMY_1_HEALTH;

    this.enemy.bar = new PIXI.Graphics();


    this.enemy.x = Math.floor((Math.random() * (window.innerWidth)));
    this.enemy.y = -50;

    this.enemy.bar.beginFill(0xFFFF00);
    this.enemy.bar.drawRect(this.enemy.x-35, this.enemy.y-40, 40, 5);

    this.enemy.rotation = 3.15;
    this.enemy.count = count;

    init.enemy.addChild(this.enemy.bar);
    init.enemy.addChild(this.enemy);


};