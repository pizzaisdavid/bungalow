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

  constructor (position, height, width, angle) {
    this.position = position
    this.height = height
    this.width = width
    this.angle = angle
  }

  get x () {
    return this.position.x
  }

  get y () {
    return this.position.y
  }

  get z () {
    return this.position.z
  }

  set x (x) {
    this.position.x = x
  }

  set y (y) {
    this.position.y = y
  }

  set z (z) {
    this.position.z = z
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
