
const MathHelper = require('./math-helper')

class Position {
  static generateRandom (width, height) {
    return new Position(
      MathHelper.randomBetween(0, width),
      MathHelper.randomBetween(0, height),
      MathHelper.randomBetween(0, 360)
    )
  }

  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

module.exports = Position
