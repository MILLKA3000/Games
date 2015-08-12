PIXI.loader
    .add([
        "imgs/ship1.gif",
        "imgs/ship2.gif",
        "imgs/ship3.gif",
        "imgs/stars.gif",

        //for animate sprint boom
        "imgs/sprite/assets_boom.json",

        "js/data/levels/1.json"

    ])
    .on("progress", init.loadProgressHandler)
    .load();


