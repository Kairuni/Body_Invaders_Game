class Sound {
    constructor(filename, channel) {
        var src = ASSET_MANAGER.getAudio(filename);
        if (src !== null) {
            this.sound = src;
            //console.log(this.sound);
        }
    }

    play() {
        if (this.sound) {
            this.sound.play();
        }
    }

    stop() {
        if (this.sound) {
            this.sound.stop();
        }
    }
}
