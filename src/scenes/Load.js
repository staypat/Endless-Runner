class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload(){
        // loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0, game.config.width/2, game.config.width * value, 5); 
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // loading assets
        this.load.image('background', './assets/background.png');
        this.load.atlas('run', './assets/run.png', './assets/run.json')
        this.load.atlas('shield', './assets/shield.png', './assets/shield.json')
        this.load.image('spike', './assets/spike.png');
        this.load.image('damage', './assets/damageCrystal.png');
        this.load.image('ground', './assets/ground.png');

        // audio
        this.load.audio('bgm', './assets/Crystal_Run.mp3'); // Audio by Patrick Hu (Me) from GarageBand
        this.load.audio('death', './assets/punch.mp3'); // Sound Effect by UNIVERSFIELD from Pixabay
        this.load.audio('jump', './assets/jump.mp3'); // Sound Effect from Pixabay
        this.load.audio('shield', './assets/barrier.mp3'); // Sound Effect from Pixabay
        this.load.audio('start', './assets/start.mp3'); // Sound Effect from Pixabay
    }

    create(){
        // creating atlas and animations
        this.textures.addSpriteSheetFromAtlas('run 0.png', {frameHeight: 16, frameWidth: 32, atlas: 'run', frame: 'run 0.png'})
        this.textures.addSpriteSheetFromAtlas('shield 0.png', {frameHeight: 16, frameWidth: 32, atlas: 'shield', frame: 'shield 0.png'})

        this.anims.create({
            key: "running",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames(
                'run', {
                    prefix: 'run ',
                    start: 0,
                    end: 3,
                    suffix: '.png'  
            })
        })

        this.anims.create({
            key: "shielding",
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNames(
                'shield', {
                    prefix: 'shield ',
                    start: 0,
                    end: 3,
                    suffix: '.png'  
            })
        })

        this.scene.start('menuScene')
    }
}