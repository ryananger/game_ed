function newImage(name, x, y, source, anim, width, height, anims) {

		img = new Image();
		img.id = name;
		img.anim = anim;
		img.spriteWidth = width;
		img.spriteHeight = height;
		img.framespeed = 6;
		img.animCycle = 0;
		img.anims = [];
		img.current = 0;

		img.onload = function() {

			var w = this.naturalWidth;
		    var h = this.naturalHeight;

			if (anim) {
				this.frames = (w/this.spriteWidth);

				if (name != 'drop') {this.framecount = (Math.floor(Math.random()* (this.frames + 1)) * this.framespeed);}
			};

			if (anims != undefined) {
				for (i = 1; i < anims; i++) {
					img.anims.push( {
						name: 0,
						length: 0
					});
				};
			};				
		};
    
		
		img.src = source;
		return this.img;
};
function draw(viewport) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

    	game.orb.elevation = (900 - game.orb.y - 63);

    	var n = Math.floor(Math.round(game.orb.elevation));

        n = Math.floor(Math.round(n/50)) * 50;

        for (i = 0; i < game.entities.length; i++) {
            var ent = game.entities[i];
           
            animate(ent);

            
   //          if (ent.img.anim) {

   //          	// cycle runs through each frame in animation;

   //          	var cycle = ent.img.animCycle;
			// 	var frames = ent.img.frames;

			// 	if (cycle == 0) {

			// 		var run = ent.img.framespeed * frames;

			// 	}

   //          	// if (cycle == 0) {
   //          	// 	ent.img.animCycle = frames*ent.img.framespeed;
   //          	// 	ent.img.framecount = 0;
   //          	// }


			// 	var now = Math.floor(ent.img.framecount/ent.img.framespeed);

			// 	ctx.drawImage(ent.img, now*ent.img.spriteWidth, ent.img.current*ent.img.spriteHeight, ent.img.spriteWidth, ent.img.spriteHeight, ent.x, ent.y + viewport, ent.img.spriteWidth, ent.img.spriteHeight)

			// 	var a = Math.floor(ent.y),
			// 		b = Math.floor(ent.y + game.viewport);

			// 	//ctx.fillText(a + " " + b, ent.x, ent.y + viewport - 30)

			// 	if (ent.img.framecount < (run) - 1) {
			// 		ent.img.framecount++;
			// 		cycle++;
			// 	} else {
			// 		ent.img.framecount = 0;
			// 		cycle = 0;
			// 	}


			// } else if (ent.img != null) {
   //          	ctx.drawImage(ent.img, ent.x, ent.y);
   //          };
        };


    	// ctx.fillText(n, 16, 40);
    	ctx.fillText(Math.floor(game.butterfly.x), 16, 80)
        
        game.frameNum++;
};

function animate(ent) {
		if (ent.img.anim) {

        	var oo = -game.viewport - 5000;
        	var aa = -game.viewport + 5000;

			if ((ent.y > oo && ent.y < aa) || (ent.name == 'bg'))
            	
            	// cycle runs through each frame in animation;

            	var cycle = ent.img.animCycle;
				var frames = ent.img.frames;

				if (cycle == 0) {

					var run = ent.img.framespeed * frames;

				}

            	// if (cycle == 0) {
            	// 	ent.img.animCycle = frames*ent.img.framespeed;
            	// 	ent.img.framecount = 0;
            	// }


				var now = Math.floor(ent.img.framecount/ent.img.framespeed);

				if (ent.name == 'bg') {
					ctx.drawImage(ent.img, now*ent.img.spriteWidth, ent.img.current*ent.img.spriteHeight, ent.img.spriteWidth, ent.img.spriteHeight, ent.x, ent.y, ent.img.spriteWidth, ent.img.spriteHeight)
				} else {
					ctx.drawImage(ent.img, now*ent.img.spriteWidth, ent.img.current*ent.img.spriteHeight, ent.img.spriteWidth, ent.img.spriteHeight, ent.x, ent.y + game.viewport, ent.img.spriteWidth, ent.img.spriteHeight)
				}

				

				var a = Math.floor(ent.y),
					b = Math.floor(ent.y + game.viewport);

				//ctx.fillText(a + " " + b, ent.x, ent.y + viewport - 30)

				if (ent.img.framecount < (run) - 1) {
					ent.img.framecount++;
					cycle++;
				} else {
					ent.img.framecount = 0;
					cycle = 0;
				}


			} else if (ent.img != null) {
            	ctx.drawImage(ent.img, ent.x, ent.y);
            };
};


