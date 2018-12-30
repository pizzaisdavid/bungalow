const Shape = require('../shape')

class Controllable {
  constructor () {
    this.shape = Shape.Null
    this.isAlive = false
    this.ownerName = ''
  }

  do (game, command) {
    // do nothing
  }

  tick (aGame) {
    // do nothing!
  }

  isVancant () {
    return false
  }

  abandon () {

  }
}

Controllable.Null = new Controllable()
module.exports = Controllable
