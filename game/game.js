const House = require('./controllables/house')
const Team = require('./team')

class Game {
  constructor (teams, board) {
    this.SPECTATORS_TEAM_NAME = 'spectators'
    console.log('Hi, Clickty-Clack.')
    this.teams = teams
    this.board = board
    this.players = {}
    this.commands = {}
    this.setupSpectators()
  }

  setupSpectators() {
    this.teams[this.SPECTATORS_TEAM_NAME] = new Team(this.SPECTATORS_TEAM_NAME)
  }

  get state () {
    return this.board.controllables
  }

  registerPlayer(teamName, id) {
    this.deregister(id)
    this.register(teamName, id)
  }

  registerSpectator(aPlayer) {
    this.register(this.SPECTATORS_TEAM_NAME, aPlayer)
  }

  register (teamName, aPlayer) {
    aPlayer.teamName = teamName;
    console.log(`${aPlayer.id} has joined team: ${teamName}`)
    var aControllable = this.findOpenControllable(teamName)
    console.log(aControllable)
    aPlayer.assignControllable(aControllable)
    this.add(teamName, aPlayer)
  }

  deregister(aPlayer) {
    var team = aPlayer.teamName
    aPlayer.quit()
    this.remove(aPlayer)
    this.teams[teamName].remove(aPlayer)
  }

  add (teamName, aPlayer) {
    var team = this.teams[teamName]
    team.players.push(aPlayer)
  }

  findOpenControllable (teamName) {
    var team = this.teams[teamName]
    return team.findOpenControllable()
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
