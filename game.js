var gameState = (function getGameState() {

	var player1;
	var filet;

	var upKey;
	var downKey;
	var leftKey;
	var rightKey;

	function registerInputHandlers() {
		upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	}

	function decr(x, amount) {
		return x - amount;
	}

	function incr(x, amount) {
		return x + amount;
	}


	function move(sprite, direction) {
		var amount = 5;
		var dp = {
			"UP": {
				"property": "y",
				"function": decr
			},
			"DOWN": {
				"property": "y",
				"function": incr
			},
			"RIGHT": {
				"property": "x",
				"function": incr
			},
			"LEFT": {
				"property": "x",
				"function": decr
			}
		}

		var property = dp[direction]["property"];
		sprite[property] = dp[direction]["function"](sprite[property], amount);

	}

	function preload() { }

	function createRectangleSprite(color, posx, posy, sizex, sizey){
		var rect = game.make.bitmapData(sizex, sizey);
		rect.ctx.fillStyle = color;
		rect.ctx.fillRect(0, 0, sizex, sizey);

		var sprite = game.add.sprite(posx, posy, rect);
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
		sprite.body.collideWorldBounds = true;
		sprite.body.bounce.setTo(1, 1);

		//sprite.body.bounce.set(1);
		return sprite;
	}

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		player1 = createRectangleSprite("#FF0000", 10, 290, 32, 32);
		//player1.body.velocity.x = 200;

		filet = createRectangleSprite("#FFFFFF", 390, 0, 20, 600);
		filet.body.immovable = true;


		game.physics.arcade.collide(filet, player1);
		registerInputHandlers();
	}

	function update() {
		if (upKey.isDown) {
			move(player1, "UP");
		} else if (downKey.isDown) {
			move(player1, "DOWN");
		}
		if (leftKey.isDown) {
			move(player1, "LEFT");
		} else if (rightKey.isDown) {
			move(player1, "RIGHT");
		}
	}

	function render() { }

	return {
		preload: preload,
		create: create,
		update: update,
		render: render
	};
	
})();