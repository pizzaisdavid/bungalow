const House = require('./controllables/house')
const Team = require('./team')
const Player = require('./player')

class Game {
  constructor (teams, board) {
    console.log('Hi, Clickty-Clack.')
    this.teams = teams
    this.board = board
    this.players = {}
    this.commands = {}
  }

  get state () {
    return this.board.controllables
  }

  registerPlayer (teamName, id) {
    console.log(`${id} has joined.`)
    var aPlayer = new Player(id)
    var aControllable = this.findOpenControllable(teamName)
    console.log(aControllable)
    aPlayer.assignControllable(aControllable)
    this.add(aPlayer)
  }

  add (aPlayer) {
    var id = aPlayer.id
    this.players[id] = aPlayer
  }

  findOpenControllable(teamId) {
    var team = this.teams[teamId]
    return team.findOpenControllable();
  }

  deregisterPlayer (id) {
    var aPlayer = this.players[id]
    aPlayer.quit()
    this.remove(aPlayer)
  }

  remove (aPlayer) {
    var id = aPlayer.id
    delete this.players[id]
  }

  queue (id, commands) {
    this.commands[id] = commands
  }

  tick () {
    for (var id in this.commands) {
      var player = this.players[id]
      var commands = this.commands[id]
      this.processCommands(player, commands)
    }
    this.commands = {}
  }

  processCommands (player, commands) {
    commands.map((c) => {
      console.log(c)
      player.do(this.board, c)
    })
  }
}

module.exports = Game
