const Position = require('./position');
const MathHelper = require('./math-helper');

class House {

  static generateRandom(width, height) {
    return new House(
      Position.generateRandom(width, height),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    );
  }

  constructor(position, color) {
    this.position = position;
    this.color = color;
    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.ownerId = '';
  }

  isVancant() {
    return this.ownerId === '';
  }

  set owner(newOwnerId) {
    this.ownerId = newOwnerId;
  }

  isOccupiedBy(aPlayer) {
    return this.ownerId === aPlayer.id;
  }

  abandon() {
    this.ownerId = '';
  }

  toString() {
    return `ownerId=${this.ownerId}`;
  }
}

class NullHouse {

  constructor() {

  }

  abandon() {

  }

  isVancant() {
    return false;
  }

  toString() {
    return 'NullHouse';
  }
}

House.Null = new NullHouse();
module.exports = House;