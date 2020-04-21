function newImage(name, x, y, source, ent) {

		img = new Image();
		img.id = name;
		img.src = source;
		
		ent.prop.img = img;

		img.onload = function() {

			ctx.drawImage(this, x, y);

			//console.log(this.id + ' drawn!');

		};
};

function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var scoreX = 638;
		var figures = 1;

		if (game.score > 9) {
			figures++;
		};
		if (game.score > 99) {
			figures++;
		};
		if (game.score > 999) {
			figures++;
		};
		if (game.score > 9999) {
			figures++;
		}; 
		if (game.score > 99999) {
			figures++;
		}; 
		if (game.score > 999999) {
			figures++;
		};
		if (game.score > 9999999) {
			figures++;
		};
		if (game.score > 9999999) {
			figures++;
		};

		var xadj = (figures*15);

		scoreX -= xadj;
        
        for (i = 0; i < game.entities.length; i++) {
            var ent = game.entities[i];

            if (ent.img != null) {
            	ctx.drawImage(ent.img, ent.x, ent.y);
            };
        };
        
		ctx.font = '30px Roboto Condensed';
		ctx.fillText(game.score, scoreX, 676);
        
        game.frameNum++;
};


