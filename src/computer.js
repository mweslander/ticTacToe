import {Player} from 'player';
import {MiniMax} from 'miniMax';

export class Computer extends Player {
    // Returns the opposite shape of the player
    setShape(shape) {
        if (shape === 'X') { return 'O'; }
        return 'X';
    }
    // cell selection
    selectCell(board, person) {
        // flatten the current board
        this.flatBoard = board.flatten();
        // Instantiate a new MiniMax Object and find the move
        var move = new MiniMax(this.flatBoard, person.shape, this.shape).findMove();
        // Map the move to the board
        return board.mapKeyToCell(move, this.shape);
    }
}
