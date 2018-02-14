const SPTNKJR_RADIUS = 75;

class SputnikJr extends movingObject {
    constructor(game, pos) {
        super(game, pos, SPTNKJR_RADIUS);

        this.hp = 225;

        this.topDownSprites = buildRotatedCache("./assets/Units/Enemies.png", {x: 0, y:451 , w: 150, h: 150}, 4);
        this.animFrames = 4;
        this.animFrameDuration = .10;
        this.animElapsedTimer = 0;
        this.animTime = this.animFrameDuration * this.animFrames;

        this.myBullet = null;
        this.myBulletReset = 0;
        this.myBulletTime = 1;

        this.speed = 20;
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

/*         var bulletPos = {x: this.x + 50 * Math.cos(this.angle), y: this.y + 50 * Math.sin(this.angle)};

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
        } */
		        if (this.fireTimer > 0)
            this.fireTimer -= this.game.clockTick;

        if (this.fireTimer <= 0) {
            if (this.game.click) {
                var myBullet1 = new Bullet(this.game, 0, 0, 600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel), 2, 0,
                                                        {x: 0, y: 0, w: 0, h: 0}, this, 2);
                var myBullet1 = new Bullet(this.game, 0, 90, 600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel), 2, 0,
                                                        {x: 0, y: 0, w: 0, h: 0}, this, 2);
                var myBullet1 = new Bullet(this.game, 0, 180, 600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel), 2, 0,
                                                        {x: 0, y: 0, w: 0, h: 0}, this, 2);
                var myBullet1 = new Bullet(this.game, 0, 270, 600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel), 2, 0,
                                                        {x: 0, y: 0, w: 0, h: 0}, this, 2);
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
