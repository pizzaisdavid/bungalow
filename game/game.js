const Team = require('./team')
var mongoClient = require('mongodb').MongoClient
const GameBoard = require('./game-board')

class Game {
  constructor (teams, board) {
    this.GAME_TIME_LIMIT_IN_MILLISECONDS = 5000
    this.startTimestamp = 'game over'
    this.isPreGameLobby = true;
    this.SPECTATORS_TEAM_NAME = 'spectators'
    console.log('Hi, Clickty-Clack.')
    this.events = []            
    this.teams = teams
    this.board = board
    this.players = {}
    this.commands = {}
    this.winner = ''
    this.setupSpectators()
    this.db = null
    mongoClient.connect('mongodb://localhost:27017/bungalow', (err, db) => {
      this.db = db
    })
  }

  setupSpectators () {
    this.teams[this.SPECTATORS_TEAM_NAME] = new Team(this.SPECTATORS_TEAM_NAME)
  }

  get state () {
    let events = this.events
    this.events = []
    events = events.concat(this.board.events)
    return {
      'teams': this.teams,
      'controllables': this.board.controllables,
      'events': events,
      'timeLimit': {
        'isPregameLobby': this.isPreGameLobby,
        'total': this.GAME_TIME_LIMIT_IN_MILLISECONDS,
        'remaining': this.getRemainingTime()
      },
      'winner': this.winner
    }
  }

  start (board, teams) {
    console.log('Starting game')
    this.winner = ''
    this.isPreGameLobby = false
    this.startTimestamp = new Date().getTime()
    this.board = board
    this.teams = teams
    this.teams['Houses'].ready = {}
    this.teams['Giants'].ready = {}
  }

  runPregameLobby() {
    this.startTimestamp = ''
    this.winner = ''
    this.isPreGameLobby = true
    this.board = new GameBoard(300, 150)
    this.teams = {
      'Houses': new Team('Houses', this.board.createHouses(12)),
      'Giants': new Team('Giants', this.board.createGiants(1))
    }
  }

  initializePlayer (aPlayer) {
    this.queueEventJoin(aPlayer)
    this.players[aPlayer.id] = aPlayer
    this.addToTeam(this.SPECTATORS_TEAM_NAME, aPlayer)
  }

  joinTeam (aTeamName, aPlayer) {
    this.queueEventJoinTeam(aTeamName, aPlayer)
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
    this.queueEventTerminatePlayer(aPlayer)
    delete this.players[aPlayer.id]
    this.leaveCurrentTeam(aPlayer)
  }

  queue (aPlayer, commands) {
    this.commands[aPlayer.id] = commands
  }

  tick () {
    if (this.isGameOver()) {
      if (this.db) {
        this.db.collection('games').insertOne({
          date: new Date(),
          whoWon: this.winner,
          playerCount: Object.keys(this.players).length
        })
      }
      this.runPregameLobby()
      return
    }
    for (var id in this.commands) {
      var aPlayer = this.players[id]
      var commands = this.commands[id]
      this.processCommands(aPlayer, commands)
    }
    for (var id in this.players) {
      var aPlayer = this.players[id]
      var events = aPlayer.tick(this)
      if (events) {
        this.events = this.events.concat(events)
      }
    }
    this.commands = {}
  }

  processCommands (player, commands) {
    commands.map((c) => {
      console.log(c)
     player.do(this.board, c)
    })
  }

  queueEventJoin (aPlayer) {
    this.events.push({
      message: `👋 Welcome ${aPlayer.name}!`,
      type: 'initialize'
    })
  }

  queueEventJoinTeam(aTeamName, aPlayer) {
    this.events.push({
      message: `📣 ${aPlayer.name} switched from ${aPlayer.teamName} to ${aTeamName}`,
      type: 'joinTeam'
    })
  }

  queueEventTerminatePlayer(aPlayer) {
    this.events.push({
      message: `👋 ${aPlayer.name} quit`,
      type: 'terminatePlayer'
    })
  }

  queueEventReadyStatus(aPlayer, status) {
    var message
    if (status) {
      message = `👍 ${aPlayer.name} is ready`
    } else {
      message = `👎 ${aPlayer.name} is not ready`
    }
    this.events.push({
      message: message,
      type: 'setReadyStatus'
    })
  }

  queueEventWin(aWinnerString) {
    var aTeam = this.teams[aWinnerString]
    var aListOfPlayers = aTeam.players
    var aListOfNames = aListOfPlayers.map((player) => {
      return player.name
    })
    this.events.push({
      message: `🎉 ${aWinnerString} win the game (players: ${aListOfNames.toString()})`,
      type: 'win'
    })
  }

  areEnoughPlayersReady() {
    if (this.teams['Houses'].players.length === 0 && this.teams['Giants'].players.length === 0) {
      return false
    }
    return this.teams['Houses'].areEnoughPlayersReady() && this.teams['Giants'].areEnoughPlayersReady()
  }

  getRemainingTime() {
    if (this.startTimestamp === '') {
      return ''
    }
    var whenTheGameEnds = this.GAME_TIME_LIMIT_IN_MILLISECONDS + this.startTimestamp
    return whenTheGameEnds - new Date().getTime()
  }

  isGameOver() {
    if (this.isPreGameLobby) {
      return false
    }
    if (this.teams['Houses'].hasAliveControllables() === false) {
      this.winner = 'Giants'
      this.queueEventWin(this.winner)
      return true
    }  
    if (this.getRemainingTime() < 0) {
      this.winner = 'Houses'
      this.queueEventWin(this.winner)      
      return true
    }
    return false
  }

  setReadyStatus(aPlayer, status) {
    this.queueEventReadyStatus(aPlayer, status)
    this.teams[aPlayer.teamName].setReadyStatus(aPlayer, status)
  }

  stomp(aShape) {
    console.log('stomping')
    var killCount = 0
    for (let i = 0; i < this.board.controllables.length; i++) {
      var c = this.board.controllables[i]
      if (c.isAlive && aShape.isTouchingAny(c.shapes)) {
        console.log('SMASH')
        var ownerId = c.ownerId
        c.smash()
        killCount++
        if (ownerId) {
          var aPlayer = this.players[ownerId]
          var team = this.teams[aPlayer.teamName]
          var aControllable = team.findOpenControllable()
          aPlayer.assignControllable(aControllable)
        }
        this.events.push({
          message: `💀 ${c.ownerName} smashed!`,
          type: 'kill',
          whoDied: c.ownerName
        })
      }
    }
    if (killCount === 2) {
      this.events.push({
        message: `💠 double kill`,
        type: 'kill',
      })
    } else if (killCount === 3) {
      this.events.push({
        message: `❇️ triple kill`,
        type: 'kill',
      })
    } else if (killCount > 3) {
      this.events.push({
        message: `✴️ multi-kill`,
        type: 'kill',
      })
    }
  } 
}

module.exports = Game
