var assert = require('assert')
const GameBoard = require('../game/game-board')
const Team = require('../game/team')
const Game = require('../game/game')
const House = require('../game/controllables/house')
const Shape = require('../game/shape')
const Position = require('../game/position')

describe('game-collision', function () {
  const PLAYER_0_ID = 'qw12'
  const PLAYER_1_ID = 'xnr13'

  it('Stops when colliding left', () => {
    var game = makeGameWithOneTeam(whyTestHouse(), makeTestHouseLeftOfTestHouse())
    game.registerPlayer('0', PLAYER_0_ID)
    game.registerPlayer('0', PLAYER_1_ID)
    var startingX = game.players[PLAYER_1_ID].house.x
    var startingY = game.players[PLAYER_1_ID].house.y
    game.queue(PLAYER_1_ID, ['LEFT'])
    game.tick()
    var currentX = game.players[PLAYER_1_ID].house.x
    var currentY = game.players[PLAYER_1_ID].house.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })

  it('Stops when colliding right', () => {
    var game = makeGameWithOneTeam(whyTestHouse(), makeTestHouseLeftOfTestHouse())
    game.registerPlayer('0', PLAYER_0_ID)
    game.registerPlayer('0', PLAYER_1_ID)
    var startingX = game.players[PLAYER_0_ID].house.x
    var startingY = game.players[PLAYER_0_ID].house.y
    game.queue(PLAYER_0_ID, ['RIGHT'])
    game.tick()
    var currentX = game.players[PLAYER_0_ID].house.x
    var currentY = game.players[PLAYER_0_ID].house.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })

  it('Stops when colliding up', () => {
    var game = makeGameWithOneTeam(whyTestHouse(), makeTestHouseBeneathTestHouse())
    game.registerPlayer('0', PLAYER_0_ID)
    game.registerPlayer('0', PLAYER_1_ID)
    var startingX = game.players[PLAYER_1_ID].house.x
    var startingY = game.players[PLAYER_1_ID].house.y
    game.queue(PLAYER_1_ID, ['UP'])
    game.tick()
    var currentX = game.players[PLAYER_1_ID].house.x
    var currentY = game.players[PLAYER_1_ID].house.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })

  it('Stops when colliding down', () => {
    var game = makeGameWithOneTeam(whyTestHouse(), makeTestHouseBeneathTestHouse())
    game.registerPlayer('0', PLAYER_0_ID)
    game.registerPlayer('0', PLAYER_1_ID)
    var startingX = game.players[PLAYER_0_ID].house.x
    var startingY = game.players[PLAYER_0_ID].house.y
    game.queue(PLAYER_0_ID, ['DOWN'])
    game.tick()
    var currentX = game.players[PLAYER_0_ID].house.x
    var currentY = game.players[PLAYER_0_ID].house.y
    assert.equal(startingX, currentX)
    assert.equal(startingY, currentY)
  })
})

function makeGameWithOneTeam(house0, house1) {
  var board = new GameBoard(2000, 2000)
  board.setControllables([house0, house1])
  var teams = [
    new Team('0', [
      house0,
      house1
    ])
  ];
  return new Game(teams, board)
}

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
  return new House(new Shape(new Position(X, Y, Z), HEIGHT, WIDTH, ANGLE), 'red')
}
