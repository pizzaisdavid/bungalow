const House = require('./house')

class Player {
  constructor (anId) {
    this.name = ''
    this.id = anId
    this.self = this
    this.house = House.Null

    this.assignHouse = (aHouse) => {
      this.house.abandon()
      aHouse.owner = this.id
      this.house = aHouse
    }
  }

  quit () {
    this.house.abandon()
  }

  do (game, command) {
    this.house.do(game, command)
  }
}

module.exports = Player
