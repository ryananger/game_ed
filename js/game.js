var canvas = document.getElementById("gamescreen");
var canvas2 = document.getElementById("gamescreen2");
var ctx = canvas.getContext("2d");

ctx.font = '14px Arial';
ctx.fillStyle = '#f5a69f'

document.body.style.zoom="80%"

var game = {
    state: 'play',
    screens: null,
    entities: [],
    ids: 0,
    blocks: [],
    activeBlock: [],
    colorGroups: [],
    blockTypes: {total: 0, n1: 0, n2: 0, n3: 0, n4: 0},
    board: [],
    frameNum: 0,
    bwidth: 32,
    bheight: 32,
    mx: null,
    my: null,
    keyPressed: null,
    sec: 1000,
    score: 0,
    speed: 5,
    blockspeed: 0,
    frameRate: 12.5
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
    var type = Math.floor(Math.random()*5);

    //  Math.floor(Math.random()*20)
    var origin = {x: Math.floor(Math.random()*20), y: 0};
    var check = 0;
    var spawnable = false;
    var rand = Math.floor(Math.random()*4); 

    switch (type) {
        //line
        case 0:
        case 4:
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
                game.activeBlock = [];

                for (i = 0; i < 4; i++) {
                    var x = origin.x;
                    var y = origin.y + i;

                    var block = blockColor(rand, x, y);

                    game.board[x][y].occ = block.prop;
                    game.blocks.push(block.prop);

                    game.activeBlock.push(block.prop);
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
                    };
                };
                if (spawnable) {
                    game.activeBlock = [];

                    for (i = 0; i < 2; i++) {
                        for (j = 0; j < 2; j++) {
                            var x = origin.x + i;
                            var y = origin.y + j;

                            var block = blockColor(rand, x, y);

                            game.board[x][y].occ = block.prop;
                            game.blocks.push(block.prop);

                            game.activeBlock.push(block.prop);

                        };
                    };
                    game.blockTypes.total++;
                    game.blockTypes.n2++;

                } else {
                    blockSpawn();
                };
            };                
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
                    game.activeBlock = [];

                    for (i = 0; i < 3; i++) {
                        var x = origin.x;
                        var y = origin.y + i;

                        var block = blockColor(rand, x, y);

                        game.board[x][y].occ = block.prop;
                        game.blocks.push(block.prop);

                        game.activeBlock.push(block.prop);

                        if (i == 2) {
                            var block = blockColor(rand, x + 1, y);

                            game.board[x + 1][y].occ = block.prop;
                            game.blocks.push(block.prop);

                            game.activeBlock.push(block.prop);
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
                    game.activeBlock = [];

                    var block = blockColor(rand, x - 1, y);

                    game.board[x - 1][y].occ = block.prop;
                    game.blocks.push(block.prop);

                    game.activeBlock.push(block.prop);
                        

                    for (i = 0; i < 3; i++) {
                        var x = origin.x;
                        var y = origin.y + i;

                        var block = blockColor(rand, x, y);

                        game.board[x][y].occ = block.prop;
                        game.blocks.push(block.prop);

                        game.activeBlock.push(block.prop);
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

function blockColor(rand, x, y) {
    switch(rand) {
        case 0:
            var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block1.png');
            block.prop.color = rand;
            return block;
            break;
        case 1:
            var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block2.png');
            block.prop.color = rand;
            return block;
            break;
        case 2:
            var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block3.png');
            block.prop.color = rand;
            return block;
            break;
        case 3:
            var block = newEntity('block', 'img', true, x*32, y*32, 'resources/block4.png');
            block.prop.color = rand;
            return block;
            break;
    };
};

function canMove(activeBlock, direction) {
    var movable = false;

    switch (direction) {
        case 'left':
            for (i = 0; i < activeBlock.length; i++) {

                // per block in quad

                var bx = activeBlock[i].x;
                var by = activeBlock[i].y;

                // not at X coord 0
                if (bx == 0) {
                    return;
                };

                // check space to left of this block
                var lx = (bx/32) - 1;
                var leftX = game.board[lx][by/32].occ;

                // if left isn't empty, check to see if it's occupied by a member of the active block
                if (leftX != false) {
                    function inBlock() {
                        for (j = 0; j < activeBlock.length; j++) {
                            if (leftX.idn == activeBlock[j].idn) {
                                return true;
                            }
                            else if (j == activeBlock.length) {
                                return false;
                            };
                        };
                    };

                    var inBl = inBlock();

                    if (!inBl) {
                        return;
                    }
                    
                };
            };
            return true;
            break;
        case 'right':
            for (i = activeBlock.length - 1; i >= 0; i--) {

                // per block in quad

                var bx = activeBlock[i].x;
                var by = activeBlock[i].y;

                // not at X coord 19*32
                if (bx == 19*32) {
                    return;
                };

                // check space to right of this block
                var rx = (bx/32) + 1;
                var rightX = game.board[rx][by/32].occ;

                // if right isn't empty, check to see if it's occupied by a member of the active block
                if (rightX != false) {
                    function inBlock() {
                        for (j = 0; j < activeBlock.length; j++) {
                            if (rightX.idn == activeBlock[j].idn) {
                                return true;
                            }
                            else if (j == activeBlock.length) {
                                return false;
                            };
                        };
                    };

                    var inBl = inBlock();

                    if (!inBl) {
                        return;
                    }
                    
                };
            };

            return true;
            break;
        case 'down':
            for (i = 0; i < activeBlock.length; i++) {

                // per block in quad

                var bx = activeBlock[i].x;
                var by = activeBlock[i].y;

                // not at Y coord 19*32
                if (by == 19*32) {
                    return;
                };

                // check space below this block
                var dy = (by/32) + 1;
                var downY = game.board[bx/32][dy].occ;

                // if down isn't empty, check to see if it's occupied by a member of the active block
                if (downY != false) {
                    function inBlock() {
                        for (j = 0; j < activeBlock.length; j++) {
                            if (downY.idn == activeBlock[j].idn) {
                                return true;
                            }
                            else if (j == activeBlock.length) {
                                return false;
                            };
                        };
                    };

                    var inBl = inBlock();

                    if (!inBl) {
                        return;
                    }
                    
                };
            };
            return true;
            break;
    }            
};

function blockLeft(activeBlock) {
    for (i = 0; i < activeBlock.length; i++) {
        var left = (activeBlock[i].x/32) - 1;

        var x = activeBlock[i].x/32;
        var y = activeBlock[i].y/32;

        for (j = 0; j < game.blocks.length; j++) {
            if (game.blocks[j].idn == activeBlock[i].idn){

                game.blocks[j].x -= 32;
            };
        };

        game.board[left][y].occ = game.board[x][y].occ;
        game.board[x][y].occ = false;
    }
};

function blockRight(activeBlock) {
    for (i = activeBlock.length - 1; i >= 0; i--) {
        var right = (activeBlock[i].x/32) + 1;

        var x = activeBlock[i].x/32;
        var y = activeBlock[i].y/32;

        for (j = 0; j < game.blocks.length; j++) {
            if (game.blocks[j].idn == activeBlock[i].idn){

                game.blocks[j].x += 32;
            };
        };

        game.board[right][y].occ = game.board[x][y].occ;
        game.board[x][y].occ = false;
    }
};

function blockDown(activeBlock) {
    for (i = activeBlock.length - 1; i >= 0; i--) {
        var down = (activeBlock[i].y/32) + 1;

        var x = activeBlock[i].x/32;
        var y = activeBlock[i].y/32;

        for (j = 0; j < game.blocks.length; j++) {
            if (game.blocks[j].idn == activeBlock[i].idn){

                game.blocks[j].y += 32;
            };
        };

        game.board[x][down].occ = game.board[x][y].occ;
        game.board[x][y].occ = false;
    }
};

function colorGroups() {
    var board = game.board;

    var groups = [];

    for (x = 0; x < board.length; x++) {
        for (y = 0; y < board[x].length; y++) {
            board[x][y].grouped = false;
        };
    };
    

    for (x = 0; x < board.length; x++) {
        for (y = 0; y < board[x].length; y++) {
            if (board[x][y].occ != false && !board[x][y].grouped) {
                var block = board[x][y].occ;
                var color = block.color;
                var idn = block.idn;

                var group = [];

                group.push({color: color, idn: idn});
                board[x][y].grouped = true;

                checkAdjacent(group, color, x, y);

                groups.push(group);

            };
        };
    };

    var biggest = {size: 0, index: 0};

    for (i = 0; i < groups.length; i++) {
        if (groups[i].length > biggest.size) {
            biggest.index = i;
            biggest.size = groups[i].length;
        }
    };

    if (biggest.size < 12) {
        return;
    };

    var points = Math.floor(Math.pow(biggest.size*2, 1.48));
    game.score += points;
    console.log(biggest.size, points, game.score);

    for (i = 0; i < groups[biggest.index].length; i++) {
        var id = groups[biggest.index][i].idn;

        for (n = 0; n < game.blocks.length; n++) {
            if (game.blocks[n].idn == id) {
                var x = game.blocks[n].x/32;
                var y = game.blocks[n].y/32;

                game.blocks.splice(n, 1);
                game.board[x][y].occ = false;
            };
        };

        for (j = 0; j < game.entities.length; j++) {
            if (game.entities[j].idn == id) {
                game.entities.splice(j, 1);
            };
        };
    };

};

function checkAdjacent(group, color, x, y) {
    var board = game.board;

    var left = x - 1;

    if (x > 0 && board[left][y].occ != false && !board[left][y].grouped) {
        var block = board[left][y].occ;
        var thiscolor = block.color;
        var idn = block.idn;

        if (thiscolor == color) {

            group.push({color: thiscolor, idn: idn});
            board[left][y].grouped = true;

            checkAdjacent(group, color, left, y);
        };
    };

    var right = x + 1;

    if (x < 19 && board[right][y].occ != false && !board[right][y].grouped) {
        var block = board[right][y].occ;
        var thiscolor = block.color;
        var idn = block.idn;

        if (thiscolor == color) {

            group.push({color: thiscolor, idn: idn});
            board[right][y].grouped = true;

            checkAdjacent(group, color, right, y);
        };
    };

    var up = y - 1;

    if (y > 0 && board[x][up].occ != false && !board[x][up].grouped) {
        var block = board[x][up].occ;
        var thiscolor = block.color;
        var idn = block.idn;

        if (thiscolor == color) {

            group.push({color: thiscolor, idn: idn});
            board[x][up].grouped = true;

            checkAdjacent(group, color, x, up);
        };
    };

    var down = y + 1;

    if (y < 19 && board[x][down].occ != false && !board[x][down].grouped) {
        var block = board[x][down].occ;
        var thiscolor = block.color;
        var idn = block.idn;

        if (thiscolor == color) {

            group.push({color: thiscolor, idn: idn});
            board[x][down].grouped = true;

            checkAdjacent(group, color, x, down);
        };
    };

};

//KeyboardHandler
function keyPress(key) {
    switch (key) {
        case 'ArrowLeft':
            var movable = canMove(game.activeBlock, 'left');

            if (movable) { blockLeft(game.activeBlock) };
            break;

        case 'ArrowRight':
            var movable = canMove(game.activeBlock, 'right');

            if (movable) { blockRight(game.activeBlock) };
            break;

        case 'ArrowUp':
            //boardUp();
            break;

        case 'ArrowDown':
            var movable = canMove(game.activeBlock, 'down');

            if (movable) { blockDown(game.activeBlock) };
            //boardDown();
            break;

        case ' ':
            blockSpawn();
            clearInterval(blockTimer);
            blockTimer = setInterval (function (){
                    blockSpawn();
                }, game.blockspeed);
            break;
        case 'w':
            boardLeft();
            break;
        case 'e':
            boardRight();
            break;
        case '0':
            if (game.speed > 0) {game.speed--;}

            game.blockspeed = (game.blockspeed/2) + 25;

            clearInterval(blockTimer);

            blockTimer = setInterval (function (){
                blockSpawn();
            }, game.blockspeed);

            break;
        case '9':
            if (game.speed < 6) {
                game.speed++;
                game.blockspeed = (game.blockspeed*2) + 25;

                clearInterval(blockTimer);

                blockTimer = setInterval (function (){
                    blockSpawn();
                }, game.blockspeed);
            }
            break;
        case 'm':
            if (rain.volume != 0) {
                rain.volume = 0;
            } else {
                rain.volume = 0.04;
            }


        case 'b':
            console.log(game.blockTypes);
            break;
        case 'i':
            console.log("ids: " + game.ids);
            break;
        case 'q':
            colorGroups();
            break;
    }
};

function boardLeft() {
    var movable = canMove(game.activeBlock, 'left');

    if (movable) {
        blockLeft(game.activeBlock); 
    };

    for (x = 1; x < game.board.length; x++) {
        for (y = 0; y < game.board[x].length; y++) {
            
            if (game.board[x][y].occ != false) {

                for (i = 0; i < game.blocks.length; i++) {
                    function inBlock() {
                        for (j = 0; j < game.activeBlock.length; j++) {
                            if (game.blocks[i].idn == game.activeBlock[j].idn) {
                                return true;
                            }
                            else if (j == game.activeBlock.length) {
                                return false;
                            };
                        };
                    };

                    var inBl = inBlock();

                    if (!inBl) {
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
};

function boardRight() {
    var movable = canMove(game.activeBlock, 'right');

    if (movable) {
        blockRight(game.activeBlock); 
    };

    for (x = 18; x >= 0; x--) {
        for (y = 0; y < game.board[x].length; y++) {
            
            if (game.board[x][y].occ != false) {

                for (i = 0; i < game.blocks.length; i++) {

                    function inBlock() {
                        for (j = 0; j < game.activeBlock.length; j++) {
                            if (game.blocks[i].idn == game.activeBlock[j].idn) {
                                return true;
                            }
                            else if (j == game.activeBlock.length) {
                                return false;
                            };
                        };
                    };

                    var inBl = inBlock();

                    if (!inBl) {
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

function boardDown(count) {
    lineCheck();
    var movable = canMove(game.activeBlock, 'down');

    if (movable && count >= 3) { 
        game.count = 0;
        blockDown(game.activeBlock) 
    };

    for (x = 0; x < game.board.length; x++) {
        for (y = 18; y >= 0; y--) {
            
            if (game.board[x][y].occ != false) {

                for (i = 0; i < game.blocks.length; i++) {

                    function inBlock() {
                        for (j = 0; j < game.activeBlock.length; j++) {
                            if (game.blocks[i].idn == game.activeBlock[j].idn) {
                                return true;
                            }
                            else if (j == game.activeBlock.length) {
                                return false;
                            };
                        };
                    };

                    var inBl = inBlock();

                    if (!inBl) {
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

    var downTimer = setTimeout (function (){
        game.count++;
        boardDown(game.count);
    }, (game.speed*25) + 25);
};

function lineCheck() {
    //bottom line full?
    for (i = 0; i < 20; i++) {
        if (game.board[i][19].occ == false) {
            return;
        };
    };

    game.score += 400;
    console.log(game.score);

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

game.count = 0;

var downTimer = setTimeout (function (){
    game.count++;
    boardDown(game.count);
}, (game.speed*25) + 25);


game.blockspeed = (game.speed*75) * 4.25;

var blockTimer = setInterval (function (){
    blockSpawn();

}, game.blockspeed);

var frame = setInterval( function() {
    var frameDraw = draw();    
}, game.frameRate);