function Terrain(game, pos, dim, img) {
    this.img = img;
    Entity.call(this, game, pos.x, pos.y, dim.width, dim.height);
}

Terrain.prototype = new Entity(null, [0,0], [0,0]);
Terrain.prototype.constructor = Terrain;

Terrain.prototype.draw = function (ctx) {
    ctx.drawImage(image, 0, 0,
                  this.w, this.h,
                  -(this.w / 2), -(this.h / 2), 1, 1);

    Entity.prototype.draw.call(this, ctx);
}
