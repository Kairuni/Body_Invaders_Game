class MovingObject extends Entity {
    constructor(game, pos, radius, team = 2) {
        super(game, pos, {w: radius * 2, h: radius * 2});

        this.xVel = 0;
        this.yVel = 0;
        this.angle = 0;

        this.radius = radius;

        this.shipCollide = false;
        this.wallCollide = true;
        this.bulletCollide = false;

        this.colliding = false;

        this.entityType = 1;

        this.team = team;

        this.score = -100;

        this.scale = 1;
        this.dying = false;
        this.dyingTimer = 0;

        if (game)
            game.addEntity(this);
    }

    collide(otherEntity) {
        if (otherEntity.radius) {
            var deltaX = otherEntity.x - this.x;
            var deltaY = otherEntity.y - this.y;
            var radii = otherEntity.radius + this.radius;
            return deltaX * deltaX + deltaY * deltaY < radii * radii;
        } else {
            return Entity.prototype.collide.call(this, otherEntity);
        }
    }

    aimAtPlayer() {
        var pPos = this.game.player;

        if (Math.abs(pPos.x - this.x) > 30 || Math.abs(pPos.y - this.y) > 30) {

            this.angle = Math.atan2(pPos.x - this.x, this.y - pPos.y) - (3.1415/2) ;

            this.xVel = this.speed * Math.cos(this.angle);
            this.yVel = this.speed * Math.sin(this.angle);
        } else {
            this.xVel = this.yVel = 0;
            this.myBulletReset -= this.game.clockTick;
        }
    }

    update(colTest = {ship: true, wall: true, bullet: true}, ignoreRange = false) {
        if (this.testRange() > 1 && !ignoreRange)
            return;


        if (this.dying) {
            this.dyingTimer += this.game.clockTick;
            this.scale = (1 - this.dyingTimer * 10);
            if (this.dyingTimer > .10)
                this.removeFromWorld = true;

            return;
        }

        // Remove from partitioner
        this.game.partitioner.removeFromGrid(this, this.entityType);

        this.x += this.xVel * this.game.clockTick;
        this.y += this.yVel * this.game.clockTick;

        // Test for collisions
        var collisions = this.game.partitioner.testCollide(this, colTest);

        // If colliding, set this flag for debug drawing.
        this.colliding = false;
        if (collisions.ship.length > 0 || collisions.wall.length > 0 || (collisions.bullet.length > 0 && collisions.bullet[0].owner != this))
            this.colliding = true;

        this.handleCollisions(collisions);

        // Add back to partitioner
        this.game.partitioner.addToGrid(this, this.entityType);

        Entity.prototype.update.call(this);

        this.prevX = this.x;
        this.prevY = this.y;
    }

    handleCollisions(collisions) {
        for (var i = 0; i < collisions.wall.length; i++) {
            //console.log("COLLIDING");
            var wall = collisions.wall[i];

            var x1Off = (wall.x - (wall.w / 2)) - (this.x + (this.radius)) - .1;
            var x2Off = (wall.x + (wall.w / 2)) - (this.x - (this.radius)) + .1;
            var y1Off = (wall.y - (wall.h / 2)) - (this.y + (this.radius)) - .1;
            var y2Off = (wall.y + (wall.h / 2)) - (this.y - (this.radius)) + .1;

            //console.log (x1Off + ", " + x2Off + ", " + y1Off + ", " + y2Off);

            var smallest = Math.min(Math.abs(x1Off), Math.abs(x2Off), Math.abs(y1Off), Math.abs(y2Off));

            //console.log(smallest);

            this.x = (Math.abs(x1Off) == smallest) ? this.x + x1Off : this.x;
            this.x = (Math.abs(x2Off) == smallest) ? this.x + x2Off : this.x;
            this.y = (Math.abs(y1Off) == smallest) ? this.y + y1Off : this.y;
            this.y = (Math.abs(y2Off) == smallest) ? this.y + y2Off : this.y;
        }

        if (this.hp) {
            for (var i = 0; i < collisions.bullet.length; i++) {
                var bullet = collisions.bullet[i];

                if (bullet.owner != this && bullet.team != this.team) {
                    this.hp -= bullet.dmg;
                    bullet.destroy();
                }

                if (this.hp <= 0)
                    this.destroy();
            }
        }
    }

    destroy(drop = true) {
        if (!this.dying) {
            this.dying = true;
            this.game.partitioner.removeFromGrid(this, this.entityType);
            if (this.team != 0 && Math.random() < .12 && drop)
                new Boost(this.game, {'x': this.x, 'y': this.y});

            this.game.score += this.score;
        }
    }

    draw(ctx) {
        Entity.prototype.draw.call(this, ctx);
        if (this.game.showOutlines) {
            if (this.colliding) {
                ctx.fillStyle = "Red";
                ctx.fillRect(this.screenX() - 10, this.screenY() - 10, 20, 20);
            }
            ctx.strokeStyle = "Green";
            ctx.beginPath();
            ctx.moveTo(this.screenX(), this.screenY());
            ctx.lineTo(this.screenX() + this.radius * Math.cos(this.angle), this.screenY() + this.radius * Math.sin(this.angle));
            ctx.stroke();
        }
    }
}
