class Wall extends Entity {
    constructor(game, pos, dim, img, doCollide = true) {
        super(game, pos, dim);

        //this.radius = dim.w/2;
        //console.log(this.radius);

        this.img = img;

        this.game.addStaticEntity(this);

        if (doCollide)
            this.game.partitioner.addToGrid(this, 0);
    }

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.screenX() - this.w / 2, this.screenY() - this.h / 2);
        }
        super.draw(ctx);
    }
}
