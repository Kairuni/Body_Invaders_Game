class Ship extends MovingObject {

	//var mySound;

    constructor(game, pos) {
        super(game, pos, 40);
        this.hp = 100;

        this.fireRate = .2;
        this.fireTimer = 0;

        this.animFrames = 4;
        this.animFrameDuration = .25;
        this.animElapsedTimer = 0;
        this.animTime = this.animFrameDuration * this.animFrames;

        this.topDownSprites = buildRotatedCache("./assets/Units/Allies.png", {x: 0, y: 0, w: 100, h: 100}, this.animFrames);
        this.rightTiltSprites = buildRotatedCache("./assets/Units/Allies.png", {x: 0, y: 101, w: 100, h: 100}, 1);
        this.leftTiltSprites = buildRotatedCache("./assets/Units/Allies.png", {x: 0, y: 201, w: 100, h: 100}, 1);

        this.mySound = new Sound("./assets/Sound/playerLaser.wav");

    }

    update() {
        if (this.game.up) this.yVel = -200;
        else if (this.game.down) this.yVel = 200;
        else this.yVel = 0;

        if (this.game.left) this.xVel = -200;
        else if (this.game.right) this.xVel = 200;
        else this.xVel = 0;

        if (this.xVel != 0 && this.yVel != 0) {
            // Diagonal movement speed shenanigans.
            this.xVel *= .707;
            this.yVel *= .707;
        }

        // Angle:
        //this.angle = Math.atan2(this.game.mouse.x - this.x, this.y - this.game.mouse.y) - (3.1415/2);
        // Courtesy of the camera code:
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
				this.mySound.play();
            }
        }

        super.update();
    }

    draw(ctx) {
        var cAngle = Math.round(this.angle * (18 / 3.1415));
        cAngle += 9;
        cAngle = cAngle % 36;
        if (cAngle < 0)
            cAngle += 36;

        var animFrame = Math.floor(this.animElapsedTimer/this.animFrameDuration);

        //console.log(animFrame);
        ctx.drawImage(this.topDownSprites[animFrame][cAngle], this.game.screenWidth/2 - 50 - ROTATION_BUFFER, this.game.screenHeight/2 - 50 - ROTATION_BUFFER);

        this.animElapsedTimer += this.game.clockTick;

        if (this.animElapsedTimer > this.animTime)
            this.animElapsedTimer -= this.animTime;

        super.draw(ctx);
    }
}
