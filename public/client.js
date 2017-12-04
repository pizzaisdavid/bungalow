
$(document).ready(() => {
  var socket = io()
  var canvas = $('#screen')[0]
  var context = canvas.getContext('2d')
  var commands = new Set()
  var id = ''
  var showHitBoxes = false
  var isReady = false

  setupReadyButton()

  socket.on('initialize', (initialize) => {
    id = initialize.id
    var controllables = initialize.state.controllables
    var teams = initialize.state.teams
    var events = initialize.state.events
    var player = initialize.player
    clearFeed()
    updatePlayerName(player.name)    
    updateFeed(events)
    initializeTeams(teams)
  })

  loadSprites((sprites) => {

    function updateTeams (teams) {
      for (var name in teams) {
        var team = teams[name]
        populateStats(team)
      }
      disableMyTeamButton(teams)
    }

    function disableMyTeamButton(teams) {
      for (var name in teams) {
        var team = teams[name]
        var players = team.players
        var isOnThisTeam = false
        for (var i = 0; i < players.length; i++) {
          var aPlayer = players[i]
          if (aPlayer.id === id) {
            isOnThisTeam = true
          }
        }
        var selector = `#${name}-button`
        if (isOnThisTeam) {
          $(selector).attr('disabled','disabled')
        } else {
          $(selector).removeAttr('disabled')
        }
      }
    }

    function populateStats (team) {
      var statistics = $(`#${team.name}-statistics`)
      statistics.empty()
      statistics.append(`players: ${team.players.length}`)
      statistics.append('<br>')
      var readyCount = 0
      for (var name in team.ready) {
        var status = team.ready[name]
        if (status) {
          readyCount++
        }
      }
      statistics.append(`ready: ${readyCount}`)
      statistics.append('<br>')      
      statistics.append(`objects: ${team.controllables.length}`)
    }

    socket.on('poll', (gameState) => {
      console.log(gameState)
      clearCanvas()
      drawControllables(gameState.controllables)
      updateTeams(gameState.teams)
      updateFeed(gameState.events)
      processEvents(gameState.events)
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
        let aShape = a.shape || a.otherControl
        let bShape = b.shape || b.otherControl
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
      let distance = aShape.position.z
      let distanceRatio = distance / 100
      var OFFSET = 180
      var shadowWidth = Math.max(40 - (distanceRatio * 40), 15)
      var shadowHeight = Math.max(17 - (distanceRatio * 17), 7)
      var horizontalShadowOffset = (40 - shadowWidth) / 2
      var verticalShadowOffset = (17 - shadowHeight) / 2

      var shadowTransparent = Math.max(0.3, 1 - distanceRatio)
      context.globalAlpha = shadowTransparent    
      context.drawImage(shadow, aShape.position.x + horizontalShadowOffset, aShape.position.y + verticalShadowOffset, shadowWidth, shadowHeight)
      context.globalAlpha = 1.0      
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
                  'SHOE_BIG_SHADOW': shadow,
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
    return container
  }

  function makeJoinTeamButton (team) {
    // TODO is there a full team?
    var button = $(`<input id="${team.name}-button" type="button">`)
    button.prop('value', `join team: ${team.name}`)
    button.click(() => {
      socket.emit('join', team.name)
      isReady = false
      $('#ready').text('click to ready-up')
      
    })
    return button
  }

  function makeTeamStatisticsContainer (team) {
    var container = $(`<div id="${team.name}-statistics"></div>`)
    return container
  }

  function updatePlayerName(aNameString) {
    var event = {
      message :`Your name is: ${aNameString}`
    }
    $('#playerName').text(aNameString)
    updateFeed([event])
  }

  function clearFeed() {
    $('#feed').text('')
  }

  function updateFeed(aListOfEvents) {
    var feed = $('#feed')
    for (var i = 0; i < aListOfEvents.length; i++) {
      var event = aListOfEvents[i]
      var value = feed.text()
      value = (event.message + '\n') + value
      feed.text(value)
    }
  }

  function processEvents(aListOfEvents) {
    for (var i = 0; i < aListOfEvents.length; i++) {
      var event = aListOfEvents[i]
      if (event.type === 'kill') {
        shakeScreenFor(700)
      }
    } 
  }

  function shakeScreenFor(milliseconds) {
    var id = setInterval(() => {
      context.restore()
      shakeScreen()      
    }, 50)

    setTimeout(() => {
      clearInterval(id)
      context.restore()
    }, milliseconds)
  }

  function shakeScreen() {
    context.save()
    var dx = Math.random() * 5
    var dy = Math.random() * 5
    context.translate(dx, dy);  
  }

  function setupReadyButton() {
    var button = $('#ready')
    button.click(() => {
      isReady = !isReady
      socket.emit('isReady', isReady)
      if (isReady) {
        $('#ready').text('You are ready, click to unready')        
      } else {
        $('#ready').text('click to ready-up')        
      }
    })
  }
})
