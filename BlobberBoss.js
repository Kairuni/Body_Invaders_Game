const BLBRBOSS_RADIUS = 200;

class BlobberBoss extends MovingObject {
    constructor(game, pos) {
        super(game, pos, BLBRBOSS_RADIUS);

        this.hp = 2000;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Bosses.png");
        this.anim = new Animation(image, 0, 301, 300, 300, 0.15, 4, true, false);

        this.fireTimer = 0;
        this.fireRate = 1;

        this.score = 50000;

        this.speed = 20;
    }

    draw(ctx) {
        if (this.testRange())
            return;

        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 300, this.screenY() - 300, 2);
        super.draw(ctx);
    }


    update() {
        if (this.testRange())
            return;

        var pPos = this.game.player;


        this.angle = Math.atan2(pPos.x - this.x, this.y - pPos.y);// - (3.1415/2) ;

        this.xVel = this.speed * Math.cos(this.angle);
        this.yVel = this.speed * Math.sin(this.angle);


        if (this.fireTimer > 0)
            this.fireTimer -= this.game.clockTick;

        if (this.fireTimer <= 0) {
                //console.log("Blobber Should Shoot");
                for (var i = 0; i < 7/5; i += 1/5) {
                    new Bullet(this.game,
								{'x': this.x, 'y': this.y},
								this.angle - (3/5) + i - (3.1415/2),
								150 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel),
								8,
								{x: 0, y: 26, w: 25, h: 25},
								this,
								10);
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

        this.game.win = true;
    }
}
