
const House = require('./house');

class Game {

  constructor(width = 302, height = 152, houseCount = 6) {
    console.log('Hi, Clickty-Clack.');
    this.WIDTH = width;
    this.HEIGHT = height;
    this.houseCount = houseCount;
    this.houses = [];
  }

  createDefaultHouses() {
    const COUNT = this.houseCount;
    for (var i = 0; i < COUNT; i++) {
      var house = House.generateRandom(this.WIDTH, this.HEIGHT);
      this.houses.push(house);
    }
    console.log(`${COUNT} houses generated.`);
    console.log(this.houses);
  }
}

module.exports = Game;