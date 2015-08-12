var Shot = function Shot() {

    var texture = PIXI.Texture.fromImage('imgs/bullet.png');
    this.shot = new PIXI.Sprite(texture);
    this.shot.damage = player.PLAYER_BULLET_DAMAGE;

    init.shot.addChild(this.shot);

};
