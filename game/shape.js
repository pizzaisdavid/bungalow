
const MathHelper = require('./math-helper')
const Position = require('./position')

class Shape {
  static generateRandom (width, height, size_width = 20, z = 0) {
    return new Shape(
      new Position(
        MathHelper.randomBetween(0, width),
        MathHelper.randomBetween(0, height),
        z
      ),
      20,
      size_width,
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

  isTouchingAny (shapes) {
    for (var i = 0; i < shapes.length; i++) {
      if (this.isTouching(shapes[i])) {
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
