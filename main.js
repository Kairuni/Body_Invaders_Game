// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

unitList = ["Allies.png", "Enemies.png", "Bullets.png", "Bosses.png", "Boosts.png"];
mapList = ["HeartBackground.png", "HeartBackground2.png", "HeartBackground3.png", "CellFloor.png", "CellWall.png"];

for (var i = 0; i < unitList.length; i++) {
    ASSET_MANAGER.queueImage("./assets/Units/" + unitList[i]);
}
for (var i = 0; i < mapList.length; i++) {
    ASSET_MANAGER.queueImage("./assets/Maps/" + mapList[i]);
}

audioList = ["playerLaser.wav", "bacteriophageNom.wav", "blobberBloop.wav", "heartBeat.wav", "mosaicShed.wav", "sputnikFwoosh.wav"];

for (var i = 0; i < audioList.length; i++) {
    ASSET_MANAGER.queueAudio("./assets/Sound/" + audioList[i]);
}

ASSET_MANAGER.queueImage("./assets/NeedleFull.png");
ASSET_MANAGER.queueImage("./assets/NeedleUpper.png");

// TODO: Add picture of super buff blonde guy getting into the spaceship and then shrink ray'd.
// In a hospital room.

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');

    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    gameEngine.screenWidth = canvas.width;
    gameEngine.screenHeight = canvas.height;

    levelBuilder(gameEngine, Level1.mapData, Level1.bloodPaths);

    //gameEngine.showOutlines = true;

    gameEngine.init(ctx);

    canvas.addEventListener("mousedown", function (e) {
        if (!gameEngine.started)
            gameEngine.start();
    }, false);
});
