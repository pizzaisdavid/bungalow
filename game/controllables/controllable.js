const Shape = require('../shape')

class Controllable {
  constructor () {
    this.shape = Shape.Null
  }

  do (game, command) {
    // do nothing
  }

  isVancant() {
    return false
  }
}

Controllable.Null = new Controllable()
module.exports = Controllable
