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
    this.commands = {};
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
    var aHouse = this.findVancantHouse();
    aPlayer.assignHouse(aHouse);
    console.log(`house modified: ${aHouse.toString()}`);
    this.add(aPlayer);
  }

  add(aPlayer) {
    var id = aPlayer.id;
    this.players[id] = aPlayer;    
  }

  findVancantHouse() {
    for (var i = 0; i < this.HOUSE_COUNT; i++) {
      var house = this.houses[i];
      if (house.isVancant()) {
        return house;
      }
    }
    return House.Null;
  }

  deregisterPlayer(id) {
    var aPlayer = this.players[id];
    aPlayer.quit();
    this.remove(aPlayer);
  }

  remove(aPlayer) {
    var id = aPlayer.id;
    delete this.players[id];
  }

  queue(id, commands) {
    this.commands[id] = commands;   
  }

  tick() {
    for (var id in this.commands) {
      var player = this.players[id];
      var commands = this.commands[id];
      this.processCommands(player, commands);
    }
    this.commands = {};    
  }

  processCommands(player, commands) {
    for (var i = 0; i < commands.length; i++) {
      var c = commands[i];
      console.log(c);
      player.do(this, c);
    }

  }
}

module.exports = Game;