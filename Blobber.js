const SPTNKJR_RADIUS = 50;

class Blobber extends MovingObject {
    constructor(game, pos) {
        super(game, pos, SPTNKJR_RADIUS);

        this.hp = 200;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Enemies.png");
        this.anim = new Animation(image, 0, 451, 150, 150, 0.15, 4, true, false);

        this.fireTimer = 0;
        this.fireRate = 2;

        this.speed = 20;
    }

    draw(ctx) {
        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 75, this.screenY() - 75);
        super.draw(ctx);
    }


    update() {
        var pPos = this.game.player;

        if (Math.abs(pPos.x - this.x) > 30 || Math.abs(pPos.y - this.y) > 30) {

            this.angle = Math.atan2(pPos.x - this.x, this.y - pPos.y) - (3.1415/2) ;

            this.xVel = this.speed * Math.cos(this.angle);
            this.yVel = this.speed * Math.sin(this.angle);
        } else {
            this.xVel = this.yVel = 0;
            this.myBulletReset -= this.game.clockTick;
        }


        if (this.fireTimer > 0)
            this.fireTimer -= this.game.clockTick;

        if (this.fireTimer <= 0) {
                //console.log("Blobber Should Shoot");
                for (var i = 0; i < 1; i += 1/5) {
                    new Bullet(this.game, {'x': this.x, 'y': this.y}, this.angle - (2/5) + i, 200 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel), 4, 0,
                                    {x: 0, y: 0, w: 0, h: 0}, this, 2);
                }
                this.fireTimer = this.fireRate;
				//mySound.play();
        }

        super.update();
    }

    destroy() {
        if (this.myBullet)
            this.myBullet.destroy();
        super.destroy();
    }
}
