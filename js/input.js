canvas.addEventListener('click', function(e) {
 
    // get canvas position and determine mouse coordinates on canvas, pass to game
 
    var pos = canvas.getBoundingClientRect();
 
    game.mx = e.x - pos.x;
    game.my = e.y - pos.y;

});

window.addEventListener('keydown', (event) => {
	game.keyPressed = event.key;
});

window.addEventListener('mousemove', function (e){

        var pos = canvas.getBoundingClientRect();
     
        game.mx = e.x - pos.x;
        game.my = e.y - pos.y;

});

	