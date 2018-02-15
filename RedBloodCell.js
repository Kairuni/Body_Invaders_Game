const RBC_RADIUS = 44;

class RedBloodCell extends MovingObject {
    constructor(game, path) {
        super(game, path[0], RBC_RADIUS);

        this.hp = 20;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Allies.png");
        this.anim = new Animation(image, 0, 301, 100, 100, 0.25, 4, true, false);

        this.path = path;
        this.pathIdx = 0;
    }

    update() {

        var nPos = this.path[this.pathIdx];

        if (!Math.abs(nPos.x - this.x) > 30 || Math.abs(nPos.y - this.y) > 30) {

            this.angle = Math.atan2(nPos.x - this.x, this.y - nPos.y) - (3.1415/2) ;

            this.xVel = this.speed * Math.cos(this.angle);
            this.yVel = this.speed * Math.sin(this.angle);
        } else {
            this.pathIdx += 1;
            if (this.pathIdx >= this.path.length) {
                this.destroy();
                return;
            }
        }

        super.update();
    }

    draw(ctx) {
        if (this.testRange())
            return;

        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 50, this.screenY() - 50);
        super.draw(ctx);
    }
}
