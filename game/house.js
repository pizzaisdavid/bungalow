const PlaneObject = require('./plane-object');
const MathHelper = require('./math-helper');

class House {

  static generateRandom(width, height) {
    return new House(
      PlaneObject.generateRandom(width, height),
      MathHelper.selectRandom(['blue', 'red', 'green', 'yellow'])
    );
  }

  constructor(position, color) {
    this.self = this;
    this.position = position;
    this.color = color;
    this.SPEED = 10;
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

  do(game, command) {
    switch (command) {
      case 'LEFT':
        this.left(game)
        break;
      case 'UP':
        this.up(game);
        break;
      case 'RIGHT':
        this.right(game);
        break;
      case 'DOWN':
        this.down(game);
        break;
      default:
        console.log(`band command: ${command}`);
        break;
    }
    
  }

  left(game) {
    var oldx = this.position.x;

    this.position.x -= this.SPEED;
    console.log('iiiiiiiiiiiiiiiiiiiiiii');        
    if (game.isTouchingTouchingAnyHouseMinusMe(this)) {
      console.log('hihihihih');
      this.position.x = oldx;
    }
  }
 
  up(game) {
    this.position.y -= this.SPEED;
  }

  right(game) {
    this.position.x += this.SPEED;
  }

  down(game) {
    this.position.y += this.SPEED;
  }
}

class NullHouse {

  constructor() {
    this.position = PlaneObject.Null;
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