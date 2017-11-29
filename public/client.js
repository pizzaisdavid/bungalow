$(document).ready(() => {
  var socket = io()
  var canvas = $('#screen')[0]
  var context = canvas.getContext('2d')
  var commands = new Set()
  var id = ''

  socket.on('initialize', (initialize) => {
    clearCanvas()
    id = initialize.id
    var houses = initialize.state.controllables
    var teams = initialize.state.teams
    initializeTeams(teams)
    updateTeams(teams)
    drawHouses(houses)
  })

  function initializeTeams(teams) {
    var TEAM_CONTAIN_SELECTOR = '#teams'
    for (var name in teams) {
      var team = teams[name]
      $(TEAM_CONTAIN_SELECTOR).append(makeTeamContainer(team))
    }
  }

  function makeTeamContainer(team) {
    var container = $(`<div id="${team.name}-container"></div>`)
    container.append(makeJoinTeamButton(team))
    container.append(makeTeamStatisticsContainer(team))
    console.log('make team container')
    return container
  }
  
  function makeJoinTeamButton(team) {
    // TODO is there a full team?
    var button = $('<input type="button">')
    button.prop('value', `join team: ${team.name}`)
    button.click(() => {
      socket.emit('join', team.name)
    })
    return button
  }

  function makeTeamStatisticsContainer(team) {
    var container = $(`<div id="${team.name}-statistics"></div>`)
    return container
  }

  function updateTeams(teams) {
    console.log('teams:')
    console.log(teams)
    for (var name in teams) {
      var team = teams[name]
      populateStats(team)
    }
  }



  function populateStats(team) {
    var statistics = $(`#${team.name}-statistics`)
    statistics.empty()
    statistics.append('<br>')
    statistics.append(`players: ${team.players.length}`)
    statistics.append('<br>')
    statistics.append(`objects: ${team.controllables.length}`) 
  }

  socket.on('poll', (gameState) => {
    console.log(gameState)
    clearCanvas()
    drawHouses(gameState.controllables)
    updateTeams(gameState.teams)
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
