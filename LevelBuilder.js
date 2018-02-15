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
            var xPos = 200 * x;
            var yPos = 200 * y;
            coords = {'x': xPos, 'y': yPos};

            if (unit == 0 || unit >= 3)
                new Wall(game, coords, {w: 200, h: 200}, ASSET_MANAGER.getAsset("./assets/Maps/CellFloor.png"), false);
            else if (unit == 1)
                new Wall(game, coords, {w: 200, h: 200}, ASSET_MANAGER.getAsset("./assets/Maps/CellWall.png"));

            if (unit == 12) {
                var playerShip = new Ship(game, coords);
                game.player = playerShip;
            }
        }
    }
}
