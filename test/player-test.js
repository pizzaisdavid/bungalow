var assert = require('assert');
const Game = require('../game/game');
const House = require('../game/house');
const Position = require('../game/position');
const Player = require('../game/player');

describe('game', function() {
  const PLAYER_0_ID = 'qw12';
  const PLAYER_1_ID = 'xnr13';
  const PLAYER_2_ID = 'xLB94';
  const PLAYER_3_ID = 'RnQ78';
  var game;

  beforeEach(() => {
    game = new Game(500, 500, 3);
    game.setHouses([
      makeTestHouse(),
      makeTestHouse(),
      makeTestHouse()
    ]);
  });

  it("Assign House", () => {
    var aPlayer = new Player(PLAYER_0_ID);
    var houses = game.state.houses;
    aPlayer.assignHouse(houses[0]);
    assert(houses[0].isOccupiedBy(aPlayer));
    assert(houses[1].isVancant());
    assert(houses[2].isVancant());
  });
  
    it("Re-assign House", () => {
      var aPlayer = new Player(PLAYER_0_ID);
      var houses = game.state.houses;
      aPlayer.assignHouse(houses[0]);
      aPlayer.assignHouse(houses[1]);
      assert(houses[0].isVancant());
      assert(houses[1].isOccupiedBy(aPlayer));
      assert(houses[2].isVancant());
    });
});

function makeTestHouse() {
  return new House(new Position(0, 0, 0), 'red');
}
