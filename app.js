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

var Game = require('./game');

var game = new Game();

io.on('connection', function(socket) {
  console.log('suh bruh');
});

server.listen(3000, () => {
  console.log('Game is running...');
});