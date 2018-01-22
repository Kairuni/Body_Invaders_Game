
function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity(null, [0,0], [0,0]);
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/RobotUnicorn.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();

    var bg = new Background(gameEngine, [0,0], [0,0]);
    
    var movable = new movingObject(gameEngine, [0, 100], 200, 0, 0);

    movable.xVel = 10;

    gameEngine.showOutlines = true;

    gameEngine.addEntity(bg);
    gameEngine.addEntity(movable);

    gameEngine.init(ctx);
    gameEngine.start();
});
