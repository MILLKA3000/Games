var Enemy = function Enemy(ship) {
    this.enemy = new sceletonEnemy(ship.IMG);
    this.enemy.health = ship.HEALTH;
    this.enemy.speedEnemy = ship.SPEED;
    this.enemy.score = ship.SCORE;
    this.enemy.money = ship.MONEY;
    //this.enemy.bar = this.Health();
    init.enemy.addChild(this.enemy);


};



var sceletonEnemy = function sceletonEnemy(url){
    enemy = new PIXI.Sprite.fromImage(url);
    enemy.x = Math.floor((Math.random() * (window.innerWidth)));
    enemy.y = -50;
    enemy.rotation = 3.15;
    return enemy;
};



//
//Enemy.prototype.Health = function () {
//    console.log(this.enemy);
//    this.enemy.bar = new PIXI.Graphics();
//    this.enemy.bar.w = 40;
//    this.enemy.bar.beginFill(0xFFFF00);
//    this.enemy.bar.drawRect(this.enemy.x-35,this.enemy.y-70 ,enemy.bar.w, 5);
//
//    return init.enemy.addChild(this.enemy.bar);
//};