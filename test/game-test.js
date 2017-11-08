var assert = require('assert');
const Game = require('../game/game');
const House = require('../game/house');
const Position = require('../game/position');

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

  it('Register one player', () => {
    game.registerPlayer(PLAYER_0_ID);
    var houses = game.state.houses;
    assert.equal(houses[0].player.id, PLAYER_0_ID);
    assert(houses[1].isVancant());
    assert(houses[2].isVancant());
  });

  it('Register multiple players', () => {
    game.registerPlayer(PLAYER_0_ID);
    var houses = game.state.houses;
    assert.equal(houses[0].player.id, PLAYER_0_ID);
    assert(houses[1].isVancant());
    assert(houses[2].isVancant());
    game.registerPlayer(PLAYER_1_ID);
    var houses = game.state.houses;
    assert.equal(houses[0].player.id, PLAYER_0_ID);
    assert.equal(houses[1].player.id, PLAYER_1_ID);
    assert(houses[2].isVancant());
    game.registerPlayer(PLAYER_2_ID);
    var houses = game.state.houses;
    assert.equal(houses[0].player.id, PLAYER_0_ID);
    assert.equal(houses[1].player.id, PLAYER_1_ID);
    assert.equal(houses[2].player.id, PLAYER_2_ID);
  });

  it('De-Register one player', () => {
    game.registerPlayer(PLAYER_0_ID);
    game.deregisterPlayer(PLAYER_0_ID);
    var houses = game.state.houses;    
    assert(houses[0].isVancant());
    assert(houses[1].isVancant());
    assert(houses[2].isVancant());
  });
  
    it('De-Register multiple players FIFO', () => {
      game.registerPlayer(PLAYER_0_ID);
      game.registerPlayer(PLAYER_1_ID);
      game.registerPlayer(PLAYER_2_ID);
      game.deregisterPlayer(PLAYER_0_ID);
      var houses = game.state.houses;    
      assert(houses[0].isVancant());
      assert.equal(houses[1].player.id, PLAYER_1_ID);
      assert.equal(houses[2].player.id, PLAYER_2_ID);
      game.deregisterPlayer(PLAYER_1_ID);
      houses = game.state.houses;    
      assert(houses[0].isVancant());
      assert(houses[1].isVancant());
      assert.equal(houses[2].player.id, PLAYER_2_ID);
      game.deregisterPlayer(PLAYER_2_ID);
    });
    
    it('De-Register multiple players LIFO', () => {
      game.registerPlayer(PLAYER_0_ID);
      game.registerPlayer(PLAYER_1_ID);
      game.registerPlayer(PLAYER_2_ID);
      game.deregisterPlayer(PLAYER_2_ID);
      var houses = game.state.houses;    
      assert.equal(houses[0].player.id, PLAYER_0_ID);
      assert.equal(houses[1].player.id, PLAYER_1_ID);
      assert(houses[2].isVancant());
      game.deregisterPlayer(PLAYER_1_ID);
      houses = game.state.houses;    
      assert.equal(houses[0].player.id, PLAYER_0_ID);
      assert(houses[1].isVancant());
      assert(houses[2].isVancant());
    });

    
    it('Re-Register multiple players', () => {
      game.registerPlayer(PLAYER_0_ID);
      game.registerPlayer(PLAYER_1_ID);
      game.registerPlayer(PLAYER_2_ID);
      game.deregisterPlayer(PLAYER_0_ID);
      game.deregisterPlayer(PLAYER_1_ID);
      game.deregisterPlayer(PLAYER_2_ID);

      game.registerPlayer(PLAYER_0_ID);
      game.registerPlayer(PLAYER_1_ID);
      game.registerPlayer(PLAYER_2_ID);
      var houses = game.state.houses;    
      assert.equal(houses[0].player.id, PLAYER_0_ID);
      assert.equal(houses[1].player.id, PLAYER_1_ID);
      assert.equal(houses[2].player.id, PLAYER_2_ID);
    });
});

function makeTestHouse() {
  return new House(new Position(0, 0, 0), 'red');
}