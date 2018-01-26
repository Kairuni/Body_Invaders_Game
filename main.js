function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity(null, [0,0], [0,0]);
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Maps/HeartBackground.png"), 0, 0);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/Units/Allies.png");
ASSET_MANAGER.queueDownload("./assets/Maps/HeartBackground.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;

    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    gameEngine.partitioner = new levelPartitioner({x: 1000, y: 1000}, 20);

    var bg = new Background(gameEngine, {x: 0, y: 0}, {w: 0, h: 0});
    gameEngine.addStaticEntity(bg);

    // These add themselves to the game engine, no need to call addStaticEntity or addEntity
    var topWall = new Wall(gameEngine, {x: 500, y: -10}, {w: 1200, h: 30}, null);
    var botWall = new Wall(gameEngine, {x: 500, y: 790}, {w: 1200, h: 30}, null);
    var leftWall = new Wall(gameEngine, {x: 0, y: 400}, {w: 30, h: 1200}, null);
    var rightWall = new Wall(gameEngine, {x: 1000, y: 400}, {w: 30, h: 1200}, null);

    var RBC = new redBloodCell(gameEngine, {x: 100, y: 280}, 25);
    var WBC = new whiteBloodCell(gameEngine, {x: 100, y: 300}, 25);
    var RBC2 = new redBloodCell(gameEngine, {x: 100, y: 320}, 25);

    var BPhage = new Bacteriophage(gameEngine, {x: 800, y: 100}, 200);

    var playerShip = new Ship(gameEngine, {x: 200, y: 300});

    gameEngine.playerPosition = playerShip;



    RBC.xVel = 20;
    RBC.yVel = -5;
    RBC.angle = -3.1415/12;
    WBC.xVel = 20;
    RBC2.xVel = 20;
    RBC2.yVel = 5;
    RBC2.angle = 3.1415/12;

    gameEngine.showOutlines = true;


    gameEngine.init(ctx);
    gameEngine.start();
});
