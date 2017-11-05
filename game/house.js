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
  }
}

module.exports = House;