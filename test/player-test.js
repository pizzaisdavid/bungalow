var assert = require('assert');
const Game = require('../game/game');
const House = require('../game/house');
const Player = require('../game/player');
const PlaneObject = require('../game/plane-object')

describe('player', function() {
  const PLAYER_0_ID = 'qw12';
  // const PLAYER_1_ID = 'xnr13';
  // const PLAYER_2_ID = 'xLB94';
  // const PLAYER_3_ID = 'RnQ78';
  var game;
  var houses;

  beforeEach(() => {
    //game = new Game(500, 500, 3);
    houses = [generalTestHouse(10,10), generalTestHouse(10,10), generalTestHouse(10,10)];
  });

  it("Test1", () => {
  });
});

function generalTestHouse(X, Y, Z = 0){
  const WIDTH = 50;
  const HEIGHT = 50;
  const ANGLE = 0;
  return new House(new PlaneObject(X, Y, Z, WIDTH, HEIGHT, ANGLE), 'red');
}
