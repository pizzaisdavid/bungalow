const NullControllable = require('./controllables/controllable')

class Team {
  constructor (name, controllables = []) {
    this.name = name
    this.controllables = controllables
    this.players = []
  }

  findOpenControllable () {
    for (var i = 0; i < this.controllables.length; i++) {
      var c = this.controllables[i]
      if (c.isVancant()) {
        return c
      }
    }
    return NullControllable.Null
  }

  remove(aPlayer) {
    var index = this.index(aPlayer)
    if (index > -1) {
      this.players.splice(index, 1)
    }
  }

  index(aPlayer) {
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i]
      if (aPlayer.is(player)) {
        return i
      }
    }
  }
}

module.exports = Team
