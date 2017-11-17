$(document).ready(() => {
  var socket = io()
  var canvas = $('#screen')[0]
  var context = canvas.getContext('2d')
  var commands = new Set()
  var id = ''

  socket.on('initialize', (initialize) => {
    clearCanvas()
    id = initialize.id
    var houses = initialize.state
    drawHouses(houses)
  })

  socket.on('poll', (gameState) => {
    clearCanvas()
    drawHouses(gameState)
    console.log(gameState)
    socket.emit('commands', pollInput())
  })

  function drawHouses (houses) {
    console.log(houses)
    for (var i = 0; i < houses.length; i++) {
      var house = houses[i]
      drawHouse(house)
    }
  }

  function clearCanvas () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawHouse (house) {
    if (house.ownerId === id) {
      console.log('hi')
      context.fillStyle = 'black'
      context.strokeRect(house.shape.position.x, house.shape.position.y, house.shape.width + 5, house.shape.height + 5)
    }
    context.beginPath()
    context.fillStyle = house.color
    context.fillRect(house.shape.position.x, house.shape.position.y, house.shape.width, house.shape.height)
  }

  function pollInput () {
    return Array.from(commands) // 'Set' cannot be sent over a socket.
  }

  document.addEventListener('keydown', (event) => {
    var command = processCommand(event.keyCode)
    if (command) {
      commands.add(command)
    }
  })

  document.addEventListener('keyup', (event) => {
    var command = processCommand(event.keyCode)
    if (command) {
      commands.delete(command)
    }
  })

  function processCommand (code) {
    const KEYBOARD_CODES = {
      32: 'SPACE_BAR',
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN'
    }
    try {
      return KEYBOARD_CODES[code]
    } catch (e) {
      return ''
    }
  }
})
