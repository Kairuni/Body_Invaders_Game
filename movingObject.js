function buildRotatedCache(img, dim) {

}

function movingObject(game, pos, radius, img, imgDims) {
    this.img = img;
    this.xVel = 0;
    this.yVel = 0;
    this.angle = 0;

    this.radius = radius;

    this.imageCache = buildRotatedCache(img, imgDims);

    console.log("Making our moving object.");

    Entity.call(this, game, pos, {w: radius * 2, h: radius * 2});

    console.log("Called ctor and made it out successfully?");
}

movingObject.prototype = new Entity(null, [0,0], [0,0]);
movingObject.prototype.constructor = movingObject;

movingObject.prototype.collide = function(otherEntity) {
    if (otherEntity.radius) {
        deltaX = otherEntity.x - this.x;
        deltaY = otherEntity.y - this.y;
        radii = otherEntity.radius + this.radius;
        return deltaX * deltaX + deltaY * deltaY < radii * radii;
    } else {
        return Entity.prototype.collide.call(this, otherEntity);
    }
}

movingObject.prototype.update = function () {
    this.x += this.xVel * this.game.clockTick;
    this.y += this.yVel * this.game.clockTick;

    Entity.prototype.update.call(this);
}

movingObject.prototype.draw = function (ctx) {

    Entity.prototype.draw.call(this, ctx);
}
