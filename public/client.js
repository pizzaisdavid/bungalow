$(document).ready(() => {

  var socket = io();
  var canvas = $('#screen')[0];
  var context = canvas.getContext('2d');
  var commands = new Set();
  var id = '';

  socket.on('initialize', (state) => {
    clearCanvas();
    id = state.id;
    var houses = state.houses;
    drawHouses(houses);
  })

  socket.on('poll', () => {
    console.log(pollInput());
  });

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
    var position = house.position;
    if (house.player.id === id) {
      console.log('hi');
      context.fillStyle = 'black';
      context.strokeRect(position.x, position.y, house.WIDTH + 5, house.HEIGHT + 5);
    }
    context.beginPath();
    context.fillStyle = house.color;
    context.fillRect(position.x, position.y, house.WIDTH, house.HEIGHT);
  }

  function pollInput() {
    return commands;
  }

  document.addEventListener('keydown', (event) => {
    var command = processCommand(event.keyCode);
    if (command) {
      commands.add(command);      
    }
  });

  document.addEventListener('keyup', (event) => {
    var command = processCommand(event.keyCode);
    if (command) {
      commands.delete(command); 
    }
  });

  function processCommand(code) {
    const KEYBOARD_CODES = {
      32: 'SPACE_BAR',
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN'
    };
    try {
      return KEYBOARD_CODES[code];
    } catch (e) {
      return '';
    }
  }

  
});
