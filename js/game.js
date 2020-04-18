var canvas = document.getElementById("gamescreen");
var ctx = canvas.getContext("2d");

var game = {
    state: 'play',
    screens: null,
    images: new Array(),
    entities: new Array(),
    frameNum: 0,
    mx: null,
    my: null,
    keyPressed: null
};

newEntity('bg', 'img', false, 0, 0, 'resources/bg.png');

var frame = setInterval( function() {

    var frameDraw = draw();
    
}, 33.33333);

//newEntity('block', 'img', true, 25, 58, 'resources/block1.png');