class NeedleTop extends Entity {
    constructor(game, pos, owner) {
        super(game, pos, 0);
        this.owner = owner;

        this.img = ASSET_MANAGER.getAsset("./assets/NeedleUpper.png");

        this.game.addEntity(this);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.screenX() - 100, this.screenY());
    }

    update() {
        this.x = this.owner.x;
        this.y = this.owner.y + this.owner.cPos;
        if (this.owner.removeFromWorld)
            this.removeFromWorld = true;
    }
}

class Needle extends Entity {
    constructor(game, pos) {
        super(game, pos, 0);

        this.travelDistance = 1000;
        this.cPos = -this.travelDistance;
        this.cTime = 0;
        this.cycleTime = 1;
        this.currentCycle = 0;

        this.img = ASSET_MANAGER.getAsset("./assets/NeedleFull.png");

        this.game.addEntity(this);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.screenX() - 100, this.screenY() + this.cPos);
    }

    update() {
        this.cTime += this.game.clockTick;

        if (this.currentCycle == 0) {
            this.cPos = this.travelDistance - 300 - (this.travelDistance * (this.cTime / this.cycleTime));

            //console.log(this.cTime);

            if (this.cTime > this.cycleTime) {
                var playerShip = new Ship(this.game, {'x': this.x, 'y': this.y});
                this.game.player = playerShip;
                new NeedleTop(this.game, {'x': this.x, 'y': this.y + this.cPos}, this);
                this.currentCycle += 1;
                this.cTime = 0;
            }
        } else if (this.currentCycle == 1) {
            this.cPos = -300 + (this.travelDistance * (this.cTime / this.cycleTime));

            if (this.cTime > this.cycleTime) {
                this.removeFromWorld = true;
            }
        }
    }

}
