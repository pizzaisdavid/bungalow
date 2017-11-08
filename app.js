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
  game.registerPlayer(socket.id);

  socket.emit('initialize', {
    id: socket.id,
    houses: game.houses
  });
  

  socket.on('disconnection', function(){
    game.deregisterPlayer(socket.id);
  })
});

setInterval(() => { // this just allows me to test the client side input polling
  io.emit('poll');
}, 3000);

server.listen(3000, () => {
  console.log('Game is running...');
});