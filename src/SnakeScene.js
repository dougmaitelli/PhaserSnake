import Phaser from "phaser";
import Tone from "tone";

import GameOptions from "./GameOptions";
import Snake from "./Snake";
import GoalBlock from "./GoalBlock";

class SnakeScene extends Phaser.Scene {
  constructor() {
    super({
      key: "SnakeScene"
    });
  }

  preload() {
    this.load.image("snake", "assets/sprites/snake.png");
    this.load.image("goal", "assets/sprites/goal.png");
  }

  create() {
    this.lastTime = 0;

    this.synth = new Tone.Synth().toMaster();

    this.snake = new Snake({
      scene: this,
      x: GameOptions.tileSize / 2,
      y: GameOptions.tileSize / 2
    });
    this.nextDirection = this.snake.direction;

    this.goals = [];

    this.leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );

    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    this.rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    this.downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    this.addGoal();
  }

  update(time) {
    let deltaTime = time - this.lastTime;

    if (
      this.snake.direction === Snake.LEFT ||
      this.snake.direction === Snake.RIGHT
    ) {
      if (this.upKey.isDown) {
        this.nextDirection = Snake.UP;
      } else if (this.downKey.isDown) {
        this.nextDirection = Snake.DOWN;
      }
    }

    if (
      this.snake.direction === Snake.UP ||
      this.snake.direction === Snake.DOWN
    ) {
      if (this.leftKey.isDown) {
        this.nextDirection = Snake.LEFT;
      } else if (this.rightKey.isDown) {
        this.nextDirection = Snake.RIGHT;
      }
    }

    if (deltaTime > 1000 / GameOptions.gameSpeed) {
      this.lastTime = time;

      this.snake.direction = this.nextDirection;

      if (!this.checkBoundaries()) {
        this.snake.move();
      }

      this.checkGoals();
    }
  }

  addGoal() {
    let randX = Phaser.Math.RND.integerInRange(0, GameOptions.tileBlocks - 1);
    let randY = Phaser.Math.RND.integerInRange(0, GameOptions.tileBlocks - 1);

    let goalBlock = new GoalBlock({
      scene: this,
      key: "goal",
      x: (randX + 0.5) * GameOptions.tileSize,
      y: (randY + 0.5) * GameOptions.tileSize
    });

    this.goals.push(goalBlock);
  }

  checkGoals() {
    for (let i = this.goals.length - 1; i >= 0; i--) {
      if (
        this.snake.x === this.goals[i].x &&
        this.snake.y === this.goals[i].y
      ) {
        this.goals[i].destroy();
        this.goals.splice(i, 1);

        this.snake.grow(1);
        this.addGoal();

        this.playTone();
      }
    }
  }

  checkBoundaries() {
    return (
      (this.snake.direction === Snake.LEFT &&
        this.snake.x === GameOptions.tileSize / 2) ||
      (this.snake.direction === Snake.UP &&
        this.snake.y === GameOptions.tileSize / 2) ||
      (this.snake.direction === Snake.RIGHT &&
        this.snake.x ===
          (GameOptions.tileBlocks - 0.5) * GameOptions.tileSize) ||
      (this.snake.direction === Snake.DOWN &&
        this.snake.y === (GameOptions.tileBlocks - 0.5) * GameOptions.tileSize)
    );
  }

  playTone() {
    this.synth.triggerAttackRelease("B1", "8n");
    this.synth.triggerAttackRelease(
      "B2",
      "8n",
      Tone.now() + this.synth.toSeconds("8n")
    );
    this.synth.triggerAttackRelease(
      "B1",
      "8n",
      Tone.now() + this.synth.toSeconds("16n")
    );
  }
}

export default SnakeScene;
