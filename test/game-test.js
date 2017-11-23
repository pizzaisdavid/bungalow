var assert = require('assert')
const GameBoard = require('../game/game-board')
const Team = require('../game/team')
const Game = require('../game/game')
const House = require('../game/controllables/house')
const Shape = require('../game/shape')

describe('game', function () {
  const PLAYER_0_ID = 'qw12'
  const PLAYER_1_ID = 'xnr13'
  const PLAYER_2_ID = 'xLB94'
  var game

  beforeEach(() => {
    var board = new GameBoard(500, 500)
    var house0 = makeTestHouse()
    var house1 = makeTestHouse()
    var house2 = makeTestHouse()
    board.setControllables([
      house0,
      house1,
      house2
    ])
    var teams = [
      new Team('0', [
        house0,
        house1,
        house2
      ])
    ]
    game = new Game(teams, board)
  })

  it('Register one player', () => {
    game.registerPlayer('0', PLAYER_0_ID)
    var houses = game.state.houses
    assert.equal(houses[0].ownerId, PLAYER_0_ID)
    assert(houses[1].isVancant())
    assert(houses[2].isVancant())
  })

  it('Register multiple players', () => {
    game.registerPlayer('0', PLAYER_0_ID)
    var houses = game.state.houses
    assert.equal(houses[0].ownerId, PLAYER_0_ID)
    assert(houses[1].isVancant())
    assert(houses[2].isVancant())
    game.registerPlayer('0', PLAYER_1_ID)
    houses = game.state.houses
    assert.equal(houses[0].ownerId, PLAYER_0_ID)
    assert.equal(houses[1].ownerId, PLAYER_1_ID)
    assert(houses[2].isVancant())
    game.registerPlayer('0', PLAYER_2_ID)
    houses = game.state.houses
    assert.equal(houses[0].ownerId, PLAYER_0_ID)
    assert.equal(houses[1].ownerId, PLAYER_1_ID)
    assert.equal(houses[2].ownerId, PLAYER_2_ID)
  })

  it('De-Register one player', () => {
    game.registerPlayer('0', PLAYER_0_ID)
    game.deregisterPlayer(PLAYER_0_ID)
    var houses = game.state.houses
    assert(houses[0].isVancant())
    assert(houses[1].isVancant())
    assert(houses[2].isVancant())
  })

  it('De-Register multiple players FIFO', () => {
    game.registerPlayer('0', PLAYER_0_ID)
    game.registerPlayer('0', PLAYER_1_ID)
    game.registerPlayer('0', PLAYER_2_ID)
    game.deregisterPlayer(PLAYER_0_ID)
    var houses = game.state.houses
    assert(houses[0].isVancant())
    assert.equal(houses[1].ownerId, PLAYER_1_ID)
    assert.equal(houses[2].ownerId, PLAYER_2_ID)
    game.deregisterPlayer(PLAYER_1_ID)
    houses = game.state.houses
    assert(houses[0].isVancant())
    assert(houses[1].isVancant())
    assert.equal(houses[2].ownerId, PLAYER_2_ID)
    game.deregisterPlayer(PLAYER_2_ID)
  })

  it('De-Register multiple players LIFO', () => {
    game.registerPlayer('0', PLAYER_0_ID)
    game.registerPlayer('0', PLAYER_1_ID)
    game.registerPlayer('0', PLAYER_2_ID)
    game.deregisterPlayer(PLAYER_2_ID)
    var houses = game.state.houses
    assert.equal(houses[0].ownerId, PLAYER_0_ID)
    assert.equal(houses[1].ownerId, PLAYER_1_ID)
    assert(houses[2].isVancant())
    game.deregisterPlayer(PLAYER_1_ID)
    houses = game.state.houses
    assert.equal(houses[0].ownerId, PLAYER_0_ID)
    assert(houses[1].isVancant())
    assert(houses[2].isVancant())
  })

  function makeTestHouse () {
    return new House(new Shape(0, 0, 0), 'red')
  };
})
