const Position = require('./position');
const MathHelper = require('./math-helper');


class House {

  static generateRandom(width, height) {
    return new House(
      Position.generateRandom(width, height),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    )
  }

  constructor(position, color) {
    this.position = position;
    this.color = color;
    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.playerId = '';
  }

  isVancant() {
    return this.playerId === '';
  }

  setPlayerId(id) {
    this.playerId = id;
  }

  toString() {
    return `playerId=${this.playerId}`;
  }
}

module.exports = House;