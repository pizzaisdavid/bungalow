$(document).ready(() => {
  var socket = io()
  var canvas = $('#screen')[0]
  var context = canvas.getContext('2d')
  var commands = new Set()
  var id = ''

  canvas.width  = 300;
  canvas.height = 150; 
  canvas.style.width  = '600px';
  canvas.style.height = '300px';

  socket.on('initialize', (initialize) => {
    clearCanvas()
    id = initialize.id
    var controllables = initialize.state.controllables
    var teams = initialize.state.teams
    initializeTeams(teams)
    updateTeams(teams)
    drawControllables(controllables)
  })

  function initializeTeams (teams) {
    var TEAM_CONTAIN_SELECTOR = '#teams'
    for (var name in teams) {
      var team = teams[name]
      $(TEAM_CONTAIN_SELECTOR).append(makeTeamContainer(team))
    }
  }

  function makeTeamContainer (team) {
    var container = $(`<div id="${team.name}-container"></div>`)
    container.append(makeJoinTeamButton(team))
    container.append(makeTeamStatisticsContainer(team))
    console.log('make team container')
    return container
  }

  function makeJoinTeamButton (team) {
    // TODO is there a full team?
    var button = $('<input type="button">')
    button.prop('value', `join team: ${team.name}`)
    button.click(() => {
      socket.emit('join', team.name)
    })
    return button
  }

  function makeTeamStatisticsContainer (team) {
    var container = $(`<div id="${team.name}-statistics"></div>`)
    return container
  }

  function updateTeams (teams) {
    console.log('teams:')
    console.log(teams)
    for (var name in teams) {
      var team = teams[name]
      populateStats(team)
    }
  }

  function populateStats (team) {
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
    drawControllables(gameState.controllables)
    updateTeams(gameState.teams)
    socket.emit('commands', pollInput())
  })

  function drawControllables (controllables) {
    console.log(controllables)
    for (var i = 0; i < controllables.length; i++) {
      var controllable = controllables[i]
      if (controllable.controllableType === 'house') { drawHouse(controllable) }
      else if (controllable.controllableType === 'giant') { drawGiant(controllable) }
    }
  }

  function clearCanvas () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawHouse (aHouse) {
    if (aHouse.ownerId === id) {
      context.fillStyle = 'black'
      context.strokeRect(aHouse.shape.position.x, aHouse.shape.position.y, aHouse.shape.width + 5, aHouse.shape.height + 5)
    }
    context.beginPath()
    context.fillStyle = aHouse.color
    context.fillRect(aHouse.shape.position.x, aHouse.shape.position.y, aHouse.shape.width, aHouse.shape.height)
  }

  function drawGiant (aGiant) {
    if (aGiant.ownerId === id) {
      context.fillStyle = 'black'
      context.strokeRect(aGiant.currentControl.position.x, aGiant.currentControl.position.y, aGiant.currentControl.width + 5, aGiant.currentControl.height + 5)
    }
    context.beginPath()
    context.fillStyle = 'black'
    context.fillRect(aGiant.rightShape.position.x, aGiant.rightShape.position.y, aGiant.rightShape.width, aGiant.rightShape.height)
    context.fillRect(aGiant.leftShape.position.x, aGiant.leftShape.position.y, aGiant.leftShape.width, aGiant.leftShape.height)
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
