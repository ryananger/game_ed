var canvas = document.getElementById("gamescreen");
var ctx = canvas.getContext("2d");

var game = {
    state: 'play',
    screens: null,
    images: [],
    entities: [],
    blocks: [],
    board: [],
    frameNum: 0,
    bwidth: 32,
    bheight: 32,
    mx: null,
    my: null,
    keyPressed: null,
    sec: 1000
};

//load bg
newEntity('bg', 'img', false, 0, 0, 'resources/bg.png');

//create board array
for (i = 0; i < 20; i++) {
    var col = [];

    for (j = 0; j < 20; j++) {
        col.push( {
            x: i,
            y: j,
            occ: false
        })
    };    

    game.board.push(col);
}

//block types

//block creation
function blockSpawn() {
    var type = 0 //Math.floor(Math.random()*2);

    //  Math.floor(Math.random()*20)
    var origin = {x: 0, y: 0};

    if (game.board[origin.x][origin.y].occ == false) {
        var block = newEntity('block', 'img', true, origin.x*32, origin.y*32, 'resources/block2.png');

        game.board[origin.x][origin.y].occ = block.prop;
        game.blocks.push(block.prop);
    } else {
        blockSpawn();
    }

    

    //console.log(game.board[origin.x][origin.y]);
    //game.board[x].
};

//KeyboardHandler
function keyPress(key) {
    switch (key) {
        case 'ArrowLeft':
            boardLeft();
            break;

        case 'ArrowRight':
            boardRight();
            break;

        case 'ArrowUp':
            boardUp();
            break;

        case 'ArrowDown':
            boardDown();
            break;

    }
};

function boardLeft() {
    for (x = 1; x < game.board.length; x++) {
        for (y = 0; y < game.board[x].length; y++) {
            
            if (game.board[x][y].occ != false) {

                for (i = 0; i < game.blocks.length; i++) {

                    if (game.blocks[i].x == x*32 && game.blocks[i].y == y*32 && game.board[x-1][y].occ == false) {
                        game.blocks[i].x -= 32;

                        game.board[x-1][y].occ = game.board[x][y].occ;
                        game.board[x][y].occ = false;
                    };
                };
            };
        };
    };
};

function boardRight() {
    for (x = 18; x >= 0; x--) {
        for (y = 0; y < game.board[x].length; y++) {
            
            if (game.board[x][y].occ != false) {

                for (i = 0; i < game.blocks.length; i++) {

                    if (game.blocks[i].x == x*32 && game.blocks[i].y == y*32 && game.board[x+1][y].occ == false) {
                        game.blocks[i].x += 32;

                        game.board[x+1][y].occ = game.board[x][y].occ;
                        game.board[x][y].occ = false;
                    };
                };
            };    
        };
    };
};

function boardUp() {
    for (x = 0; x < game.board.length; x++) {
        for (y = 1; y < game.board[x].length; y++) {
            
            if (game.board[x][y].occ != false) {

                for (i = 0; i < game.blocks.length; i++) {

                    if (game.blocks[i].x == x*32 && game.blocks[i].y == y*32 && game.board[x][y-1].occ == false) {
                        game.blocks[i].y -= 32;

                        game.board[x][y-1].occ = game.board[x][y].occ;
                        game.board[x][y].occ = false;
                    };
                };
            };
        };
    };
};

function boardDown() {
    for (x = 0; x < game.board.length; x++) {
        for (y = 18; y >= 0; y--) {
            
            if (game.board[x][y].occ != false) {

                for (i = 0; i < game.blocks.length; i++) {

                    if (game.blocks[i].x == x*32 && game.blocks[i].y == y*32 && game.board[x][y+1].occ == false) {
                        game.blocks[i].y += 32;

                        game.board[x][y+1].occ = game.board[x][y].occ;
                        game.board[x][y].occ = false;
                    };
                };
            };   
            //     
        };
    };
};

var blockTimer = setInterval (function (){
    blockSpawn();
}, 1000);

var downTimer = setInterval (function (){
    boardDown();
}, 800);

var frame = setInterval( function() {

    var frameDraw = draw();
    
}, 33.33333);

//newEntity('block', 'img', true, 25, 58, 'resources/block1.png');