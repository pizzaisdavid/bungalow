const House = require('./house');

class Player{
    constructor(anId){
        this.id = anId;
        //this.House = '';
    }
}
Player.Null = new Player('');

module.exports = Player;
