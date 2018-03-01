import Phaser from "phaser";

import GameOptions from "./GameOptions";
import SnakeScene from "./SnakeScene";

let config = {
  type: Phaser.WEBGL,
  parent: "content",
  width: GameOptions.tileSize * GameOptions.tileBlocks,
  height: GameOptions.tileSize * GameOptions.tileBlocks,
  scene: [SnakeScene]
};

let resize = () => {
  var canvas = document.getElementsByTagName("canvas")[0];

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var windowRatio = windowWidth / windowHeight;
  var gameRatio = config.width / config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
};

window.onload = () => {
  new Phaser.Game(config);

  resize();
  window.addEventListener("resize", resize, false);
};
