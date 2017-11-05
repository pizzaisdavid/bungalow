$(document).ready(() => {

  var socket = io();
  var canvas = $('#screen')[0];
  var ctx = canvas.getContext('2d');

  socket.on('setup', (houses) => {
    console.log(houses);
  })
  
});