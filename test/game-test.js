var assert = require('assert');
const Game = require('../game/game');
const House = require('../game/house');
const Position = require('../game/position');

describe('game', function() {
  const PLAYER_0_ID = 'qw12';
  var game;

  beforeEach(() => {
    game = new Game(500, 500, 3);
    game.setHouses([
      makeTestHouse(),
      makeTestHouse(),
      makeTestHouse()
    ]);
  });

  it('register a player', () => {
    game.registerPlayer(PLAYER_0_ID);
    var houses = game.state.houses;
    assert(houses[0].isVancant() == false);
    assert(houses[1].isVancant());
    assert(houses[2].isVancant());
  });

  it('#deregisterPlayer(playerId)', () => {
    game.registerPlayer(PLAYER_0_ID);
    game.deregisterPlayer(PLAYER_0_ID);
    var houses = game.state.houses;    
    assert(houses[0].isVancant());
    assert(houses[1].isVancant());
    assert(houses[2].isVancant());
  });

});

function makeTestHouse() {
  return new House(new Position(0, 0, 0), 'red');
}