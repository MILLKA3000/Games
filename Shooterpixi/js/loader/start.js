var init;
iniLoad = setInterval(function(){
    if (player) {
        init = new Init();
        init.start();
        clearInterval(iniLoad);
    }
},200);
