class Bullet extends movingObject {
    constructor(game, pos, angle, speed, radius, img, imgDims, owner, damage = 5) {
        super(game, pos, radius);

        this.xVel = speed * Math.cos(angle);
        this.yVel = speed * Math.sin(angle);

        this.angle = angle;

        this.owner = owner;

        this.dmg = damage;

        this.entityType = 2;
    }

    // Bullets only care about colliding with walls, units will handle taking damage themselves.
    update() {
        super.update({ship: false, wall: true, bullet: false});
    }

    handleCollisions(colliders) {
        if (colliders.wall.length > 0)
            this.destroy();
    }

    // Bullet 'pop' animation needs to be made here.
    destroy() {
        this.removeFromWorld = true;
        this.game.partitioner.removeFromGrid(this, this.entityType);
        if (this.owner.myBullet) {
            this.owner.myBullet = null;
        }
    }
}
