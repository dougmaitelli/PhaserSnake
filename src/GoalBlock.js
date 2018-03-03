import Phaser from "phaser";

class GoalBlock extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    this.setSize(10, 10);
  }
}

export default GoalBlock;
