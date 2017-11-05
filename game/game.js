
const House = require('./house');

class Game {

  constructor() {
    console.log('Hi, Clickty-Clack.');
    this.WIDTH = 302;
    this.HEIGHT = 152;
    this.houses = [];
  }

  createDefaultHouses() {
    const COUNT = 6;
    for (var i = 0; i < COUNT; i++) {
      var house = House.generateRandom(this.WIDTH, this.HEIGHT);
      this.houses.push(house);
    }
    console.log(`${COUNT} houses generated.`);
    console.log(this.houses);
  }
}

module.exports = Game;