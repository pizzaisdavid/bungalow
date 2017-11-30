const Giant = require('../game/controllables/giant')
var should = require('chai').should()

describe('giant: ', () => {
  it('should have a rightShape property', () => {
    let sut = new Giant({}, {})

    sut.should.have.property('rightShape').a('object')
  })

  it('should have a leftShape property', () => {
    let sut = new Giant({}, {})

    sut.should.have.property('leftShape').a('object')
  })

  describe('constructor: ', () => {
    it('first parameter should be assigned to rightShape', () => {
      let right = {}
      let left = {}
      let sut = new Giant(right, left)

      sut.rightShape.should.be.same(right)
    })
  })

  describe('do', () => {
    it('should have a do function', () => {
      let sut = new Giant({}, {})

      sut.should.have.property('do').a('function')
    })

    it('should move the right shape up when you press space', () => {
      let right = {}
      let left = {}
      let sut = new Giant(right, left)

      sut.rightShape.should.be.same(right)
    })

        /*
            shape
            undefined/empty doesn't cause problems
            happy path
            exercise all branches
            force errors
            make sure limits are obeyed
            default values assigned
            default actions used
            validate interactions with other objects (values passed, functions called)
            Do NOT depend on other obects to do work, fake the behavior of other systems

        */

        // test a
        // test b
        // feature c
        // behavior d
  })
})
