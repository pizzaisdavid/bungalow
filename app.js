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

var board = new GameBoard(300, 150)

var teams = {
  'Houses': new Team('Houses', board.createHouses(6)),
  'Giants': new Team('Giants', board.createGiant())
}

var game = new Game(teams, board)

io.on('connection', (socket) => {
  socket.player = new Player(socket.id)
  game.initalizePlayer(socket.player)
  socket.emit('initialize', {
    id: socket.id,
    state: game.state,
    teams: game.teams
  })

  socket.on('join', (teamName) => {
    console.log(teamName)
    game.joinTeam(teamName, socket.player)
  })

  socket.on('commands', (commands) => {
    game.queue(socket.player, commands)
  })

  socket.on('disconnect', () => {
    console.log(`someone disconnected: ${socket.player.id}`)
    game.terminatePlayer(socket.player)
  })
})

setInterval(() => {
  game.tick()
  io.emit('poll', game.state)
}, 33)

server.listen(3000, () => {
  console.log('Game is running...')
})
