
const MathHelper = require('./math-helper');

class Position {

  static generateRandom(width, height) {
    return new Position(
      MathHelper.randomBetween(0, width),
      MathHelper.randomBetween(0, height),
      MathHelper.randomBetween(0, 360)
    )
  }

  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

module.exports = Position;