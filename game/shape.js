const MathHelper = require('./math-helper')

class Shape {
  static generateRandom (width, height) {
    return new Shape(
      MathHelper.randomBetween(0, width),
      MathHelper.randomBetween(0, height),
      0,
      20,
      20,
      MathHelper.randomBetween(0, 360)
    )
  }

  constructor (x, y, z, height, width, angle) {
    this.x = x
    this.y = y
    this.z = z
    this.height = height
    this.width = width
    this.angle = angle
  }

  isTouchingAny (Shapes) {
    for (var i = 0; i < Shapes.length; i++) {
      if (Shapes[i].isTouching(this)) {
        return true
      }
    }
    return false
  }

  isTouching (aShape) {
    // console.log(this);
    if (this.z !== aShape.z || this === aShape) {
      return false
    }
    return (this.x < aShape.x + aShape.width &&
    this.x + this.width > aShape.x &&
    this.y < aShape.y + aShape.height &&
    this.y + this.height > aShape.y)
  }
}

class NullShape {
  isTouching () {
    return false
  }
}

Shape.Null = NullShape
module.exports = Shape
