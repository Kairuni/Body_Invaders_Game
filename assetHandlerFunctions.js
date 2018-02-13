const ROTATION_BUFFER = 10;

rotateAndCache = function (image, angle, pos = null, dim = null) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(dim.w, dim.h) + ROTATION_BUFFER * 2; // BUFFER!
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    if (!pos || !dim) {
        offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    } else {
        offscreenCtx.drawImage(image, pos.x, pos.y,  // source from sheet
                      dim.w, dim.h,
                      -(dim.w / 2), -(dim.h / 2), dim.w, dim.h);
    }
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

function buildRotatedCache(img, dim, frames) {
    // ex: buildRotatedCache(img, {x: 0, y: 0, w: 341, h: 341}, 4);
    // This makes life super easy: we know ASSET_MANAGER will be made, and this
    // function will never be called beforehand, so we can utilize it.
    //console.log(ASSET_MANAGER);

    var image = ASSET_MANAGER.getAsset(img);

    canvasList = [];
    for (var i = 0; i < frames; i++) {
        canvasList[i] = [];

        for (var j = 0; j < 36; j++) {
            canvasList[i].push(rotateAndCache(image, j * 10 * (3.1415 / 180), {x: dim.x, y: dim.y}, {w: dim.w, h: dim.h}));
        //    console.log("Wat");
        }

        //console.log(dim.x);
        dim.x += dim.w;
    }

    return canvasList;
}
