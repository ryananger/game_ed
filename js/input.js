canvas.addEventListener('click', function(e) {
 
    // get canvas position and determine mouse coordinates on canvas, pass to game
 
    var pos = canvas.getBoundingClientRect();
 
    game.mx = (e.x/0.8) - pos.x;
    game.my = (e.y/0.8) - game.viewport - pos.y;

    clicked(game.mx, game.my);

});

window.addEventListener('keydown', (event) => {
	//rain.play();
	keyDown(event.key);
	//console.log(event.key);
});

window.addEventListener('keyup', (event) => {
    //rain.play();
    keyUp(event.key);
    //console.log(event.key);
});

window.addEventListener('mousemove', function (e){

        var pos = canvas.getBoundingClientRect();
     
        game.mx = (e.x/0.8) - pos.x;
        game.my = (e.y/0.8) - game.viewport - pos.y;

});

function clicked(mx, my) {

    console.log(mx, my)
    for (i = 0; i < game.entities.length; i++) {
        var ent = game.entities[i];

        if (ent.x <= mx && ent.x + ent.width >= mx &&
            ent.y <= my && ent.y + ent.height >= my) {
            console.log(ent.name, ent.y, -game.viewport - 5000);
        }
    }
};

	