var Boom = function Boom(enemy) {

    var frames = [];

    for (var i = 0; i < 8; i++) {
        var val = i < 8 ? '0' + i : i;
        frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    // create a MovieClip
    this.movie = new PIXI.extras.MovieClip(frames);

    this.movie.position.set(300);

    this.movie.x = enemy.x;
    this.movie.y = enemy.y;

    this.movie.anchor.set(0.5);
    this.movie.animationSpeed = 0.5;

    //this.movie.scale = 1.5;

    this.movie.rotation = 1.5;

    this.movie.play();

    init.space_movie.addChild(this.movie);

    setTimeout(function(){
        init.space_movie.children.forEach(function (m) {
            init.space_movie.removeChild(m);
        });
    },250);

};