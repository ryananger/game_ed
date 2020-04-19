function newEntity(name, type, click, x, y, source, width, height) {
		
		// init Entity, if image, draw, add to entities array.

		var ent = this;

		ent.prop = {
			img: null,
			idn: game.ids + 1,
			name: name,
			type: type,
			clickable: click,

			width: width,
			height: height,
			x: x,
			y: y,

		};

		if (ent.prop.type = 'img') {
			newImage(name, x, y, source, ent);
		};
		
		game.entities.push(ent.prop);

		game.ids++;

		return this;
		
};