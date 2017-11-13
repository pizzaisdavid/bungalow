var assert = require('assert')
const Game = require('../game/game')
const House = require('../game/house')
const PlaneObject = require('../game/plane-object')

describe('game-collision', function () {
  const PLAYER_0_ID = 'qw12'
  const PLAYER_1_ID = 'xnr13'
  var game

  beforeEach(() => {
    game = new Game(2000, 2000, 2)
    game.setHouses([
      whyTestHouse(),
      makeTestHouseLeftOfTestHouse(),
      makeTestFarAwayHouse()
    ])
  })

  it('Stops when colliding left', () => {
    game = new Game(2000, 2000, 2)
    game.setHouses([
      whyTestHouse(),
      makeTestHouseLeftOfTestHouse()
    ])
    game.registerPlayer(PLAYER_0_ID)
    game.registerPlayer(PLAYER_1_ID)
    var startingX = game.players[PLAYER_1_ID].house.position.x
    var startingY = game.players[PLAYER_1_ID].house.position.y
    game.queue(PLAYER_1_ID, ['LEFT'])
    game.tick()
    game.queue(PLAYER_1_ID, ['LEFT'])
    game.tick()
    game.queue(PLAYER_1_ID, ['LEFT'])
    game.tick()
    var currentX = game.players[PLAYER_1_ID].house.position.x
    var currentY = game.players[PLAYER_1_ID].house.position.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })

  it('Stops when colliding right', () => {
    game = new Game(2000, 2000, 2)
    game.setHouses([
      whyTestHouse(),
      makeTestHouseLeftOfTestHouse()
    ])
    game.registerPlayer(PLAYER_0_ID)
    game.registerPlayer(PLAYER_1_ID)
    var startingX = game.players[PLAYER_0_ID].house.position.x
    var startingY = game.players[PLAYER_0_ID].house.position.y
    game.queue(PLAYER_0_ID, ['RIGHT'])
    game.tick()
    game.queue(PLAYER_0_ID, ['RIGHT'])
    game.tick()
    game.queue(PLAYER_0_ID, ['RIGHT'])
    game.tick()
    var currentX = game.players[PLAYER_0_ID].house.position.x
    var currentY = game.players[PLAYER_0_ID].house.position.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })

  it('Stops when colliding up', () => {
    game = new Game(2000, 2000, 2)
    game.setHouses([
      whyTestHouse(),
      makeTestHouseBeneathTestHouse()
    ])
    game.registerPlayer(PLAYER_0_ID)
    game.registerPlayer(PLAYER_1_ID)
    var startingX = game.players[PLAYER_1_ID].house.position.x
    var startingY = game.players[PLAYER_1_ID].house.position.y
    game.queue(PLAYER_1_ID, ['UP'])
    game.tick()
    game.queue(PLAYER_1_ID, ['UP'])
    game.tick()
    game.queue(PLAYER_1_ID, ['UP'])
    game.tick()
    var currentX = game.players[PLAYER_1_ID].house.position.x
    var currentY = game.players[PLAYER_1_ID].house.position.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })

  it('Stops when colliding down', () => {
    game = new Game(2000, 2000, 2)
    game.setHouses([
      whyTestHouse(),
      makeTestHouseBeneathTestHouse()
    ])
    game.registerPlayer(PLAYER_0_ID)
    game.registerPlayer(PLAYER_1_ID)
    var startingX = game.players[PLAYER_0_ID].house.position.x
    var startingY = game.players[PLAYER_0_ID].house.position.y
    game.queue(PLAYER_0_ID, ['DOWN'])
    game.tick()
    game.queue(PLAYER_0_ID, ['DOWN'])
    game.tick()
    game.queue(PLAYER_0_ID, ['DOWN'])
    game.tick()
    var currentX = game.players[PLAYER_0_ID].house.position.x
    var currentY = game.players[PLAYER_0_ID].house.position.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })
})

function whyTestHouse () {
  return generalTestHouse(10, 10)
}

function makeTestHouseLeftOfTestHouse () {
  return generalTestHouse(60, 10)
}

function makeTestHouseBeneathTestHouse () {
  return generalTestHouse(10, 60)
}

function makeTestFarAwayHouse () {
  return generalTestHouse(1000, 10)
}

function generalTestHouse (X, Y, Z = 0) {
  const WIDTH = 50
  const HEIGHT = 50
  const ANGLE = 0
  return new House(new PlaneObject(X, Y, Z, WIDTH, HEIGHT, ANGLE), 'red')
}
