const House = require('./house');

class Player{
    constructor(anId){
        this.name = '';
        this.id = anId;
        this.self = this;        
        this.house = House.Null;
        this.assignHouse = (aHouse) => {
            if(this.house !== House.Null){
                this.house.setPlayer(Player.Null)
            }
            aHouse.setPlayer(this.self);
            this.house = aHouse;
        }
    }
}
Player.Null = new Player('');

module.exports = Player;
