

function newEntity(name, type, click, x, y, source, static, solid, anim, width, height) {
		
		// init Entity, if image, draw, add to entities array.

		var ent = this;

		ent.prop = {
			img: null,
			idn: game.ids + 1,
			name: name,
			type: type,
			clickable: click,
			solid: solid,
			static: static,
			gravity: 0.4,
			gspeed: 0,
			bounce: 0,
			velX: 0,
			velY: 0,
			speedlimitY: 80,
			speedlimitX: 10,
			stopping: true,

			width: width,
			height: height,
			x: x,
			y: y,
			colx: 0,
			coly: 0,
			colwidth: 0,
			colheight: 0

		};

		if (ent.prop.type = 'img') {
			newImage(name, x, y, source, ent, anim, width, height);
		};

		if (!static) {
			ent.prop.velY = 1 + (ent.prop.gravity * (ent.prop.velY*1.1));
		};

		game.entities.push(ent.prop);

		game.ids++;

		console.log(this)
		return this;
		
};

function onScreen(ent) {
		var xchk = false;
		var ychk = false;

		// can move left?
		if (ent.velX <= 0 && ent.x + ent.velX >= 0) {
			xchk = true;
		} 

		//can move right?
		else if (ent.velX > 0 && ent.x + ent.width + ent.velX <= canvas.width) {
			xchk = true;
		};

		//can move up?
		if (ent.velY <= 0 && ent.y + ent.velY >= 0) {
			ychk = true;
		} 

		//can move down?
		else if (ent.velY > 0 && ent.y + ent.height + ent.velY <= canvas.height) {
			ychk = true;
		}

		var chk = {x: xchk, y: ychk};

		return chk;

};

function speedLimiter(ent) {

	var sY = ent.speedlimitY;
	var sX = ent.speedlimitX;

	// if gravity speed exceeds speedlimit, set it to speed limit
   	if (ent.gspeed < -sY) {
		ent.gspeed = -sY;
	} else if (ent.gspeed > sY) {
		ent.gspeed = sY;
	};

	// if velocity X exceeds speedlimit, set it to speed limit
	if (ent.velX < 0 && ent.velX < -sX) {
		ent.velX = -sX;
	}
	if (ent.velX > 0 && ent.velX > sX) {
		ent.velX = sX;
	}

	// if velocity Y exceeds speedlimit, set it to speed limit
	if (ent.velY < 0 && ent.velY < -sY) {
		ent.velY = -sY;
	}
	if (ent.velY > 0 && ent.velY > sY) {
		ent.velY = sY;
	};
};

function move(ent) {
	if (ent.static) {
            return;
    };

    game.orb.elevation = Math.floor(900 - game.orb.y - 31);

	collisionCheck(ent);

	// speed affected by gravity;
   	ent.gspeed += ent.gravity;

   	speedLimiter(ent);

	var chk = onScreen(ent);

	if (chk.x) {

		ent.x += ent.velX;
	}


	ent.velY = ent.velY * 0.8;

	var ydelt = ent.velY + ent.gspeed;

	ent.y += ydelt;



	if (ent.velX > 0.1 || ent.velX < -0.1) {
		if (ent.stopping) {ent.velX = ent.velX * 0.98;};
	};

	ent.x = Math.floor(Math.round(ent.x));
    ent.y = Math.floor(Math.round(ent.y));

	
}

function collisionCheck(ent) {
	var collision = false;

    for (j = 0; j < game.entities.length; j++) {
        var checkent = game.entities[j];

        ent.cx = ent.x + ent.colx;
        ent.cw = ent.width + ent.colwidth;
        ent.cy = ent.y + ent.coly;
        ent.ch = ent.height + ent.colheight;

        checkent.cx = checkent.x + checkent.colx;
        checkent.cw = checkent.width + checkent.colwidth;
        checkent.cy = checkent.y + checkent.coly;
        checkent.ch = checkent.height + checkent.colheight;
		

        if (checkent != ent) {

            if ((ent.cx + ent.cw) > checkent.cx &&
                ent.cx < (checkent.cx + checkent.ch) &&
                (ent.cy + ent.ch) > checkent.cy &&
                ent.cy < (checkent.cy + checkent.ch)) {

                   	// collision below
            		if (ent.cy + ent.ch > checkent.cy) {
            			ent.y = checkent.cy - ent.ch;
            			ent.velY -= 2;

            			// friction
            			ent.velX = ent.velX * 0.97;
            			// gravity and bounce
      				    ent.gspeed = -(ent.gspeed * ent.bounce);
            		};
           
            };
        };
    };
};