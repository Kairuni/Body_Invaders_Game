const BPHAGE_RADIUS = 75;

class Bacteriophage extends MovingObject {
    constructor(game, pos) {
        super(game, pos, BPHAGE_RADIUS);

        this.hp = 40;

        this.topDownSprites = buildRotatedCache("./assets/Units/Enemies.png", {x: 0, y: 0, w: 150, h: 150}, 4);
        this.animFrames = 4;
        this.animFrameDuration = .10;
        this.animElapsedTimer = 0;
        this.animTime = this.animFrameDuration * this.animFrames;

        this.myBullet = null;
        this.myBulletReset = 0;
        this.myBulletTime = 1;

        this.speed = 250;

        this.score = 400;

        this.mySound = new Sound("./assets/Sound/bacteriophageNom.wav");
    }

    draw(ctx) {
        if (this.testRange() > 1)
            return;

        var cAngle = Math.round(this.angle * (18 / 3.1415));
        cAngle += 9 + 18;
        cAngle = cAngle % 36;
        if (cAngle < 0)
            cAngle += 36;

        var animFrame = Math.floor(this.animElapsedTimer/this.animFrameDuration);

        //console.log(animFrame);
        ctx.drawImage(this.topDownSprites[animFrame][cAngle], this.screenX() - this.radius - ROTATION_BUFFER, this.screenY() - this.radius - ROTATION_BUFFER);

        this.animElapsedTimer += this.game.clockTick;

        if (this.animElapsedTimer > this.animTime)
            this.animElapsedTimer -= this.animTime;

        super.draw(ctx);
    }


    update() {
        if (this.testRange() > 1)
            return;

        var pPos = this.game.player;

        super.aimAtPlayer();

        var bulletPos = {x: this.x + 50 * Math.cos(this.angle), y: this.y + 50 * Math.sin(this.angle)};

        if (this.myBulletReset <= 0 && this.myBullet == null) {
            this.mySound.play();
            this.myBullet = new Bullet(this.game, bulletPos,
                                    this.angle, 0, 20, {x: 0, y: 0, w: 1, h: 1}, this, 20);
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

        super.update();
    }

    destroy() {
        if (this.myBullet)
            this.myBullet.destroy();
        super.destroy();
    }
}
