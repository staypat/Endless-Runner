class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    create(){
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // bgm
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        // add background
        this.crystalBG = this.add.tileSprite(0, 0, 640, 190, 'background').setScale(2).setOrigin(0, 0);

        this.crystalSpeed = -450;
        this.spikeSpeed = -450;
        this.crystalSpeedMax = -1000;

        // add ground
        this.ground = this.physics.add.sprite(640, 600, 'ground').setScale(2);
        this.ground.body.setSize(640, 180).setOffset(0, 0);
        this.ground.body.setCollideWorldBounds(true);
        this.ground.setImmovable(true);

        // add player
        this.player = this.physics.add.sprite(40, 336, 'run', 'run 0.png').setScale(2);
        this.player.body.setSize(14, 24);
        this.player.anims.play('running');
        this.player.dead = false;
        this.player.isJumping = false;
        this.player.isShielding = false;
        this.physics.add.collider(this.player, this.ground, this.groundCollision, null, this);
        this.player.body.setGravityY(500);

        // key bindings
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        this.crystalGroup = this.add.group({
            runChildUpdate: true
        });

        this.spikeGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(10000, () => { 
            this.addCrystal(); 
        });

        this.time.delayedCall(2000, () => {
            this.addSpike(); 
        });

        this.elapsedTime = 0;
        this.highScore = this.add.text(128, 128, 'Best Time: ' + highScoreVal, menuConfig).setOrigin(0.5);
        this.timeText = this.add.text(game.config.width - 256, 128, 'Survival Time: ' + this.elapsedTime, menuConfig).setOrigin(0.5);
        this.countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateLevel,
            callbackScope: this,
            loop: true
        });

    }
    update(){
        if(this.player.dead && Phaser.Input.Keyboard.JustDown(keyR)){
            this.bgm.stop();
            this.scene.restart();
        }
        if(this.player.dead && Phaser.Input.Keyboard.JustDown(keyUP)){
            this.bgm.stop();
            this.scene.start('menuScene');
        }
        if(!this.player.dead){
            this.crystalBG.tilePositionX += 0.5;
            if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.player.dead && !this.player.isJumping){
                this.sound.play('jump', {volume: 0.25});
                this.player.isJumping = true;
                this.player.setVelocityY(-200);
            }
            if(Phaser.Input.Keyboard.JustDown(keyS) && !this.player.dead && !this.player.isShielding){
                this.sound.play('shield', {volume: 0.25});
                this.player.isShielding = true;
                this.player.body.setSize(16, 24).setOffset(12,4);
                this.player.anims.play('shielding');
                this.player.once('animationcomplete-shielding', () => {
                    this.player.isShielding = false;
                    this.player.body.setSize(14, 24);
                    this.player.anims.play('running');
                });
            }
            this.physics.world.collide(this.player, this.crystalGroup, this.crystalCollision, null, this);
            this.physics.world.collide(this.player, this.spikeGroup, this.spikeCollision, null, this);
        }
    }

    groundCollision(){
        this.player.isJumping = false;
        this.player.x = 40;
        this.player.y = 336;
    }

    addCrystal(){
        let speedVariance = Phaser.Math.Between(0, 25);
        let crystal = new Crystal(this, this.crystalSpeed - speedVariance);
        this.crystalGroup.add(crystal);
    }

    addSpike(){
        let speedVariance =  Phaser.Math.Between(0, 25);
        let spike = new Spike(this, this.spikeSpeed - speedVariance);
        this.spikeGroup.add(spike);
    }

    updateLevel(){
        if(!this.player.dead){
            this.elapsedTime += 1;
            this.timeText.setText('Survival Time: ' + this.elapsedTime);
            if(highScoreVal <= this.elapsedTime){
                this.highScore.text = 'Best Time: ' + this.elapsedTime;
                highScoreVal = this.elapsedTime;
            }
            if((this.elapsedTime % 5) == 0){
                if(this.crystalSpeed >= this.crystalSpeedMax){
                    this.crystalSpeed -= 25;
                    this.spikeSpeed -= 5;
                }
            }
        }
    }

    crystalCollision(player, obstacle){
        if(player.isShielding){
            player.setVelocity(0);
            obstacle.destroy();
        }else{
            this.sound.play('death', {volume: 0.25});
            this.player.dead = true;
            this.player.destroy();
            this.timeText.setText('Survival Time: ' + this.elapsedTime);
            this.add.text(game.config.width/2, game.config.height/2 - 96, 'GAME OVER', {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B131',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'Press (R) to Restart', {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B131',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'Press UP ARROW to return to Main Menu', {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B131',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }).setOrigin(0.5);
        }
    }

    spikeCollision(player, obstacle){
        this.sound.play('death', {volume: 0.25});
        this.player.dead = true;
        this.player.destroy();
        this.timeText.setText('Survival Time: ' + this.elapsedTime);
        this.add.text(game.config.width/2, game.config.height/2 - 96, 'GAME OVER', {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B131',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 64, 'Press (R) to Restart', {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B131',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 32, 'Press UP ARROW to return to Main Menu', {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B131',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }).setOrigin(0.5);
    }
}