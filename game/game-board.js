const House = require('./controllables/house')
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
    return []
  }

  spawnProperPlacedHouse () {
    while (true) {
      var shape = Shape.generateRandom(this.width, this.height)
      if (this.isTouchingAny(shape) === false && this.isWithinBoard(shape)) {
        return new House(
          shape,
          MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
        )
      }
    }
  }

  isWithinBoard (aShape) {
    return (aShape.x > 0 && aShape.x + aShape.width < this.width &&
      aShape.y > 0 && aShape.y + aShape.height < this.height)
  }

  isTouchingAny (aPlaneObject) {
    var planeObjects = this.controllables.map((x) => { return x.shape })
    return aPlaneObject.isTouchingAny(planeObjects)
  }
}

module.exports = GameBoard
