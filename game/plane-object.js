const MathHelper = require('./math-helper');

class PlaneObject {

  static generateRandom(width, height) {
    return new PlaneObject(
      MathHelper.randomBetween(0, width),
      MathHelper.randomBetween(0, height),
      0,
      20,
      20,
      MathHelper.randomBetween(0, 360)
    )
  }

  constructor(x, y, z, height, width, angle) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.height = height;
    this.width = width;
    this.angle = angle;
  }

  isTouching(aPlaneObject) {
    if (this.z !== aPlaneObject.z) {
      return false;
    }
    return (this.x < aPlaneObject.x + aPlaneObject.width &&
    this.x + this.width > aPlaneObject.x &&
    this.y < aPlaneObject.y + aPlaneObject.height &&
    this.y + this.height > aPlaneObject.y);
  }
}

module.exports = PlaneObject;