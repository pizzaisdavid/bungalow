
class Giant {
  constructor (rightShape, leftShape) {
    this.controllableType = 'giant'
    this.rightShape = rightShape
    this.leftShape = leftShape
    this.currentControl = this.rightShape
    this.speed = 10
    this.ownerId = ''
  }

  get shapes () {
    return [ this.rightShape, this.leftShape ]
  }

  isVancant () {
    return this.ownerId === ''
  }

  set owner (newOwnerId) {
    this.ownerId = newOwnerId
  }

  isOccupiedBy (aPlayer) {
    return this.ownerId === aPlayer.id
  }

  abandon () {
    this.ownerId = ''
  }

  do (aGameBoard, command) {
    switch (command) {
      case 'LEFT':
        this.left(aGameBoard)
        break
      case 'UP':
        this.up(aGameBoard)
        break
      case 'RIGHT':
        this.right(aGameBoard)
        break
      case 'DOWN':
        this.down(aGameBoard)
        break
      case 'SPACE':
        this.space(aGameBoard)
        break
      default:
        console.log(`band command: ${command}`)
        break
    }
  }

  left (aGameBoard) {
    var oldx = this.currentControl.x
    this.currentControl.x -= this.SPEED
    if (aGameBoard.isValidSpace(this.currentControl) === false) {
      this.currentControl.x = oldx
    }
  }

  up (aGameBoard) {
    var oldy = this.currentControl.y
    this.currentControl.y -= this.SPEED
    if (aGameBoard.isValidSpace(this.currentControl) === false) {
      this.currentControl.y = oldy
    }
  }

  right (aGameBoard) {
    var oldx = this.currentControl.x
    this.currentControl.x += this.SPEED
    if (aGameBoard.isValidSpace(this.currentControl) === false) {
      this.currentControl.x = oldx
    }
  }

  down (aGameBoard) {
    var oldy = this.currentControl.y
    this.currentControl.y += this.SPEED
    if (aGameBoard.isValidSpace(this.currentControl) === false) {
      this.currentControl.y = oldy
    }
  }

  space (aGameBoard) {

  }
}

module.exports = Giant
