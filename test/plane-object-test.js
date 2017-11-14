var assert = require('assert')
const Shape = require('../game/shape')
const Position = require('../game/position')

describe('Shape', function () {
  var farAwayShape
  // var bigOlShape
  var regularOlShape1
  var regularOlShape2
  var regularOlShape3

  beforeEach(() => {
    farAwayShape = new Shape(new Position(500, 500, 0), 1, 1, 0)
    // bigOlShape = new Shape(10, 10, 0, 50, 50, 0)
    regularOlShape1 = new Shape(new Position(10, 10, 0), 20, 20, 0)
    regularOlShape2 = new Shape(new Position(10, 10, 0), 20, 20, 0)
    regularOlShape3 = new Shape(new Position(10, 10, 0), 20, 20, 0)
  })

  it('NoCollision', () => {
    assert(!regularOlShape1.isTouching(farAwayShape))
  })

  it('SelfCollision', () => {
    assert(!regularOlShape1.isTouching(regularOlShape1))
  })

  it('Collision', () => {
    assert(regularOlShape1.isTouching(regularOlShape2))
  })

  it('collideMany', () => {
    assert(!farAwayShape.isTouchingAny([regularOlShape1, regularOlShape2, regularOlShape3]))
  })
})
