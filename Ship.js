function buildRotatedCache(img, dim) {

}

function Ship(game, pos, radius, img, imgDims) {
    //    this.imageCache = buildRotatedCache(img, imgDims);
    movingObject.call(this, game, pos, radius, img, imgDims);
}

Ship.prototype = new movingObject(null, {x: 0, y: 0}, 0, null, {w: 0, h: 0});
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
    this.angle = -Math.atan2(this.game.mouse.x - this.x, this.game.mouse.y - this.y) + (3.1415/2);

    //console.log(this.game.up);
    //console.log("X: " + this.xVel, " Y: " + this.yVel);

    movingObject.prototype.update.call(this);
}
