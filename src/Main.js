let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// keyboad vars
let keyF, keyR, keyLEFT, keyRIGHT;
// high score tracker
let highScoreVal = 0;