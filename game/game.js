const House = require('./house');
const Player = require('./player');

class Game {

  constructor(width = 300, height = 150, houseCount = 6) {
    console.log('Hi, Clickty-Clack.');
    this.WIDTH = width;
    this.HEIGHT = height;
    this.HOUSE_COUNT = houseCount;
    this.houses = [];
    this.players = {};
  }

  createDefaultHouses() {
    for (var i = 0; i < this.HOUSE_COUNT; i++) {
      var house = House.generateRandom(this.WIDTH, this.HEIGHT);
      this.houses.push(house);
    }
    console.log(`${this.HOUSE_COUNT} houses generated.`);
  }

  setHouses(houses) {
    this.houses = houses;
  }

  get state() {
    return {
      houses: this.houses
    };
  }

  registerPlayer(id) {
    console.log(`${id} has joined.`);    
    var aPlayer = new Player(id);
    for (var i = 0; i < this.HOUSE_COUNT; i++) {
      var house = this.houses[i];
      if (house.isVancant()) {
        aPlayer.assignHouse(house);
        console.log(`house modified: ${this.houses[i].toString()}`);
        break;
      }
    }
    this.players[id] = aPlayer;
  }

  deregisterPlayer(id) {
    var player = this.players[id];
    player.quit();
    delete this.players[id];
  }
}

module.exports = Game;