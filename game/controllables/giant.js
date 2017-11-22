const Shape = require('../shape')

class Giant {
  constructor (rightShape, leftShape) {
    this.rightShape = rightShape
    this.leftShape = leftShape
    this.currentControl = this.rightShape
    this.speed = 10
    this.ownerId = ''
  }
}

module.exports = Giant
