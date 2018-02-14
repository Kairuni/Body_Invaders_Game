const SPTNK_RADIUS = 75;

class Sputnik extends movingObject {
    constructor(game, pos) {
        super(game, pos, SPTNK_RADIUS);

        this.hp = 300;

        this.topDownSprites = buildRotatedCache("./assets/Units/Enemies.png", {x: 0, y: 301, w: 150, h: 150}, 4);
        this.animFrames = 4;
        this.animFrameDuration = .10;
        this.animElapsedTimer = 0;
        this.animTime = this.animFrameDuration * this.animFrames;

        this.myBullet = null;
        this.myBulletReset = 0;
        this.myBulletTime = 1;

        this.speed = 50;
    }

    draw(ctx) {
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
        var pPos = this.game.player;

        if (Math.abs(pPos.x - this.x) > 30 || Math.abs(pPos.y - this.y) > 30) {

            this.angle = Math.atan2(pPos.x - this.x, this.y - pPos.y) - (3.1415/2) ;

            this.xVel = this.speed * Math.cos(this.angle);
            this.yVel = this.speed * Math.sin(this.angle);
        } else {
            this.xVel = this.yVel = 0;
            this.myBulletReset -= this.game.clockTick;
        }

        var bulletPos = {x: this.x + 50 * Math.cos(this.angle), y: this.y + 50 * Math.sin(this.angle)};

        if (this.myBulletReset <= 0 && this.myBullet == null) {
            this.myBullet = new Bullet(this.game, bulletPos,
                                    this.angle, 0, 20, 0,
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
		
		        this.angle = Math.atan2(this.game.mouse.x - this.game.screenWidth/2, this.game.screenHeight/2 - this.game.mouse.y) - (3.1415/2);

        if (this.fireTimer > 0)
            this.fireTimer -= this.game.clockTick;

        if (this.fireTimer <= 0) {
            if (this.game.click) {
                var myBullet1 = new Bullet(this.game, {x: this.x + 34 * Math.cos(this.angle - (3.1415/4)),
                                                        y: this.y + 34 * Math.sin(this.angle - (3.1415/4))},
                                                        this.angle, 600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel), 2, 0,
                                                        {x: 0, y: 0, w: 0, h: 0}, this, 2);
                var myBullet1 = new Bullet(this.game, {x: this.x + 34 * Math.cos(this.angle + (3.1415/4)),
                                                        y: this.y + 34 * Math.sin(this.angle + (3.1415/4))},
                                                        this.angle, 600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel), 2, 0,
                                                        {x: 0, y: 0, w: 0, h: 0}, this, 2);
                this.fireTimer = this.fireRate;
				//mySound.play();
            }
        }

        super.update();
    }

    destroy() {
        if (this.myBullet)
            this.myBullet.destroy();
        super.destroy();
    }
}
