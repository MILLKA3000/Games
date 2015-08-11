var Shot = function Shot() {

    var texture = PIXI.Texture.fromImage('imgs/bullet.png');
    this.shot = new PIXI.Sprite(texture);
    this.shot.damage = BULLET_DAMAGE;

    init.shot.addChild(this.shot);

};
