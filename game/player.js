const House = require('./controllables/house')

class Player {
  constructor (anId) {
    this.name = ''
    this.id = anId
    this.self = this
    this.house = House.Null

    this.assignHouse = (aHouse) => {
      aHouse.owner = this.id
      this.house = aHouse
    }
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
