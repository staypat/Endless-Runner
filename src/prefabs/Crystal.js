class Crystal extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width, Phaser.Math.Between(260, 290), 'damage');
        scene.add.existing(this);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.setSize(28, 12);
        this.newCrystal = true;
    }

    update(){
        if(this.newCrystal && this.x < game.config.width / 5){
            this.parentScene.addCrystal(this.parent, this.velocity);
            this.newCrystal = false;
        }
        if(this.x < -this.width){
            this.destroy();
        }
    }
}