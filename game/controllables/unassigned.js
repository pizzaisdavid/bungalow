const Shape = require('../shape')

class Unassigned {
  constructor () {
    this.shape = Shape.Null
  }
  do (game, command) {}
}

module.exports = Unassigned
