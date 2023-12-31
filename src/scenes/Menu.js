class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create(){
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.add.text(game.config.width/2, game.config.height/2 - 64, 'Crystal Run', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 32, 'Press "UP ARROW" to jump over spikes', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press "S" to shield yourself from red crystals', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 32, 'Press "UP ARROW" to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width - 454, game.config.height/2 + 303, 'Programmed by Patrick Hu\nArt Assets by Patrick Hu from Aseprite and Pixilart\nBackground Music by Patrick Hu from GarageBand\nSound Effects by UNIVERSFIELD and Pixabay from Pixabay', menuConfig).setOrigin(0.5);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.sound.play('start', {volume: 1});
            this.scene.start('playScene')
        }
    }
}