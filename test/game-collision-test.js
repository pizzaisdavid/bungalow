var assert = require('assert');
const Game = require('../game/game');
const House = require('../game/house');
const PlaneObject = require('../game/plane-object');

describe('game-collision', function() {
  const PLAYER_0_ID = 'qw12';
  const PLAYER_1_ID = 'xnr13';
  const PLAYER_2_ID = 'xLB94';
  const PLAYER_3_ID = 'RnQ78';
  var game;

  beforeEach(() => {
    game = new Game(2000, 2000, 3);
    game.setHouses([
      whyTestHouse(),
      makeTestHouseLeftOfTestHouse(),
      makeTestFarAwayHouse()
    ]);
  });

  it('able to move left', () => {
    game.registerPlayer(PLAYER_0_ID);
    game.registerPlayer(PLAYER_1_ID);
    game.registerPlayer(PLAYER_2_ID);
    console.log('pplayers:');
    console.log(game.players[PLAYER_2_ID].house.position);
    var startingX = game.players[PLAYER_2_ID].house.position.x;
    var startingY = game.players[PLAYER_2_ID].house.position.y;
    console.log(game.players[PLAYER_2_ID]);
    game.queue(PLAYER_2_ID, ['LEFT']);
    game.tick();
    game.queue(PLAYER_2_ID, ['LEFT']);
    game.tick();
    game.queue(PLAYER_2_ID, ['LEFT']);
    game.tick();
    var currentX = game.players[PLAYER_2_ID].house.position.x;
    var currentY = game.players[PLAYER_2_ID].house.position.y;
    assert.notEqual(startingX, currentX);
    assert.equal(startingY, currentY);
  });

});

function whyTestHouse() {
  const X = 10;
  const Y = 10;
  const Z = 0;
  const WIDTH = 50;
  const HEIGHT = 50;
  const ANGLE = 0;
  return new House(new PlaneObject(X, Y, Z, WIDTH, HEIGHT, ANGLE), 'red');
}

function makeTestHouseLeftOfTestHouse() {
  const X = 60;
  const Y = 10;
  const Z = 0;
  const WIDTH = 50;
  const HEIGHT = 50;
  const ANGLE = 0;
  return new House(new PlaneObject(X, Y, Z, WIDTH, HEIGHT, ANGLE), 'red');
}

function makeTestFarAwayHouse() {
  const X = 1000;
  const Y = 10;
  const Z = 0;
  const WIDTH = 50;
  const HEIGHT = 50;
  const ANGLE = 0;
  return new House(new PlaneObject(X, Y, Z, WIDTH, HEIGHT, ANGLE), 'red');
}