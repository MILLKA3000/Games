var Enemy = function Enemy(count) {

    this.enemy = new PIXI.Sprite.fromImage('imgs/ship2.gif');

    this.enemy.health = ENEMY_1_HEALTH;

    this.enemy.x = Math.floor((Math.random() * (window.innerWidth)));
    this.enemy.y = -50;

    this.enemy.rotation = 3.15;
    this.enemy.count = count;

    this.enemy.bar = new Health(this);

    init.enemy.addChild(this.enemy);


};

var Health = function Health(enemy) {
    this.bar = new PIXI.Graphics();

    this.bar.w = 40;

    this.bar.beginFill(0xFFFF00);
    this.bar.drawRect(enemy.enemy.x-35,enemy.enemy.y-40 ,this.bar.w, 5);

    return init.enemy.addChild(this.bar);

};