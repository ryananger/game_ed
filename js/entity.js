function newEntity(name, type, click, x, y, source, width, height) {
		
		// init Entity, if image, draw, add to entities array.

		var ent = this;

		ent.type = type;
		ent.clickable = click;

		ent.width = width;
		ent.height = height;
		ent.x = x;
		ent.y = y;
		ent.img = null;

		if (ent.type = 'img') {
			newImage(name, x, y, source, ent);
		}
		
		game.entities.push(ent);
		
};