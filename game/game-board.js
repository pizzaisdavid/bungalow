const House = require('./controllables/house')
const Giant = require('./controllables/giant')
const Shape = require('./shape')
const MathHelper = require('./math-helper')

class GameBoard {
  constructor (width = 300, height = 150) {
    this.width = width
    this.height = height
    this.controllables = []
    this._events = []
  }

  get events() {
    var events = this._events
    this._events = []
    return events
  }

  set events(e) {
    this._events = e
  }

  setControllables (c) {
    this.controllables = c
  }

  createHouses (count) {
    var houses = []
    for (var i = 0; i < count; i++) {
      var house = this.spawnProperPlacedHouse()
      houses.push(house)
      this.controllables.push(house)
    }
    return houses
  }

  createGiants (count) {
    var giants = []
    for (var i = 0; i < count; i++) {
      var g = this.spawnProperPlacedGiant()
      giants.push(g)
      this.controllables.push(g)
    }
    return giants
  }

  createGiant () {
    var giant = this.spawnProperPlacedGiant()
    this.controllables.push(giant)
    return [ giant ]
  }

  spawnProperPlacedGiant () {
    var width = 40
    var z = 1
    return new Giant(this.spawnProperPlacedShape(width, z), this.spawnProperPlacedShape(width, z))
  }

  spawnProperPlacedHouse () {
    return new House(
      this.spawnProperPlacedShape(),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    )
  }

  spawnProperPlacedShape (width = 20, z = 0) {
    while (true) {
      var shape = Shape.generateRandom(this.width, this.height, width, z)
      if (this.isValidSpace(shape)) {
        return shape
      }
    }
  }

  isValidSpace (aShape) {
    return this.isTouchingAny(aShape) === false && this.isWithinBoard(aShape)
  }

  isWithinBoard (aShape) {
    return (aShape.x > 0 && aShape.x + aShape.width < this.width &&
      aShape.y > 0 && aShape.y + aShape.height < this.height)
  }

  isTouchingAny (aPlaneObject) {
    var planeObjects = this.controllables.map((x) => { return x.shapes })
    for (let i = 0; i < planeObjects.length; i++) {
      if (aPlaneObject.isTouchingAny(planeObjects[i])) {
        return true
      }
    }
    return false
  }

  stomp (aShape) {
    console.log('stomping')
    for (let i = 0; i < this.controllables.length; i++) {
      var c = this.controllables[i]
      if (c.isAlive && aShape.isTouchingAny(c.shapes)) {
        console.log('SMASH')
        c.smash()
        this._events.push({
          message: `💀 ${c.ownerName} smashed!`,
          type: 'kill',
          whoDied: c.ownerName
        })
      }
    }
  }

  time () {
    return new Date().getTime()
  }
}

module.exports = GameBoard
