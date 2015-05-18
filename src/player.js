export class Player {
    // Construct Player
    constructor(shape) {
        this.shape = this.setShape(shape);
        this.moves = [];
    }
    // sets the players shape - set up for inheritance 
    setShape(shape) {
        return shape;
    }

}