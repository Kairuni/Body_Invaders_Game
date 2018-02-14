class Wall extends Entity {
    constructor(game, pos, dim, img) {
        super(game, pos, dim);

        this.game.addStaticEntity(this);
        this.game.partitioner.addToGrid(this, 0);
    }
}
