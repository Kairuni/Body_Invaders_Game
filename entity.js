function Entity(game, pos, dim) {
    this.game = game;
    this.x = pos.x;
    this.y = pos.y;
    this.w = dim.w;
    this.h = dim.h;
    this.removeFromWorld = false;

    this.entityType = 0;
}

Entity.prototype.collide = function(otherEntity) {
    if (this.x - (this.w / 2) > otherEntity.x + (otherEntity.w / 2) ||
        this.x + (this.w / 2) < otherEntity.x - (otherEntity.w / 2) ||
        this.y + (this.h / 2) < otherEntity.y - (otherEntity.h / 2) ||
        this.y - (this.h / 2) > otherEntity.y + (otherEntity.h / 2))
        return false;
    else
        return true;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    var ctx = this.game.ctx;
    // Draw our rectangle BB first.
    if (this.game.showOutlines) {
        //ctx.fillStyle = "Green";
        ctx.strokeStyle = "Green";
        ctx.strokeRect(Math.floor(this.x) - this.w/2, Math.floor(this.y) - this.h/2, this.w, this.h);
    }
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        ctx.strokeStyle = "Orange";
        ctx.arc(Math.floor(this.x), Math.floor(this.y), this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
    }
}
