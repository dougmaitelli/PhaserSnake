import Phaser from "phaser";

class SnakeBlock extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
  }
}

export default SnakeBlock;
