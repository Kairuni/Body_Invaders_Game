const SPTNK_RADIUS = 35;

class Sputnik extends MovingObject {
    constructor(game, pos) {
        super(game, pos, SPTNK_RADIUS);

        this.hp = 100;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Enemies.png");
        this.anim = new Animation(image, 0, 301, 150, 150, 0.15, 4, true, false);

        this.fireTimer = 0;
        this.fireRate = 5;

        this.speed = 50;

        this.score = 400;

        this.mySound = new Sound("./assets/Sound/sputnikFwoosh.wav");
    }

    draw(ctx) {
        if (this.testRange())
            return;

        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 75, this.screenY() - 75);
        super.draw(ctx);
    }


    update() {
        if (this.testRange())
            return;

        var pPos = this.game.player;

        //if (Math.abs(pPos.x - this.x) > 30 || Math.abs(pPos.y - this.y) > 30) {

        this.angle = Math.atan2(pPos.x - this.x, this.y - pPos.y) + (3.1415/2) ;

        this.xVel = this.speed * Math.cos(this.angle);
        this.yVel = this.speed * Math.sin(this.angle);
        //} else {
    //        this.xVel = this.yVel = 0;
    //    }


        if (this.fireTimer > 0)
            this.fireTimer -= this.game.clockTick;

        if (this.fireTimer <= 0) {
                //console.log("Sputnik Should Shoot");
                for (var i = 0; i < 2 * 3.1415; i += 3.1415 / 8) {
                    new Bullet(this.game,
								{'x': this.x, 'y': this.y},
								0 + i,
								200 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel),
								2,
								{x: 76, y: 26, w: 25, h: 25},
								this,
								3);
                }
                this.mySound.play();
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
