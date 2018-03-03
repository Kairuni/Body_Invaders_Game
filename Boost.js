class Boost extends Entity {
    constructor(game, pos) {
        super(game, pos, {'w': 100, 'h': 100});

        var img = ASSET_MANAGER.getAsset("./assets/Units/Boosts.png");

        var type = Math.floor(Math.random() * 3);

        this.type = type;

        //console.log(this.type);

        var xStart = 100 * this.type + (this.type > 0 ? 1 : 0);

        //console.log(xStart);

        this.anim = new Animation(img, xStart, 0, 99, 100, 0.15, 1, true, false);

        this.game.addEntity(this);
    }

    update() {
        var pShip = this.game.player;
        if (this.collide(pShip) && !this.removeFromWorld) {
            if (this.type == 0) {
                pShip.hp += 20;
                if (pShip.hp > pShip.maxHp)
                    pShip.hp = pShip.maxHp;
            } else if (this.type == 1) {
                pShip.velBuff = 200;
                pShip.velBuffTimer = 15;
            } else if (this.type == 2) {
                pShip.bulletBuff = 10;
                pShip.bulletBuffTimer = 20;
            }

            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 50, this.screenY() - 50);
        super.draw(ctx);
    }
}
