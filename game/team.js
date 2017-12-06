const NullControllable = require('./controllables/controllable')

class Team {
  constructor (name, controllables = []) {
    this.name = name
    this.controllables = controllables
    this.players = []
    this.ready = {}
  }

  hasAliveControllables() {
    for (var i = 0; i < this.controllables.length; i++) {
      var c = this.controllables[i]
      if (c.isAlive) {
        return true
      }
    }
    return false
  }

  reassignControllables() {
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i]
      player.assignControllable(this.findOpenControllable())
    }
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

  remove (aPlayer) {
    var index = this.index(aPlayer)
    if (index > -1) {
      this.players.splice(index, 1)
    }
    delete this.ready[aPlayer.id]
  }

  push (aPlayer) {
    this.ready[aPlayer.id] = false
    this.players.push(aPlayer)
  }

  index (aPlayer) {
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i]
      if (aPlayer.is(player)) {
        return i
      }
    }
  }

  setReadyStatus(aPlayer, status) {
    this.ready[aPlayer.id] = status
  }

  areEnoughPlayersReady() {
    if(this.players.length === 0) return true;
    var readyPlayers = 0
    for (var player in this.ready) {
      var status = this.ready[player]
      if (status) {
        readyPlayers++
      }
    }
    var enoughPlayers = (readyPlayers / this.players.length) > 0.5
    return enoughPlayers
  }
}

module.exports = Team
