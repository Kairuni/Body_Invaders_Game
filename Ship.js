const PLAYER_VEL = 225;

class Ship extends MovingObject {
    constructor(game, pos) {
        super(game, pos, 40);

        this.team = 0;

        this.maxHp = 100;
        this.hp = this.maxHp;

        this.fireRate = .2;
        this.fireTimer = 0;

        this.animFrames = 4;
        this.animFrameDuration = .25;
        this.animElapsedTimer = 0;
        this.animTime = this.animFrameDuration * this.animFrames;

        this.topDownSprites = buildRotatedCache("./assets/Units/Allies.png", {x: 0, y: 0, w: 100, h: 100}, this.animFrames);

        this.mySound = new Sound("./assets/Sound/playerLaser.wav");

        this.bulletDamage = 8;
        this.bulletBuff = 0; //300;
        this.bulletBuffTimer = -1; //600;

        this.velBuff = 0; // 200;
        this.velBuffTimer = 0; // 600;
    }

    update() {
        if (this.game.up) this.yVel = -(PLAYER_VEL + this.velBuff);
        else if (this.game.down) this.yVel = (PLAYER_VEL + this.velBuff);
        else this.yVel = 0;

        if (this.game.left) this.xVel = -(PLAYER_VEL + this.velBuff);
        else if (this.game.right) this.xVel = (PLAYER_VEL + this.velBuff);
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

        if (this.bulletBuffTimer > 0) {
            this.bulletBuffTimer -= this.game.clockTick;
            if (this.bulletBuffTimer <= 0)
                this.bulletBuff = 0;
        }

        if (this.velBuffTimer > 0) {
            this.velBuffTimer -= this.game.clockTick;
            if (this.velBuffTimer <= 0)
                this.velBuff = 0;
        }


        if (this.fireTimer <= 0) {
            if (this.game.click) {
                var myBullet1 = new Bullet(this.game,
											{x: this.x + 34 * Math.cos(this.angle - (3.1415/4)), y: this.y + 34 * Math.sin(this.angle - (3.1415/4))},
											this.angle,
											600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel),
											this.bulletBuff > 0 ? 4 : 2,
											{x: 0, y: 0, w: 25, h: 25},
											this,
											this.bulletDamage + this.bulletBuff,
                                            this.bulletBuff > 0 ? 2 : 1);
                var myBullet2 = new Bullet(this.game,
											{x: this.x + 34 * Math.cos(this.angle + (3.1415/4)), y: this.y + 34 * Math.sin(this.angle + (3.1415/4))},
											this.angle,
											600 + Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel),
											this.bulletBuff > 0 ? 4 : 2,
											{x: 0, y: 0, w: 25, h: 25},
											this,
											this.bulletDamage + this.bulletBuff,
                                            this.bulletBuff > 0 ? 2 : 1);

                this.fireTimer = this.fireRate;
				this.mySound.play();
            }
        }

        super.update(); //{ship: false, wall: false, bullet: true});
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
