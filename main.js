
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');
game.state.add('game', gameState);
game.state.start('game'); 