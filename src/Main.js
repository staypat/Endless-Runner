"use strict"

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    width: 1280,
    height: 720,
    scene: [Load, Menu, Play]
}
let game = new Phaser.Game(config);
// keyboad vars
let keyR, keyUP, keyS
// high score tracker
let highScoreVal = 0;