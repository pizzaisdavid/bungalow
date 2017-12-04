const Shape = require('../shape')

class Controllable {
  constructor () {
    this.shape = Shape.Null
    this.isAlive = false
  }

  do (game, command) {
    // do nothing
  }

  tick(aGameBoard) {
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
