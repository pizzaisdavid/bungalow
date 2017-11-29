const Controllable = require('./controllables/controllable')

class Player {
  constructor (anId) {
    this.teamName = ''
    this.name = ''
    this.id = anId
    this.controllable = Controllable.Null
  }

  is (aPlayer) {
    return this.id === aPlayer.id
  }

  assignControllable (aControllable) {
    aControllable.owner = this.id
    this.controllable = aControllable
  }

  quit () {
    this.controllable.abandon()
  }

  do (aGameBoard, command) {
    this.controllable.do(aGameBoard, command)
  }
}

module.exports = Player
