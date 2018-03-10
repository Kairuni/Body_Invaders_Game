const BLBR_RADIUS = 50;

class Blobber extends MovingObject {
    constructor(game, pos) {
        super(game, pos, BLBR_RADIUS);

        this.hp = 200;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Enemies.png");
        this.anim = new Animation(image, 0, 451, 150, 150, 0.15, 4, true, false);

        this.fireTimer = 0;
        this.fireRate = 3;

        this.speed = 100;

        this.score = 200;

        this.mySound = new Sound("./assets/Sound/blobberBloop.wav");
    }

    draw(ctx) {
        if (this.testRange() > 1)
            return;

        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 75 * this.scale, this.screenY() - 75 * this.scale, this.scale);
        super.draw(ctx);
    }


    update() {
        if (this.testRange() > 1)
            return;

        var pPos = this.game.player;

        this.angle = Math.atan2(pPos.x - this.x, this.y - pPos.y)// - (3.1415/2) ;

        this.xVel = this.speed * Math.cos(this.angle);
        this.yVel = this.speed * Math.sin(this.angle);

        if (this.testRange() == 0) {
            if (this.fireTimer > 0)
                this.fireTimer -= this.game.clockTick;

            if (this.fireTimer <= 0) {
                    //console.log("Blobber Should Shoot");
                    for (var i = 0; i < 2; i += 2/5) {
                        new Bullet(this.game,
    								{'x': this.x, 'y': this.y},
    								this.angle - (4/5) + i - (3.1415/2), // Aim it at the player
    								100 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel),
    								4,
    								{x: 26, y: 26, w: 25, h: 25},
    								this,
    								2);
                    }
                    this.fireTimer = this.fireRate;
    				this.mySound.play();
            }
        } else {
            super.aimAtPlayer();
        }

        super.update();
    }

    destroy() {
        if (this.myBullet)
            this.myBullet.destroy();
        super.destroy();
    }
}
