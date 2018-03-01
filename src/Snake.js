import GameOptions from "./GameOptions";
import SnakeBlock from "./SnakeBlock";

class Snake {
  constructor(config) {
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    config.scene.add.existing(this);

    this.direction = this.nextDirection = Snake.RIGHT;
    this.body = [];
    this.toGrow = 0;

    this.buildBody();
  }

  buildBody() {
    let bodyPart = new SnakeBlock({
      scene: this.scene,
      key: "snake",
      x: this.x,
      y: this.y
    });
    this.body.push(bodyPart);

    this.grow(2);
  }

  move() {
    this.direction = this.nextDirection;

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

    if (this.toGrow > 0) {
      let bodyPart = new SnakeBlock({
        scene: this.scene,
        key: "snake",
        x: this.body[this.body.length - 1].x,
        y: this.body[this.body.length - 1].y
      });
      this.body.push(bodyPart);

      this.toGrow--;
    }
  }

  grow(toGrow) {
    this.toGrow += toGrow;
  }
}

Snake.LEFT = 1;
Snake.UP = 2;
Snake.RIGHT = 3;
Snake.DOWN = 4;

export default Snake;
