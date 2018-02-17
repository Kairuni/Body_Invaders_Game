class Bullet extends MovingObject {
    constructor(game, pos, angle, speed, radius, imgDims, owner, damage = 5, scaleBy = 1) {
        super(game, pos, radius);

        this.xVel = speed * Math.cos(angle);
        this.yVel = speed * Math.sin(angle);

        this.angle = angle;

		var image = ASSET_MANAGER.getAsset("./assets/Units/Bullets.png");
		//console.log(imgDims);
		this.anim = new Animation(image, imgDims.x, imgDims.y, imgDims.w, imgDims.h, 0.15, 1, true, false);
        this.imgDims = imgDims;

        this.owner = owner;

        this.dmg = damage;
        this.scale = scaleBy;

        this.team = this.owner.team;

        this.entityType = 2;
    }

    // Bullets only care about colliding with walls, units will handle taking damage themselves.
    update() {
        super.update({ship: false, wall: true, bullet: false}, true);
    }

	draw(ctx) {
		this.anim.drawFrame(this.game.clockTick, ctx, this.screenX() - (this.imgDims.w/2) * this.scale, this.screenY() - (this.imgDims.h/2) * this.scale, this.scale);
		super.draw(ctx);
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
