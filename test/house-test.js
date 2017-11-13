var assert = require('assert')
const Game = require('../game/game')
const House = require('../game/house')
const PlaneObject = require('../game/plane-object')

describe('game-collision', function () {
  var game

  beforeEach(() => {
    game = new Game(2000, 2000, 1)
  })

  it('move left', () => {
    var house = generalTestHouse(100, 100)
    game.setHouses([house])
    house.do(game, 'LEFT')
    assert(house.x !== 100)
  })
})

function generalTestHouse (X, Y, Z = 0) {
  const WIDTH = 50
  const HEIGHT = 50
  const ANGLE = 0
  return new House(new PlaneObject(X, Y, Z, WIDTH, HEIGHT, ANGLE), 'red')
}
