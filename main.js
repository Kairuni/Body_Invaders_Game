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

for (var i = 1; i < 6; i++) {
    ASSET_MANAGER.queueImage("./assets/Scene"+i+".png");
}

ASSET_MANAGER.queueImage("./assets/NeedleFull.png");
ASSET_MANAGER.queueImage("./assets/NeedleUpper.png");

class Intro extends Entity {
    constructor(game, pos, radius, team = 2) {
        super(game, {x: 0, y: 0}, {w: 0, h: 0});

        this.game.addEntity(this);

        this.scene = 1;

        this.timer = 0;
        this.game.bossCount = 1;
        this.game.level = 0;
    }

    update() {
        if (!this.pause)
            this.timer += this.game.clockTick;

        if (this.pause && this.game.click && this.clickUp)
            this.pause = false;

        if (!this.game.click)
            this.clickUp = true;

        if (this.timer > 17) {
            this.nextLevelFunction();
        } else if (this.timer > 14) {
            this.image = ASSET_MANAGER.getAsset("./assets/Scene5.png");
            if (this.game.click && this.clickUp) {
                this.timer = 17;
                this.clickUp = false;
            }
        } else if (this.timer > 9.2) {
            this.image = ASSET_MANAGER.getAsset("./assets/Scene4.png");
            if (this.game.click && this.clickUp) {
                this.timer = 14;
                this.clickUp = false;
            }
        } else if (this.timer > 9) {
            this.image = ASSET_MANAGER.getAsset("./assets/Scene3.png");
            if (!this.hasPaused)
                this.pause = true;
            this.hasPaused = true;
        } else if (this.timer > 7) {
            if (this.game.click && this.clickUp) {
                this.timer = 9;
                this.clickUp = false;
            }
            this.image = ASSET_MANAGER.getAsset("./assets/Scene2.png");
        } else {
            if (this.game.click && this.clickUp) {
                this.timer = 7;
                this.clickUp = false;
            }
            this.image = ASSET_MANAGER.getAsset("./assets/Scene1.png");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0);
    }

    nextLevelFunction() {
        this.game.bossCount = 0;
    }

}



// TODO: Add picture of super buff blonde guy getting into the spaceship and then shrink ray'd.
// In a hospital room.

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');

    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    gameEngine.screenWidth = canvas.width;
    gameEngine.screenHeight = canvas.height;

    new Intro(gameEngine);


    //gameEngine.showOutlines = true;

    gameEngine.init(ctx);

    canvas.addEventListener("mousedown", function (e) {
        if (!gameEngine.started)
            gameEngine.start();
    }, false);
});
