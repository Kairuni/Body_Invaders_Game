const BPHAGE_RADIUS = 80;

class Bacteriophage extends movingObject {
    constructor(game, pos) {
        super(game, pos, BPHAGE_RADIUS);

        this.hp = 160;

        //var image = ASSET_MANAGER.getAsset("./assets/Units/Enemies.png");
        //this.anim = new Animation(image, 0, 0, 200, 200, 0.25, 4, true, false);

        this.myBullet = null;
        this.myBulletReset = 0;
        this.myBulletTime = 1;

        this.speed = 100;
    }

    draw(ctx) {
        //this.anim.drawFrame(this.game.clockTick, ctx, this.x - 50, this.y - 50);
        super.draw(ctx);
    }

    update() {
        var pPos = this.game.playerPosition;

        this.angle = Math.atan2(pPos.x - this.x, this.y - pPos.y) - (3.1415/2);

        var bulletPos = {x: this.x + 50 * Math.cos(this.angle), y: this.y + 80 * Math.sin(this.angle)};

        if (this.myBulletReset <= 0 && this.myBullet == null) {
            this.myBullet = new Bullet(this.game, bulletPos,
                                    this.angle, 0, 40, 0,
                                    {x: 0, y: 0, w: 0, h: 0}, this, 20);
            this.myBulletReset = this.myBulletTime;
        } else if (this.myBullet != null) {
            this.game.partitioner.removeFromGrid(this.myBullet, this.myBullet.entityType);
            this.myBullet.x = bulletPos.x;
            this.myBullet.y = bulletPos.y;
            this.game.partitioner.addToGrid(this.myBullet, this.myBullet.entityType);
            this.myBulletReset = this.myBulletTime;
        } else {
            this.myBulletReset -= this.game.clockTick;
            //console.log(this.myBulletReset);
        }

        this.xVel = this.speed * Math.cos(this.angle);
        this.yVel = this.speed * Math.sin(this.angle);

        super.update();
    }

    destroy() {
        if (this.myBullet)
            this.myBullet.destroy();
        super.destroy();
    }
}
