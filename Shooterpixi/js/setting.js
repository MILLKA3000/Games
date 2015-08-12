PIXI.loader.add("player", "js/data/players.json").load(setting);

var player;

function setting(){
    player = PIXI.loader.resources.player.data.players;
}

var ejecta = null,
        app = [
            'render.init',
            'loader.assets',
            'player.shot',
            'player.ship',
            'enemy.ship',
            'animate.animate',
            'loader.start'
        ],
        init = {
            event: 'shooters'
        },
        loader = 'browser',
        baseURL = '/js/';

    _li.core.init(app, init, baseURL, loader);
