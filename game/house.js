const Position = require('./position');
const MathHelper = require('./math-helper');
const Player = require('./player');


class House {

  static generateRandom(width, height) {
    return new House(
      Position.generateRandom(width, height),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    );
  }

  constructor(position, color) {
    this.position = position;
    this.color = color;
    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.player = Player.Null;
  }

  isVancant() {
    return this.player === Player.Null;
  }

  setPlayer(aPlayer) {
    this.player = aPlayer;
  }

  toString() {
    return `playerId=${this.player.id}`;
  }
}

House.Null = new House(0,0);

module.exports = House;