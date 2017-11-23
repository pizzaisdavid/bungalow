
class Team {
  constructor (name, controllables) {
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
    return null // TODO return Controllable.Null
  }
}

module.exports = Team
