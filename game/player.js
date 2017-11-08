
class Player {
  
    constructor(anId){
        this.HOUSE = require('./house');      
        this.name = '';
        this.id = anId;
        this.self = this;        
        this.house = this.HOUSE.Null;
        this.assignHouse = (aHouse) => {
            this.house.abandon();          
            aHouse.setPlayer(this.self);
            this.house = aHouse;
        }
    }
}

Player.Null = new Player('');

module.exports = Player;
