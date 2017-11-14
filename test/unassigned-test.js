// var assert = require('assert')
const Player = require('../game/player')
const Game = require('../game/game')
const Unassigned = require('../game/controllables/unassigned')
// const House = require('../game/controllables/house')
// const Shape = require('../game/shape')

describe('Unassigned', function () {
  const PLAYER_0_ID = 'fhqwhgads'
  var game
  beforeEach(() => {
    game = new Game(500, 500, 0)
  })

  it('No response to do', () => {
    var player = generateUnassignedPlayer(PLAYER_0_ID)
    player.do(game, ['LEFT'])
    player.do(game, ['RIGHT'])
    player.do(game, ['UP'])
    player.do(game, ['DOWN'])
  })
})

function generateUnassignedPlayer (anId) {
  var aPlayer = new Player(anId)
  aPlayer.house = new Unassigned()
  return aPlayer
}
