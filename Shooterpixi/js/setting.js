var SPEED_SHIP_BULLET = 3;
var SPEED_SHIP_SHOT = 250; // ms
var BULLET_DAMAGE = 10;
var ENEMY_COUNT = 5;
var ENEMY_1_HEALTH = 20;
var SCORE = 0;
var MONEY = 0;

var ejecta = ejecta || null,
    app = [
        'render.init',
        'loader.assets',
        'player.shot',
        'player.ship',
        'enemy.ship'
    ],
    init = {
        event: 'shooter'
    },
    loader = 'browser',
    baseURL = '/js/';

_li.core.init(app, init, baseURL, loader);
