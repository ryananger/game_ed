var canvas = document.getElementById("gamescreen");
var ctx = canvas.getContext("2d");

var game = {
    state: 'play',
    screens: null,
    entities: [],
    ids: 0,
    blocks: [],
    blockTypes: {total: 0, n1: 0, n2: 0, n3: 0, n4: 0},
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
var bg = newEntity('bg', 'img', false, 0, 0, 'resources/bg.png');

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

blockSpawn();

//block creation
function blockSpawn() {
    var type = Math.floor(Math.random()*6);

    //  Math.floor(Math.random()*20)
    var origin = {x: Math.floor(Math.random()*20), y: 0};
    var check = 0;
    var spawnable = false;

    switch (type) {
        //line
        case 0:
        case 4:
        case 5:
            for (i = 0; i < 4; i++) {
                var x = origin.x;
                var y = origin.y + i;

                if (game.board[x][y].occ == false) {
                    check++;

                    if (check == 4) {
                        spawnable = true;
                    };
                };
            };
            if (spawnable) {
                for (i = 0; i < 4; i++) {
                    var x = origin.x;
                    var y = origin.y + i;

                    var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block2.png');

                    game.board[x][y].occ = block.prop;
                    game.blocks.push(block.prop)
                }

                game.blockTypes.total++;
                game.blockTypes.n1++;

            } else {
                blockSpawn();
            }
            break;

        //square    
        case 1:
            if (origin.x < 19) {
                for (i = 0; i < 2; i++) {
                    for (j = 0; j < 2; j++) {
                        var x = origin.x + i;
                        var y = origin.y + j;

                        if (game.board[x][y].occ == false) {
                            check++;

                            if (check == 4) {
                                spawnable = true;
                            };
                        };
                    }

                    
                };
                if (spawnable) {
                    for (i = 0; i < 2; i++) {
                        for (j = 0; j < 2; j++) {
                            var x = origin.x + i;
                            var y = origin.y + j;

                            var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block1.png');

                            game.board[x][y].occ = block.prop;
                            game.blocks.push(block.prop);
                        };
                    };

                    game.blockTypes.total++;
                    game.blockTypes.n2++;

                } else {
                    blockSpawn();
                }
            }                
            break;

        //L right
        case 2:
            if (origin.x < 19) {
                for (i = 0; i < 3; i++) {
                    var x = origin.x;
                    var y = origin.y + i;

                    if (game.board[x][y].occ == false) {
                        check++;

                        if (check == 3) {
                            if (game.board[x+1][y].occ == false) {
                                spawnable = true;
                            }
                        }
                    }
                }
                if (spawnable) {
                    for (i = 0; i < 3; i++) {
                        var x = origin.x;
                        var y = origin.y + i;

                        var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block3.png');

                        game.board[x][y].occ = block.prop;
                        game.blocks.push(block.prop);

                        if (i == 2) {
                            var block = newEntity('block', 'img', true, (x + 1)*32, y*32, 'resources/block3.png');

                            game.board[x + 1][y].occ = block.prop;
                            game.blocks.push(block.prop);
                        }
                    }

                    game.blockTypes.total++;
                    game.blockTypes.n3++;

                } else {
                    blockSpawn();
                }
            }
            break;

            //L left
            case 3:
            if (origin.x > 0) {
                for (i = 0; i < 3; i++) {
                    var x = origin.x;
                    var y = origin.y + i;

                    if (game.board[x][y].occ == false) {
                        check++;

                        if (check == 3) {
                            if (game.board[x-1][y].occ == false) {
                                spawnable = true;
                            }
                        }
                    }
                }
                if (spawnable) {
                    for (i = 0; i < 3; i++) {
                        var x = origin.x;
                        var y = origin.y + i;

                        var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block4.png');

                        game.board[x][y].occ = block.prop;
                        game.blocks.push(block.prop);

                        if (i == 2) {
                            var block = newEntity('block', 'img', true, (x - 1)*32, y*32, 'resources/block4.png');

                            game.board[x - 1][y].occ = block.prop;
                            game.blocks.push(block.prop);
                        }
                    }

                    game.blockTypes.total++;
                    game.blockTypes.n4++;

                } else {
                    blockSpawn();
                }
            }
            break;
    };
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
            //boardUp();
            break;

        case 'ArrowDown':
            boardDown();
            break;

        case 'n':
            blockSpawn();
            break;
        case 'b':
            console.log(game.blockTypes);
            break;
        case 'i':
            console.log("ids: " + game.ids);
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
    lineCheck();
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
        };
    };

};

function lineCheck() {
    //bottom line full?
    for (i = 0; i < 20; i++) {
        if (game.board[i][19].occ == false) {
            return;
        };
    };


    //clear blocks, board, and entities
    for (i = 0; i < 20; i++) {

        for (n = game.blocks.length - 1; n >= 0; n--) {

            if (game.blocks[n].x == i*32 && game.blocks[n].y == 19*32) {
                var id = game.blocks[n].idn;

                game.blocks.splice(n, 1);
                game.board[i][19].occ = false;

                for (j = 0; j < game.entities.length; j++) {
                    if (game.entities[j].idn == id) {
                        game.entities.splice(j, 1);
                    };
                };
            };
        };
    };
}

var downTimer = setInterval (function (){
    boardDown();
}, 50);

var blockTimer = setInterval (function (){
    blockSpawn();
}, 500);

var frame = setInterval( function() {
    var frameDraw = draw();    
}, 12.5);

//newEntity('block', 'img', true, 25, 58, 'resources/block1.png');