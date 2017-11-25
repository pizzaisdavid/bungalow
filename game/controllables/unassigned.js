const Shape = require('../shape')

class Unassigned {
  constructor () {
    this.shape = Shape.Null
  }
  do (game, command) {}
  isVancant() {
    return false
  }
}

Unassigned.Null = new Unassigned()
module.exports = Unassigned
