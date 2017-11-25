const House = require('./controllables/house')

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
    return [];
  }

  spawnProperPlacedHouse () {
    while (true) {
      var house = House.generateRandom(this.width, this.height)
      if (this.isTouchingAny(house.shape) === false) {
        return house
      }
    }
  }

  isTouchingAny (aPlaneObject) {
    var planeObjects = this.controllables.map((x) => { return x.shape })
    return aPlaneObject.isTouchingAny(planeObjects)
  }
}

module.exports = GameBoard
