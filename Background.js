const BG_TIMER = 1.333;

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
    this.timer = 0;

    this.mySound = new Sound("./assets/Sound/heartBeat.wav");
}

Background.prototype = new Entity(null, [0,0], [0,0]);
Background.prototype.constructor = Background;

Background.prototype.update = function () {
    this.timer += this.game.clockTick;
}

Background.prototype.draw = function (ctx) {
    if (this.timer < BG_TIMER) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Maps/HeartBackground.png"), 0, 0);
    } else if (this.timer >= BG_TIMER && this.timer < BG_TIMER + .05) {
        this.mySound.play();
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Maps/HeartBackground2.png"), 0, 0);
    } else if (this.timer >= BG_TIMER + .05 && this.timer < BG_TIMER + .1) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Maps/HeartBackground3.png"), 0, 0);
    } else if (this.timer >= BG_TIMER + .1) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Maps/HeartBackground2.png"), 0, 0);
    }
    if (this.timer >= BG_TIMER + .15) {
        this.timer = 0;
    }
}
