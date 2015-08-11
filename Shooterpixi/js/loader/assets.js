var init = new Init();
PIXI.loader
    .add([
        "imgs/ship1.gif",
        "imgs/ship2.gif",
        "imgs/ship3.gif",
        "imgs/stars.gif",
        "imgs/sprite/assets_boom.json"

    ])
    .on("progress", init.loadProgressHandler)
    .load(init.start);


