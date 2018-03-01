import GameOptions from "./GameOptions";
import SnakeBlock from "./SnakeBlock";

class Snake {
  constructor(config) {
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    config.scene.add.existing(this);

    this.direction = Snake.RIGHT;
    this.body = [];

    this.buildBody();
  }

  buildBody() {
    for (let i = 0; i < 3; i++) {
      let bodyPart = new SnakeBlock({
        scene: this.scene,
        key: "snake",
        x: this.x - 40 * i,
        y: this.y
      });
      this.body.push(bodyPart);
    }
  }

  move() {
    if (this.direction === Snake.LEFT) {
      this.x -= GameOptions.tileSize;
    } else if (this.direction === Snake.RIGHT) {
      this.x += GameOptions.tileSize;
    } else if (this.direction === Snake.UP) {
      this.y -= GameOptions.tileSize;
    } else if (this.direction === Snake.DOWN) {
      this.y += GameOptions.tileSize;
    }

    this.scene.tweens.add({
      targets: this.body[0],
      x: this.x,
      y: this.y,
      duration: GameOptions.gameSpeed
    });

    for (let i = 1; i < this.body.length; i++) {
      this.scene.tweens.add({
        targets: this.body[i],
        x: this.body[i - 1].x,
        y: this.body[i - 1].y,
        duration: GameOptions.gameSpeed
      });
    }
  }

  grow() {
    let bodyPart = new SnakeBlock({
      scene: this.scene,
      key: "snake",
      x: this.body[this.body.length - 1].x - GameOptions.tileSize,
      y: this.body[this.body.length - 1].y
    });
    this.body.push(bodyPart);
  }
}

Snake.LEFT = 1;
Snake.UP = 2;
Snake.RIGHT = 3;
Snake.DOWN = 4;

export default Snake;
