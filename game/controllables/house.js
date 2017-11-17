const Shape = require('../shape')
const MathHelper = require('../math-helper')

class House {
  static generateRandom (width, height) {
    return new House(
      Shape.generateRandom(width, height),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    )
  }

  constructor (shape, color) {
    this.shape = shape
    this.color = color
    this.SPEED = 10
    this.ownerId = ''
  }

  isVancant () {
    return this.ownerId === ''
  }

  get x () {
    return this.shape.x
  }

  set x (x) {
    this.shape.x = x
  }

  get y () {
    return this.shape.y
  }

  set y (y) {
    this.shape.y = y
  }

  set owner (newOwnerId) {
    this.ownerId = newOwnerId
  }

  isOccupiedBy (aPlayer) {
    return this.ownerId === aPlayer.id
  }

  abandon () {
    this.ownerId = ''
  }

  toString () {
    return `ownerId=${this.ownerId}`
  }

  do (game, command) {
    switch (command) {
      case 'LEFT':
        this.left(game)
        break
      case 'UP':
        this.up(game)
        break
      case 'RIGHT':
        this.right(game)
        break
      case 'DOWN':
        this.down(game)
        break
      default:
        console.log(`band command: ${command}`)
        break
    }
  }

  left (game) {
    var oldx = this.shape.x
    this.shape.x -= this.SPEED
    if (game.isTouchingAny(this.shape)) {
      this.shape.x = oldx
    }
  }

  up (game) {
    var oldy = this.shape.y
    this.shape.y -= this.SPEED
    if (game.isTouchingAny(this.shape)) {
      this.shape.y = oldy
    }
  }

  right (game) {
    var oldx = this.shape.x
    this.shape.x += this.SPEED
    if (game.isTouchingAny(this.shape)) {
      this.shape.x = oldx
    }
  }

  down (game) {
    var oldy = this.shape.y
    this.shape.y += this.SPEED
    if (game.isTouchingAny(this.shape)) {
      this.shape.y = oldy
    }
  }
}

class NullHouse {
  constructor () {
    this.position = Shape.Null
  }

  abandon () {

  }

  isVancant () {
    return false
  }

  toString () {
    return 'NullHouse'
  }
}

House.Null = new NullHouse()
module.exports = House
