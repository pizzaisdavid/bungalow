
var express = require('express')
var app = express()
var http = require('http')
var server = http.Server(app)
var logger = require('morgan')
var bodyParser = require('body-parser')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

var socketio = require('socket.io')
var io = socketio(server)

var GameBoard = require('./game/game-board')
var Team = require('./game/team')
var Game = require('./game/game')
const Player = require('./game/player')
var board
var teams
var game

io.on('connection', (socket) => {
  socket.player = new Player(socket.id)
  game.initializePlayer(socket.player)
  socket.emit('initialize', {
    id: socket.id,
    state: game.state,
    teams: game.teams,
    player: socket.player
  })

  socket.on('join', (teamName) => {
    console.log(teamName)
    game.joinTeam(teamName, socket.player)
  })

  socket.on('isReady', (status) => {
    game.setReadyStatus(socket.player, status)
  })

  socket.on('commands', (commands) => {
    game.queue(socket.player, commands)
  })

  socket.on('disconnect', () => {
    console.log(`someone disconnected: ${socket.player.id}`)
    game.terminatePlayer(socket.player)
  })
})

board = new GameBoard(300, 150)
teams = {
  'Houses': new Team('Houses', board.createHouses(12)),
  'Giants': new Team('Giants', board.createGiants(2))
}
game = new Game(teams, board)
setInterval(() => {
  if (game.isPreGameLobby && game.areEnoughPlayersReady()) {
    board = new GameBoard(300, 150)
    teams['Houses'].controllables = board.createHouses(12)
    teams['Giants'].controllables = board.createGiants(1)
    game.start(board, teams)
  }
  game.tick()
  io.emit('poll', game.state)
}, 33)

const port = 3000
server.listen(port, () => {
  console.log(`Game is running at ${port}`)
})
