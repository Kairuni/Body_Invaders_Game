const WBC_RADIUS = 37;

class WhiteBloodCell extends MovingObject {
    constructor(game, pos) {
        super(game, pos, WBC_RADIUS);

        this.hp = 80;

        this.team = 1;

        this.img = ASSET_MANAGER.getAsset("./assets/Units/Allies.png");
    }

    draw(ctx) {
        if (this.testRange())
            return;

        ctx.drawImage(this.img, 0, 401,  // source from sheet
                      100, 100,
                      this.screenX() - 50, this.screenY() - 50, 100, 100);
        super.draw(ctx);
    }
}
