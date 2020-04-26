class Entity {
	constructor(name, type, click, x, y, source, static, solid, anim, width, height) {
		this.img = null;
		this.idn = game.ids + 1;
		this.name = name;
		this.type = type;

		this.clickable = click;
		this.solid = solid;
		this.static = static;
		this.gravity = 0.4;
		this.gspeed = 0;
		this.bounce = 0;
		this.velX = 0;
		this.velY = 0;
		this.speedlimitY = 80;
		this.speedlimitX = 10;
		this.stopping = true;

		this.elevation = 0;

		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.colx = 0;
		this.coly = 0;
		this.colwidth = 0;
		this.colheight = 0;

		if (this.type = 'img') {
			newImage(name, x, y, source, ent, anim, width, height);
		};

		if (!static) {
			this.velY = 1 + (this.gravity * (this.velY*1.1));
		};

		game.entities.push(ent.prop);

		game.ids++;

		console.log(this)
		return this;
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