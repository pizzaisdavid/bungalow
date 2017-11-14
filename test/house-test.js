var assert = require('assert')
const Game = require('../game/game')
const House = require('../game/controllables/house')
const Shape = require('../game/shape')
const Position = require('../game/position')

describe('house', function () {
  var game

  beforeEach(() => {
    game = new Game(2000, 2000, 1)
  })

  it('move left', () => {
    var house = generalTestHouse(100, 100)
    game.setHouses([house])
    house.do(game, 'LEFT')
    assert(house.x === 90)
  })
})

function generalTestHouse (X, Y, Z = 0) {
  const WIDTH = 50
  const HEIGHT = 50
  const ANGLE = 0
  return new House(new Shape(new Position(X, Y, Z), HEIGHT, WIDTH, ANGLE), 'red')
}
