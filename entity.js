function Entity(game, pos, dim) {
    this.game = game;
    this.x = pos.x;
    this.y = pos.y;
    this.w = dim.w;
    this.h = dim.h;
    this.removeFromWorld = false;
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
        ctx.strokeRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    }
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        ctx.strokeStyle = "Yellow";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle, pos, dim) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    if (!position || !dimensions) {
        offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    } else {
        ctx.drawImage(image, pos.x, pos.y,  // source from sheet
                      dim.w, dim.h,
                      -(dim.w / 2), -(dim.h / 2), 1, 1);
    }
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
