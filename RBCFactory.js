const RBC_GENERATION_TIME = 5;

class RBCFactory extends Entity {
    constructor(game, path) {
        super(game, {x: 0, y: 0}, {w: 0, h: 0});

        this.timer = 0;
        this.path = path;

        game.addEntity(this);
    }

    update() {
        this.timer -= this.game.clockTick;

        if (this.timer < 0) {
            this.timer = RBC_GENERATION_TIME;

            var rbc = new RedBloodCell(this.game, this.path);
            //console.log("Made RBC at " + rbc.x + ", " + rbc.y);
        }
    }
}
