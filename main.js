function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity(null, [0,0], [0,0]);
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,800,800);
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
    gameEngine.partitioner = new levelPartitioner({x: 1000, y: 1000}, 20);

    var bg = new Background(gameEngine, {x: 0, y: 0}, {w: 0, h: 0});

    var movable = new movingObject(gameEngine, {x: 0, y: 290}, 25, 0, {w: 0, h: 0});
    var movable2 = new movingObject(gameEngine, {x: 0, y: 300}, 25, 0, {w: 0, h: 0});
    var movable3 = new movingObject(gameEngine, {x: 0, y: 310}, 25, 0, {w: 0, h: 0});
    var playerShip = new Ship(gameEngine, {x: 200, y: 300}, 30, 0, {w: 0, h: 0})

    movable.xVel = 20;
    movable.yVel = -5;
    movable.angle = -3.14/10;
    movable2.xVel = 20;
    movable3.xVel = 20;
    movable3.yVel = 5;
    movable3.angle = 3.14/10;

    gameEngine.showOutlines = true;

    gameEngine.addEntity(bg);
    gameEngine.addEntity(movable);
    gameEngine.addEntity(movable2);
    gameEngine.addEntity(movable3);
    gameEngine.addEntity(playerShip);

    gameEngine.init(ctx);
    gameEngine.start();
});
