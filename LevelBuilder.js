levelBuilder = function(game, mapArray, bloodPaths) {
    // Clear out the current game state.
    game.entities = [];
    game.staticEntities = [];

    // Rebuild the partitioner
    game.partitioner = new LevelPartitioner({x: 25600, y: 25600}, 400);

    // Readd the background
    var bg = new Background(game, {x: 0, y: 0}, {w: 0, h: 0});
    game.addStaticEntity(bg);

    // Add a reference, because the background is has the heartbeat info.
    game.bg = bg;

    // For everything in mapArray:
    //console.log(mapArray);
    for (var y = 0; y < mapArray.length; y++) {
        for (var x = 0; x < mapArray[y].length; x++) {
            var unit = mapArray[y][x];
            var xPos = 100 * x;
            var yPos = 100 * y;
            coords = {'x': xPos, 'y': yPos};

            if (unit == 0 || unit >= 3)
                new Wall(game, coords, {w: 100, h: 100}, ASSET_MANAGER.getAsset("./assets/Maps/CellFloor.png"), false);
            else if (unit == 1)
                new Wall(game, coords, {w: 100, h: 100}, ASSET_MANAGER.getAsset("./assets/Maps/CellWall.png"));

            /*
            ## 1/2 Wall (skips 2 as 2 will be 'wall, undrawn') (rgb 0)
            ## 3 - Bacteriophage (r 255 gb 0)
            ## 4 - Mosaic Virus (g 255 rb 0)
            ## 5 - Sputnik (rg 255, b 0)
            ## 6 - Blobber (rb 255, g 0)
            ## 7 - Random power up (r 0 bg 255)
            ## 8 - Blood path marker to make life easier (rbg 100)
            ## 9 - Sputnik Boss (rg 255, b 200)
            ## 10 - Blobber Boss (rb 255, g 200)
            ## 11 - Bacteriophage Boss (r 255, b 100, g 0)
            ## 12 - Spawn location
            */
            if (unit == 3) {
                new Bacteriophage(game, coords);
            } else if (unit == 4) {
                new Bacteriophage(game, coords);
            } else if (unit == 5) {
                new Sputnik(game, coords);
            } else if (unit == 6) {
                new Blobber(game, coords);
            } else if (unit == 7) {
                new Boost(game, coords);
            } else if (unit == 9) {
                new SputnikBoss(game, coords);
            } else if (unit == 10) {

            } else if (unit == 11) {
                new BlobberBoss(game, coords);
            } else if (unit == 12) {
                var playerNeedle = new Needle(game, coords);
                game.player = playerNeedle;
            }
        }
    }

    for (var i = 0; i < bloodPaths.length; i++) {
        //console.log(bloodPaths[i]);
        for (var j = 0; j < bloodPaths[i].length; j++) {
            bloodPaths[i][j].x *= 100;
            bloodPaths[i][j].y *= 100;
        }
        new RBCFactory(game, bloodPaths[i]);
    }
}
