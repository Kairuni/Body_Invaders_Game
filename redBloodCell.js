const RBC_RADIUS = 44;

class redBloodCell extends movingObject {
    constructor(game, pos) {
        super(game, pos, RBC_RADIUS);

        this.hp = 20;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Allies.png");
        this.anim = new Animation(image, 0, 301, 100, 100, 0.25, 4, true, false);
    }

    draw(ctx) {
        this.anim.drawFrame(this.game.clockTick, ctx, this.x - 50, this.y - 50);
        super.draw(ctx);
    }
}
