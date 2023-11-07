// Patrick Hu
// Crystal Run
// Time it took to complete the project: 25 hours
// Creative Tilt Justification:
//  Technicality: I'm proud of how I implemented a shield mechanic where it only blocks one of two obstacles in the game (only crystals). The shield animation I created 
//  also led to me having to think about changing hitboxes and helped me gain a better understanding of event listeners. Most notably, the 'once' event listener which I 
//  learned and used to continue my running animation after my character finished their shielding animation. (Note: I learned this before we did Exercise 3 in class which
//  had also made use of the 'once' event)
//
//  Visuals: I'm happy with the creation of my own background music. I wanted to achieve a similar feeling to Geometry Dash where there was a sense of calmness
//  mixed with urgency. I have never played an instrument before so I have limited knowledge of any music theory. However, even with a simple piano and some drum
//  sounds, I felt like I made a nice looping audio for the background.

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