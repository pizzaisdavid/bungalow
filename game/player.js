const House = require('./controllables/house')

class Player {
  constructor (anId) {
    this.name = ''
    this.id = anId
    this.house = House.Null
    this.assignHouse = (aHouse) => {
      aHouse.owner = this.id
      this.house = aHouse
    }
  }

  is(aPlayer) {
    return this.id === aPlayer.id
  }

  assignControllable (thingy) {
    thingy.owner = this.id
    this.house = thingy
  }

  quit () {
    this.house.ownerId = ''
  }

  do (game, command) {
    this.house.do(game, command)
  }
}

module.exports = Player
