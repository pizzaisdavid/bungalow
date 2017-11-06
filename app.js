var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var logger = require('morgan');
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


var socketio = require('socket.io');
var io = socketio(server);

var Game = require('./game/game');

var game = new Game();
game.createDefaultHouses();

io.on('connection', function(socket) {
  console.log('suh bruh');

  socket.emit('setup', game.houses);
});

setInterval(() => {
  io.emit('poll');
}, 3000);

server.listen(3000, () => {
  console.log('Game is running...');
});