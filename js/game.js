var canvas = document.getElementById("gamescreen");
var canvas2 = document.getElementById("gamescreen2");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");

ctx.font = '20px Roboto Condensed';
ctx.fillStyle = '#f0927d';

document.body.style.zoom="80%"

var game = {
    state: 'play',
    screens: null,
    entities: [],
    ids: 0,
    frameNum: 0,
    bwidth: 32,
    bheight: 32,
    mx: null,
    my: null,
    keyPressed: null,
    score: 0,
    speed: 7,
    frameRate: 12.5,

    orb: null,
    blobs: [],

    noteSwitch: 0,
    playSound: true,

    platforms: [],
    startPlatforms: 100,

    viewport: 0,
    camera: 0
};

//load bg
//var bg = new Entity('bg', 'img', false, 0, 0, 'resources/bg.png', true, true, false);

var bg = new Entity('bg', 'img', false, 0, 0, 'resources/bg.png', true, false, true, 640, 960);

bg.img.framespeed = 20;

var floor = new Entity('floor', 'img', true, 0, 800, 'resources/floor.png', true, true, true, 640, 2000);

floor.coly = 60;
floor.img.framespeed = 12;

var neworb = setTimeout(function() {

    game.orb = new Entity('orb', 'img', true, 312, 150, 'resources/orbs.png', false, true, true, 32, 32);

    game.orb.bounce = .7;
    game.orb.elevation = (900 - game.orb.y - 31);

    game.orb.colx = 3;
    game.orb.colwidth = -3;
    game.orb.coly = 8;
    game.orb.colheight = -8;
    game.orb.gravity = 0.4;
    game.orb.lowg = false;

    game.camera = (-game.orb.y + canvas.height / 2);

    game.butterfly = new Entity('butterfly', 'img', true, 312, 400, 'resources/butterfly.png', false, false, true, 32, 48);
    game.butterfly.gravity = -0.01;
    game.butterfly.orbiting = game.orb;
    game.butterfly.gravityX = .02;
    game.butterfly.orbitR = 50;

    game.butterfly.img.framespeed = 30;
    game.butterfly.speedlimitY = 4;
    game.butterfly.speedlimitX = .5;
    game.butterfly.flutter = false;
    game.butterfly.stopping = false;

}, 1500);

var newblob = setInterval(function() {
    var rx = Math.floor(Math.random()*600);
    var ry = Math.floor(Math.random()*-5000) + 100 + game.orb.y;

    if (game.blobs.length == 0) {
        ry = 100;
    } 

    if (game.blobs.length < 100) {
        var b = new Entity('blob', 'img', true, rx, ry, 'resources/blob.png', false, false, true, 50, 50, 3);

        b.gravity = -0.001
        b.img.framespeed = 6;
        b.speedlimitY = 1 + Math.random();
        b.speedlimitX = 0.6;

        var r = Math.floor(Math.random() * 8);

        if (r == 0) {
            b.speedlimitY += 10;
            b.img.current = 1;
        };
        if (r == 1 || r == 2) {
            b.speedlimitY += 4;
            b.img.current = 2;
        }

        b.colx = -10;
        b.colwidth = 10;
        b.coly = -10;
        b.colheight = 10;

        b.velY = -1;
        b.stopping = false;

        var mm = Math.floor(Math.random()*10);

        b.img.framespeed += mm;

        game.blobs.push(b)
    };
}, 4000);


startPlatforms();

// var newfloater = setInterval(function() {
//     game.floater = new Entity('floater', 'img', true, 15 + Math.floor(Math.random()*580), 1000, 'resources/floater.png', false, false, true, 48, 64);
//     game.floater.gravity = 0;
//     game.floater.gravity -= 0.01;
//     game.floater.img.framespeed = 14 + (Math.floor(Math.random()*7) - 3);
//     game.floater.speedlimitY = 4;
// }, 5000);


function startPlatforms() {
    for (i = 0; i < game.startPlatforms; i++) {
        var x = (canvas.width/40) - 2;
        var y = (canvas.height) + 50000;

        var spawnX = (Math.floor(Math.random()*x) + 1)*40;

        if (spawnX == 6*40 || spawnX == 7*40 || spawnX == 8*40 || spawnX == 9*40) {
            spawnX = (Math.floor(Math.random()*x))*40;

        }
        var spawnY = (Math.floor(Math.random()*y) - 50400)

        var plat = new Entity('platform', 'img', true, spawnX, spawnY, 'resources/platforms.png', true, true, true, 44, 20);

        plat.colx = 20;
        plat.colheight = -5;

        var mm = Math.floor(Math.random()*12);

        plat.img.framespeed += mm;
        game.platforms.push(plat);

        var oo = Math.floor(Math.random()*4) + 1;
            for (j = 1; j < oo; j++) {
                var ext = new Entity('platform', 'img', true, (spawnX) + (j*40), spawnY, 'resources/platforms.png', true, true, true, 44, 20);
                
                ext.colx = 20;
                ext.img.framespeed += mm;
                ext.colheight = -5;

                game.platforms.push(ext);
            
        }
    }
}



//KeyboardHandler
function keyUp(key) {
    var orb = game.orb;

    switch (key) {
        case 'ArrowLeft':
            orb.stopping = true;
            break;

        case 'ArrowRight':
            orb.stopping = true;
            break;

        case 'ArrowUp':
            break;

        case 'ArrowDown':
            break;

        case ' ':
            if (orb.velY > 0) {
                orb.velY = -orb.velY*0.5;
            }
            if (orb.velX != 0) {
                orb.velX = orb.velX * 1.2
            }

            if (orb.velX > 0) {

                orb.velY -= (80 - orb.velX*2);
            }
            if (orb.velX <= 0) {

                orb.velY -= (80 + orb.velX*2);
            }

            if (orb.gravity == 0.4) {

                orb.gravity = 0.05;

            }
            
            break;

        case 'w':
            break;
        case 'e':
            var sx = orb.speedlimitX;
            orb.velX -= 10;
            orb.speedlimitX = 50;
            setTimeout(function() {orb.speedlimitX = sx;}, 500)
            break;
        case 'r':
            var sx = orb.speedlimitX;
            orb.velX += 10;
            orb.speedlimitX = 50;
            setTimeout(function() {orb.speedlimitX = sx;}, 500)
            break;
        case '0':
            break;
        case '9':
            break;
        case 'm':
            break;
        case 'u':
            break;
        case 'tab':
            break;


        case 'b':
            break;
        case 'i':
            break;
        case 'q':
            break;
    }
};

function keyDown(key) {

    var orb = game.orb;

    switch (key) {
        case 'ArrowLeft':

            orb.stopping = false;

            if (orb.velX >= -0.5) {
                orb.velX = -1;
            }

            if (orb.velX < -5) {

                orb.velX = orb.velX*1.2;
            } else {
                orb.velX += -1;
                orb.velX = orb.velX*2;
            }
            break;
        case 'ArrowRight':

            orb.stopping = false;

            if (orb.velX <= 0.5) {
                orb.velX = 1;
            }

            if (orb.velX > 5) {

                orb.velX = orb.velX*1.2;
            } else {
                orb.velX += 1;
                orb.velX = orb.velX*2;
            }
            break;

        case 'ArrowUp':
            break;

        case 'ArrowDown':

            if (orb.gspeed < 40) {
                orb.gspeed += 16;
            }

            orb.velX = orb.velX*0.5;
            break;

        case ' ':
            break;
        case 'w':
            break;
        case 'e':
            break;
        case '0':
            break;
        case '9':
            break;
        case 'm':
            break;
        case 'u':
            break;
        case 'tab':
            break;


        case 'b':
            break;
        case 'i':
            break;
        case 'q':
            break;
    }
};

function camera() {
    var delt = game.camera - game.orb.y;
    
    if (game.orb.y <= 460) {
        var delt = game.camera - game.orb.y;

        if (delt > -0.1 && delt < 0.1) {
            delt = 0;
        }

        if ((delt > 20 ) || (delt < -20)) {
            game.camera -= delt*0.2;
        }
        game.viewport = (-game.camera + canvas.height / 2);
        
    } else {
        game.camera -= delt*0.8;
        game.viewport = game.viewport*0.9;
    };        
};

var load = setTimeout(function() {
    var update = setInterval( function() {
   
    camera();

    var orb = game.orb;
    var floater = game.floater;
    var blob = game.blobs[0];

    //console.log(floater.img.framespeed, floater.img.framecount)

    // if (floater.gspeed < -1 && floater.gspeed > -2 && floater.img.framespeed > 4) {
    //     floater.img.framespeed = floater.img.framespeed/1.0005;
    // }

    if (orb.gravity < 0.4) {
        orb.gravity = orb.gravity*1.1

        if (orb.gravity > 0.4) {
            orb.gravity = 0.4;
        }
    };

    for (i = 0; i < game.entities.length; i++) {
        var ent = game.entities[i];

        ent.move();
    };

    var frameDraw = draw(game.viewport);

}, game.frameRate);
}, 3000);

