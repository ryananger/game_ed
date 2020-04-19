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
        
        for (i = 0; i < game.entities.length; i++) {
            var ent = game.entities[i];

            if (ent.img != null) {
            	ctx.drawImage(ent.img, ent.x, ent.y);
            };
        };
        
        game.frameNum++;
};


