const House = require('./house');

class Player{
    constructor(anId){
        this.name = '';
        this.id = anId;
        //this.House = '';
    }
}
Player.Null = new Player('');

module.exports = Player;
