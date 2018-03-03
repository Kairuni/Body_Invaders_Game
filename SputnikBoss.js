const SPTNKBOSS_RADIUS = 120;
const SPTNKBOSS_FIREDURATION = 3;
const SPTNKBOSS_COOLDOWN = 1.2;

class SputnikBoss extends MovingObject {
    constructor(game, pos) {
        super(game, pos, SPTNKBOSS_RADIUS);

        this.hp = 1000;

        var image = ASSET_MANAGER.getAsset("./assets/Units/Bosses.png");
        this.anim = new Animation(image, 0, 0, 300, 300, 0.15, 4, true, false);

        this.fireTimer = 0;
        this.fireRate = .4;
        this.cooldownClock = 0;

        this.speed = 50;

        this.score = 6000;

        this.game.bossCount += 1;
    }

    draw(ctx) {
        if (this.testRange() > 1)
            return;

        this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - 300, this.screenY() - 300, 2);
        super.draw(ctx);
    }


    update() {
        if (this.testRange() > 1)
            return;

        var pPos = this.game.player;

        this.angle += (3.1415 / 12) * (this.game.clockTick);

        if (this.x < pPos.x)
            this.x += 25 * this.game.clockTick;
        else if (this.x > pPos.x)
            this.x -= 25 * this.game.clockTick;
        if (this.y < pPos.y)
            this.y += 25 * this.game.clockTick;
        else if (this.y > pPos.y)
            this.y -= 25 * this.game.clockTick;

        if (this.fireTimer > 0)
            this.fireTimer -= this.game.clockTick;

        this.cooldownClock += this.game.clockTick;

        if (this.cooldownClock > SPTNKBOSS_FIREDURATION) {
            this.fireTimer = SPTNKBOSS_COOLDOWN;
            this.cooldownClock = -SPTNKBOSS_COOLDOWN;
        }

        if (this.fireTimer <= 0) {
                //console.log("Sputnik Should Shoot");
                for (var i = 0; i < 2 * 3.1415; i += 3.1415 / 8) {
                    new Bullet(this.game,
								{'x': this.x, 'y': this.y},
								this.angle + i,
								250,
								2,
								{x: 76, y: 26, w: 25, h: 25},
								this,
								2);
                }
                this.fireTimer = this.fireRate;
				//mySound.play();
        }

        super.update();
    }

    destroy() {
        if (!this.removeFromWorld)
            this.game.bossCount -= 1;

        super.destroy();
    }
}
