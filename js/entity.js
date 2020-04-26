class Entity {
	constructor(name, type, click, x, y, source, static_, solid, anim, width, height, anims) {
		this.img = null;
		this.idn = game.ids + 1;
		this.name = name;
		this.type = type;

		this.clickable = click;
		this.solid = solid;
		this.static_ = static_;

		this.gravity = 0.4;
		this.gravityX = 0;
		this.orbiting = null;
		this.orbitRs = 0;
		this.orbitR = 0;
		this.oGrow = false;
		this.gspeed = 0;
		this.gspeedX = 0;

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
			this.img = newImage(name, x, y, source, anim, width, height, anims);
		};

		if (!static_) {
			this.velY = 1 + (this.gravity * (this.velY*1.1));
		};

		game.entities.push(this);

		game.ids++;

	}

	move() {
		if (this.static_) {
	            return;
	    };

		var chk = this.onScreen();

	    if (this.name == 'blob') {

	    	var cx = Math.floor(Math.random()*1000);

	    	if (Math.floor(Math.random()*250) == 0) {
	    		this.gravity = -this.gravity;
	    		this.velY = -this.velY;
	    	}

	    	if (Math.floor(Math.random()*250) == 0) {
	    		this.velY = this.velY * 4;
	    	}

	    	if (this.x >= (640 - this.width - 5) && this.velX > 0) {
	    		this.velX = -this.velX*2;
	    	}
	    	if (this.x <= 5 && this.velX < 0) {
	    		this.velX = -this.velX*2;
	    	}

	    	if (Math.floor(Math.random()*10) > 4) {
	    		this.velX = this.velX* 0.995;
	    		this.velY = this.velY* 0.992;
	    	}
	    	if (cx == 0 && this.velX < 5) {this.velX += 4;}
	    	if (cx == 1 && this.velX > -5) {this.velX -= 4;}
	    };

	    if (this.name == 'butterfly') {

	    		// ------100 - 50 = 50, move right;
	    		var dx = game.orb.x - this.x;
	    		var dy = game.orb.y - this.y;

	    		var nn;
	    		if (game.orb.y <= 460) {
	    			nn = 320;
	    		} else {
	    			nn = 0;
	    		}

	    		dy += nn;

	    			if (game.orb.x <= 320) {
	    				var n1 = game.orb.x;
	    			}
	    			if (game.orb.x > 320) {
	    				var n1 = 640 - game.orb.x;
	    			}
	    			n1 = n1/8;

	    		if (!this.flutter) {
	    			this.orbitR = n1;
	    			this.speedlimitX = 2;
	    		}

	    		if (!this.growing && this.orbitR > 20) {
	    			this.orbitR = this.orbitR*0.99;
	    		} else if (this.growing && this.orbitR < 200) {
	    			this.orbitR = this.orbitR*1.011;
	    		} else {
	    			this.growing = false;
	    		}

	    		var circ = this.orbitR;

	    		if (Math.abs(dy) > 2000) {
	    			this.flutter = false;
	    		}

	    		if (Math.abs(dy) < circ) {

	    			var st = 0.3/Math.abs(dy);

		    		this.velY = this.velY* 0.99;
		    		this.gspeed = this.gspeed/st;

	    		}

	    		// if (Math.abs(dx) < circ) {

	    		// 	var st = 3/Math.abs(dx);

		    	// 	this.velX = this.velX* 0.99;
		    	// 	this.gspeedX = this.gspeedX/st;

	    		// }	    		

	    		if (!this.flutter) {
	    			if (dy > 0) {
		    			this.gravity = 0.06 ;

		    		}
		    		if (dy > circ) {
		    			this.gravity = 0.2 ;
		    		}
		    		if (dy < 0) {
		    			this.gravity = -0.04 ;
		    		}
		    		if (dy < circ) {
		    			this.gravity = -0.08 ;
		    		}

	    			if (dy > 1000) {
		    			this.gravity = 0.8;
		    			this.speedlimitY = 100;
		    		} else if (dy < -1000) {
		    			this.gravity = -2;
		    			this.speedlimitY = 200;
		    		} else {
		    			this.speedlimitY = 2;
		    		}
	    		}
	    		

	    		var r = Math.floor(Math.random()*80);

	    		

	    		if (r == 0 && !this.flutter && game.orb.y + nn - 400 < this.y && Math.abs(dy) < 1000) {
	    			this.speedlimitY = 0.5 + (Math.floor(Math.random()*2));
	    			this.speedlimitX += 1;

	    			if (this.gravity >= 0) {
	    				this.gravity = -this.gravity*1.5;
	    			}

	    			this.orbitR += Math.floor(Math.random()*4)*12.5;

	    			this.flutter = true;
	    			console.log('flutter on');

	    			var u = this;

	    			var off = setTimeout(function(){u.flutter = false;}, 3000);
	    		}

	    		var ii;

	    		var droprate = 12;
	    		for (ii = 0; ii < (this.img.framespeed*this.img.frames/droprate); ii++) {

	    				if (this.img.framecount == ii*droprate) {
	    					var drop = new Entity('drop', 'img', true, this.x, this.y, 'resources/drop.png', false, false, true, 24, 36);

		    				drop.gravity = 0;
		    				drop.speedlimitX = 0;
		    				drop.speedlimitY = 0;
		    				drop.img.framespeed = 240;

		    				var kill = setTimeout(function() {
		    					for (i = 0; i < game.entities.length; i++) {
		    						if (game.entities[i].idn == drop.idn) {
		    							game.entities.splice(i, 1);
		    						}
		    					};
		    				}, 20400);
	    				} 
	    				
	    		}
	    		var cx = Math.floor(Math.random()*500);

		    	// if (Math.floor(Math.random()*100) == 0) {
		    	// 	this.velY = -this.velY;
		    	// }

		    	// if (Math.floor(Math.random()*20) == 0) {
		    	// 	this.velY -= .2;
		    	// 	this.velY = this.velY * 1.3;
		    	// }

		    	// if (this.x >= (640 - this.width - 5) && this.velX > 0) {
		    	// 	this.velX = -this.velX*2;
		    	// }
		    	// if (this.x <= 5 && this.velX < 0) {
		    	// 	this.velX = -this.velX*2;
		    	// }

		    	

		    	if (cx == 0 && this.velX < 2) {this.velX += .4;}
		    	if (cx == 1 && this.velX > -2) {this.velX -= .4;}    	

	    };

	    game.orb.elevation = Math.floor(900 - game.orb.y - 31);

		//collisionCheck(ent);
		this.collisionCheck();

		// speed affected by gravity;
	   	this.gspeed += this.gravity;

	   	if (this.orbiting != null) {
	   		this.gspeedX += this.gravityX;
	   		this.stopping = false;
	   	}

	   	this.speedLimiter();

		var chk = this.onScreen();

		if (chk.x) {
			this.x += this.velX;
		} else {
			this.velX = -this.velX*2;
			this.gspeedX = -this.gspeedX;
		}


		this.velY = this.velY * 0.8;
		this.velX = this.velX * 0.95;

		var ydelt = this.velY + this.gspeed;
		var xdelt = this.velX + this.gspeedX;

		if (this.orbiting != null) {
			if (this.x > this.orbiting.x + this.orbitR) {
				this.gravityX = -Math.abs(this.gravityX);
			}

			if (this.x < this.orbiting.x - this.orbitR) {
				this.gravityX = Math.abs(this.gravityX);
			}
		}

		this.y += ydelt;
		this.x += xdelt;



		if (this.velX > 0.1 || this.velX < -0.1) {
			if (this.stopping) {this.velX = this.velX * 0.95;};
		}		
	}

onScreen(ent) {
		var xchk = false;
		var ychk = false;

		// can move left?
		if (this.velX + this.gspeedX <= 0 && this.x + this.velX + this.gspeedX > 8) {
			xchk = true;
		} 

		//can move right?
		else if (this.velX + this.gspeedX >= 0 && this.x + this.width + this.velX + this.gspeedX < canvas.width - 8) {
			xchk = true;
		};

		//can move up?
		if (this.velY <= 0 && this.y + this.velY >= 0) {
			ychk = true;
		} 

		//can move down?
		else if (this.velY > 0 && this.y + this.height + this.velY <= canvas.height) {
			ychk = true;
		}

		var chk = {x: xchk, y: ychk};

		return chk;

};

speedLimiter() {

	var sY = this.speedlimitY;
	var sX = this.speedlimitX;

	// if gravity speed exceeds speedlimit, set it to speed limit
   	if (this.gspeed < -sY) {
		this.gspeed = -sY;
	} else if (this.gspeed > sY) {
		this.gspeed = sY;
	};

	if (this.gspeedX < -sX) {
		this.gspeedX = -sX;
	} else if (this.gspeedX > sX) {
		this.gspeedX = sX;
	};

	// if velocity X exceeds speedlimit, set it to speed limit
	if (this.velX < 0 && this.velX < -sX) {
		this.velX = -sX;
	}
	if (this.velX > 0 && this.velX > sX) {
		this.velX = sX;
	}

	// if velocity Y exceeds speedlimit, set it to speed limit
	if (this.velY < 0 && this.velY < -sY) {
		this.velY = -sY;
	}
	if (this.velY > 0 && this.velY > sY) {
		this.velY = sY;
	};
};

collisionCheck() {
	var collision = false;

	var j;

    for (j = 0; j < game.entities.length; j++) {
        var checkent = game.entities[j];

        this.cx = this.x + this.colx;
        this.cw = this.width + this.colwidth;
        this.cy = this.y + this.coly;
        this.ch = this.height + this.colheight;

        checkent.cx = checkent.x + checkent.colx;
        checkent.cw = checkent.width + checkent.colwidth;
        checkent.cy = checkent.y + checkent.coly;
        checkent.ch = checkent.height + checkent.colheight;
		


        if (checkent != this && checkent.solid && this.solid) {

            if ((this.cx + this.cw) > checkent.cx &&
                this.cx < (checkent.cx + checkent.ch) &&
                (this.cy + this.ch) > checkent.cy &&
                this.cy < (checkent.cy + checkent.ch)) {

                   	// collision below
            		if (this.cy + this.ch > checkent.cy) {
            			this.y = checkent.cy - this.ch;
            			this.velY -= 2;

            			// friction
            			this.velX = this.velX * 0.97;
            			// gravity and bounce
      				    this.gspeed = -(this.gspeed * this.bounce);
            		};
           
            };
        };
    };
};

};	