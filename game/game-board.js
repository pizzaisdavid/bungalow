const House = require('./controllables/house')
const Giant = require('./controllables/giant')
const Shape = require('./shape')
const MathHelper = require('./math-helper')

class GameBoard {
  constructor (width = 300, height = 150) {
    this.width = width
    this.height = height
    this.controllables = []
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

  createGiant () {
    let giant = this.spawnProperPlacedGiant()
    this.controllables.push(giant)
    return [ giant ]
  }

  spawnProperPlacedShape () {
    while (true) {
      var shape = Shape.generateRandom(this.width, this.height)
      if (this.isValidSpace(shape)) {
        return shape
      }
    }
  }

  spawnProperPlacedGiant () {
    return new Giant(this.spawnProperPlacedShape(), this.spawnProperPlacedShape())
  }

  spawnProperPlacedHouse () {
    return new House(
      this.spawnProperPlacedShape(),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    )
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
      if (aPlaneObject.isTouchingAny(planeObjects[i])) { return true }
    }
    return false
  }
}

module.exports = GameBoard
