var assert = require('assert')
const Shape = require('../game/shape')

describe('plane-object', function () {
  var farAwayPlane
  // var bigOlPlane
  var regularOlPlane1
  var regularOlPlane2
  var regularOlPlane3

  beforeEach(() => {
    farAwayPlane = new Shape(500, 500, 0, 1, 1, 0)
    // bigOlPlane = new Shape(10, 10, 0, 50, 50, 0)
    regularOlPlane1 = new Shape(10, 10, 0, 20, 20, 0)
    regularOlPlane2 = new Shape(10, 10, 0, 20, 20, 0)
    regularOlPlane3 = new Shape(10, 10, 0, 20, 20, 0)
  })

  it('NoCollision', () => {
    assert(!regularOlPlane1.isTouching(farAwayPlane))
  })

  it('SelfCollision', () => {
    assert(!regularOlPlane1.isTouching(regularOlPlane1))
  })

  it('Collision', () => {
    assert(regularOlPlane1.isTouching(regularOlPlane2))
  })

  it('collideMany', () => {
    assert(!farAwayPlane.isTouchingAny([regularOlPlane1, regularOlPlane2, regularOlPlane3]))
  })
})
