class Spike extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width, game.config.height/2, 'spike');
        scene.add.existing(this);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newSpike = true;
    }

    update(){
        if(this.newSpike && this.x < game.config.width / 4){
            this.parentScene.addSpike(this.parent, this.velocity);
            this.newSpike = false;
        }
        if(this.x <- this.width){
            this.destroy();
        }
    }
}