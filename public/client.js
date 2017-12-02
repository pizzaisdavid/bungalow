$(document).ready(() => {
  var socket = io()
  var canvas = $('#screen')[0]
  var context = canvas.getContext('2d')
  var commands = new Set()
  var id = ''
  var showHitBoxes = true

  socket.on('initialize', (initialize) => {
    id = initialize.id
    var controllables = initialize.state.controllables
    var teams = initialize.state.teams
    initializeTeams(teams)
  })

  loadSprites((sprites) => {
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
      context.drawImage(sprites['BACKGROUND'], 0, 0)
      sortControllablesForDrawing(controllables)
      for (var i = 0; i < controllables.length; i++) {
        var controllable = controllables[i]
        if (controllable.controllableType === 'house') { drawHouse(controllable) } else if (controllable.controllableType === 'giant') { drawGiant(controllable) }
      }
    }

    function sortControllablesForDrawing (controllables) {
      controllables.sort((a, b) => {
        let aShape = a.shape || a.currentControl
        let bShape = b.shape || b.currentControl
        return aShape.position.y - bShape.position.y 
      })
    }

    function clearCanvas () {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }

    function drawHouse (aHouse) {
      if (aHouse.isAlive) {
        drawAliveHouse(aHouse)
      } else {
        drawDeadHouse(aHouse)
      }
    }

    function drawAliveHouse(aHouse) {
      var image = sprites['HOUSE_RED_FRONT']
      context.drawImage(image, aHouse.shape.position.x, aHouse.shape.position.y - 10)
      if (aHouse.ownerId === id) {
        var image = sprites['HOUSE_OUTLINE_FRONT']
        context.drawImage(image, aHouse.shape.position.x, aHouse.shape.position.y - 10)
        if (showHitBoxes) {
          context.fillStyle = 'black'
          context.lineWidth = 1
          context.strokeRect(aHouse.shape.position.x, aHouse.shape.position.y, aHouse.shape.width, aHouse.shape.height)
        }
      }
    }

    function drawDeadHouse(aHouse) {
      image = sprites['HOUSE_RED_FRONT_DEAD']   
      context.drawImage(image, aHouse.shape.position.x, aHouse.shape.position.y + 10)      
    }

    function drawGiant (aGiant) {
      drawPressedFoot(aGiant.otherControl)
      drawRaisedFoot(aGiant.currentControl)
    }

    function drawPressedFoot(aShape) {
      var image = sprites['SHOE_SIDE']
      var OFFSET = 180
      context.globalAlpha = 0.5
      context.drawImage(image, aShape.position.x, aShape.position.y - OFFSET)      
      context.globalAlpha = 1.0      
    }

    function drawRaisedFoot(aShape) {
      var foot = sprites['SHOE_SIDE']
      var shadow = sprites['SHOE_BIG_SHADOW']
      var OFFSET = 180
      context.drawImage(shadow, aShape.position.x, aShape.position.y)
      context.drawImage(foot, aShape.position.x, aShape.position.y - OFFSET - aShape.position.z)
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

  function loadSprites (callback) {
    var redHouseFront = new Image()
    redHouseFront.src = 'assets/house_red_front.png'
    redHouseFront.onload = () => {
      var background = new Image()
      background.src = 'assets/map.png'
      background.onload = () => {
        var outlineHouseFront = new Image()
        outlineHouseFront.src = 'assets/house_outline_front.png'
        outlineHouseFront.onload = () => {
          var shoe = new Image()
          shoe.src = 'assets/leg.png'
          shoe.onload = () => {
            var redHouseFrontDead = new Image()
            redHouseFrontDead.src = 'assets/house_red_front_dead.png'
            redHouseFrontDead.onload = () => {
              var shadow = new Image()
              shadow.src = 'assets/shadow_big.png'
              shadow.onload = () => {
                callback({
                  'HOUSE_RED_FRONT': redHouseFront,
                  'BACKGROUND': background,
                  'HOUSE_OUTLINE_FRONT': outlineHouseFront,
                  'SHOE_SIDE': shoe,
                  'HOUSE_RED_FRONT_DEAD' : redHouseFrontDead,
                  'SHOE_BIG_SHADOW': shadow
                })
              }
            }
          }
        }
      }
    }
  }

  function initializeTeams (teams) {
    var TEAM_CONTAIN_SELECTOR = '#teams'
    $(TEAM_CONTAIN_SELECTOR).empty()
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
})
