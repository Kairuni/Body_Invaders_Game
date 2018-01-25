

function movingObject(game, pos, radius, img, imgDims) {
    this.img = img;
    this.xVel = 0;
    this.yVel = 0;
    this.angle = 0;

    this.radius = radius;

    this.shipCollide = false;
    this.wallCollide = true;
    this.bulletCollide = false;

    this.colliding = false;

    Entity.call(this, game, pos, {w: radius * 2, h: radius * 2});
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
    var prevX = this.x;
    var prevY = this.y;

    // Remove from partitioner
    this.game.partitioner.removeFromGrid(this, 1);

    this.x += this.xVel * this.game.clockTick;
    this.y += this.yVel * this.game.clockTick;

    // Test for collisions
    var collisions = this.game.partitioner.testCollide(this);
    // If colliding, set this flag for debug drawing.
    this.colliding = false;
    if (collisions.ship.length > 0 || collisions.wall.length > 0 || collisions.bullet.length > 0)
        this.colliding = true;

    this.handleCollisions(collisions);

    // Add back to partitioner
    this.game.partitioner.addToGrid(this, 1);

    Entity.prototype.update.call(this);
}

movingObject.prototype.handleCollisions = function(collisions) {

}

movingObject.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this, ctx);
    if (this.colliding) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
    }
    ctx.strokeStyle = "Green";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.radius * Math.cos(this.angle), this. y + this.radius * Math.sin(this.angle));
    ctx.stroke();
}
