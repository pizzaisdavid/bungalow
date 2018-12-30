const Giant = require('../game/controllables/giant')
var should = require('chai').should()

describe('giant: ', () => {
  it('should have a rightShape property', () => {
    let giant = new Giant({}, {})

    giant.should.have.property('rightShape').a('object')
  })

  it('should have a leftShape property', () => {
    let giant = new Giant({}, {})

    giant.should.have.property('leftShape').a('object')
  })

  describe('constructor: ', () => {
    it('first parameter should be assigned to rightShape', () => {
      let right = {}
      let left = {}
      let giant = new Giant(right, left)

      giant.rightShape.should.be.same(right)
    })

    it('currentControl should be the same as right', () => {
      let right = new DummyShape(40, 40)
      let left = new DummyShape(40, 40)
      let giant = new Giant(right, left)

      giant.rightShape.should.be.same(right)
      giant.currentControl.should.be.same(right)
    })
  })

  describe('do', () => {
    it('should have a do function', () => {
      let giant = new Giant({}, {})

      giant.should.have.property('do').a('function')
    })

    it('should move the right shape up at \'UP\' command when rightShape is currentControl', () => {
      let right = new DummyShape(40, 40)
      let left = new DummyShape(40, 40)
      let giant = new Giant(right, left)

      giant.rightShape
      giant.do('UP')
    })
  })

  class DummyShape {
    constructor (width, height) {
      this.x = width - 40
      this.y = height - 40
    }
  }
})
