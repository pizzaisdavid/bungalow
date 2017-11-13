const PlaneObject = require('./plane-object')
const MathHelper = require('./math-helper')

class House {
  static generateRandom (width, height) {
    return new House(
      PlaneObject.generateRandom(width, height),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    )
  }

  constructor (position, color) {
    this.position = position
    this.color = color
    this.SPEED = 10
    this.ownerId = ''
  }

  isVancant () {
    return this.ownerId === ''
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
    var oldx = this.position.x

    this.position.x -= this.SPEED
    // console.log('iiiiiiiiiiiiiiiiiiiiiii');
    if (game.isTouchingAnyHouse(this.position)) {
      // console.log('hihihihih');
      this.position.x = oldx
    }
  }

  up (game) {
    var oldy = this.position.x
    this.position.y -= this.SPEED
    if (game.isTouchingAnyHouse(this.position)) {
      this.position.y = oldy
    }
  }

  right (game) {
    var oldx = this.position.x
    this.position.x += this.SPEED
    if (game.isTouchingAnyHouse(this.position)) {
      this.position.x = oldx
    }
  }

  down (game) {
    var oldy = this.position.x
    this.position.y += this.SPEED
    if (game.isTouchingAnyHouse(this.position)) {
      this.position.y = oldy
    }
  }
}

class NullHouse {
  constructor () {
    this.position = PlaneObject.Null
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
