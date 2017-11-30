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

  setupSpectators () {
    this.teams[this.SPECTATORS_TEAM_NAME] = new Team(this.SPECTATORS_TEAM_NAME)
  }

  get state () {
    return {
      'teams': this.teams,
      'controllables': this.board.controllables
    }
  }

  initializePlayer (aPlayer) {
    this.players[aPlayer.id] = aPlayer
    this.addToTeam(this.SPECTATORS_TEAM_NAME, aPlayer)
  }

  joinTeam (aTeamName, aPlayer) {
    this.leaveCurrentTeam(aPlayer)
    this.addToTeam(aTeamName, aPlayer)
  }

  leaveCurrentTeam (aPlayer) {
    var teamName = aPlayer.teamName
    var team = this.teams[teamName]
    aPlayer.quit()
    team.remove(aPlayer)
  }

  addToTeam (aTeamName, aPlayer) {
    console.log(`${aPlayer.id} has joined team: ${aTeamName}`)
    var team = this.teams[aTeamName]
    var aControllable = team.findOpenControllable()
    aPlayer.assignControllable(aControllable)
    aPlayer.teamName = aTeamName
    team.push(aPlayer)
  }

  terminatePlayer (aPlayer) {
    delete this.players[aPlayer.id]
    this.leaveCurrentTeam(aPlayer)
  }

  queue (aPlayer, commands) {
    this.commands[aPlayer.id] = commands
  }

  tick () {
    for (var id in this.commands) {
      var aPlayer = this.players[id]
      var commands = this.commands[id]
      this.processCommands(aPlayer, commands)
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
