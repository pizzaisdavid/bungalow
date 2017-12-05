
class Giant {
  constructor (rightShape, leftShape) {
    this.controllableType = 'giant'
    this.rightShape = rightShape
    this.leftShape = leftShape
    this.currentControl = this.rightShape
    this.otherControl = this.leftShape
    this.isStomping = false
    this.isRaising = false
    this.SPEED = 10
    this.ownerName = ''

    this.cooldowns = {
      'SPACE_BAR': 0
    }
    this.COOLDOWN_RATES_IN_MILLISECONDS = {
      'SPACE_BAR': 200
    }
    this.ownerId = ''

    this.currentControl.z = 50 // hacky boi
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
    if (this.isStomping) {
      return
    }
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
        if (this.isRaising === false) {
          this.space(aGameBoard)          
        }
        break
      default:
        console.log(`band command: ${command}`)
        break
    }
  }

  tick(aGame) {
    if (this.isStomping) {
      this.currentControl.z -= 15
      if (this.currentControl.z < 0) {
        this.currentControl.z = 0
        aGame.stomp(this.currentControl)
        this.isStomping = false
        this.swap(aGame.board)
      }
    } else if (this.isRaising) {
      this.currentControl.z += 5
      if (this.currentControl.z > 100) {
        this.currentControl.z = 100
        this.isRaising = false
      }
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
      this.isStomping = true
    }
  }

  raise() {
    this.israising = true
  }

  smash () {
    // TODO: haha smash your own foot!
  } 

  swap (aGameBoard) {
    this.cooldowns['SPACE_BAR'] = aGameBoard.time()
    if (this.currentControl === this.rightShape) {
      this.currentControl = this.leftShape
      this.otherControl = this.rightShape
    } else {
      this.currentControl = this.rightShape
      this.otherControl = this.leftShape
    }
    this.isRaising = true
  }

  isReady (aGameBoard, abilityName) {
    let timeLastUsed = this.cooldowns[abilityName]
    let difference = aGameBoard.time() - timeLastUsed
    return difference >= this.COOLDOWN_RATES_IN_MILLISECONDS[abilityName]
  }
}

module.exports = Giant
