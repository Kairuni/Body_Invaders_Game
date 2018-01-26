// LOTS OF MAGIC NUMBER, fix that.

// The player ship, so this is all kinda set.
function Ship(game, pos) {
    this.hp = 100;

    this.fireRate = .2;
    this.fireTimer = 0;

    this.radius = 50;

    this.animFrames = 4;
    this.animFrameDuration = .25;
    this.animElapsedTimer = 0;
    this.animTime = this.animFrameDuration * this.animFrames;

    this.topDownSprites = buildRotatedCache("./assets/Units/Allies.png", {x: 0, y: 0, w: 100, h: 100}, this.animFrames);
    this.rightTiltSprites = buildRotatedCache("./assets/Units/Allies.png", {x: 0, y: 101, w: 100, h: 100}, 1);
    this.leftTiltSprites = buildRotatedCache("./assets/Units/Allies.png", {x: 0, y: 201, w: 100, h: 100}, 1);
    movingObject.call(this, game, pos, this.radius);
}

Ship.prototype = new movingObject(null, {x: 0, y: 0}, 0);
Ship.prototype.constructor = movingObject;

Ship.prototype.update = function () {
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
    this.angle = Math.atan2(this.game.mouse.x - this.x, this.y - this.game.mouse.y) - (3.1415/2);

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
        }
    }

    movingObject.prototype.update.call(this);
}

Ship.prototype.draw = function (ctx) {
    var cAngle = Math.round(this.angle * (18 / 3.1415));
    cAngle += 9;
    cAngle = cAngle % 36;
    if (cAngle < 0)
        cAngle += 36;

    var animFrame = Math.floor(this.animElapsedTimer/this.animFrameDuration);

    //console.log(animFrame);
    ctx.drawImage(this.topDownSprites[animFrame][cAngle], this.x - this.radius - ROTATION_BUFFER, this.y - this.radius - ROTATION_BUFFER);

    this.animElapsedTimer += this.game.clockTick;

    if (this.animElapsedTimer > this.animTime)
        this.animElapsedTimer -= this.animTime;
        
    movingObject.prototype.draw.call(this, ctx);
}
