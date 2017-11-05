$(document).ready(() => {

  var socket = io();
  var canvas = $('#screen')[0];
  var context = canvas.getContext('2d');

  socket.on('setup', (houses) => {
    clearCanvas();
    drawHouses(houses);
  })

  function drawHouses(houses) {
    console.log(houses);
    for (var i = 0; i < houses.length; i++) {
      var house = houses[i];
      drawHouse(house);
    }
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawHouse(house) {
    context.beginPath();
    context.fillStyle = house.color;
    var position = house.position;
    context.fillRect(position.x, position.y, house.WIDTH, house.HEIGHT);
  }
  
});
