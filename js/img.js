function newImage(name, x, y, source, ent) {

		img = new Image();
		img.id = name;
		img.src = source;

		img.onload = function() {

			ctx.drawImage(this, x, y);

			console.log(this.id + ' drawn!');

			var push = {
				img: this,
				name: name,
				x: x,
				y: y
			};

			ent.img = push;
		};
};

function draw() {
        
        // draw on frame, referred to line 40;
        
        for (i = 0; i < game.images.length; i++) {
            var ent = game.images[i];

            ctx.drawImage(ent.img, ent.x, ent.y);
        };
        
        game.frameNum++;
};


