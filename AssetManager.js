class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.imageCache = [];
        this.audioCache = [];
        this.imageQueue = [];
        this.audioQueue = [];
    }

    queueImage(path) {
        console.log("Queueing image " + path);
        this.imageQueue.push(path);
    }

    queueAudio(path) {
        console.log("Queueing audio " + path);
        this.audioQueue.push(path);
    }

    isDone() {
        return this.imageQueue.length + this.audioQueue.length === this.successCount + this.errorCount;
    }

    downloadAll(callback) {
        for (var i = 0; i < this.imageQueue.length; i++) {
            var img = new Image();
            var that = this;

            var path = this.imageQueue[i];

            img.addEventListener("load", function () {
                console.log("Loaded " + this.src);
                that.successCount++;
                if(that.isDone()) callback();
            });

            img.addEventListener("error", function () {
                console.log("Error loading " + this.src);
                that.errorCount++;
                if (that.isDone()) callback();
            });

            img.src = path;
            this.imageCache[path] = img;
        }

        for (var i = 0; i < this.audioQueue.length; i++) {
            var audio = new Audio();
            var that = this;

            var path = this.audioQueue[i];

            audio.addEventListener("canplaythrough", function () {
                //console.log("Loaded or playing " + this.src);
                that.successCount++;
                if(that.isDone()) callback();
            });

            audio.addEventListener("error", function () {
                console.log("Error loading " + this.src);
                that.errorCount++;
                if (that.isDone()) callback();
            });

            audio.src = path;
            this.audioCache[path] = audio;
        }
    }

    getAsset(path) {
        return this.imageCache[path];
    }

    getAudio(path) {
        return this.audioCache[path];
    }
}
