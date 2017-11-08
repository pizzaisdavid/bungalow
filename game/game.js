const House = require('./house');
const Player = require('./player');

class Game {

  constructor(width = 300, height = 150, houseCount = 6) {
    console.log('Hi, Clickty-Clack.');
    this.WIDTH = width;
    this.HEIGHT = height;
    this.HOUSE_COUNT = houseCount;
    this.houses = [];
  }

  createDefaultHouses() {
    for (var i = 0; i < this.HOUSE_COUNT; i++) {
      var house = House.generateRandom(this.WIDTH, this.HEIGHT);
      this.houses.push(house);
    }
    console.log(`${this.HOUSE_COUNT} houses generated.`);
    console.log(this.houses);
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
    var aPlayer = new Player(id);
    console.log(`${id} has joined.`);
    for (var i = 0; i < this.HOUSE_COUNT; i++) {
      var house = this.houses[i];
      if (house.isVancant()) {
        house.setPlayer(aPlayer);
        console.log(`house modified: ${this.houses[i].toString()}`);
        break;
      }
    }
  }

  deregisterPlayer(id) {
    for (var i = 0; i < this.HOUSE_COUNT; i++) {
      var house = this.houses[i];
      if (!house.isVancant() && house.player.id === id) {
        house.setPlayer(Player.Null);
        console.log(`house modified: ${this.houses[i].toString()}`);
        break;
      }
    }
  }
}

module.exports = Game;