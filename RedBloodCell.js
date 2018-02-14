const RBC_RADIUS = 44;

class RedBloodCell extends MovingObject {
    constructor(game, pos) {
        super(game, pos, RBC_RADIUS);

        this.hp = 20;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Allies.png");
        this.anim = new Animation(image, 0, 301, 100, 100, 0.25, 4, true, false);
    }

    draw(ctx) {
        if (this.testRange())
            return;
            
        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 50, this.screenY() - 50);
        super.draw(ctx);
    }
}
