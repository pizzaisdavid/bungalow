const Shape = require('../shape')
const MathHelper = require('../math-helper')

class House {
  static generateRandom (width, height) {
    return new House(
      Shape.generateRandom(width, height),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    )
  }

  get shapes () {
    return [ this.shape ]
  }

  constructor (shape, color) {
    // TODO change shape of dead house.
    this.controllableType = 'house'
    this.shape = shape
    this.color = color
    this.SPEED = 10
    this.isAlive = true
    this.ownerId = ''
  }

  isVancant () {
    return this.isAlive === true && this.ownerId === ''
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

  do (aGameBoard, command) {
    switch (command) {
      case 'LEFT':
        this.left(aGameBoard)
        break
      case 'UP':
        this.up(aGameBoard)
        break
      case 'RIGHT':
        this.right(aGameBoard)
        break
      case 'DOWN':
        this.down(aGameBoard)
        break
      default:
        console.log(`band command: ${command}`)
        break
    }
  }

  left (aGameBoard) {
    var oldx = this.shape.x
    this.shape.x -= this.SPEED
    if (aGameBoard.isValidSpace(this.shape) === false) {
      this.shape.x = oldx
    }
  }

  up (aGameBoard) {
    var oldy = this.shape.y
    this.shape.y -= this.SPEED
    if (aGameBoard.isValidSpace(this.shape) === false) {
      this.shape.y = oldy
    }
  }

  right (aGameBoard) {
    var oldx = this.shape.x
    this.shape.x += this.SPEED
    if (aGameBoard.isValidSpace(this.shape) === false) {
      this.shape.x = oldx
    }
  }

  down (aGameBoard) {
    var oldy = this.shape.y
    this.shape.y += this.SPEED
    if (aGameBoard.isValidSpace(this.shape) === false) {
      this.shape.y = oldy
    }
  }

  smash () {
    this.isAlive = false
  }

  tick (aGameBoard) {
    
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

  smash () {

  }

  tick (aGameBoard) {
    
  }

  toString () {
    return 'NullHouse'
  }
}

House.Null = new NullHouse()
module.exports = House
