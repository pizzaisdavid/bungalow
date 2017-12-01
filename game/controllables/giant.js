
class Giant {
  constructor (rightShape, leftShape) {
    this.controllableType = 'giant'
    this.rightShape = rightShape
    this.leftShape = leftShape
    this.currentControl = this.rightShape
    this.SPEED = 10

    this.cooldowns = {
      'SPACE_BAR': 0
    }
    this.COOLDOWN_RATES_IN_MILLISECONDS = {
      'SPACE_BAR': 200
    }
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
      case 'SPACE_BAR':
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
    if (this.isReady(aGameBoard, 'SPACE_BAR')) {
      this.stomp(aGameBoard)
      this.swap(aGameBoard)
    }
  }

  stomp (aGameBoard) {
    this.currentControl.z = 0
    aGameBoard.stomp(this.currentControl)
  }

  swap (aGameBoard) {
    this.currentControl.z = 1
    this.cooldowns['SPACE_BAR'] = aGameBoard.time()
    if (this.currentControl === this.rightShape) {
      this.currentControl = this.leftShape
    } else {
      this.currentControl = this.rightShape
    }
  }

  isReady (aGameBoard, abilityName) {
    let timeLastUsed = this.cooldowns[abilityName]
    let difference = aGameBoard.time() - timeLastUsed
    return difference >= this.COOLDOWN_RATES_IN_MILLISECONDS[abilityName]
  }
}

module.exports = Giant
