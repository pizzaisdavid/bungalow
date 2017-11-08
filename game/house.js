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
    this.PLAYER = require('./player');
    this.position = position;
    this.color = color;
    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.player = this.PLAYER.Null;
  }

  isVancant() {
    return this.player === this.PLAYER.Null;
  }

  setPlayer(aPlayer) {
    this.player = aPlayer;
  }

  abandon() {
    this.player = this.PLAYER.Null;
  }

  toString() {
    return `playerId=${this.player.id}`;
  }
}

House.Null = new House(0,0);

House.Null.toString = () => {
  console.log('I am a Null house');
}

module.exports = House;